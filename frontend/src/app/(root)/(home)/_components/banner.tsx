import Image from "next/image";
import Link from "next/link";

import Wrapper from "@/components/shared/wrapper";
import { siteConfig } from "@/config/site.config";
import { Button } from "@/components/ui/button";
import { RiArrowRightUpLine } from "react-icons/ri";

const HomeBanner = () => {
  return (
    <div className="py-16 md:py-40">
      <Wrapper>
        <Link
          href="https://www.starknet.io/"
          target="_blank"
          className="bg-secondary mb-4 inline-flex items-center gap-3 rounded-full border px-3 py-1 md:-rotate-3"
        >
          <span className="flex size-2 animate-pulse rounded-full bg-green-700" />
          <span className="text-xs font-medium">Powered by</span>{" "}
          <Image
            src="/assets/starknet.svg"
            alt="starknet"
            width={85}
            height={14}
            priority
            quality={100}
          />
        </Link>
        <h1 className="text-primary max-w-5xl text-3xl leading-[1.3] font-medium sm:text-4xl md:text-5xl lg:text-[64px]">
          Revolutionizing Agriculture with Blockchain Technology
        </h1>
        <p className="text-muted-foreground mt-4 max-w-3xl text-base font-normal md:text-lg lg:text-xl lg:leading-[1.5]">
          {siteConfig.ogDescription}
        </p>

        <div className="flex flex-col items-center gap-4 border-t border-white/10 pt-10 sm:flex-row sm:gap-2">
          <Link href="/market">
            <Button
              size="lg"
              variant={"secondary"}
              className="w-full !px-6 sm:w-max"
            >
              <span>Explore Marketplace</span>
            </Button>
          </Link>
          <Button
            size="lg"
            variant={"link"}
            className="group w-full !px-6 sm:w-max"
          >
            <span>Start Trading Now</span>
            <RiArrowRightUpLine className="!size-4 transition-all ease-in-out group-hover:rotate-45" />
          </Button>
        </div>
      </Wrapper>
    </div>
  );
};

export default HomeBanner;
