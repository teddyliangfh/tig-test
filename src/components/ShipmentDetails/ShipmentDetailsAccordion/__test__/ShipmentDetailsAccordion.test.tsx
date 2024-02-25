import { render } from '@testing-library/react';
import { ShipmentDetialsAccordion } from '../ShipmentDetialsAccordion';
import { Accordion } from '@chakra-ui/react';

// // Mock the AccordionContext
// jest.mock('@chakra-ui/react', () => ({
//   ...jest.requireActual('@chakra-ui/react'),
//   useAccordionContext: jest.fn(() => ({})), // Mocking the return value of useAccordionContext
// }));

describe('ShipmentDetialsAccordion component', () => {
  it('renders shipment details correctly', () => {

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

    const { getByText } = render(<Accordion><ShipmentDetialsAccordion shipmentData={shipmentData} /></Accordion>);

    expect(getByText('Status')).toBeTruthy();
    expect(getByText('Delivered time')).toBeTruthy();
    expect(getByText('Delivery address')).toBeTruthy();
    expect(getByText('Last updated')).toBeTruthy();
    expect(getByText('Total transit time')).toBeTruthy();
    expect(getByText('Delivered')).toBeTruthy(); // Checking if status is rendered correctly
    expect(getByText('123 Main Street, Sydney, NSW, 2000, Australia')).toBeTruthy(); // Checking if delivery address is rendered correctly
    expect(getByText('2 days')).toBeTruthy(); // Checking if total transit time is rendered correctly
  });
});


