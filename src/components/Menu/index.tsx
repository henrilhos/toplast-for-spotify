import { motion } from "framer-motion";

import * as S from "./styles";
import { MENU } from "common/constants";
import Login from "components/Login";
import User from "components/User";

interface Props {
  open: boolean;
}

function Menu({ open }: Props): JSX.Element {
  return (
    <S.Wrapper
      as={motion.div}
      initial={{ y: "100%" }}
      animate={{ y: open ? 0 : "100%" }}
      transition={{ type: "spring", damping: 18, stiffness: 100 }}
    >
      <S.Menu>
        {MENU.map((item) => (
          <S.Item
            href={item.href}
            key={item.href}
            target="_blank"
            color="inherit"
            variant="body1"
          >
            {item.text}
          </S.Item>
        ))}
      </S.Menu>

      <Login variant="outlined">
        <User />
      </Login>
    </S.Wrapper>
  );
}

export default Menu;
