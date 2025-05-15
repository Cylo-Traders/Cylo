import { siteConfig } from "@/config/site.config";
import { ARGENT_WEBWALLET_URL, CHAIN_ID } from "./constants";
import {
  isInArgentMobileAppBrowser,
  ArgentMobileConnector,
} from "starknetkit/argentMobile";
import {
  BraavosMobileConnector,
  isInBraavosMobileAppBrowser,
} from "starknetkit/braavosMobile";
import { InjectedConnector } from "starknetkit/injected";
import { WebWalletConnector } from "starknetkit/webwallet";

export const availableConnectors = () => {
  if (isInArgentMobileAppBrowser()) {
    return [
      ArgentMobileConnector.init({
        options: {
          url: typeof window !== "undefined" ? window.location.href : "",
          dappName: siteConfig.title,
          chainId: CHAIN_ID,
        },
      }),
    ];
  }

  if (isInBraavosMobileAppBrowser()) {
    return [BraavosMobileConnector.init({})];
  }

  return [
    new InjectedConnector({ options: { id: "argentX", name: "Argent X" } }),
    new InjectedConnector({ options: { id: "braavos", name: "Braavos" } }),
    ArgentMobileConnector.init({
      options: {
        url: typeof window !== "undefined" ? window.location.href : "",
        dappName: siteConfig.title,
        chainId: CHAIN_ID,
      },
    }),
    new WebWalletConnector({ url: ARGENT_WEBWALLET_URL, theme: "dark" }),
  ];
};

export const connectors = availableConnectors();
