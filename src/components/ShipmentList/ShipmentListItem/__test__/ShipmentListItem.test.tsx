import { render, screen } from '@testing-library/react';
import { ShipmentListItem } from '../ShipmentListItem';

describe('ShipmentListItem component', () => {
  test('renders tracking ID, last update date, and status correctly', () => {

    const shipmentData = {
      id: '1',
      trackingId: 'SHP-12345',
      status: 'Delivered',
      statusSeverity: 'Success',
      deliveredTime: '2023-10-20T14:30:00Z',
      lastUpdate: '2023-10-20T14:30:00Z',
      deliveryAddress: '123 Main Street, Sydney, NSW, 2000, Australia',
      totalTransit: '2 days'
    };

    render(<ShipmentListItem {...shipmentData} />);

    //render the id correctly
    const trackingIdElement = screen.getByText('SHP-12345');
    expect(trackingIdElement).toBeTruthy();

    // render the date correctly
    const lastUpdateElement = screen.getByText(/Created: 21 Oct 2023/i);
    expect(lastUpdateElement).toBeTruthy();

    // render the status correctly
    const statusElement = screen.getByText('Delivered');
    expect(statusElement).toBeTruthy();
  });
});