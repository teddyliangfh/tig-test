import {
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Text,
    Stepper,
    Step,
    StepIndicator,
    Divider,
    StepSeparator,
} from "@chakra-ui/react";
import { CheckCircleIcon, InfoIcon, WarningIcon } from "@chakra-ui/icons";
import type { TrackingEvent } from "../../../types/types";
import { formatTime } from "../../../utils/main";

interface IShipmentTrackingHistoryProps {
    trackingHistoryData: TrackingEvent[];
}

const renderStatusIcon = (status: string) => {
    switch (status) {
        case "Success":
            return <CheckCircleIcon color="green" boxSize={5} />;
        case "Warning":
            return <WarningIcon color="red" boxSize={5} />;
        default:
            return <InfoIcon color="yellow" boxSize={5} />;
    }
};

export function ShipmentTrackingHistory({
    trackingHistoryData,
}: IShipmentTrackingHistoryProps) {

    return (
        <AccordionItem>
            <h2>
                <AccordionButton className="flex justify-between">
                    <Box textAlign="left">
                        <Text fontSize="14px" fontWeight="600" color="gray">
                            TRACKING HISTORY
                        </Text>
                    </Box>
                    <AccordionIcon color="gray" />
                </AccordionButton>
            </h2>
            <AccordionPanel>
                {trackingHistoryData?.length > 0 ? (
                    <Box
                        className="px-2 py-1 border"
                        borderRadius="5px"
                        maxHeight="260px"
                        overflowY="auto"
                    >
                        <Stepper orientation="vertical" gap={0} index={0}>
                            {trackingHistoryData?.map((trackingEvent: TrackingEvent, key) => (
                                <Step key={trackingEvent?.id} className="w-full items-center">
                                    <StepIndicator border="none" zIndex="9">
                                        {trackingEvent?.statusSeverity &&
                                            renderStatusIcon(trackingEvent?.statusSeverity)}
                                    </StepIndicator>
                                    <Box className="w-full pt-4">
                                        <Box className="w-full flex justify-between">
                                            <Box>
                                                <Text fontSize="14px">{trackingEvent?.status}</Text>
                                                <Text fontSize="14px" color="gray">{trackingEvent?.location}</Text>
                                            </Box>
                                            <Box textAlign="right">
                                                <Text fontSize="14px">
                                                    {trackingEvent?.timestamp &&
                                                        formatTime(trackingEvent?.timestamp, {
                                                            day: "numeric",
                                                            month: "long",
                                                            year: "numeric",
                                                        })}
                                                </Text>
                                                <Text fontSize="14px" color="gray">
                                                    {trackingEvent?.timestamp &&
                                                        formatTime(trackingEvent?.timestamp, {
                                                            hour: "numeric",
                                                            minute: "2-digit",
                                                            hour12: true,
                                                        })}
                                                </Text>
                                            </Box>
                                        </Box>
                                        {key !== trackingHistoryData.length - 1 && (
                                            <Divider
                                                orientation="horizontal"
                                                className="mt-4 border !border-dashed"
                                            />
                                        )}
                                    </Box>
                                    <StepSeparator className="!max-h-full" />
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                ) : (
                    <Box>No data found</Box>
                )}
            </AccordionPanel>
        </AccordionItem>
    );
}
