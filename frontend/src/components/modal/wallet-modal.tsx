import Image from "next/image";
import type { FC } from "react";
import { PropsWithChildren, useState } from "react";
import { Connector, useConnect } from "@starknet-react/core";
import { MdKeyboardArrowRight } from "react-icons/md";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site.config";
import Link from "next/link";

const WalletModal: FC<PropsWithChildren> = ({ children }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { connectors, connectAsync, pendingConnector } = useConnect();

  const getIconSource = (icon: string | { dark: string; light: string }) => {
    if (typeof icon === "string") {
      return icon;
    }

    if (icon && typeof icon === "object" && "light" in icon) {
      return icon.light;
    }

    return null;
  };

  const handleConnect = async (connector: Connector) => {
    try {
      await connectAsync({ connector });
      setShowModal(false);
    } catch (error) {
      console.error("Connection failed:", error);
    }
  };

  const getInstallUrl = (id: string) => {
    switch (id) {
      case "argentX":
        return "https://www.argent.xyz/argent-x/";
      case "braavos":
        return "https://braavos.app/";
      default:
        return "#";
    }
  };

  const installedConnectors = connectors.filter((connector) =>
    connector.available ? connector.available() : true,
  );

  const uninstalledConnectors = connectors.filter(
    (connector) => !(connector.available ? connector.available() : true),
  );

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        {children ?? <Button>Connect Wallet</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription>
            Please <strong>connect your wallet</strong> for a swift and secure
            transaction.
          </DialogDescription>
        </DialogHeader>
        <div className="my-2 flex flex-col gap-2">
          {installedConnectors.length > 0 && (
            <>
              <p className="ml-2 text-xs font-medium uppercase">
                Detected Wallets
              </p>
              {installedConnectors.map((connector, index) => {
                const src = getIconSource(connector.icon);
                const isSvg =
                  typeof src === "string" && src.trim().startsWith("<svg");

                return (
                  <Button
                    size={"lg"}
                    variant={"secondary"}
                    className="group w-full items-center justify-between !gap-3 !px-4"
                    key={connector.id ?? index}
                    isLoading={pendingConnector?.id === connector.id}
                    loadingText={`Connecting ${pendingConnector?.name}...`}
                    onClick={() => handleConnect(connector)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="!size-5 overflow-hidden rounded-[5px]">
                        {isSvg ? (
                          <div
                            className="!size-5 object-cover"
                            dangerouslySetInnerHTML={{ __html: src ?? "" }}
                          />
                        ) : src ? (
                          <Image
                            src={src}
                            alt={connector.name}
                            priority
                            quality={100}
                            width={35}
                            height={35}
                            className="!size-full object-cover"
                            loader={({ src }: { src: string }) => {
                              return src;
                            }}
                          />
                        ) : null}
                      </div>
                      <span>{connector.name}</span>
                    </div>
                  </Button>
                );
              })}
            </>
          )}

          {uninstalledConnectors.length > 0 && (
            <>
              <p className="mt-2 ml-2 text-xs font-medium uppercase">
                Other Wallets
              </p>
              {uninstalledConnectors.map((connector, index) => {
                const src = getIconSource(connector.icon);
                const isSvg =
                  typeof src === "string" && src.trim().startsWith("<svg");

                return (
                  <Link
                    key={connector.id ?? index}
                    href={getInstallUrl(connector.id)}
                    target="_blank"
                  >
                    <Button
                      size={"lg"}
                      variant={"secondary"}
                      className="group w-full items-center justify-between !gap-3 !px-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="!size-5 overflow-hidden rounded-[5px]">
                          {isSvg ? (
                            <div
                              className="!size-5 object-cover"
                              dangerouslySetInnerHTML={{ __html: src ?? "" }}
                            />
                          ) : src ? (
                            <Image
                              src={src}
                              alt={connector.name}
                              priority
                              quality={100}
                              width={35}
                              height={35}
                              className="!size-full object-cover"
                              loader={({ src }: { src: string }) => {
                                return src;
                              }}
                            />
                          ) : null}
                        </div>
                        <span>{`Install ${connector.name}`}</span>
                      </div>
                      <MdKeyboardArrowRight className="mr-3 !size-5 transition-all duration-200 ease-in-out group-hover:mr-0 group-hover:scale-100 group-hover:opacity-100 sm:scale-0 sm:opacity-0" />
                    </Button>
                  </Link>
                );
              })}
            </>
          )}
        </div>
        <DialogFooter>
          <p className="text-muted-foreground text-sm leading-6">
            By connecting, you agree to our {siteConfig.title}&apos;s{" "}
            <strong>Terms of Service</strong> and consent to its{" "}
            <strong>Privacy Policy</strong>.
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WalletModal;
