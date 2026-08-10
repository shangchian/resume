export type Experience = {
  id: string;
  company: string;
  role: string;
  period: string;
  focus: string;
  stack: string[];
  highlights: string[];
};

export type PortfolioLink = {
  label: string;
  href: string;
};

export type PortfolioItem = {
  id: string;
  title: string;
  period: string;
  companyId: string;
  category: "App" | "Backend" | "Web" | "IoT" | "DevOps" | "Embedded";
  summary: string;
  role: string;
  stack: string[];
  links: PortfolioLink[];
};

export type Attachment = {
  title: string;
  description: string;
  href: string;
};

export type ResumeData = {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  summary: string;
  core: string[];
  skills: { label: string; items: string[] }[];
  experiences: Experience[];
  portfolio: PortfolioItem[];
  attachments: Attachment[];
  education: {
    school: string;
    degree: string;
    period: string;
    notes: string[];
  };
  training: {
    title: string;
    period: string;
    items: string[];
  };
};

export const initialResume: ResumeData = {
  name: "劉尚謙",
  title: "Flutter App / REST 後端 / 全端工程師",
  location: "台南市永康區",
  email: "shangchiann@gmail.com",
  phone: "0988 320804",
  summary:
    "專精跨平台 App 開發，能從 Flutter / Android 架構、UI/UX、REST API 串接、登入驗證、推播、支付、上架到維運監控完整交付產品；同時具備 REST 後端、Web 前端、IoT 即時資料流、Firebase 與 Go 微服務整合經驗。",
  core: [
    "Flutter / Android App 架構、狀態管理、API 串接、本地資料與上架維運",
    "REST API 後端、資料庫設計、WebSocket 即時資料、Go / C# ABP 微服務",
    "Firebase Auth / Firestore / Cloud Functions / FCM / Crashlytics 與多環境部署",
    "React + TypeScript 後台、IoT 裝置資料流、Docker、CI/CD 與行動資安檢查",
  ],
  skills: [
    {
      label: "App",
      items: [
        "Flutter",
        "Riverpod",
        "GetIt",
        "AutoRoute",
        "GoRouter",
        "Dio",
        "Drift",
        "SQLite",
        "IAP",
        "FCM",
        "Crashlytics",
        "MethodChannel",
      ],
    },
    {
      label: "Backend",
      items: [
        "RESTful API",
        "Go",
        "C# ABP",
        "MVC",
        "PostgreSQL",
        "MS-SQL",
        "Redis",
        "WebSocket",
        "Docker",
      ],
    },
    {
      label: "Full-stack / IoT",
      items: [
        "React",
        "TypeScript",
        "Vite",
        "Firebase",
        "AWS IoT Core",
        "MQTT/TLS",
        "RS-485",
        "Modbus",
        "CI/CD",
        "MobSF",
      ],
    },
  ],
  experiences: [
    {
      id: "flc-2026",
      company: "凡立橙股份有限公司",
      role: "Flutter 軟體工程師，App/Web 跨平台開發負責人",
      period: "2026.01 - 仍在職",
      focus: "循環經濟 App、Flutter 架構、Firebase 後端、遊戲化功能與營運管理後台",
      stack: [
        "Flutter",
        "Riverpod",
        "AutoRoute",
        "Dio",
        "Drift",
        "Firebase",
        "Cloud Functions",
        "IAP",
        "FCM",
        "Vanilla JS",
      ],
      highlights: [
        "接手既有 ECOCO App 後梳理架構與阻塞點，於兩個月內穩定完成 App Store / Google Play 上架。",
        "負責 Flutter、Riverpod、REST API 串接、Firebase、IAP、推播與本地資料快取等 App 核心開發。",
        "完整實作與維護 ECO-Buddy 寵物養成系統，涵蓋任務、錢包、背包、圖鑑、道具、推播與 Firestore 多資料庫配置。",
        "導入 IAP 虛擬商品購買流程與環境隔離的 FCM 推播架構，支援營運活動與商品設定。",
        "現代化 Vanilla JS 營運後台，加入 Firebase Custom Claims RBAC、設定驗證與遊戲數值管理流程。",
      ],
    },
    {
      id: "ruiyu-2024",
      company: "銳宇能源股份有限公司",
      role: "Flutter 軟體工程師，App/Web 跨平台開發負責人",
      period: "2024.08 - 2025.12",
      focus: "充電服務 App、POS 裝置、能源監控 Dashboard、IoT 資料流與 Go 微服務",
      stack: [
        "Flutter",
        "React",
        "TypeScript",
        "Go",
        "PostgreSQL",
        "Redis",
        "WebSocket",
        "AWS IoT Core",
        "Docker",
        "Raspberry Pi",
      ],
      highlights: [
        "獨立主導 POS 充電繳費 App 與 iOS / Android 會員 App，涵蓋即時通訊、支付整合、身份驗證、發票、背景任務與維運監控。",
        "以 React + TypeScript + Vite 建置能源監控 Dashboard 與 CMS，導入 orval 自動生成 API 型別與 hooks。",
        "以 Raspberry Pi + Python + RS-485 / Modbus 建置能源採集模組，透過 WebSocket 上傳即時感測資料。",
        "使用 Go 開發資料清洗 Worker、API Server、Webhook Service 與 MQTT Client，串接 PostgreSQL、Redis、AWS IoT Core 與 Docker。",
        "建立 App 與後端重連、超時、背景同步與一致性策略，提升裝置到雲端再到 App 的 E2E 可靠性。",
      ],
    },
    {
      id: "hamastar-2022",
      company: "哈瑪星科技股份有限公司",
      role: "專案副理，Android / iOS 開發平台負責人",
      period: "2022.07 - 2024.06",
      focus: "政府與企業行動 App、REST 後端、團隊管理、CI/CD 與行動資安流程",
      stack: [
        "Flutter",
        "Android",
        "iOS",
        "Dart",
        "Java",
        "C#",
        "ABP",
        "RESTful API",
        "MS-SQL",
        "Neo4j",
        "CI/CD",
        "MobSF",
      ],
      highlights: [
        "管理 6 人小組，負責 App 與網頁後端開發，協助台新人壽要保書 iPadOS App 與多個政府/企業 App 專案。",
        "主導 Android / iOS 專案，包含台北漁產交易管理、2025 雙北世壯運、智慧巡檢與多個無紙化會議系統。",
        "採用 ABP 6.0 / 7.0、MVC 與 RESTful API 建置後端，負責資料庫設計、API 規格與系統架構。",
        "近 4 個月完成驗收台北漁產交易管理系統，專案金額約 980 萬。",
        "導入 Neo4j、Bitbucket CI/CD、MobSF 與 Flutter 開發準則，提升知識查詢、發布流程與資安檢查品質。",
      ],
    },
    {
      id: "aver-2022",
      company: "圓展科技股份有限公司",
      role: "技術課長",
      period: "2022.02 - 2022.05",
      focus: "新晶片 RK3588、Linux Buildroot、多媒體編解碼與產品可行性評估",
      stack: ["C", "C++", "Linux", "Buildroot", "RK3588", "RTSP", "UVC", "HDMI", "Redmine"],
      highlights: [
        "搭建 RK3588 新晶片環境與 Buildroot on Linux 系統，建立產品驗證所需基礎環境。",
        "負責晶片多媒體規格測試，評估新平台導入產品的可行性。",
        "驗證多輸入與多輸出情境，涵蓋雙感應器、HDMI-out、UVC、Web 與 RTSP 流程效能。",
      ],
    },
    {
      id: "kao-chi-2020",
      company: "高琪系統整合有限公司",
      role: "資深工程師，Android 開發平台負責人",
      period: "2020.09 - 2022.02",
      focus: "WMS 手持設備、Android 架構、REST API 後端串接、CI/CD 與遠端除錯",
      stack: [
        "Java",
        "Android",
        "MVVM",
        "DI",
        "Retrofit2",
        "Firebase Crashlytics",
        "Room",
        "SQLite",
        "MS-SQL",
        "WebAPI",
        "Jenkins CI/CD",
        "Jira",
      ],
      highlights: [
        "負責倉儲管理系統 WMS 手持設備 UI/UX 開發與流程規劃，支援入庫、揀貨、出貨、盤點等現場作業。",
        "制定 Android 專案架構與準則，導入 MVVM、DI、Retrofit2、Room / SQLite 與 Crashlytics。",
        "依 RESTful API / WebAPI 風格串接後端，使用 T-SQL 支援 App 與 MS-SQL 資料庫整合。",
        "優化作業流程並建立 LogService 遠端除錯輔助能力，提升產品維護效率。",
        "導入 Jenkins CI/CD，標準化產品發布流程。",
      ],
    },
    {
      id: "ncku-2020",
      company: "成功大學資訊工程系",
      role: "專案人員",
      period: "2020.03 - 2020.08",
      focus: "Android 熱像儀、Firebase、影像辨識、開源硬體與智慧養殖研發",
      stack: [
        "Java",
        "Flutter",
        "Dart",
        "Android Studio",
        "Firebase",
        "Google Storage",
        "Arduino",
        "Banana-Pi",
        "Socket",
        "Bluetooth",
        "TensorFlow Lite",
        "MTCNN",
        "FaceNet",
        "Modbus",
      ],
      highlights: [
        "開發 Android App 於熱像儀裝置，用於遠端牲畜體溫監控。",
        "以 Google Storage 與 Firebase 實作照片上傳與 App 廣播能力。",
        "導入 TensorFlow Lite、MTCNN、FaceNet 進行熱像儀裝置人臉辨識驗證。",
        "以 Arduino / Banana-Pi 透過 WiFi、Socket、Bluetooth 與熱像儀通訊並校準溫度基準。",
        "參與 Flutter App 與 Modbus 智慧石斑魚監測系統研發。",
      ],
    },
    {
      id: "asus-2015",
      company: "華碩電腦股份有限公司",
      role: "高級工程師",
      period: "2015.03 - 2019.02",
      focus: "Android / BSP、智慧家居、智慧點餐、BLE 定位與相機 AI 功能",
      stack: [
        "C",
        "Java",
        "Python",
        "Fastboot",
        "Android Studio",
        "SQLite",
        "RESTful API",
        "WebSocket",
        "Firebase",
        "TensorFlow Lite",
        "RNN-LSTM",
        "OpenCV",
        "BLE",
        "Jira",
      ],
      highlights: [
        "負責 CVR 項目 BSP 開發，包含 Bootloader、硬體驅動與 Flash 工具，簡化軟體更新與維護流程。",
        "研究 BLE / beacon 室內定位，計算 Tinker 裝置與 beacon 距離並進行定位驗證。",
        "參與 Android 智慧家居控制系統、智慧點餐系統與 Zenfone6 相機智能輔助構圖功能。",
        "擔任智慧點餐系統專案開發負責人，負責系統整合、技術評估、任務指派與進度管理。",
        "負責 Android UI/UX、SQLite、RESTful API、WebSocket、RNN-LSTM 與 OpenCV 臉部檢測整合。",
      ],
    },
    {
      id: "i-catch-2011",
      company: "芯鼎科技股份有限公司",
      role: "高級工程師",
      period: "2011.08 - 2015.02",
      focus: "數位影像視訊平台、嵌入式系統、客戶技術支援與效能分析",
      stack: ["C", "CMake", "GDB", "TortoiseGit", "SVN", "SourceInsight", "Mantis"],
      highlights: [
        "負責 CVR、DSC、HuntingCam、SportCam、Document Scanner 與醫療級攝影機平台開發整合。",
        "熟悉嵌入式系統開發流程，負責系統功能串接並與 firmware 團隊協作。",
        "擔任技術窗口，提供客戶技術支援與產品功能維護。",
        "整合 Capture、Preview、Playback、Face/Object Tracking、RSC、DIST、panorama、time lapse、Dual-sensor、UVC、FCWS / LDWS 等功能。",
        "負責 SPI、I2C、UART、LMI、HDMI/CEC 控制與開機、拍照、CPU、DRAM、延遲、記憶體、功耗等效能分析。",
      ],
    },
  ],
  portfolio: [
    {
      id: "ecoco-app",
      title: "ECOCO App 與 ECO-Buddy 遊戲化系統",
      period: "2026",
      companyId: "flc-2026",
      category: "App",
      summary:
        "接手循環經濟 App 後整理架構與上架阻塞，並完成寵物養成、任務、錢包、道具、推播、IAP 與營運後台。",
      role: "Flutter App / Firebase / 後台開發負責",
      stack: ["Flutter", "Riverpod", "Firebase", "IAP", "FCM", "Cloud Functions"],
      links: [],
    },
    {
      id: "energy-platform",
      title: "充電服務 App、POS 與能源監控平台",
      period: "2024 - 2025",
      companyId: "ruiyu-2024",
      category: "IoT",
      summary:
        "整合 POS、會員 App、React Dashboard、Go 微服務與 IoT 能源採集，串起裝置到雲端再到 App 的即時資料流。",
      role: "Flutter App / Web / Go / IoT 整合開發",
      stack: ["Flutter", "React", "TypeScript", "Go", "AWS IoT Core", "WebSocket", "PostgreSQL"],
      links: [
        {
          label: "台科大能源監控儀表板操作影片",
          href: "https://1drv.ms/v/c/544d54c6554d3c08/EYMEwcsH8aJNkfj5R-V4fVYB63nvIKVZQVowNO0jT5UcjQ?e=h1NuzF",
        },
      ],
    },
    {
      id: "taipei-fish-app",
      title: "台北魚類批發市場交易管理系統 App / Web",
      period: "2023",
      companyId: "hamastar-2022",
      category: "App",
      summary:
        "Android App 支援魚筐租借歸還、交易、RFID/NFC/紅外線輸入與藍牙列印；Web 後台支援交易資料、權限與系統管理。",
      role: "Android 主程式、前後端串接、後端流程整合",
      stack: ["Android", "Java", "RESTful API", "Retrofit2", "Room", "SQLite", "RFID", "NFC", "Bluetooth"],
      links: [
        {
          label: "App 操作影片",
          href: "https://1drv.ms/v/s!Agg8TVXGVE1Uibt9Y1Vq1T-6TDC6vA?e=lKcsox",
        },
        {
          label: "Web 後台操作影片",
          href: "https://1drv.ms/v/s!Agg8TVXGVE1Uibt7qLuf8cDNpHtnrg?e=Z6vfWs",
        },
      ],
    },
    {
      id: "world-masters-games",
      title: "2025 雙北世界壯年運動會行動化服務系統",
      period: "2024",
      companyId: "hamastar-2022",
      category: "App",
      summary:
        "Android / Flutter App 支援多語系、註冊登入、第三方登入、臉部/圖形辨識快速登入、賽事資訊、場館資訊與推播。",
      role: "Android 與 Flutter 系統開發負責",
      stack: ["Flutter", "Android", "Firebase Auth", "Crashlytics", "OneSignal", "SQLite", "auto_route", "provider"],
      links: [
        {
          label: "操作影片",
          href: "https://1drv.ms/v/s!Agg8TVXGVE1UibsSqPbzbzXwYz32FQ?e=Yt0Xn7",
        },
      ],
    },
    {
      id: "indigenous-knowledge",
      title: "原住民知識體系後端管理系統",
      period: "2023 - 2024",
      companyId: "hamastar-2022",
      category: "Backend",
      summary:
        "建置知識資料查詢、匯入、審核、維護與系統管理後台，並導入 Neo4j 提升知識關聯查詢能力。",
      role: "後端與管理後台開發",
      stack: ["C#", "ABP", "MVC", "RESTful API", "MS-SQL", "Neo4j", "Fortify"],
      links: [
        {
          label: "作品資料夾",
          href: "https://1drv.ms/f/s!Agg8TVXGVE1UibsmlGLbgN0UsDM-Eg?e=YjwfLH",
        },
      ],
    },
    {
      id: "hamastar-cicd",
      title: "Bitbucket Pipeline CI/CD 發布流程",
      period: "2024",
      companyId: "hamastar-2022",
      category: "DevOps",
      summary:
        "建立從 Commit、Webhook、Flutter build、Fastlane 上傳、掃描報告到 release archive 的行動產品發布流程。",
      role: "CI/CD 流程導入與發布標準化",
      stack: ["Bitbucket Pipeline", "Flutter build", "Fastlane", "MobSF", "Android", "iOS"],
      links: [
        {
          label: "CI/CD 流程圖 PDF",
          href: "/portfolio/hamastar-bitbucket-cicd-flow.pdf",
        },
      ],
    },
    {
      id: "giant-wms",
      title: "巨大幼獅倉儲中心 WMS 手持設備",
      period: "2021",
      companyId: "kao-chi-2020",
      category: "App",
      summary:
        "Android 手持設備支援入庫、查詢、揀貨、出貨、裝車、盤點等約 30 個倉儲流程，並串接 REST API 與本地資料。",
      role: "Android 主程式與架構制定",
      stack: ["Android", "Java", "MVVM", "Retrofit2", "SQLite", "Room", "RESTful API", "Jenkins CI/CD"],
      links: [],
    },
  ],
  attachments: [
    {
      title: "2021-2024 APP 開發經歷表",
      description: "補充 App 專案細節，包含台北魚類、世壯運、待辦事項、影片播放器與 WMS。",
      href: "/portfolio/app-experience-2021-2024.pdf",
    },
    {
      title: "作品集 - 尚謙 to 2025",
      description: "補充 App、Web 後台、能源監控、原住民知識體系等作品與操作影片連結。",
      href: "/portfolio/portfolio-shang-to-2025.pdf",
    },
    {
      title: "Bitbucket Pipeline CI/CD 流程圖",
      description: "哈瑪星科技期間導入行動 App 發布與掃描流程的 CI/CD 架構圖。",
      href: "/portfolio/hamastar-bitbucket-cicd-flow.pdf",
    },
  ],
  education: {
    school: "臺北科技大學",
    degree: "電腦與通訊所",
    period: "2007.09 - 2009.06",
    notes: [
      "主修行動隨意式無線網路、資料庫系統、電腦通訊網路、演算法分析與設計。",
      "發表 WSN 行動節點與能量洞改善相關論文，參與國科會計畫與網頁資料庫系統設計專案。",
    ],
  },
  training: {
    title: "ASP.NET Core Blazor 元件導向網站開發設計",
    period: "2023.05 - 2023.06",
    items: [
      "Blazor Server / WebAssembly、Razor Component、SPA、表單驗證、RESTful API、EF Core、LINQ、驗證授權與部署。",
    ],
  },
};
