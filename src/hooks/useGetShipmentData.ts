import { useQuery } from '@apollo/client';
import { SHIPMENTS } from '../graphql/queries.ts'

const useGetShipmentData = () => {
    const { loading, error, data } = useQuery(SHIPMENTS);
    console.log("loading", loading, error, data);

  return {
    data
  };
};

export default useGetShipmentData;