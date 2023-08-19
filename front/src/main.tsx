import liff from "@line/liff";
import LIFFInspectorPlugin from "@line/liff-inspector";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

liff.use(new LIFFInspectorPlugin());

const initializeLiff = async () => {
  await liff
    .init({
      liffId: import.meta.env.VITE_LIFF_ID || '',
      withLoginOnExternalBrowser: true,
    })
    .then(() => {
      if (!liff.isLoggedIn() && !liff.isInClient()) {
        liff.login();
      }
    });
};

const renderApp = () => {
  const container = document.getElementById('root');
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    alert(`LIFF error: ${e.message}`);
  }
})();
