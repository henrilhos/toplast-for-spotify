import { FC, useEffect, useState } from "react";
import { createContext } from "../utils/react";
import Cookies from "universal-cookie";

import { parse, serialize } from "cookie";
import { useCookies } from "react-cookie";

export interface Data {
  title: string;
  description: string;
  image: string;
  // type: "artists" | "tracks";
}

type Collage = Data[];

interface ContextType {
  collage: Collage | undefined;
  handleCollage: (collage: Collage) => void;
}

const getCollageFromCookie = () => {
  const cookies = new Cookies();

  const collageStringified = cookies.get("collage");
  if (!collageStringified) return undefined;
  return JSON.parse(collageStringified) as Collage;
};

const [Provider, useCollage, CollageContext] = createContext<ContextType>({
  name: "collage",
});

const CollageProvider: FC = ({ children }) => {
  const [cookie, setCookie, removeCookie] = useCookies(["collage"]);
  const [collage, setCollage] = useState<Collage | undefined>(
    getCollageFromCookie()
  );

  const handleCollage = (collage: Collage) => {
    setCollage(collage);
  };

  useEffect(() => {
    console.log(collage, cookie);

    if (collage) {
      setCookie("collage", JSON.stringify(collage));
      console.log(cookie);
    } else removeCookie("collage");
  }, [collage]);

  return <Provider value={{ collage, handleCollage }}>{children}</Provider>;
};

export { CollageProvider, useCollage, CollageContext };
