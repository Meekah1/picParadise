import React from 'react';
import { useAccount } from 'wagmi';

import { Navigate, Outlet } from 'react-router-dom';

const RouteProtection = () => {
  const { isConnected } = useAccount();

  return isConnected ? <Outlet /> : <Navigate to='/' />;
};

export default RouteProtection;
