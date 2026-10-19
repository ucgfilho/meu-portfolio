import { renderToString } from "react-dom/server";
import Index from "./pages/Index";
import "./lib/i18n";

export function renderAppHtml(): string {
  return renderToString(<Index />);
}
