import React from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Page from './components/Page';
import { MyTabs } from './components/MyTabs';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <MyTabs />
      <Page/>
    </ChakraProvider>
  );
}

export default App;
