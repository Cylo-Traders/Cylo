"use client";

import Image from "next/image";
import type { FC } from "react";
import { PropsWithChildren, useState } from "react";
import { useConnect } from "@starknet-react/core";

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

const WalletModal: FC<PropsWithChildren> = ({ children }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { connectors, connect, pendingConnector } = useConnect();

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
        <div className="flex flex-col gap-2">
          {connectors.map((connector, index) => {
            const getIconSource = () => {
              if (typeof connector.icon === "string") {
                return connector.icon;
              }

              if (
                connector.icon &&
                typeof connector.icon === "object" &&
                "light" in connector.icon
              ) {
                return connector.icon.light;
              }

              return null;
            };

            const src = getIconSource();
            const isSvg =
              typeof src === "string" && src.trim().startsWith("<svg");

            return (
              <Button
                size={"lg"}
                variant={"secondary"}
                className="w-full items-center justify-start !gap-3 !px-4"
                key={connector.id ?? index}
                isLoading={pendingConnector?.id === connector.id}
                loadingText={`Connecting ${pendingConnector?.name}...`}
                onClick={() => {
                  connect({ connector });
                  setShowModal(false);
                }}
              >
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
              </Button>
            );
          })}
        </div>
        <DialogFooter>
          <p className="text-muted-foreground text-sm leading-6 tracking-wide">
            By connecting, you agree to our {siteConfig.title}&apos;s{" "}
            <strong>Terms of Service</strong> and consent to it&apos;{" "}
            <strong>Privacy Policy</strong>.
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WalletModal;
