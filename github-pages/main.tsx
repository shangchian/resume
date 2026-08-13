import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Home from "../app/page";
import "../app/globals.css";

const params = new URLSearchParams(window.location.search);
const isEditor =
  params.get("mode") === "edit" || window.location.hash === "#edit";
const initialResumeMode =
  params.get("resume") === "detail" || params.get("view") === "detail"
    ? "detail"
    : "compact";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Home initialResumeMode={initialResumeMode} publicOnly={!isEditor} />
  </StrictMode>,
);
