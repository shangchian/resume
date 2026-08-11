# GitHub Pages 發佈說明

目標公開網址：

```text
https://shangchian.github.io/resume/
```

## GitHub 建議設定

1. 在 GitHub 建立 public repo：`resume`
2. 將本專案推到 `shangchian/resume` 的 `main` branch
3. 到 repo 的 `Settings -> Pages`
4. `Build and deployment` 選擇 `GitHub Actions`
5. GitHub Actions 會執行 `.github/workflows/pages.yml`

## 本機驗證

```bash
npm run build:github-pages
```

輸出目錄是 `github-pages-dist/`，不需要提交。

## 網址形式

目前 `github-pages/vite.config.ts` 的 `base` 設為 `/resume/`，適合 repo 名稱為 `resume`。

若未來改用 GitHub user site repo `shangchian.github.io`，網址會變成：

```text
https://shangchian.github.io/
```

那時請將 `github-pages/vite.config.ts` 的 `base` 改成 `/`。
