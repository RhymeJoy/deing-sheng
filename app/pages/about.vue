<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, nextTick, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { usePublicAsset } from '#imports'

const { t, tm, rt, locale } = useI18n()
const publicAsset = usePublicAsset()

const mapEl = ref(null)
const showMapTouchHint = ref(true)
const isTouchDevice = ref(false)

const mapTouchHintText = computed(() =>
  locale.value === 'en'
    ? 'Use two fingers to move'
    : locale.value === 'zh-CN'
      ? '用双指移动地图'
      : '用兩指操作地圖',
)

type I18nMessage = Parameters<typeof rt>[0]

const aboutContent = computed(() => tm('about.content') as I18nMessage[])
const devhistoryContent = computed(() => tm('about.devhistoryContent') as I18nMessage[])

let map = null
let rafId = null
let items = []
let resizeHandler = null
let themeObserver = null
let themeChangeHandler = null
let svgEl = null
let svgElements = []
let isZooming = false
let mapReady = false
let mapTouchStartHandler = null
let isWrappingHorizontal = false
let isClampingVertical = false
let mapScaleLineEl = null

const mapConfig = {
  width: 1009.6727,
  height: 665.96301,
}

const geographicMapConfig = {
  west: -169.110266,
  east: 190.486279,
  north: 83.600842,
  south: -58.508473,
}

const focusConfig = {
  mobileWidth: 700,
  mobileCenter: [270, 790],
  mobileZoom: 0,
  mobileMinZoom: -1.2,
  desktopMinZoom: -0.5,
  desktopPadding: [0, 0],
}

const borderWidthConfig = {
  minZoom: -1.5,
  maxZoom: 5,
  minWidth: 1,
  maxWidth: 0.05,
}

const wiggleConfig = {
  frequency: 0.1,
  amplitude: 5,
}

const lineConfig = {
  baseZoom: null,
  zoomPower: 2,
  minLengthScale: 0.01,
  maxLengthScale: 1,
  minLengthPx: 24,
  viewportPadding: 12,
  fallbackLabelWidth: 140,
  fallbackLabelHeight: 32,
}

const labelLineConfig = {
  weight: 1,
  opacity: 0.75,
}

const boundsPadding = {
  left: 30,
  right: -30,
  top: 15,
  bottom: -15,
}

const enableHover = false

const highlightedCountryIds = new Set(['CN', 'TW', 'VN', 'PH', 'ID'])

const regions = [
  { key: 'shanghai',    point: [295, 816], label: [420, 930] },
  { key: 'suzhou',      point: [296, 812], label: [450, 810] },
  { key: 'zhejiang',    point: [288, 811], label: [350, 950] },
  { key: 'guangzhou',   point: [270, 793], label: [280, 680] },
  { key: 'wuhan',       point: [292, 798], label: [350, 650] },
  { key: 'hefei',       point: [298, 805], label: [420, 700] },
  { key: 'taiwan',      point: [272, 814], label: [270, 930] },
  { key: 'vietnam',     point: [250, 775], label: [200, 710] },
  { key: 'philippines', point: [240, 817], label: [200, 900] },
  { key: 'indonesia',   point: [190, 810], label: [120, 800] },
]

function hideMapTouchHint() {
  showMapTouchHint.value = false
}

function wrapMapHorizontally() {
  if (!map || isWrappingHorizontal) return

  const center = map.getCenter()
  const worldWidth = mapConfig.width
  const wrappedLng = ((center.lng % worldWidth) + worldWidth) % worldWidth

  if (Math.abs(wrappedLng - center.lng) < 0.01) return

  isWrappingHorizontal = true

  map.setView([center.lat, wrappedLng], map.getZoom(), {
    animate: false,
  })

  isWrappingHorizontal = false
}
function clampMapVertically() {
  if (!map || isClampingVertical) return

  const visibleBounds = map.getBounds()
  const visibleHeight = visibleBounds.getNorth() - visibleBounds.getSouth()
  const center = map.getCenter()
  const centerY = visibleHeight >= mapConfig.height
    ? mapConfig.height / 2
    : clamp(center.lat, visibleHeight / 2, mapConfig.height - visibleHeight / 2)

  if (Math.abs(centerY - center.lat) < 0.01) return

  isClampingVertical = true

  map.setView([centerY, center.lng], map.getZoom(), {
    animate: false,
  })

  isClampingVertical = false
}

function cssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

function getCountryColor(id) {
  return highlightedCountryIds.has(id)
    ? cssVar('--map-country-highlight')
    : cssVar('--map-country')
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

function lerp(min, max, progress) {
  return min + (max - min) * progress
}

function formatScaleDistance(distance) {
  if (distance >= 1000) {
    const kilometers = distance / 1000
    const value = kilometers >= 10 ? Math.round(kilometers) : Math.round(kilometers * 10) / 10

    return value + ' km'
  }

  return Math.round(distance) + ' m'
}

function getNiceScaleDistance(maxDistance) {
  if (!Number.isFinite(maxDistance) || maxDistance <= 0) return 0

  const exponent = Math.floor(Math.log10(maxDistance))
  const magnitude = 10 ** exponent
  const normalized = maxDistance / magnitude
  const factor = normalized >= 5 ? 5 : normalized >= 2 ? 2 : 1

  return factor * magnitude
}

function refreshGeographicScale() {
  if (!map || !mapScaleLineEl) return

  const latitudeSpan = geographicMapConfig.north - geographicMapConfig.south
  const latitude = geographicMapConfig.north - (map.getCenter().lat / mapConfig.height) * latitudeSpan
  const latitudeRadians = (latitude * Math.PI) / 180
  const longitudeDegreesPerMapUnit =
    (geographicMapConfig.east - geographicMapConfig.west) / mapConfig.width
  const metersPerMapUnit =
    longitudeDegreesPerMapUnit *
    111319.49079327358 *
    Math.max(Math.abs(Math.cos(latitudeRadians)), 0.05)
  const metersPerPixel = metersPerMapUnit / 2 ** map.getZoom()
  const scaleDistance = getNiceScaleDistance(metersPerPixel * 100)

  if (!scaleDistance) return

  const scaleWidth = Math.round(scaleDistance / metersPerPixel)

  mapScaleLineEl.style.width = scaleWidth + 'px'
  mapScaleLineEl.textContent = formatScaleDistance(scaleDistance)
}

function getBorderWidth() {
  if (!map) return borderWidthConfig.minWidth

  const zoom = map.getZoom()

  const progress = clamp(
    (zoom - borderWidthConfig.minZoom) / (borderWidthConfig.maxZoom - borderWidthConfig.minZoom),
    0,
    1,
  )

  return lerp(borderWidthConfig.minWidth, borderWidthConfig.maxWidth, progress)
}

function refreshCountryBorders() {
  if (!map) return

  const width = getBorderWidth()

  map
    .getContainer()
    .querySelectorAll('.country-path')
    .forEach((path) => {
      path.style.strokeWidth = width
    })
}

function createLabelIcon(key) {
  return L.divIcon({
    className: 'map-label-anchor',
    html: `<div class="map-label">${t(`about.map.${key}`)}</div>`,
    iconSize: [1, 1],
    iconAnchor: [0, 0],
  })
}

function refreshLabels() {
  items.forEach((item) => {
    item.marker.setIcon(createLabelIcon(item.key))
  })
}

function refreshMapTheme() {
  if (!map) return

  const bg = cssVar('--map-bg')
  const pointColor = cssVar('--map-point')
  const lineColor = cssVar('--map-line')
  const strokeColor = cssVar('--map-stroke')

  const container = map.getContainer()

  if (container) {
    container.style.background = bg
  }

  svgElements.forEach((svg) => {
    svg.style.background = bg
  })

  container.querySelectorAll('.country-path').forEach((path) => {
    path.style.fill = getCountryColor(path.id)
    path.style.stroke = strokeColor
    path.style.strokeWidth = getBorderWidth()
  })

  items.forEach((item) => {
    item.point.setStyle({
      color: pointColor,
      fillColor: pointColor,
    })

    item.line.setStyle({
      color: lineColor,
      weight: labelLineConfig.weight,
      opacity: labelLineConfig.opacity,
    })

    item.line.bringToFront()
    item.point.bringToFront()
  })

  refreshLabels()
}

async function addSvgWorldMap(bounds) {
  const res = await fetch(publicAsset('/img/world.svg'))
  const svgText = await res.text()

  const wrapper = document.createElement('div')
  wrapper.innerHTML = svgText.trim()

  const baseSvg = wrapper.querySelector('svg')

  if (!baseSvg) {
    console.error('world.svg 鋆⊥銝 <svg>')
    return
  }

  const offsets = [-mapConfig.width, 0, mapConfig.width]
  svgElements = []

  offsets.forEach((offset) => {
    const svg = offset === 0
      ? baseSvg
      : baseSvg.cloneNode(true) as SVGSVGElement

    svg.setAttribute(
      'viewBox',
      '0 0 ' + mapConfig.width + ' ' + mapConfig.height,
    )
    svg.setAttribute('preserveAspectRatio', 'none')
    svg.setAttribute('width', String(mapConfig.width))
    svg.setAttribute('height', String(mapConfig.height))

    svg.style.width = '100%'
    svg.style.height = '100%'
    svg.style.display = 'block'
    svg.style.background = cssVar('--map-bg')

    svg.querySelectorAll('path').forEach((path) => {
      path.classList.add('country-path')

      path.style.fill = getCountryColor(path.id)
      path.style.stroke = cssVar('--map-stroke')
      path.style.strokeWidth = getBorderWidth()
      path.style.cursor = enableHover ? 'pointer' : 'default'
      path.style.transition = 'fill .15s ease, stroke .15s ease, stroke-width .15s ease'

      path.addEventListener('mouseenter', () => {
        if (!enableHover) return
        path.style.fill = cssVar('--map-country-hover')
      })

      path.addEventListener('mouseleave', () => {
        if (!enableHover) return
        path.style.fill = getCountryColor(path.id)
      })
    })

    svgElements.push(svg)

    if (offset === 0) {
      svgEl = svg
    }

    const overlayBounds = [
      [bounds[0][0], bounds[0][1] + offset],
      [bounds[1][0], bounds[1][1] + offset],
    ]

    L.svgOverlay(svg, overlayBounds, {
      interactive: true,
    }).addTo(map)
  })
}
function applyTouchMapMode() {
  if (!map) return

  const container = map.getContainer()

  if (isTouchDevice.value) {
    map.dragging.disable()
    map.scrollWheelZoom.disable()
    map.doubleClickZoom.disable()
    map.boxZoom.disable()
    map.keyboard.disable()
    map.touchZoom.enable()

    container.classList.add('is-touch-map')
  } else {
    map.dragging.enable()
    map.scrollWheelZoom.enable()
    map.doubleClickZoom.enable()
    map.boxZoom.enable()
    map.keyboard.enable()
    map.touchZoom.enable()

    container.classList.remove('is-touch-map')
  }
}

function fitMapToWorld(bounds) {
  if (!map || !mapEl.value) return

  map.invalidateSize()

  const isMobile = mapEl.value.clientWidth <= focusConfig.mobileWidth

  if (isMobile) {
    map.setMinZoom(focusConfig.mobileMinZoom)

    map.setView(focusConfig.mobileCenter, focusConfig.mobileZoom, { animate: false })
  } else {
    map.setMinZoom(focusConfig.desktopMinZoom)

    map.fitBounds(bounds, {
      padding: focusConfig.desktopPadding,
      animate: false,
    })
  }

  lineConfig.baseZoom = map.getZoom()

  refreshCountryBorders()
  refreshGeographicScale()
  applyTouchMapMode()
}

function setupMapEvents() {
  if (!map) return

  const container = map.getContainer()

  mapTouchStartHandler = (event) => {
    if (!mapReady) return

    if (event.touches && event.touches.length >= 2) {
      hideMapTouchHint()
    }
  }

  container.addEventListener('touchstart', mapTouchStartHandler, {
    passive: true,
  })

  map.on('zoomstart', () => {
    isZooming = true
  })

  map.on('dragstart', () => {
    if (!isTouchDevice.value && mapReady) {
      hideMapTouchHint()
    }
  })

  map.on('moveend', wrapMapHorizontally)
  map.on('move', () => {
    clampMapVertically()
    refreshGeographicScale()
  })
  map.on('zoom', () => {
    refreshCountryBorders()
    refreshGeographicScale()
  })

  map.on('zoomend', () => {
    isZooming = false
    refreshCountryBorders()
  })
}

function createRegionItems() {
  if (!map) return

  items = []

  regions.forEach((region) => {
    const pointLatLng = L.latLng(region.point[0], region.point[1])
    const baseLabelLatLng = L.latLng(region.label[0], region.label[1])

    const point = L.circleMarker(pointLatLng, {
      radius: 4,
      color: cssVar('--map-point'),
      fillColor: cssVar('--map-point'),
      fillOpacity: 0.5,
      weight: 1,
    }).addTo(map)

    const line = L.polyline([pointLatLng, baseLabelLatLng], {
      color: cssVar('--map-line'),
      weight: labelLineConfig.weight,
      opacity: labelLineConfig.opacity,
      interactive: false,
      lineCap: 'round',
      lineJoin: 'round',
      className: 'label-polyline',
    }).addTo(map)

    const marker = L.marker(baseLabelLatLng, {
      interactive: false,
      icon: createLabelIcon(region.key),
    }).addTo(map)

    line.bringToFront()
    point.bringToFront()

    items.push({
      key: region.key,
      point,
      marker,
      line,
      pointLatLng,
      baseLabelLatLng,
      seedX: Math.random() * 1000,
      seedY: Math.random() * 1000,
    })
  })
}

function startLabelAnimation() {
  const wiggle = (time, seed) => {
    return (
      Math.sin(time * 1.0 + seed) * 0.55 +
      Math.sin(time * 2.13 + seed * 1.7) * 0.3 +
      Math.sin(time * 3.71 + seed * 2.3) * 0.15
    )
  }

  const getLengthScale = (item) => {
    if (!map) return 1

    const zoom = map.getZoom()
    const baseZoom = lineConfig.baseZoom ?? zoom
    const zoomScale = Math.pow(lineConfig.zoomPower, baseZoom - zoom)

    const pointPx = map.latLngToLayerPoint(item.pointLatLng)
    const labelPx = map.latLngToLayerPoint(item.baseLabelLatLng)
    const baseLengthPx = pointPx.distanceTo(labelPx)
    const minimumScale = baseLengthPx > 0
      ? Math.min(lineConfig.maxLengthScale, Math.max(lineConfig.minLengthScale, lineConfig.minLengthPx / baseLengthPx))
      : lineConfig.minLengthScale

    return clamp(zoomScale, minimumScale, lineConfig.maxLengthScale)
  }

  const clampAxis = (value, min, max) => {
    if (max < min) return min

    return clamp(value, min, max)
  }

  const keepLabelInViewport = (layerPoint, item) => {
    if (!map) return layerPoint

    const containerPoint = map.layerPointToContainerPoint(layerPoint)

    const mapSize = map.getSize()

    const markerEl = item.marker.getElement()
    const labelEl = markerEl?.querySelector('.map-label')
    const labelRect = labelEl?.getBoundingClientRect()

    const labelWidth = labelRect?.width || lineConfig.fallbackLabelWidth

    const labelHeight = labelRect?.height || lineConfig.fallbackLabelHeight

    const clampedContainerPoint = L.point(
      clampAxis(containerPoint.x, boundsPadding.left, mapSize.x - boundsPadding.right - labelWidth),
      clampAxis(
        containerPoint.y,
        boundsPadding.top,
        mapSize.y - boundsPadding.bottom - labelHeight,
      ),
    )

    return map.containerPointToLayerPoint(clampedContainerPoint)
  }

  const animate = (now) => {
    if (!map) return

    if (isZooming) {
      rafId = requestAnimationFrame(animate)
      return
    }

    const time = now / 1000
    const wave = time * wiggleConfig.frequency * Math.PI * 2

    items.forEach((item) => {
      const lengthScale = getLengthScale(item)

      const pointPx = map.latLngToLayerPoint(item.pointLatLng)
      const labelPx = map.latLngToLayerPoint(item.baseLabelLatLng)

      const vx = labelPx.x - pointPx.x
      const vy = labelPx.y - pointPx.y

      const wiggleX = wiggle(wave, item.seedX) * wiggleConfig.amplitude
      const wiggleY = wiggle(wave, item.seedY) * wiggleConfig.amplitude

      const targetLabelPx = L.point(
        pointPx.x + vx * lengthScale + wiggleX,
        pointPx.y + vy * lengthScale + wiggleY,
      )

      const finalLabelPx = keepLabelInViewport(targetLabelPx, item)

      const finalLabelLatLng = map.layerPointToLatLng(finalLabelPx)

      item.marker.setLatLng(finalLabelLatLng)

      item.line.setLatLngs([item.pointLatLng, finalLabelLatLng])

      item.line.bringToFront()
      item.point.bringToFront()
    })

    rafId = requestAnimationFrame(animate)
  }

  rafId = requestAnimationFrame(animate)
}

onMounted(async () => {
  await nextTick()

  showMapTouchHint.value = true
  mapReady = false

  isTouchDevice.value =
    window.matchMedia('(pointer: coarse)').matches ||
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.innerWidth <= 980

  const bounds = [
    [0, 0],
    [mapConfig.height, mapConfig.width],
  ]

  map = L.map(mapEl.value, {
    crs: L.CRS.Simple,
    minZoom: -0.5,
    maxZoom: 5,
    zoomSnap: 0.1,
    zoomDelta: 0.25,
    zoomControl: true,
    attributionControl: false,

    dragging: !isTouchDevice.value,
    scrollWheelZoom: !isTouchDevice.value,
    doubleClickZoom: !isTouchDevice.value,
    touchZoom: true,
    boxZoom: !isTouchDevice.value,
    keyboard: !isTouchDevice.value,
    tap: false,

    maxBoundsViscosity: 0.6,
  } as L.MapOptions & { tap: boolean })

  const geographicScaleControl = L.control({
    position: 'bottomright',
  })

  geographicScaleControl.onAdd = () => {
    const container = L.DomUtil.create('div', 'leaflet-control geographic-scale-control')
    L.DomEvent.disableClickPropagation(container)

    mapScaleLineEl = L.DomUtil.create('div', 'geographic-scale-line', container)

    return container
  }

  geographicScaleControl.addTo(map)

  applyTouchMapMode()
  setupMapEvents()

  await addSvgWorldMap(bounds)

  fitMapToWorld(bounds)
  createRegionItems()
  refreshMapTheme()
  startLabelAnimation()

  requestAnimationFrame(() => {
    mapReady = true
  })

  setTimeout(() => {
    if (!map) return
    fitMapToWorld(bounds)
    refreshMapTheme()

    requestAnimationFrame(() => {
      mapReady = true
    })
  }, 100)

  resizeHandler = () => {
    if (!map) return

    isTouchDevice.value =
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.innerWidth <= 980

    fitMapToWorld(bounds)
    refreshMapTheme()
  }

  window.addEventListener('resize', resizeHandler)

  themeChangeHandler = () => {
    refreshMapTheme()
  }

  window.addEventListener('themechange', themeChangeHandler)

  themeObserver = new MutationObserver(() => {
    requestAnimationFrame(() => {
      refreshMapTheme()
    })
  })

  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })
})

watch(locale, () => {
  refreshLabels()
})

onBeforeUnmount(() => {
  mapReady = false

  if (themeObserver) {
    themeObserver.disconnect()
    themeObserver = null
  }

  if (themeChangeHandler) {
    window.removeEventListener('themechange', themeChangeHandler)
    themeChangeHandler = null
  }

  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
    resizeHandler = null
  }

  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = null
  }

  if (map) {
    const container = map.getContainer()

    if (container && mapTouchStartHandler) {
      container.removeEventListener('touchstart', mapTouchStartHandler)
      mapTouchStartHandler = null
    }

    map.off('zoomstart zoom zoomend dragstart moveend move')
    map.remove()
    map = null
  }

  mapScaleLineEl = null
  svgEl = null
  svgElements = []
  items = []
  isZooming = false
})
</script>

<template>
  <main id="content">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <section class="about-page">
            <header>
              <h1>{{ t('about.title') }}</h1>
              <h2>{{ t('about.company') }}</h2>
              <h3>{{ t('about.founded') }}</h3>
            </header>

            <div style="line-height: 1.25">
              <template
                v-for="(text, i) in aboutContent"
                :key="`content-${i}`"
              >
                {{ rt(text) }}

                <br v-if="i !== aboutContent.length - 1" />
                <br v-if="i !== aboutContent.length - 1" />
              </template>
            </div>

            <div class="about-block">
              <h2>{{ t('about.philosophyTitle') }}</h2>

              <p>
                {{ t('about.philosophyContent') }}
              </p>
            </div>

            <div class="about-block">
              <h2>{{ t('about.companyLocationTitle') }}</h2>

              <div class="about-google-map">
                <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30000!2d120.70292247834112!3d24.24118096636405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a94203eb220d%3A0x7f4e55df9b7289!2z6byO6Zme5LyB5qWt5pyJ6ZmQ5YWs5Y-4!5e0!3m2!1szh-TW!2stw!4v1791792371685!5m2!1szh-TW!2stw"
                title="Google Maps"
                width="600"
                height="450"
                loading="lazy"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
              </div>
            </div>

            <div class="about-block">
              <h2>
                {{ t('about.servinglocations') }}
              </h2>

              <div class="map-wrap">
                <Transition name="map-touch-hint">
                  <div v-if="showMapTouchHint" class="map-touch-hint">
                    {{ mapTouchHintText }}
                  </div>
                </Transition>

                <div ref="mapEl" class="world-leaflet-map"></div>
              </div>
            </div>

            <div class="about-block">
              <h2>
                {{ t('about.devhistory') }}
              </h2>

              <div
                v-for="(item, i) in devhistoryContent"
                :key="`history-${i}`"
                class="history-item"
              >
                {{ rt(item) }}
              </div>
            </div>

            <div class="location-grid">
              <article class="location-card">
                <span class="location-tag"> HQ </span>

                <h3>
                  {{ t('about.hqTitle') }}
                </h3>

                <ul>
                  <li>
                    {{ t('about.hqAddress') }}
                  </li>

                  <li>
                    {{ t('about.hqTel') }}
                  </li>

                  <li>
                    {{ t('about.hqFax') }}
                  </li>
                </ul>
              </article>

              <article class="location-card">
                <span class="location-tag"> CN </span>

                <h3>
                  {{ t('about.cnTitle') }}
                </h3>

                <ul>
                  <li>
                    {{ t('about.cnCompany') }}
                  </li>

                  <li>
                    {{ t('about.cnAddress') }}
                  </li>

                  <li>
                    {{ t('about.cnTel') }}
                  </li>
                </ul>
              </article>
            </div>
          </section>
        </div>
      </div>
    </div>
  </main>
</template>

<style src="~/assets/css/about.css"></style>
