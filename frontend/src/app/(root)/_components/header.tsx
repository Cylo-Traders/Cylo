import Link from "next/link";

import { HiMiniBars2 } from "react-icons/hi2";
import { TbLeaf2 } from "react-icons/tb";

import { siteConfig } from "@/config/site.config";
import Wrapper from "@/components/shared/wrapper";
import ConnectWallet from "@/components/shared/connect";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 left-0 z-50 flex h-20 w-full flex-col justify-end backdrop-blur-3xl transition-colors duration-300 ease-in-out md:h-28">
      <Wrapper className="mt-auto flex items-center justify-between pb-2 md:pb-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-extrabold"
        >
          <TbLeaf2 className="!size-7" />
          <span>{siteConfig.title}.</span>
        </Link>
        <div className="flex items-center justify-end gap-2 sm:gap-4">
          <ConnectWallet />
          <Button size="icon" variant={"ghost"}>
            <HiMiniBars2 className="!size-5" />
          </Button>
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
