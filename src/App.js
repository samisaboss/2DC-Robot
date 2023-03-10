import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import { Header } from './components/Header';
import { AppRoute } from './navigation/AppRoute';

const styles = {
  container: {
    maxWidth: 1280, 
    margin: '0 auto', 
    padding: '1rem 0'
  }
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <main style={styles.container}>
        <AppRoute />
      </main>
    </ChakraProvider>
  );
}

export default App;

