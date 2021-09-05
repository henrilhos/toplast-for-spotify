import {
  Button as ChakraButton,
  ButtonGroup,
  ButtonGroupProps,
} from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction, useState } from "react";

interface ComponentProps extends ButtonGroupProps {
  value: TimeRange;
  setValue: Dispatch<SetStateAction<TimeRange>>;
}

interface ButtonProps {
  timeRange: TimeRange;
}

export type TimeRange = "long_term" | "medium_term" | "short_term";

export const TimeRangeSelector: FC<ComponentProps> = ({
  value,
  setValue,
  ...props
}) => {
  const Button: FC<ButtonProps> = ({ timeRange, children }) => (
    <ChakraButton
      isActive={value === timeRange}
      onClick={() => setValue(timeRange)}
    >
      {children}
    </ChakraButton>
  );

  return (
    <ButtonGroup isAttached {...props}>
      <Button timeRange="short_term">1 month</Button>
      <Button timeRange="medium_term">6 months</Button>
      <Button timeRange="long_term">Overall</Button>
    </ButtonGroup>
  );
};
