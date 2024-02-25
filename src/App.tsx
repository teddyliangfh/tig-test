import { ApolloProvider } from "@apollo/client";
import { useState } from "react";
import client from "./service/api.ts";
import Header from "./components/Header";
import { ChakraProvider } from "@chakra-ui/react";
import ShipmentList from "./components/ShipmentList";
import ShipmentDetails from "./components/ShipmentDetails";
import type { Shipment } from './types/types.ts'

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<Shipment>();

  const handleClose = () => {
    setIsDrawerOpen(false);
  }

  const handleListItemClick = (shipment: Shipment) => {
    setSelectedShipment(shipment);
    setIsDrawerOpen(true);
  }
  return (
    <ChakraProvider>
      <ApolloProvider client={client}>
        <Header />
        <main className="flex items-center justify-center bg-[#DDDEE4] w-full py-5 px-6">
          <ShipmentList onListItemClick={handleListItemClick} />
        </main>
        <ShipmentDetails shipment={selectedShipment} isOpen={isDrawerOpen} onClose={handleClose} />
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default App;
