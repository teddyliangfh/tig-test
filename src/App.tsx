import { ApolloProvider } from '@apollo/client';
import client from './service/api.ts';
import { Header } from './components/Header.tsx';
import { ChakraProvider } from '@chakra-ui/react'


function App() {
  return (
    <ChakraProvider>
      <ApolloProvider client={client}>
        <Header />
      </ApolloProvider>
    </ChakraProvider>
  )
}

export default App
