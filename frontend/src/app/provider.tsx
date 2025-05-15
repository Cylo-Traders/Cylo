import type { FC, ReactNode } from "react";
import StarknetProvider from "@/components/provider/starknet.provider";
import { Toaster } from "@/components/ui/sonner";

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider: FC<GlobalProviderProps> = ({ children }) => {
  return (
    <StarknetProvider>
      <Toaster richColors />
      {children}
    </StarknetProvider>
  );
};

export default GlobalProvider;
