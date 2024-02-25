import { Box, Tag, TagLabel, Text } from "@chakra-ui/react";
import type { Shipment } from "../../../types/types";
import { formatTime } from '../../../utils/main';

interface IShipmentListItemProps extends Shipment {
    onItemClick: (shipment: Shipment) => void
}

export function ShipmentListItem(props: IShipmentListItemProps) {
    const { onItemClick, ...rest } = props;
    const shipmentData = rest;
    const { trackingId, lastUpdate, status } = shipmentData;

    const format = {
        year: "numeric",
        month: "short",
        day: "numeric",
    } as Intl.DateTimeFormatOptions;

    return (
        <Box
            className="flex items-center px-5 py-3 border-t justify-start gap-[150px] cursor-pointer"
            role="listitem"
            onClick={() => {
                onItemClick(shipmentData)
            }}
        >
            <Box>
                <Text fontSize="sm" fontWeight={500} color="black">
                    {trackingId}
                </Text>
                <Text fontSize="xs" color="gray">
                    Created: {formatTime(lastUpdate, format)}
                </Text>
            </Box>
            <Tag
                size="lg"
                className="tag"
                variant="outline"
                colorScheme={status === "Delivered" ? "green" : "orange"}
            >
                <TagLabel>{status}</TagLabel>
            </Tag>
        </Box>
    );
}
