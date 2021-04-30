import { ReactNode } from "react";

type Prop = { children: ReactNode };

const Core = ({ children }: Prop) => {
  return <>{children}</>;
};

export default Core;
