"use client";

import Image from "next/image";
import type { FC } from "react";
import Blockies from "react-blockies";
import { PropsWithChildren, useState } from "react";
import {
  useAccount,
  useDisconnect,
  useStarkProfile,
} from "@starknet-react/core";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { formatAddress } from "@/lib/utils";
import CopyButton from "../shared/copy";
// import ERC20ABIJson from "@/lib/abi/token.abi.json";

// Convert ABI to use 'state_mutability' instead of 'stateMutability'
// const ERC20ABI = ERC20ABIJson.map((item) => {
//   if (item.type === "function" && item.stateMutability) {
//     return {
//       ...item,
//       state_mutability: item.stateMutability,
//     };
//   }
//   return item;
// });

const AccountModal: FC<PropsWithChildren> = ({ children }) => {
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const [imageError, setImageError] = useState(false);
  const { data: starkProfile } = useStarkProfile({
    address,
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children ?? (
          <Button variant="outline" className="pl-2">
            <div className="bg-secondary !size-6 overflow-clip rounded-full">
              {!imageError && starkProfile?.profilePicture ? (
                <Image
                  priority
                  quality={100}
                  src={starkProfile?.profilePicture}
                  className="!size-full rounded-full object-cover"
                  width={24}
                  height={24}
                  alt="starknet profile"
                  onError={() => setImageError(true)}
                  unoptimized
                  loader={({ src }: { src: string }) => {
                    return src;
                  }}
                />
              ) : (
                <Blockies
                  seed={address || ""}
                  className="!size-full rounded-full object-cover"
                />
              )}
            </div>

            <span>{formatAddress(address as string)}</span>
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent align="end" className="mt-2 flex w-80 flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold tracking-wide">Connected</p>
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <div className="bg-secondary !size-20 rounded-full">
            {!imageError && starkProfile?.profilePicture ? (
              <Image
                priority
                quality={100}
                src={starkProfile?.profilePicture}
                className="!size-full rounded-full object-cover"
                width={24}
                height={24}
                alt="starknet profile"
                onError={() => setImageError(true)}
              />
            ) : (
              <Blockies
                seed={address || ""}
                className="!size-full rounded-full object-cover"
              />
            )}
          </div>

          <CopyButton text={starkProfile?.name || address}>
            <span className="text-sm font-medium">
              {formatAddress(address as string)}
            </span>
          </CopyButton>
        </div>

        {/* <div className="bg-secondary/50 rounded-lg px-4 py-3">
          <p className="mb-2 text-sm font-bold tracking-wide">Assets</p>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <div className="flex items-center gap-4">
                <div className="size-10 overflow-hidden rounded-full">
                  <Image
                    src="/assets/eth.svg"
                    alt="Eth Token"
                    priority
                    quality={100}
                    width={32}
                    height={32}
                    className="size-full object-cover"
                  />
                </div>

                <div className="flex flex-col">
                  <p className="text-sm font-medium">ETH</p>
                  <p className="text-muted-foreground text-base">Ethereum</p>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <Button
          size={"lg"}
          variant={"outline"}
          className="w-full"
          onClick={() => disconnect()}
        >
          <span className="text-destructive !font-medium">Disconnect</span>
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default AccountModal;
