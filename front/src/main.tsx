import { createRoot } from "react-dom/client";
import App from "./App";
import liff from "@line/liff";
import { BrowserRouter } from "react-router-dom";

const initializeLiff = async () => {
  await liff.init({ liffId: import.meta.env.VITE_LIFF_ID || "" });
  // 外部ブラウザ対応 外部ブラウザで開いた場合は、ログインを促す
  if (!liff.isLoggedIn()) {
    liff.login();
  }
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
