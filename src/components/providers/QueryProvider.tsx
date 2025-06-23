// components/providers/QueryProvider.tsx
'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import type { ReactNode } from "react";
import { getDefaultConfig, RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";

const config = getDefaultConfig({
  appName: "Healthy App",
  projectId: "371ce9ecc876f834170a21ae1d07dfcf", // Replace with your WalletConnect Project ID
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true,
});

export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider  config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>
          {children}
        </RainbowKitProvider >
      </QueryClientProvider>
    </WagmiProvider>
  );
}
