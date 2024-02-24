import { useQuery } from "@apollo/client";
import { SHIPMENTS } from "../graphql/queries.ts";
import type { Shipment } from '../types/types.ts';

const useGetShipmentData = () => {
  const { loading, error, data } = useQuery(SHIPMENTS);
  type ShipmentList = Shipment[] | [];

  const shipmentsListData = (data?.shipments || []) as ShipmentList;
  return {
    loading,
    error,
    shipmentsListData,
  };
};

export default useGetShipmentData;
