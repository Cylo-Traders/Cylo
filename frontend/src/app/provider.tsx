import type { FC, ReactNode } from "react";
import StarknetProvider from "@/components/provider/starknet.provider";

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider: FC<GlobalProviderProps> = ({ children }) => {
  return <StarknetProvider>{children}</StarknetProvider>;
};

export default GlobalProvider;
