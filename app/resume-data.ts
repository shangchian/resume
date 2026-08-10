export type Experience = {
  id: string;
  company: string;
  role: string;
  period: string;
  focus: string;
  stack: string[];
  highlights: string[];
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
};

export const initialResume: ResumeData = {
  name: "劉尚謙",
  title: "Flutter App / REST 後端 / 全端工程師",
  location: "台南市永康區",
  email: "shangchiann@gmail.com",
  phone: "0988 320804",
  summary:
    "專精 Flutter 跨平台 App 開發，能獨立完成 iOS / Android 產品從架構、UI、REST API 串接、登入驗證、支付、推播、上架到維運監控的完整流程；同時具備 REST 後端、Web 前端、Firebase、Go 微服務與 IoT 即時資料流整合經驗。",
  core: [
    "Flutter App 架構設計、Riverpod 狀態管理、Dio API 串接、Drift / SQLite 本地資料",
    "REST API 後端設計、資料庫建模、PostgreSQL / Redis、Go 微服務與 WebSocket 即時推播",
    "Firebase Auth / Firestore / Cloud Functions / FCM / Crashlytics 與多環境部署",
    "React + TypeScript 管理後台、API 型別自動生成、Docker 與 CI/CD 流程",
  ],
  skills: [
    {
      label: "App",
      items: [
        "Flutter",
        "Riverpod",
        "AutoRoute",
        "GoRouter",
        "Dio",
        "Drift",
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
        "Docker",
        "WebSocket",
      ],
    },
    {
      label: "Full-stack / Cloud",
      items: [
        "React",
        "TypeScript",
        "Vite",
        "Firebase",
        "AWS IoT Core",
        "MQTT/TLS",
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
        "負責 ECOCO App 架構與功能開發，涵蓋 Flutter、Riverpod、REST API 串接、Firebase、IAP、推播與本地資料快取。",
        "接手既有專案後梳理架構與阻塞點，於兩個月內穩定完成 App Store / Google Play 上架。",
        "完整實作與維護 ECO-Buddy 寵物養成系統，涵蓋任務、錢包、背包、圖鑑、道具、推播與 Firestore 多資料庫配置。",
        "導入 IAP 虛擬商品購買流程，完成沙盒與正式環境串接，並設計環境隔離的 FCM 推播架構。",
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
      focus: "行動 App、REST 後端、政府與企業專案、團隊管理",
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
        "主導 REST 後端開發，採用 ABP 6.0 / 7.0 與 MVC，負責資料庫設計、API 規格與專案架構。",
        "近 4 個月完成驗收台北漁產交易管理系統，專案金額約 980 萬。",
        "導入 Neo4j、CI/CD、MobSF，制定 Flutter 開發架構與行動資安檢查流程。",
      ],
    },
  ],
};
