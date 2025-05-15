import type { FC, ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";

import { Toaster } from "@/components/ui/sonner";
import StarknetProvider from "@/components/provider/starknet.provider";

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider: FC<GlobalProviderProps> = ({ children }) => {
  return (
    <StarknetProvider>
      <Analytics />
      <Toaster richColors />
      {children}
    </StarknetProvider>
  );
};

export default GlobalProvider;
