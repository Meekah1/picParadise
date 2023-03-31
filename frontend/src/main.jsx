// // import * as React from 'react';
// // import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react';
// // import chakraTheme from '@chakra-ui/theme';
// // import ReactDOM from 'react-dom/client';
// // import App from './App';

// // const { Button } = chakraTheme.components;

// // const theme = extendBaseTheme({
// //   components: {
// //     Button,
// //   },
// // });


// // ReactDOM.createRoot(document.getElementById('root')).render(
// //   <React.StrictMode>
// //     <ChakraBaseProvider theme={theme}>
// //       <App />
// //     </ChakraBaseProvider>
// //   </React.StrictMode>
// );


import { extendTheme, ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';

import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};

const theme = extendTheme({ colors });

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ColorModeScript />
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
