import {
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Grid,
    Tag,
    Text,
    TagLabel,
    GridItem,
} from '@chakra-ui/react';
import type { Shipment } from '../../../types/types';
import { formatTime } from '../../../utils/main';

interface IShipmentDetialsAccordionProps {
    shipmentData: Shipment
}

export function ShipmentDetialsAccordion({ shipmentData }: IShipmentDetialsAccordionProps) {
    const { lastUpdate, deliveredTime, status, deliveryAddress, totalTransit } = shipmentData;

    const format = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    } as Intl.DateTimeFormatOptions;

    return (
        <AccordionItem borderTop="0px">
            <h2>
                <AccordionButton className='flex justify-between'>
                    <Box textAlign="left">
                        <Text fontSize="14px" fontWeight="600" color="gray">SHIPMENT</Text>
                    </Box>
                    <AccordionIcon color="gray" />
                </AccordionButton>
            </h2>
            <AccordionPanel>
                <Grid columnGap="1rem" rowGap=".8rem" templateColumns="30% 70%">
                    <GridItem className='flex items-center'>
                        <Text fontSize="14px" color="gray">
                            Status
                        </Text>
                    </GridItem>
                    <GridItem>
                        <Tag
                            size="lg"
                            className="tag"
                            variant="outline"
                            colorScheme={status === "Delivered" ? "green" : "orange"}
                        >
                            <TagLabel>{status}</TagLabel>
                        </Tag>
                    </GridItem>
                    <GridItem>
                        <Text fontSize="14px" color="gray">
                            Delivered time
                        </Text>
                    </GridItem>
                    <GridItem>
                        {deliveredTime && (<Text fontSize="14px">
                            {formatTime(deliveredTime, format)}
                        </Text>)}
                    </GridItem>
                    <GridItem>
                        <Text fontSize="14px" color="gray">
                            Delivery address
                        </Text>
                    </GridItem>
                    <GridItem>
                        <Text fontSize="14px" >
                            {deliveryAddress}
                        </Text>
                    </GridItem>
                    <GridItem>
                        <Text fontSize="14px" color="gray">
                            Last updated
                        </Text>
                    </GridItem>
                    <GridItem>
                        <Text fontSize="14px">
                            {formatTime(lastUpdate, format)}
                        </Text>
                    </GridItem>
                    <GridItem>
                        <Text fontSize="14px" color="gray">
                            Total transit time
                        </Text>
                    </GridItem>
                    <GridItem>
                        <Text fontSize="14px">
                            {totalTransit}
                        </Text>
                    </GridItem>
                </Grid>
            </AccordionPanel>
        </AccordionItem>
    );
}
