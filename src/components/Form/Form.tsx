import { Box, Button, ButtonGroup, Text } from "@chakra-ui/react";
import { FC, useState } from "react";

import { TimeRange, TimeRangeSelector } from "../TimeRangeSelector";

export interface FormSubmitProps {
  timeRange: TimeRange;
  type: "artists" | "tracks";
}

interface ComponentProps {
  loading: boolean;
  onSubmit: (props: FormSubmitProps) => void;
}

export const Form: FC<ComponentProps> = ({ onSubmit, loading }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>("short_term");

  return (
    <>
      <Box p="2">
        <Text as="p" fontSize="lg">
          Choose what you want to see:
        </Text>
      </Box>

      <Box p="2">
        <TimeRangeSelector
          colorScheme="red"
          setValue={setTimeRange}
          value={timeRange}
          variant="outline"
        />
      </Box>

      <Box p="2">
        <ButtonGroup colorScheme="red" spacing={2}>
          <Button
            isLoading={loading}
            onClick={() => onSubmit({ timeRange, type: "tracks" })}
          >
            Top tracks
          </Button>
          <Button
            isLoading={loading}
            onClick={() => onSubmit({ timeRange, type: "artists" })}
          >
            Top artists
          </Button>
        </ButtonGroup>
      </Box>
    </>
  );
};
