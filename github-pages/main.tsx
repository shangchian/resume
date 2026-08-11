import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Home from "../app/page";
import "../app/globals.css";

const params = new URLSearchParams(window.location.search);
const isEditor =
  params.get("mode") === "edit" || window.location.hash === "#edit";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Home publicOnly={!isEditor} />
  </StrictMode>,
);
