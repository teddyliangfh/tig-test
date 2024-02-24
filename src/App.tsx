import { ApolloProvider } from "@apollo/client";
import client from "./service/api.ts";
import Header from "./components/Header";
import { ChakraProvider } from "@chakra-ui/react";
import ShipmentList from "./components/ShipmentList";

function App() {
  return (
    <ChakraProvider>
      <ApolloProvider client={client}>
        <Header />
        <main className="flex items-center justify-center bg-[#DDDEE4] w-full py-5 px-6">
          <ShipmentList />
        </main>
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default App;
