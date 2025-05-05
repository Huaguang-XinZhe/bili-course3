import type { NavigateOptions } from "react-router-dom";
import { useHref, useNavigate } from "react-router-dom";

export function Provider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
