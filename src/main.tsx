import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import { Analytics } from "@vercel/analytics/react";

const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    {!isLocalhost && <Analytics />}
  </>
);
