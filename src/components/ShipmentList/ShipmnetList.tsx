import { useCallback, useEffect, useState } from 'react';
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { ArrowUpDownIcon } from "@chakra-ui/icons";
import useGetShipmentData from "../../hooks/useGetShipmentData";
import { Spinner } from "@chakra-ui/react";
import ShipmentListItem from './ShipmentListItem';
import type { Shipment } from '../../types/types';


enum SortStatusTypeEnum {
    Default = 'default',
    Increase = 'increase',
    Decrease = 'decrease'
}
interface IShipmentListProp {
    onListItemClick: (shipment: Shipment) => void
}

export function ShipmentList({ onListItemClick }: IShipmentListProp) {
    const { loading, error, shipmentsListData } = useGetShipmentData();
    const toast = useToast();

    const [sortByDate, setSortByDate] = useState<SortStatusTypeEnum>(SortStatusTypeEnum.Default);
    const [sortByStatus, setSortByStatus] = useState<SortStatusTypeEnum>(SortStatusTypeEnum.Default);
    const [sortedShipmentsList, setSortedShipmentsList] = useState(shipmentsListData);


    const handleSortByDate = () => {
        if (sortByDate === SortStatusTypeEnum.Increase) {
            setSortByDate(SortStatusTypeEnum.Decrease)
        } else {
            setSortByDate(SortStatusTypeEnum.Increase)
        }
    };

    const handleSortByStatus = () => {
        if (sortByStatus === SortStatusTypeEnum.Increase) {
            setSortByStatus(SortStatusTypeEnum.Decrease)
        } else {
            setSortByStatus(SortStatusTypeEnum.Increase)
        }
    };

    const handleSortList = useCallback((isSortByDate: boolean) => {
        const initListData = [...shipmentsListData];
        if (isSortByDate) {
            if (sortByDate === SortStatusTypeEnum.Increase) {
                initListData.sort((a, b) => {
                    return a.lastUpdate.localeCompare(b.lastUpdate);
                })
            } else {
                initListData?.sort((a, b) => {
                    return -a.lastUpdate.localeCompare(b.lastUpdate);
                })
            }
        } else {
            if (sortByStatus === SortStatusTypeEnum.Increase) {
                initListData.sort((a, b) => {
                    const statusOrder: { [key: string]: number } = { "Delivered": 1, "In-Transit": 2, "Manifested": 3, "Unknown": 4 };
                    const orderA = statusOrder[a.status] || 0;
                    const orderB = statusOrder[b.status] || 0;
                    return orderA - orderB;
                })
            } else {
                initListData.sort((a, b) => {
                    const statusOrder: { [key: string]: number } = { "Delivered": 1, "In-Transit": 2, "Manifested": 3, "Unknown": 4 };
                    const orderA = statusOrder[a.status] || 0;
                    const orderB = statusOrder[b.status] || 0;
                    return orderB - orderA;
                })
            }
        }
        setSortedShipmentsList(initListData)

    }, [shipmentsListData, sortByDate, sortByStatus])


    useEffect(() => {
        if (sortByDate !== SortStatusTypeEnum.Default) {
            handleSortList(true);
        }

    }, [sortByDate]);

    useEffect(() => {
        if (sortByStatus !== SortStatusTypeEnum.Default) {
            handleSortList(false);
        }
    }, [sortByStatus]);

    if (error) {
        toast({
            title: "error message",
            description: "Sorry, something went wrong",
            status: "error",
            duration: 1000,
            isClosable: true,
        });
        return (
            <Box
                height="400px"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Text color="grey">Something went wrong, try again later</Text>
            </Box>
        );
    }

    if (loading) {
        return (
            <Box
                height="400px"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                    data-testid="spinner"
                />
            </Box>
        );
    }

    const listData = sortedShipmentsList?.length > 0 ? sortedShipmentsList : shipmentsListData;

    return (
        <Box bg="white" className="rounded-md w-full">
            <Box className="px-3 flex items-center gap-[186px]">
                <Button
                    onClick={handleSortByDate}
                    className="!px-2"
                    variant='ghost'>
                    <Text fontSize="sm" color="black" fontWeight="400">
                        Shipment
                    </Text>
                    <ArrowUpDownIcon
                        color="black"
                        boxSize={2}
                        marginTop="2px"
                        marginLeft="6px"
                    />
                </Button>
                <Button
                    onClick={handleSortByStatus}
                    variant='ghost'
                    className="!px-2"
                >
                    <Text fontSize="sm" color="black" fontWeight="400" >
                        Status
                    </Text>
                    <ArrowUpDownIcon
                        color="black"
                        boxSize={2}
                        marginTop="2px"
                        marginLeft="6px"
                    />
                </Button>
            </Box>
            {listData.map((shipmentItem) => (
                <ShipmentListItem key={shipmentItem.id} {...shipmentItem} onItemClick={onListItemClick} />
            ))}
        </Box>
    );
}
