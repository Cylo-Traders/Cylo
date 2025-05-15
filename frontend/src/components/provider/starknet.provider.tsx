"use client";

import type { FC } from "react";
import { sepolia, mainnet } from "@starknet-react/chains";
import {
  alchemyProvider,
  infuraProvider,
  lavaProvider,
  nethermindProvider,
  publicProvider,
  reddioProvider,
  StarknetConfig,
  starkscan,
} from "@starknet-react/core";
import { connectors } from "@/lib/helpers/connectors";

interface StarknetProviderProps {
  children: React.ReactNode;
}

const StarknetProvider: FC<StarknetProviderProps> = ({ children }) => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY!;
  const nodeProvider = process.env.NEXT_PUBLIC_PROVIDER!;

  let provider;
  if (nodeProvider == "infura") {
    provider = infuraProvider({ apiKey });
  } else if (nodeProvider == "alchemy") {
    provider = alchemyProvider({ apiKey });
  } else if (nodeProvider == "lava") {
    provider = lavaProvider({ apiKey });
  } else if (nodeProvider == "nethermind") {
    provider = nethermindProvider({ apiKey });
  } else if (nodeProvider === "reddio") {
    provider = reddioProvider({ apiKey });
  } else {
    provider = publicProvider();
  }

  return (
    <StarknetConfig
      connectors={connectors}
      chains={[mainnet, sepolia]}
      provider={provider}
      explorer={starkscan}
      autoConnect
    >
      {children}
    </StarknetConfig>
  );
};

export default StarknetProvider;
