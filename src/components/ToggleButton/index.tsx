import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import styled from "styled-components";

interface Props {
  onClick: () => void;
}

const StyledIconButton = styled(IconButton)`
  @media (min-width: 60em) {
    display: none;
  }
`;

function ToggleButton({ onClick }: Props): JSX.Element {
  return (
    <StyledIconButton onClick={onClick} color="inherit">
      <MenuIcon />
    </StyledIconButton>
  );
}

export default ToggleButton;
