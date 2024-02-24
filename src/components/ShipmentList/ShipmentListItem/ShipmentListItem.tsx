import { Box, Tag, TagLabel, Text } from "@chakra-ui/react";
import type { Shipment } from "../../../types/types";

interface IShipmentListItemProps extends Shipment {
    // handleItemClick: (itemId: number) => void
}

export function ShipmentListItem(props: IShipmentListItemProps) {
    const formatDateTime = (data: string) => {
        const formatedDate = new Date(data).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
        return formatedDate;
    };

    const { trackingId, lastUpdate, status } = props;

    return (
        <Box
            className="flex items-center px-5 py-3 border-t justify-start gap-[140px]"
            role="listitem"
        >
            <Box>
                <Text fontSize="sm" fontWeight={500} color="black">
                    {trackingId}
                </Text>
                <Text fontSize="xs" color="gray">
                    Created: {formatDateTime(lastUpdate)}
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
