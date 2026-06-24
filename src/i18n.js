import { createI18n } from 'vue-i18n'

const phone =
  '25338157'

const fax =
  '25338192'

const phonenumber1 =
  `04-${phone}`

const phonenumber2 =
  `+886-4-${phone}`

const faxnumber1 =
  `04-${fax}`

const faxnumber2 =
  `+886-4-${fax}`

function detectLocale() {

  const validLocales = [
    'zh-TW',
    'en'
  ]

  const params =
    new URLSearchParams(
      window.location.search
    )

  const urlLang =
    params.get('lang')

  const saved =
    localStorage.getItem('lang')

  // URL lang
  if (urlLang) {

    if (
      validLocales.includes(urlLang)
    ) {
      return urlLang
    }

    // 修正不存在語言
    const url =
      new URL(window.location)

    url.searchParams.set(
      'lang',
      'zh-TW'
    )

    window.history.replaceState(
      {},
      '',
      url
    )

    return 'zh-TW'
  }

  // localStorage
  if (
    saved &&
    validLocales.includes(saved)
  ) {
    return saved
  }

  // System language
  const system =
    navigator.language
      .toLowerCase()

  // 繁中
  if (
    system.includes('zh-tw')  ||
    system.includes('zh-hk')  ||
    system.includes('zh-mo')  ||
    system.includes('zh-hant')||
    system.includes('zh-cn')  ||
    system.includes('zh-sg')
  ) {
    return 'zh-TW'
  }

  // 英文
  if (
    system.includes('en')
  ) {
    return 'en'
  }

  // fallback
  return 'zh-TW'
}

const messages = {
  'zh-TW': {
    nav: {
      home: '首頁',
      about: '關於我們',
      // products: '產品介紹',
      goods: '產品介紹',
      contact: '聯絡我們',
    },

    company: {
      name: '鼎陞企業',
    },

    home: {
      banner: '專業材料供應與技術服務，提供穩定、可靠的產業解決方案。',
      contact: '聯絡我們',
      materials: '專業材料',
      materialsDesc: '提供產業用材料、原物料與相關解決方案，協助客戶穩定生產。',
      support: '技術支援',
      supportDesc: '依照不同產業需求，提供產品建議、應用諮詢與後續服務。',
      supply: '穩定供應',
      supplyDesc: '重視品質、交期與供應穩定性，作為企業長期合作夥伴。',
      custom: '客製服務',
      customDesc: '依照客戶使用情境與產線需求，協助規劃合適的產品方案。',
      aboutTitle: '關於鼎陞',
      aboutSub: '專業、穩定、可靠的企業夥伴',
      aboutDesc: '鼎陞企業致力於提供產業材料與相關服務，重視品質管理、客戶需求與長期合作關係。',
      serviceTitle: '服務項目',
      serviceSub: '從產品供應到技術諮詢',
      service1: '產業材料供應',
      service2: '產品應用建議',
      service3: '技術支援服務',
      service4: '客製化需求討論',
      service5: '長期穩定合作',
      contactTitle: '聯絡資訊',
      contactSub: '歡迎與我們聯繫',
      phone: '電話',
      phonenumber: `${phonenumber1}`,
      phoneDesc: '服務時間歡迎來電洽詢',
      fax: '傳真',
      faxnumber: `${faxnumber1}`,
      faxDesc: '可傳送需求資料',
      emailDesc: '我們將盡快回覆您',
    },

    about: {
      title: '關於我們',
      company: '鼎陞企業有限公司',
      founded: '成立於 2006 年',

      content: [
        '鼎陞企業有限公司成立於2006年，專注於製冷設備、冷凍材料與系統整合服務，致力於為商業與工業環境提供高效、穩定且符合環保趨勢的冷卻解決方案。',
        '鼎陞企業成立初期，主要以代理保溫與保冷相關原物料為核心業務，專注於為製冷產業提供穩定且高品質的基礎材料。透過與多家上游供應商的合作，公司逐步累積對製冷材料特性與應用技術的深入理解，並建立良好的市場基礎與客戶信任。',
        '隨著市場需求不斷提升與產業結構的轉變，鼎陞企業開始由單一材料供應商，逐步拓展至設備應用與系統整合領域，並持續優化產品線，朝向提供更完整解決方案的方向發展。',
        '在這一發展過程中，公司不僅強化自身技術能力，也逐步建立起穩定的供應鏈與服務體系，為後續投入製冷設備與環保技術奠定了堅實基礎。',
      ],

      devhistory: '發展歷程',

      devhistoryContent: [
        '2006年 ► 鼎陞公司成立',
        '2008年 ► 與韓國LG化學正式合作',
        '2010年 ► 震鑫貿易成立・同年家電部門成立、代理聲寶家電',
        '2011年 ► ISO9001國際標準品質認證 / ISO14001環境管理系統認證',
        '2012年 ► 與中國萬華集團策略合作',
        '2015年 ► 與日本丸善石油化學株式會社合作',
        '2016年 ► 投資冷凍冷藏庫板相關事業體 / 台北分公司成立',
        '2017年 ► 與成功大學共同研發氮化硼產品',
        '2018年 ► 海外分公司上海奧鼎模貿易有限公司成立 / 鼎陞公司推出優鼎模品牌氮化硼產品',
        '2019年 ► 開始代理販售中國各項製冷設備至國內及海外菲律賓等地',
        '2020年 ► 鋁製成系列商品推出',
        '2022年 ► 籌組DSADM聯盟',
        '2023年 ► 創建DSADM品牌，增設OEM代工服務及架構確認',
        '2024年 ► 開始推廣DSADM品牌聯盟，東南亞商品上市',
        '2025年 ► 開發風幕櫃免排水系統',
        '2026年 ► 進入茶飲市場，推廣及開發專用設備',
        // '2027年 ► 建立新網站',
      ],

      philosophyTitle: '經營理念',
      philosophyContent: '奉行「以質量求生存，以先進求發展。」的經營理念，恪守「質量第一，用戶至上。」的服務準則。',
      servinglocations: '目前服務地區',
      hqTitle: '總公司',
      hqAddress: '台中市豐原區社皮路293巷33號',
      hqTel: `TEL: ${phonenumber1}(國內) / ${phonenumber2}(國外)`,
      hqFax: `FAX: ${faxnumber1}(國內) / ${faxnumber2}(國外)`,
      cnTitle: '中國辦公室',
      cnCompany: '奧鼎模（上海）貿易有限公司',
      cnAddress: '上海市嘉定區葉城路1500弄1號910室',
      cnTel: 'TEL: 021-59988306',
      map: {
        shanghai: '上海',
        guangzhou: '廣州',
        taiwan: '台灣',
        vietnam: '越南',
        philippines: '菲律賓',
        //奧地利？
      },
    },

    contact: {
      title: '聯絡我們',
      desc: '如有產品諮詢、合作需求或其他問題，歡迎留下訊息與我們聯繫。',
      formTitle: '產品諮詢',
      company: '公司名稱',
      name: '聯絡人 *',
      country: '國家',
      email: 'E-mail *',
      address: '聯絡地址',
      tel: '聯絡電話',
      fax: '傳真',
      category: '詢問類型 *',
      categoryPlaceholder: '請選擇詢問類型',
      categoryProduct: '產品諮詢',
      categoryCooperation: '合作洽談',
      categoryTechnical: '技術支援',
      categorySecurity: '資安 / 注入風險回報',
      categoryOther: '其他問題',
      subject: '標題 *',
      message: '訊息內容 *',
      securityNote: '表單會先進行基本字元清理與長度限制；正式送出後仍建議由後端再次驗證、防止注入並安全儲存。',
      submit: '送出',
      submitSuccess: '表單已送出，我們將盡快與您聯繫。',
      infoTitle: '聯絡資訊',
      infoEmail: '電子郵件',
      infoTel: '電話',
      infoFax: '傳真',
      infoAddress: '地址',
      defaultMailSubject: '網站聯絡表單',
      info: {
        tel: `${phonenumber1}`,
        fax: `${faxnumber1}`,
        address: '台中市豐原區社皮路293巷33號',
      },
    },

    products: {
      kicker: 'PRODUCTS',
      title: '產品資訊',
      heroDesc:
        '依照產品大類、應用分類與型號快速瀏覽，適合工業客戶查找規格、型錄與業務洽詢。',
      searchPlaceholder: '搜尋型號、產品名稱或用途...',
      contact: '聯絡業務',
      categoryTitle: '產品大分類',
      groupTitle: '應用分類',
      productList: '產品列表',
      searchResult: '搜尋結果',
      count: '{count} 項',
      pdf: 'PDF',
      empty: '找不到符合的產品。',
      selected: '已選擇產品',
      catalog: '型錄',
      available: '可下載',
      contactSales: '洽詢業務',
      download: '下載型錄',
      ask: '詢問此產品',
      from: "起",
    },

    item:{
      nofound: '找不到商品',
      back: '返回商品列表',
    },

    theme: {
      auto: '自動主題',
    },

    title: {
      home: '鼎陞企業有限公司',
      about: '關於我們｜鼎陞企業有限公司',
      products: '產品介紹｜鼎陞企業有限公司',
      goods: '商品列表｜鼎陞企業有限公司',
      item: '商品詳情｜鼎陞企業有限公司',
      contact: '聯絡我們｜鼎陞企業有限公司',
    },

    footer: {
      kicker: 'Industrial Solution',
      desc:
        '專注於工業設備、自動化系統與整合方案，提供穩定、高效率的技術服務。',
      navigation: '網站導覽',
      contact: '聯絡資訊',
      address: '420 臺中市豐原區社皮里社皮路293巷33號',
      rights: '版權所有',
      phone: `${phonenumber1}`,
      fax: `${faxnumber1}`,
    },
  },

  en: {
    nav: {
      home: 'Home',
      about: 'About',
      // products: 'Products',
      goods: 'Products',
      contact: 'Contact',
    },

    company: {
      name: 'Deing Sheng Enterprise',
    },

    home: {
      banner: 'Professional materials and industrial solutions.',
      contact: 'Contact Us',
      materials: 'Professional Materials',
      materialsDesc: 'Providing industrial materials and related solutions to support stable production.',
      support: 'Technical Support',
      supportDesc: 'Offering product recommendations, consulting, and after-sales support.',
      supply: 'Stable Supply',
      supplyDesc: 'Focusing on quality, delivery, and long-term reliability.',
      custom: 'Custom Services',
      customDesc: 'Providing tailored product solutions based on customer requirements.',
      aboutTitle: 'About Deing Sheng',
      aboutSub: 'Professional, Stable, and Reliable Business Partner',
      aboutDesc: 'Deing Sheng is committed to providing industrial materials and related services with a focus on quality management and long-term partnerships.',
      serviceTitle: 'Services',
      serviceSub: 'From Material Supply to Technical Consulting',
      service1: 'Industrial Material Supply',
      service2: 'Product Recommendations',
      service3: 'Technical Support',
      service4: 'Custom Requirement Discussion',
      service5: 'Long-term Cooperation',
      contactTitle: 'Contact Information',
      contactSub: 'Feel free to contact us',
      phone: 'Phone',
      phonenumber: `${phonenumber2}`,
      phoneDesc: 'Call us during business hours',
      fax: 'Fax',
      faxnumber: `${faxnumber2}`,
      faxDesc: 'Requirement documents can be faxed',
      emailDesc: 'We will reply as soon as possible',
    },

    about: {
      title: 'About Us',
      company: 'Deing Sheng Enterprise Co., Ltd.',
      founded: 'Founded in 2006',

      content: [
        'Deing Sheng Enterprise Co., Ltd. was founded in 2006. The company focuses on refrigeration equipment, refrigeration materials, and system integration services, providing efficient, stable, and environmentally conscious cooling solutions for commercial and industrial environments.',
        'In its early years, Deing Sheng Enterprise primarily focused on the distribution of thermal insulation and cold insulation materials, providing stable and high-quality foundational materials for the refrigeration industry. Through cooperation with multiple upstream suppliers, the company gradually developed a deeper understanding of refrigeration material properties and application technologies while building a strong market foundation and customer trust.',
        'As market demand continued to grow and the industry structure evolved, Deing Sheng Enterprise expanded from a materials supplier into equipment applications and system integration, continuously optimizing its product lines toward more complete solution offerings.',
        'Throughout this development process, the company strengthened its technical capabilities and gradually built a stable supply chain and service system, laying a solid foundation for future investment in refrigeration equipment and environmental technologies.',
      ],

      devhistory: 'Development History',

      devhistoryContent: [
        '2006 ► Deing Sheng Enterprise was established',
        '2008 ► Official cooperation with LG Chem Korea',
        '2010 ► Zhen Xin Trading was established; the home appliance department was also established in the same year, representing SAMPO appliances',
        '2011 ► ISO 9001 Quality Management System certification / ISO 14001 Environmental Management System certification',
        '2012 ► Strategic cooperation with Wanhua Chemical Group in China',
        '2015 ► Cooperation with Maruzen Petrochemical Co., Ltd. of Japan',
        '2016 ► Investment in refrigerated and frozen storage panel-related businesses / Taipei branch established',
        '2017 ► Joint development of boron nitride products with National Cheng Kung University',
        '2018 ► Overseas branch Aodingmo (Shanghai) Trading Co., Ltd. established / Deing Sheng launched the UDM boron nitride product brand',
        '2019 ► Began distributing various refrigeration equipment from China to Taiwan and overseas markets including the Philippines',
        '2020 ► Aluminum product series launched',
        '2022 ► DSADM alliance initiated',
        '2023 ► DSADM brand created; OEM manufacturing services added and structure confirmed',
        '2024 ► DSADM brand alliance promotion began; Southeast Asian products launched',
        '2025 ► Drain-free air curtain cabinet system developed',
        '2026 ► Entered the tea beverage market, promoting and developing dedicated equipment',
      ],

      philosophyTitle: 'Business Philosophy',
      philosophyContent: 'We uphold the philosophy of “Survival through quality, development through innovation,” and follow the service principle of “Quality First, Customer Foremost.”',

      servinglocations: 'Current Service Locations',

      hqTitle: 'Headquarters',
      hqAddress: 'No. 33, Ln. 293, Shepi Rd., Fengyuan Dist., Taichung City, Taiwan',
      hqTel: `TEL: ${phonenumber2}`,
      hqFax: `FAX: ${faxnumber2}`,

      cnTitle: 'China Office',
      cnCompany: 'Aodingmo (Shanghai) Trading Co., Ltd.',
      cnAddress: 'Room 910, No. 1, Lane 1500, Yecheng Rd., Jiading District, Shanghai, China',
      cnTel: 'TEL: 021-59988306',

      map: {
        shanghai: 'Shanghai',
        guangzhou: 'Guangzhou',
        taiwan: 'Taiwan',
        vietnam: 'Vietnam',
        philippines: 'Philippines',
      },
    },

    contact: {
      title: 'Contact Us',
      desc: 'If you have product inquiries, cooperation requests, or any questions, feel free to contact us.',
      formTitle: 'Product Inquiry',
      company: 'Company Name',
      name: 'Contact Person *',
      country: 'Country',
      email: 'E-mail *',
      address: 'Address',
      tel: 'Phone',
      fax: 'Fax',
      category: 'Inquiry Type *',
      categoryPlaceholder: 'Please select an inquiry type',
      categoryProduct: 'Product Inquiry',
      categoryCooperation: 'Business Cooperation',
      categoryTechnical: 'Technical Support',
      categorySecurity: 'Security / Injection Risk Report',
      categoryOther: 'Other',
      subject: 'Subject *',
      message: 'Message *',
      securityNote: 'This form performs basic character cleanup and length limits. Server-side validation, injection protection, and safe storage are still required after submission.',
      submit: 'Submit',
      submitSuccess: 'Your inquiry has been submitted. We will contact you as soon as possible.',
      infoTitle: 'Contact Information',
      infoEmail: 'Email',
      infoTel: 'TEL',
      infoFax: 'FAX',
      infoAddress: 'Address',
      defaultMailSubject: 'Website Contact Form',
      info: {
        tel: `${phonenumber2}`,
        fax: `${faxnumber2}`,
        address:
          'No. 33, Ln. 293, Shepi Rd., Fengyuan Dist., Taichung City, Taiwan',
      },
    },
    
    products: {
      kicker: 'PRODUCTS',
      title: 'Products',
      heroDesc:
        'Browse products by category, application, and model number for quick access to specifications, catalogs, and inquiries.',
      searchPlaceholder: 'Search models, products, or applications...',
      contact: 'Contact Us',
      categoryTitle: 'Categories',
      groupTitle: 'Applications',
      productList: 'Product List',
      searchResult: 'Search Results',
      count: '{count} items',
      pdf: 'PDF',
      empty: 'No matching products found.',
      selected: 'SELECTED',
      catalog: 'Catalog',
      available: 'Available',
      contactSales: 'Contact Sales',
      download: 'Download Catalog',
      ask: 'Product Inquiry',
      from: "",
    },

    item: {
      nofound: "Product doesn't exist !",
      back: 'Back to the Product List',
    },

    theme: {
      auto: 'Auto Theme',
    },

    title: {
      home: 'Deing Sheng Enterprise Co., Ltd.',
      about: 'About｜Deing Sheng Enterprise Co., Ltd.',
      products: 'Products｜Deing Sheng Enterprise Co., Ltd.',
      goods: 'Goods',
      item: 'Product Detail',
      contact: 'Contact｜Deing Sheng Enterprise Co., Ltd.',
    },

    footer: {
      kicker: 'Industrial Solution',
      desc:
        'Focused on industrial equipment, automation systems, and integrated solutions with reliable and efficient technical services.',
      navigation: 'Navigation',
      contact: 'Contact',
      address: 'No. 33, Ln. 293, Shepi Rd., Shepi Vil., Fengyuan Dist., Taichung City 420, Taiwan',
      rights: 'All Rights Reserved',
      phone: `${phonenumber2}`,
      fax: `${faxnumber2}`,
    },
  },
}

export default messages

export const i18n = createI18n({
  legacy: false,

  locale: detectLocale(),

  fallbackLocale: 'zh-TW',

  messages,
})

 // 'zh-CN'