import { FC, useEffect, useState } from "react";
import { createContext } from "../utils/react";

export interface Data {
  title: string;
  description: string;
  image: string;
  type: "artists" | "tracks";
}

interface Collage {
  header: Data;
  body: Data[];
  footer: Data;
}

interface ContextType {
  collage: Collage | undefined;
  handleCollage: (collage: Collage) => void;
}

const getCollageFromLocalStorage = (): Collage | undefined => {
  if (!process.browser) return undefined;
  const collageStringified = window.localStorage.getItem("collage");
  if (!collageStringified) return undefined;
  return JSON.parse(collageStringified) as Collage;
};

const [Provider, useCollage, CollageContext] = createContext<ContextType>({
  name: "collage",
});

const CollageProvider: FC = ({ children }) => {
  const [collage, setCollage] = useState<Collage | undefined>(
    getCollageFromLocalStorage()
  );

  const handleCollage = (collage: Collage) => {
    setCollage(collage);
  };

  useEffect(() => {
    if (collage)
      window.localStorage.setItem("collage", JSON.stringify(collage));
    else window.localStorage.removeItem("collage");
  }, [collage]);

  return <Provider value={{ collage, handleCollage }}>{children}</Provider>;
};

export { CollageProvider, useCollage, CollageContext };
