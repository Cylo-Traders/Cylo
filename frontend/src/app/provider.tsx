import type { FC, ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import NextJsToploader from "nextjs-toploader";

import { Toaster } from "@/components/ui/sonner";
import StarknetProvider from "@/components/provider/starknet.provider";

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider: FC<GlobalProviderProps> = ({ children }) => {
  return (
    <StarknetProvider>
      <Analytics />
      <Toaster richColors theme="light" />
      <NextJsToploader
        showSpinner={false}
        showForHashAnchor={false}
        showAtBottom={false}
      />
      {children}
    </StarknetProvider>
  );
};

export default GlobalProvider;
