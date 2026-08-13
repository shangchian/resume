/* eslint-disable @next/next/no-img-element */
"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import {
  Experience,
  initialResume,
  PortfolioItem,
  ResumeData,
} from "./resume-data";

type ExperienceDraft = Omit<Experience, "id" | "stack" | "highlights"> & {
  stack: string;
  highlights: string;
};

type ResumeMode = "compact" | "detail";
type ScreenMode = "edit" | "public";

type HomeProps = {
  initialResumeMode?: ResumeMode;
  publicOnly?: boolean;
};

const storageKey = "shang-resume-builder-v3";
const legacyStorageKey = "shang-resume-builder-v2";
const hashPrefix = "#resume=";

const emptyDraft: ExperienceDraft = {
  company: "",
  role: "",
  period: "",
  focus: "",
  stack: "",
  highlights: "",
};

function splitList(value: string) {
  return value
    .split(/\n|、|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function createId(company: string) {
  const safeCompany = company
    .trim()
    .replace(/[^\w\u4e00-\u9fff]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
  return `${safeCompany || "company"}-${Date.now()}`;
}

function getStartScore(period: string) {
  const match = period.match(/(19|20)\d{2}(?:[./-](0?[1-9]|1[0-2]))?/);
  if (!match) return 0;
  const year = Number(match[0].slice(0, 4));
  const month = Number(match[2] ?? "1");
  return year * 100 + month;
}

function sortExperiences(experiences: Experience[]) {
  return [...experiences].sort(
    (a, b) => getStartScore(b.period) - getStartScore(a.period),
  );
}

function mergeById<T extends { id: string }>(saved: T[] | undefined, defaults: T[]) {
  const savedItems = saved ?? [];
  const savedIds = new Set(savedItems.map((item) => item.id));
  const missingDefaults = defaults.filter((item) => !savedIds.has(item.id));
  return [...savedItems, ...missingDefaults];
}

function mergePortfolio(
  saved: PortfolioItem[] | undefined,
  defaults: PortfolioItem[],
) {
  const savedById = new Map((saved ?? []).map((item) => [item.id, item]));
  const mergedDefaults = defaults.map((defaultItem) => {
    const savedItem = savedById.get(defaultItem.id);
    if (!savedItem) return defaultItem;

    const defaultLinkHrefs = new Set(defaultItem.links.map((link) => link.href));
    const savedOnlyLinks = savedItem.links.filter(
      (link) => !defaultLinkHrefs.has(link.href),
    );

    return {
      ...defaultItem,
      ...savedItem,
      links: [...defaultItem.links, ...savedOnlyLinks],
    };
  });

  const defaultIds = new Set(defaults.map((item) => item.id));
  const savedOnlyItems = (saved ?? []).filter((item) => !defaultIds.has(item.id));
  return [...mergedDefaults, ...savedOnlyItems];
}

function normalizeResume(data: Partial<ResumeData>): ResumeData {
  return {
    ...initialResume,
    ...data,
    core: data.core?.length ? data.core : initialResume.core,
    skills: data.skills?.length ? data.skills : initialResume.skills,
    portfolio: mergePortfolio(data.portfolio, initialResume.portfolio),
    attachments: data.attachments?.length
      ? data.attachments
      : initialResume.attachments,
    education: data.education ?? initialResume.education,
    training: data.training ?? initialResume.training,
    experiences: sortExperiences(
      mergeById(data.experiences, initialResume.experiences),
    ),
  };
}

function decodeResume(value: string) {
  return JSON.parse(decodeURIComponent(escape(atob(value)))) as ResumeData;
}

function imageFileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("read failed"));
    reader.onload = () => {
      const image = new window.Image();
      image.onerror = () => reject(new Error("image failed"));
      image.onload = () => {
        const targetSize = 520;
        const padding = 16;
        const canvas = document.createElement("canvas");
        canvas.width = targetSize;
        canvas.height = targetSize;
        const context = canvas.getContext("2d");
        if (!context) {
          reject(new Error("canvas failed"));
          return;
        }

        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, targetSize, targetSize);

        const scale = Math.min(
          (targetSize - padding * 2) / image.width,
          (targetSize - padding * 2) / image.height,
        );
        const drawWidth = image.width * scale;
        const drawHeight = image.height * scale;
        const drawX = (targetSize - drawWidth) / 2;
        const drawY = (targetSize - drawHeight) / 2;

        context.drawImage(
          image,
          drawX,
          drawY,
          drawWidth,
          drawHeight,
        );
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      image.src = String(reader.result ?? "");
    };
    reader.readAsDataURL(file);
  });
}

function portfolioForExperience(
  portfolio: PortfolioItem[],
  experienceId: string,
) {
  return portfolio.filter((item) => item.companyId === experienceId);
}

export default function Home({
  initialResumeMode = "compact",
  publicOnly = false,
}: HomeProps = {}) {
  const [resume, setResume] = useState<ResumeData>(initialResume);
  const [draft, setDraft] = useState<ExperienceDraft>(emptyDraft);
  const [status, setStatus] = useState("已載入完整履歷資料");
  const [resumeMode, setResumeMode] = useState<ResumeMode>(initialResumeMode);
  const [screenMode, setScreenMode] = useState<ScreenMode>(
    publicOnly ? "public" : "edit",
  );
  const [importText, setImportText] = useState("");
  const [photoDraft, setPhotoDraft] = useState<string>();
  const [readyToPersist, setReadyToPersist] = useState(publicOnly);

  useEffect(() => {
    if (publicOnly) return;

    const timer = window.setTimeout(() => {
      const encoded = window.location.hash.startsWith(hashPrefix)
        ? window.location.hash.slice(hashPrefix.length)
        : "";

      if (encoded) {
        try {
          const sharedResume = normalizeResume(decodeResume(encoded));
          setResume(sharedResume);
          setScreenMode("public");
          setStatus("已載入公開分享版本");
          setReadyToPersist(true);
          return;
        } catch {
          setStatus("公開分享資料無法解析，已改用預設完整版本");
        }
      }

      const saved =
        window.localStorage.getItem(storageKey) ??
        window.localStorage.getItem(legacyStorageKey);
      if (saved) {
        try {
          setResume(normalizeResume(JSON.parse(saved) as ResumeData));
          setStatus("已載入本機保存版本");
        } catch {
          setStatus("本機資料格式異常，已使用預設完整版本");
        }
      }

      setReadyToPersist(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [publicOnly]);

  useEffect(() => {
    if (!readyToPersist || publicOnly) return;
    window.localStorage.setItem(storageKey, JSON.stringify(resume));
  }, [publicOnly, readyToPersist, resume]);

  const yearsLabel = useMemo(() => {
    const first = resume.experiences.at(-1)?.period.match(/(19|20)\d{2}/)?.[0];
    if (!first) return `${resume.experiences.length} 段產品實戰`;
    const years = Math.max(1, new Date().getFullYear() - Number(first) + 1);
    return `${years}+ 年產品開發與系統整合`;
  }, [resume.experiences]);

  const compactRelevantExperiences = useMemo(() => {
    const preferredIds = new Set([
      "flc-2026",
      "ruiyu-2024",
      "personal-projects",
      "hamastar-2022",
      "kao-chi-2020",
    ]);
    return resume.experiences.filter((item) => preferredIds.has(item.id));
  }, [resume.experiences]);

  const visibleExperiences = useMemo(
    () =>
      (resumeMode === "compact"
        ? compactRelevantExperiences
        : resume.experiences
      ).map((item) => ({
        ...item,
        highlights:
          resumeMode === "compact"
            ? item.highlights.slice(0, item.id === "flc-2026" ? 3 : 2)
            : item.highlights,
        stack: resumeMode === "compact" ? item.stack.slice(0, 6) : item.stack,
      })),
    [compactRelevantExperiences, resume.experiences, resumeMode],
  );

  const archivedExperiences = useMemo(() => {
    const visibleIds = new Set(visibleExperiences.map((item) => item.id));
    return resume.experiences.filter((item) => !visibleIds.has(item.id));
  }, [resume.experiences, visibleExperiences]);

  const visiblePortfolio = useMemo(
    () => {
      if (resumeMode === "detail") return resume.portfolio;

      const featuredIds = new Set([
        "ecoco-core-app",
        "ecoco-app",
        "energy-platform",
        "geo-iot-monitoring",
        "taipei-fish-app",
        "world-masters-games",
        "hamastar-cicd",
      ]);
      return resume.portfolio.filter((item) => featuredIds.has(item.id));
    },
    [resume.portfolio, resumeMode],
  );

  const photoPreview = photoDraft ?? resume.photo;

  function updateDraft(
    key: keyof ExperienceDraft,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setDraft((current) => ({ ...current, [key]: event.target.value }));
  }

  function addExperience(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.company.trim() || !draft.role.trim()) {
      setStatus("請至少填公司與職稱");
      return;
    }

    const next: Experience = {
      id: createId(draft.company),
      company: draft.company.trim(),
      role: draft.role.trim(),
      period: draft.period.trim() || "請補上期間",
      focus: draft.focus.trim() || "請補上職務主軸",
      stack: splitList(draft.stack),
      highlights: splitList(draft.highlights),
    };

    setResume((current) =>
      normalizeResume({
        ...current,
        experiences: [next, ...current.experiences],
      }),
    );
    setDraft(emptyDraft);
    setStatus(`已新增 ${next.company}，並依起始日期自動排序`);
  }

  function removeExperience(id: string) {
    setResume((current) => ({
      ...current,
      experiences: current.experiences.filter((item) => item.id !== id),
    }));
    setStatus("已移除該筆經歷");
  }

  async function copyPublicLink() {
    const url = `${window.location.origin}${window.location.pathname}`;
    await navigator.clipboard.writeText(url);
    setStatus("已複製正式公開網址；若履歷內容有異動，請重新發布後再分享");
  }

  async function copyEditorLink() {
    const url = new URL(window.location.href);
    url.searchParams.set("mode", "edit");
    url.hash = "";
    await navigator.clipboard.writeText(url.toString());
    setStatus("已複製編輯工具網址，這個網址請自己使用，不建議公開分享");
  }

  async function copyJson() {
    await navigator.clipboard.writeText(JSON.stringify(resume, null, 2));
    setStatus("已複製履歷 JSON");
  }

  function downloadJson() {
    const blob = new Blob([JSON.stringify(resume, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "shang-resume.json";
    anchor.click();
    URL.revokeObjectURL(url);
    setStatus("已下載履歷 JSON 備份");
  }

  function importJson(value = importText) {
    if (!value.trim()) {
      setStatus("請貼上 JSON 或上傳 JSON 檔");
      return;
    }

    try {
      const next = normalizeResume(JSON.parse(value) as ResumeData);
      if (!next.name || !next.title || !Array.isArray(next.experiences)) {
        throw new Error("invalid resume");
      }
      setResume(next);
      setImportText("");
      setStatus("已匯入履歷資料並重新排序");
    } catch {
      setStatus("JSON 格式無法解析");
    }
  }

  function uploadJson(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => importJson(String(reader.result ?? ""));
    reader.readAsText(file);
  }

  async function uploadPhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const photo = await imageFileToDataUrl(file);
      setPhotoDraft(photo);
      setStatus("已載入照片預覽，請按「套用到履歷」");
    } catch {
      setStatus("照片讀取失敗，請改用 JPG 或 PNG");
    } finally {
      event.target.value = "";
    }
  }

  function applyPhoto() {
    if (!photoDraft) {
      setStatus("請先上傳照片");
      return;
    }

    setResume((current) => ({ ...current, photo: photoDraft }));
    setPhotoDraft(undefined);
    setStatus("已將照片套用到履歷");
  }

  function removePhoto() {
    setResume((current) => ({ ...current, photo: undefined }));
    setPhotoDraft(undefined);
    setStatus("已移除履歷照片");
  }

  return (
    <main
      className={`site ${screenMode === "public" ? "public-mode" : ""} ${
        publicOnly ? "published-site" : ""
      }`}
      data-resume-mode={resumeMode}
    >
      {!publicOnly && (
        <section className="toolbar no-print" aria-label="履歷工具列">
        <div>
          <p className="eyebrow">Resume OS</p>
          <h1>資料驅動履歷工具</h1>
          <p className="toolbar-note">
            目前資料含 {resume.experiences.length} 段經歷、{resume.portfolio.length} 件作品佐證。
          </p>
        </div>
        <div className="toolbar-actions" role="group" aria-label="履歷操作">
          <button
            type="button"
            className={screenMode === "public" ? "active" : ""}
            onClick={() =>
              setScreenMode((value) => (value === "edit" ? "public" : "edit"))
            }
          >
            {screenMode === "public" ? "回到編輯" : "公開預覽"}
          </button>
          <button
            type="button"
            className={resumeMode === "compact" ? "active" : ""}
            onClick={() =>
              setResumeMode((value) =>
                value === "compact" ? "detail" : "compact",
              )
            }
          >
            {resumeMode === "compact" ? "一頁版：精簡投遞" : "詳細版：完整履歷"}
          </button>
          <button type="button" onClick={() => window.print()}>
            下載 PDF
          </button>
          <button type="button" onClick={copyPublicLink}>
            複製公開連結
          </button>
          <button type="button" onClick={copyEditorLink}>
            複製編輯連結
          </button>
        </div>
        </section>
      )}

      <div className="workspace">
        {!publicOnly && (
          <aside className="editor no-print" aria-label="履歷編輯器">
          <section className="panel status-panel">
            <div>
              <strong>{status}</strong>
              <span>
                新增公司後會依起始日期自動排序；公開連結、JSON 與 PDF 都使用同一份資料。
              </span>
            </div>
          </section>

          <section className="panel mode-panel">
            <div className="panel-heading">
              <span>版本切換</span>
              <small>只供編輯判斷</small>
            </div>
            <p>
              {resumeMode === "compact"
                ? "一頁版會收斂早期經歷與部分作品，適合投遞履歷。"
                : "詳細版會展開完整職涯、作品集佐證、附件與學歷課程。"}
            </p>
          </section>

          <section className="panel">
            <div className="panel-heading">
              <span>履歷照片</span>
              <small>JPG / PNG</small>
            </div>
            <div className="photo-editor">
              {photoPreview ? (
                <img src={photoPreview} alt="目前履歷照片預覽" />
              ) : (
                <div aria-hidden="true">{resume.name.slice(0, 1)}</div>
              )}
              <div>
                <label className="file-field">
                  上傳照片
                  <input type="file" accept="image/*" onChange={uploadPhoto} />
                </label>
                <button
                  className="primary"
                  type="button"
                  onClick={applyPhoto}
                  disabled={!photoDraft}
                >
                  套用到履歷
                </button>
                {photoPreview && (
                  <button type="button" onClick={removePhoto}>
                    移除照片
                  </button>
                )}
              </div>
            </div>
          </section>

          <section className="panel">
            <div className="panel-heading">
              <span>新增公司</span>
              <small>公司 / 職稱必填</small>
            </div>
            <form onSubmit={addExperience} className="form-grid">
              <label>
                公司
                <input
                  value={draft.company}
                  onChange={(event) => updateDraft("company", event)}
                  placeholder="新公司名稱"
                />
              </label>
              <label>
                職稱
                <input
                  value={draft.role}
                  onChange={(event) => updateDraft("role", event)}
                  placeholder="Flutter / Backend / Full-stack..."
                />
              </label>
              <label>
                期間
                <input
                  value={draft.period}
                  onChange={(event) => updateDraft("period", event)}
                  placeholder="2026.08 - 仍在職"
                />
              </label>
              <label>
                職務主軸
                <input
                  value={draft.focus}
                  onChange={(event) => updateDraft("focus", event)}
                  placeholder="產品、技術範圍、主要責任"
                />
              </label>
              <label>
                技術棧
                <textarea
                  value={draft.stack}
                  onChange={(event) => updateDraft("stack", event)}
                  placeholder="Flutter、REST API、PostgreSQL"
                  rows={3}
                />
              </label>
              <label>
                重點成果
                <textarea
                  value={draft.highlights}
                  onChange={(event) => updateDraft("highlights", event)}
                  placeholder={
                    "每行一點，例如：\n主導 App 上架與支付串接\n設計 REST API 與資料庫模型"
                  }
                  rows={6}
                />
              </label>
              <button className="primary" type="submit">
                新增到履歷
              </button>
            </form>
          </section>

          <section className="panel">
            <div className="panel-heading">
              <span>資料維護</span>
              <small>本機自動保存</small>
            </div>
            <div className="button-grid">
              <button type="button" onClick={copyJson}>
                複製 JSON
              </button>
              <button type="button" onClick={downloadJson}>
                下載 JSON
              </button>
            </div>
            <label className="file-field">
              上傳 JSON
              <input type="file" accept="application/json" onChange={uploadJson} />
            </label>
            <label>
              匯入 JSON
              <textarea
                value={importText}
                onChange={(event) => setImportText(event.target.value)}
                placeholder="貼上先前匯出的 JSON"
                rows={5}
              />
            </label>
            <button className="wide" type="button" onClick={() => importJson()}>
              套用匯入資料
            </button>
          </section>

          <section className="panel">
            <div className="panel-heading">
              <span>經歷清單</span>
              <small>依起始日期排序</small>
            </div>
            <div className="experience-list">
              {resume.experiences.map((item) => (
                <div className="mini-row" key={item.id}>
                  <div>
                    <strong>{item.company}</strong>
                    <span>{item.period}</span>
                  </div>
                  <button type="button" onClick={() => removeExperience(item.id)}>
                    移除
                  </button>
                </div>
              ))}
            </div>
          </section>
          </aside>
        )}

        <article className="resume-sheet" aria-label="公開履歷預覽">
          <header className="resume-hero">
            <div>
              <p className="resume-kicker">
                {yearsLabel} / App first, backend capable
              </p>
              <h2>{resume.name}</h2>
              <p className="title">{resume.title}</p>
            </div>
            <div className="identity-aside">
              {resume.photo && (
                <img
                  className="profile-photo"
                  src={resume.photo}
                  alt={`${resume.name} 履歷照片`}
                />
              )}
              <address>
                <a href={`mailto:${resume.email}`}>{resume.email}</a>
                <a href={`tel:${resume.phone.replace(/\s/g, "")}`}>
                  {resume.phone}
                </a>
                <span>{resume.location}</span>
              </address>
            </div>
          </header>

          <section className="resume-section summary">
            <h3>定位</h3>
            <p>{resume.summary}</p>
          </section>

          <section className="resume-section">
            <h3>核心能力</h3>
            <div className="core-grid">
              {resume.core.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </section>

          <section className="resume-section">
            <h3>技術棧</h3>
            <div className="skill-grid">
              {resume.skills.map((group) => (
                <div key={group.label} className="skill-block">
                  <span>{group.label}</span>
                  <p>{group.items.join(" / ")}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="resume-section">
            <h3>實務經驗</h3>
            <div className="timeline">
              {visibleExperiences.map((item) => {
                const relatedPortfolio = portfolioForExperience(
                  resume.portfolio,
                  item.id,
                );

                return (
                  <section className="job" key={item.id}>
                    <div className="job-head">
                      <div>
                        <h4>{item.company}</h4>
                        <p>{item.role}</p>
                      </div>
                      <time>{item.period}</time>
                    </div>
                    <p className="focus">{item.focus}</p>
                    <ul>
                      {item.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                    <div className="stack">
                      {item.stack.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    {relatedPortfolio.length > 0 && (
                      <div className="job-links">
                        {relatedPortfolio.slice(0, 3).map((project) => (
                          <a href={`#${project.id}`} key={project.id}>
                            {project.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </section>
                );
              })}

              {resumeMode === "compact" && archivedExperiences.length > 0 && (
                <section className="archive-summary">
                  <h4>早期經歷摘要</h4>
                  <div>
                    {archivedExperiences.map((item) => (
                      <p key={item.id}>
                        <span>{item.period}</span>
                        {item.company} / {item.focus}
                      </p>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </section>

          <section className="resume-section portfolio-section">
            <h3>{resumeMode === "compact" ? "精選作品" : "作品集佐證"}</h3>
            <div className="portfolio-grid">
              {visiblePortfolio.map((item) => (
                <section className="portfolio-card" id={item.id} key={item.id}>
                  <div className="portfolio-head">
                    <span>{item.category}</span>
                    <time>{item.period}</time>
                  </div>
                  <h4>{item.title}</h4>
                  <p>{item.summary}</p>
                  <small>{item.role}</small>
                  <div className="stack">
                    {item.stack.slice(0, resumeMode === "compact" ? 5 : 9).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  {item.links.length > 0 && (
                    <details className="resource-disclosure">
                      <summary>
                        Demo / 佐證連結
                        <span>{item.links.length}</span>
                      </summary>
                      <div className="resource-links">
                        {item.links.map((link) => (
                          <a
                            href={link.href}
                            key={link.href}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    </details>
                  )}
                </section>
              ))}
            </div>
          </section>

          {resumeMode === "detail" && (
            <>
              <section className="resume-section references-section">
                <h3>參考資料</h3>
                <div className="attachment-list">
                  {resume.attachments.map((item) => (
                    <a href={item.href} key={item.href} target="_blank">
                      <span>{item.title}</span>
                      <small>{item.description}</small>
                    </a>
                  ))}
                </div>
              </section>

              <section className="resume-section">
                <h3>學歷與進修</h3>
                <div className="education-block">
                  <section>
                    <div className="job-head compact-head">
                      <div>
                        <h4>{resume.education.school}</h4>
                        <p>{resume.education.degree}</p>
                      </div>
                      <time>{resume.education.period}</time>
                    </div>
                    <ul>
                      {resume.education.notes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>
                  <section>
                    <div className="job-head compact-head">
                      <div>
                        <h4>{resume.training.title}</h4>
                      </div>
                      <time>{resume.training.period}</time>
                    </div>
                    <ul>
                      {resume.training.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>
                </div>
              </section>
            </>
          )}
        </article>
      </div>
    </main>
  );
}
