import liff from "@line/liff";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const initializeLiff = async () => {
  await liff.init({
    liffId: import.meta.env.VITE_LIFF_ID || "",
    withLoginOnExternalBrowser: true,
  });
};

const renderApp = () => {
  const container = document.getElementById("root");
  if (container) {
    const root = createRoot(container);
    root.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  }
};

(async () => {
  try {
    await initializeLiff();
    renderApp();
  } catch (e: any) {
    alert(`LIFF error: ${e.message}`);
  }
})();
