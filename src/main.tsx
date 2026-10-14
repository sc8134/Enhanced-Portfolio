// Entry point — mounts the React app into #root.
import "./styles.css";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Portfolio } from "@/components/sections/portfolio";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("No #root element found in index.html");

ReactDOM.createRoot(rootEl).render(
  <StrictMode>
    <Portfolio />
  </StrictMode>,
);
