"use client";

import Link from "next/link";
import Image from "next/image";
import type { FC } from "react";
import Blockies from "react-blockies";
import { PropsWithChildren, useEffect, useState } from "react";
import {
  useAccount,
  useBalance,
  useDisconnect,
  useNetwork,
  useStarkProfile,
  useSwitchChain,
} from "@starknet-react/core";
import { HiMiniArrowUpRight } from "react-icons/hi2";
import { IoIosPower } from "react-icons/io";
import { ArrowLeftRight } from "lucide-react";
import { constants } from "starknet";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button, buttonVariants } from "@/components/ui/button";
import CopyButton from "../shared/copy";
import { useIsMobile } from "@/hook/useIsMobile";
import { isMainnet, toHexChainid } from "@/lib/helpers/chainId";
import { formatTruncatedAddress } from "@/lib/helpers/format-address";
import { STRKTokenAddress } from "@/lib/helpers/constants";
import { toast } from "sonner";

const NETWORK_MAPPING: { [key: string]: string } = {
  mainnet: constants.NetworkName.SN_MAIN,
  sepolia: constants.NetworkName.SN_SEPOLIA,
};

const networks = [
  {
    value: constants.NetworkName.SN_MAIN,
    label: "Mainnet",
  },
  {
    value: constants.NetworkName.SN_SEPOLIA,
    label: "Sepolia",
  },
];

const AccountModal: FC<PropsWithChildren> = ({ children }) => {
  const isMobile = useIsMobile();

  const { chain } = useNetwork();
  const { disconnect } = useDisconnect();
  const { address, chainId } = useAccount();
  const [imageError, setImageError] = useState(false);
  const [showETH, setShowETH] = useState(false);
  const { data: starkProfile } = useStarkProfile({
    address,
  });
  const { data: balance } = useBalance({
    address: address,
    token: showETH ? undefined : STRKTokenAddress,
  });

  const hexChainId = toHexChainid(chainId);
  const { switchChainAsync } = useSwitchChain({});
  const [selectedNetwork, setSelectedNetwork] = useState(
    NETWORK_MAPPING[chain.network],
  );

  useEffect(() => {
    setSelectedNetwork(NETWORK_MAPPING[chain.network]);
  }, [chain.network]);

  const handleNetworkChange = async (chainId: string) => {
    const networkName = networks.find(
      (network) => network.value === chainId,
    )?.label;

    if (!chainId) {
      toast.error("Unsupported network selected");
      return;
    }

    try {
      await switchChainAsync({ chainId });
      setSelectedNetwork(chainId);
      toast.success(`Successfully switched to ${networkName}`);
    } catch (err) {
      console.error(err);
      toast.error(`Failed to switch to ${networkName}`);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
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

            <span>{formatTruncatedAddress(address as string)}</span>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={isMobile ? "center" : "end"}
        className="mt-2 mr-6 sm:mr-0 md:w-96"
      >
        <div className="flex items-center justify-between gap-4 p-4">
          <div className="flex items-center gap-4">
            <div className="bg-secondary !size-10 rounded-full">
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
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium">
                {starkProfile?.name ?? "..."}
              </span>
              <span className="text-xs font-normal">
                {formatTruncatedAddress(address as string)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <CopyButton
              className={buttonVariants({
                className: "!rounded-sm",
                size: "icon",
                variant: "secondary",
              })}
              iconClassName="!size-4"
              text={starkProfile?.name || address}
            />
            <Link
              href={
                isMainnet(hexChainId)
                  ? `https://voyager.online/contract/${address}`
                  : `https://sepolia.voyager.online/contract/${address}`
              }
              target="_blank"
            >
              <Button
                size={"icon"}
                variant={"secondary"}
                className="!rounded-sm"
              >
                <HiMiniArrowUpRight className="!size-5" />
                <span className="sr-only">View on Explorer</span>
              </Button>
            </Link>
            <Button
              size={"icon"}
              variant={"secondary"}
              onClick={() => disconnect()}
              className="!bg-destructive/5 !text-destructive !rounded-sm"
            >
              <IoIosPower className="!size-5" />
              <span className="sr-only">Disconnect</span>
            </Button>
          </div>
        </div>
        <DropdownMenuSeparator />

        <div className="flex flex-col items-center gap-1 py-6 text-center select-none">
          <span className="text-muted-foreground text-[11px] font-medium">
            TOTAL BALANCE
          </span>
          <p className="flex items-center gap-2.5 text-2xl font-bold">
            {balance
              ? balance?.formatted.length > 7
                ? `${balance.formatted.slice(0, 7)} ${balance.symbol}`
                : `${balance?.formatted} ${balance.symbol}`
              : "0 STRK"}

            <ArrowLeftRight
              onClick={() => setShowETH(!showETH)}
              className="size-5 cursor-pointer"
              role="button"
            />
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 px-3 py-2">
          <p className="pl-2 text-sm font-medium">Select Network</p>

          <Select value={selectedNetwork} onValueChange={handleNetworkChange}>
            <SelectTrigger className="!h-11 w-[130px] sm:w-[180px]">
              <SelectValue
                placeholder={
                  selectedNetwork
                    ? networks.find(
                        (network) => network.value === selectedNetwork,
                      )?.label
                    : "Select Network..."
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {networks.map((network) => (
                  <SelectItem
                    key={network.value}
                    defaultChecked={selectedNetwork === network.value}
                    value={network.value}
                  >
                    {network.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountModal;
