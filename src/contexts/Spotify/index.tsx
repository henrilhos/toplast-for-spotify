import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useCookies } from "react-cookie";

import { getUserInformation } from "services/spotify";
import type { GetUserInformation } from "services/spotify";

type ContextProps = {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  isAuthenticated: boolean;
  user: GetUserInformation;
};

type ProviderProps = {
  children: ReactNode;
};

function getTokenFromLocalStorage(): string | undefined {
  if (!process.browser) return;
  return window.localStorage.getItem("token") ?? undefined;
}

export const SpotifyContext = createContext<Partial<ContextProps>>({});

export const SpotifyProvider = ({ children }: ProviderProps): JSX.Element => {
  const [cookieToken, setCookieToken, removeCookieToken] = useCookies([
    "token",
  ]);
  const [token, setToken] = useState<string>(
    getTokenFromLocalStorage() ?? cookieToken.token
  );
  const [isAuthenticated, setAuthentication] = useState(Boolean(token));
  const [user, setUser] = useState<GetUserInformation>();

  useEffect(() => {
    async function getUser() {
      const userData = await getUserInformation(token);

      setUser(userData);
    }

    if (token) {
      window.localStorage.setItem("token", token);
      setCookieToken("token", token);
      // eslint-disable-next-line no-console
      getUser().catch((err) => console.error(err));
    } else {
      window.localStorage.removeItem("token");
      removeCookieToken("token");
      setUser(undefined);
    }

    setAuthentication(Boolean(token));
  }, [token, removeCookieToken, setCookieToken]);

  const defaultContext = { token, setToken, isAuthenticated, user };

  return (
    <SpotifyContext.Provider value={defaultContext}>
      {children}
    </SpotifyContext.Provider>
  );
};
