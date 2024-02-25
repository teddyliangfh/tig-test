import { useQuery } from "@apollo/client";
import { TRACKING_EVENTS } from "../graphql/queries.ts";
import type { TrackingEvent } from '../types/types.ts';

const useGetShipmentDetailsData = (trackingId:string) => {
  const { loading, error, data } = useQuery(TRACKING_EVENTS, {
    skip: !trackingId,
    variables: { trackingId: trackingId || '' },
})
  type TrackingEventList = TrackingEvent[] | [];

  const trackingEventsListData = (data?.trackingEvents || []) as TrackingEventList;
  return {
    loading,
    error,
    trackingEventsListData,
  };
};

export default useGetShipmentDetailsData;
