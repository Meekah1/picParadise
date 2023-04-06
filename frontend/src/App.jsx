import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { WagmiConfig, createClient, configureChains } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  injectedWallet,
  metaMaskWallet,
  trustWallet,
} from '@rainbow-me/rainbowkit/wallets';
import '@rainbow-me/rainbowkit/styles.css';
import { lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import Home from './pages/Home';
import Hero from './pages/Hero';
import AddPhoto from './component/AddPhoto';
import ViewPhoto from './component/ViewPhoto';
import AboutUs from './pages/AboutUs';
import PrivacyPolicy from './pages/Privacy';

const { chains, provider, webSocketProvider } = configureChains(
  [polygonMumbai],
  [
    alchemyProvider({ apiKey: 'tx5ZStDbgXGL8keyyyODMuDdnRxjlFf5' }),
    publicProvider(),
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({ chains }),
      trustWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function App() {
  // const [count, setCount] = useState(0);

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        modalSize='compact'
        appInfo={{
          appName: 'picParadise',
        }}
        theme={lightTheme({
          accentColor: '#48bb78',
          accentColorForeground: '#1A202C',
          borderRadius: 'large',
          fontStack: 'system',
          overlayBlur: 'small',
        })}
      >
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Hero' exact element={<Hero />} />
            <Route path='/viewPhoto' exact element={<ViewPhoto />} />
            <Route path='/addPhoto' exact element={<AddPhoto />} />
            <Route path='/aboutUs' exact element={<AboutUs />} />
            <Route path='/privacy' exact element={<PrivacyPolicy />} />
          </Routes>
        </BrowserRouter>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
