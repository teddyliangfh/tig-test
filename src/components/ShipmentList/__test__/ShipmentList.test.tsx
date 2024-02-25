// ShipmentList.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { ShipmentList } from '../ShipmnetList';

jest.mock('../../../hooks/useGetShipmentData', () => {
  return jest.fn(() => ({
    loading: false,
    error: null,
    shipmentsListData: [
      {
        id: '1',
        trackingId: 'SHP-12345',
        status: 'Delivered',
        statusSeverity: 'Success',
        deliveredTime: '2023-10-20T14:30:00Z',
        lastUpdate: '2023-10-20T14:30:00Z',
        deliveryAddress: '123 Main Street, Sydney, NSW, 2000, Australia',
        totalTransit: '2 days'
      },
      {
        id: '2',
        trackingId: 'SHP-12s345',
        status: 'Unknow',
        statusSeverity: 'Success',
        deliveredTime: '2023-9-20T14:30:00Z',
        lastUpdate: '2023-8-20T14:30:00Z',
        deliveryAddress: '124 Main Street, Sydney, NSW, 2000, Australia',
        totalTransit: '3 days'
      },

    ]
  }));
});

const mockOnListItemClick = jest.fn();

describe('ShipmentList component', () => {
  test('displays list items when data is loaded successfully', async () => {
    render(<ShipmentList onListItemClick={mockOnListItemClick} />);
    //render the list
    await waitFor(() => {
      expect(screen.getByText(/SHP-12345/i)).toBeTruthy();
    });
  });

  test('sorts list items by date when sort by date button is clicked', async () => {
    render(<ShipmentList onListItemClick={mockOnListItemClick} />);

    const sortByDateButton = screen.getByText(/Shipment/i);
    sortByDateButton.click();

    await waitFor(() => {
      const listItems = screen.getAllByRole(`listitem`);
      const firstItemText = listItems[0].textContent;
      expect(firstItemText).toContain('SHP-12345');
    });
  });

  test('sorts list items by status when sort by status button is clicked', async () => {
    render(<ShipmentList onListItemClick={mockOnListItemClick} />);

    const sortByStatusButton = screen.getByText('Status');
    sortByStatusButton.click();

    await waitFor(() => {
      const listItems = screen.getAllByRole('listitem');
      const firstItemText = listItems[0].textContent;
      expect(firstItemText).toContain('SHP-12345');
    });
  });
});
