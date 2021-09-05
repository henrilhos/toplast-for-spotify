import { FC } from "react";
import { LayoutEmpty } from "./LayoutEmpty";

interface LayoutMainProps {
  title?: string;
}

export const LayoutMain: FC<LayoutMainProps> = ({ title, children }) => (
  <LayoutEmpty title={title}>{children}</LayoutEmpty>
);
