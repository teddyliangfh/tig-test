import { render, waitFor } from '@testing-library/react';
import { ShipmentDetails } from '../ShipmentDetails';
import { useQuery } from '@apollo/client';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn(),
}));



describe('ShipmentDetails component', () => {

  const mockShipment = {
    id: '1',
    trackingId: 'SHP-12345',
    status: 'Delivered',
    statusSeverity: 'Success',
    deliveredTime: '2023-10-20T14:30:00Z',
    lastUpdate: '2023-10-20T14:30:00Z',
    deliveryAddress: '123 Main Street, Sydney, NSW, 2000, Australia',
    totalTransit: '2 days'
  };
  const onCloseMock = jest.fn();

  it('renders loading spinner while fetching data', async () => {
    (useQuery as jest.Mock).mockReturnValueOnce({ loading: true, error: null, data: null });

    const { getByTestId } = render(<ShipmentDetails shipment={mockShipment} isOpen={true} onClose={onCloseMock} />);

    await waitFor(() => expect(getByTestId('spinner')).toBeTruthy());
  });


  it('renders error message if there is an error fetching data', async () => {
    (useQuery as jest.Mock).mockReturnValueOnce({ loading: false, error: new Error('An error occurred!'), data: null });

    const { getByText } = render(<ShipmentDetails shipment={mockShipment} isOpen={true} onClose={onCloseMock} />);

    await waitFor(() => expect(getByText(/no datd found, try again later/i)).toBeTruthy());
  });

});

