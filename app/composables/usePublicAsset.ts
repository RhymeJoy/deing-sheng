import { useRuntimeConfig } from '#imports'

export function usePublicAsset() {
  const config = useRuntimeConfig()

  return (path?: string | null) => {
    if (!path) return ''

    if (/^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith('data:') || path.startsWith('blob:')) {
      return path
    }

    const baseURL = config.app.baseURL.endsWith('/')
      ? config.app.baseURL
      : `${config.app.baseURL}/`

    return `${baseURL}${path.replace(/^\/+/, '')}`
  }
}
