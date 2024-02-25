import {
    Box,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    Spinner,
    CloseButton,
    DrawerHeader,
    DrawerBody,
    Heading,
    Text,
    Accordion,
} from "@chakra-ui/react";
import type { Shipment } from "../../types/types";
import useGetShipmentDetailsData from "../../hooks/useGetShipmentDetailsData";
import ShipmentDetailsAccordion from "./ShipmentDetailsAccordion";
import ShipmentTrackingHistory from "./ShipmentTrackingHistory";


interface IShipmentDetailsProps {
    shipment: Shipment | undefined;
    isOpen: boolean;
    onClose: () => void;
}

export function ShipmentDetails({
    shipment,
    isOpen,
    onClose,
}: IShipmentDetailsProps) {
    const trackingId = shipment?.trackingId || "";
    const { trackingEventsListData, loading, error } =
        useGetShipmentDetailsData(trackingId);

    return (
        <Drawer placement="right" size="lg" isOpen={isOpen} onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
                <>
                    <DrawerHeader
                        padding="1rem"
                        borderBottomColor="gray.200"
                        display="flex"
                        justifyContent="space-between"
                        borderBottomWidth="1px"
                    >
                        <Heading size="lg">{trackingId}</Heading>
                        <CloseButton size="md" className="border" onClick={onClose} />
                    </DrawerHeader>
                    <DrawerBody padding="1rem">
                        <Accordion defaultIndex={[0, 1]} allowMultiple>
                            {shipment && (
                                <ShipmentDetailsAccordion shipmentData={shipment} />
                            )}
                            {loading && (
                                <Box
                                    height="220px"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Spinner
                                        thickness="4px"
                                        speed="0.8s"
                                        emptyColor="gray.200"
                                        color="blue.500"
                                        size="xl"
                                        data-testid="spinner"
                                    />
                                </Box>
                            )}
                            {error ? (
                                <Box
                                    height="220px"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Text color="grey">
                                        no datd found, try again later
                                    </Text>
                                </Box>
                            ) : (<ShipmentTrackingHistory trackingHistoryData={trackingEventsListData} />)}

                        </Accordion>
                    </DrawerBody>
                </>
            </DrawerContent>
        </Drawer>
    );
}
