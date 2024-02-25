import { gql } from '@apollo/client';

const SHIPMENTS = gql`
  query Shipments {
    shipments {
      id
      trackingId
      status
      statusSeverity
      deliveredTime
      lastUpdate
      deliveryAddress
      totalTransit
    }
  }
`;

const TRACKING_EVENTS = gql`
  query TrackingEvents($trackingId: String!) {
    trackingEvents(trackingId: $trackingId) {
      id
      trackingId
      status
      statusSeverity
      timestamp
      location
    }
  }
`;

export {
    SHIPMENTS,
    TRACKING_EVENTS
}