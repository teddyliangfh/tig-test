import { render } from '@testing-library/react';
import { Accordion } from '@chakra-ui/react';
import { ShipmentTrackingHistory } from '../ShipmentTrackingHistory';
import { formatTime } from '../../../../utils/main'

describe('ShipmentTrackingHistory component', () => {
  it('renders tracking history correctly', () => {
    const trackingHistoryData = [
      {
        id: '1',
        trackingId: 'ABC123',
        status: 'In-Transit',
        statusSeverity: 'Warning',
        timestamp: '2024-02-24T08:00:00Z',
        location: 'Warehouse A',
      },
      {
        id: '2',
        trackingId: 'ABC1234',
        status: 'Delivered',
        statusSeverity: 'Success',
        timestamp: '2024-02-26T10:00:00Z',
        location: 'Customer Address',
      },
    ];

    const { getByText } = render(<Accordion><ShipmentTrackingHistory trackingHistoryData={trackingHistoryData} /> </Accordion>);
    // Checking if the title is rendered correctly
    expect(getByText('TRACKING HISTORY')).toBeTruthy();
    // Checking if each tracking event is rendered correctly
    trackingHistoryData.forEach(event => {
      expect(getByText(event.status)).toBeTruthy();
      expect(getByText(event.location)).toBeTruthy();
      const formattedTime = formatTime(event.timestamp, {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      expect(getByText(formattedTime)).toBeTruthy();
    });
  });

  it('renders "No data found" message when no tracking history data is provided', () => {
    const { getByText } = render(<Accordion><ShipmentTrackingHistory trackingHistoryData={[]} /></Accordion>);
    expect(getByText('No data found')).toBeTruthy();
  });
});
