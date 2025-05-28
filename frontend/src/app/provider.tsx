"use client";

import gsap from "gsap";
import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import type { LenisRef } from "lenis/react";
import type { FC, ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import NextJsToploader from "nextjs-toploader";

import { Toaster } from "@/components/ui/sonner";
import StarknetProvider from "@/components/provider/starknet.provider";

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider: FC<GlobalProviderProps> = ({ children }) => {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
      <StarknetProvider>
        <Analytics />
        <Toaster richColors theme="light" />
        <NextJsToploader
          showSpinner={false}
          showForHashAnchor={false}
          showAtBottom={false}
          color="var(--primary)"
        />
        {children}
      </StarknetProvider>
    </ReactLenis>
  );
};

export default GlobalProvider;
