import Link from "next/link";
import Image from "next/image";
import { RiArrowRightUpLine } from "react-icons/ri";

import Wrapper from "@/components/shared/wrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site.config";

const HomeHeroSection = () => {
  return (
    <div className="relative lg:h-[calc(100dvh-124px)]">
      <div className="absolute inset-0 size-full">
        {/* <div className=" size-full absolute" /> */}
        <Image
          src="/images/home-hero.avif"
          alt="a-tractor-is-driving-through-a-field-at-sunset"
          fill
          className="size-full object-cover object-center"
          quality={100}
          priority
          sizes="100vw"
          loading="eager"
          placeholder="blur"
          blurDataURL="/images/home-hero.avif"
          unoptimized
          fetchPriority="high"
          draggable={false}
          decoding="async"
        />
      </div>
      <div className="from-background/90 via-background/85 to-background/25 relative bg-gradient-to-r pt-40 pb-20 sm:py-72 lg:h-full">
        <Wrapper>
          <h1 className="text-foreground max-w-[805px] text-3xl leading-[1.3] font-semibold sm:text-4xl md:text-5xl lg:text-[64px]">
            Revolutionizing <span className="text-primary">Agriculture</span>{" "}
            with Blockchain Technology.
          </h1>
          <p className="mt-2 max-w-[700px] text-base font-normal md:text-lg">
            {siteConfig.ogDescription}
          </p>
          <Link
            href="https://www.starknet.io/"
            target="_blank"
            className="bg-background mt-6 inline-flex items-center gap-3 rounded-full border px-3.5 py-1.5"
          >
            <span className="text-[13px] font-medium">Powered by</span>{" "}
            <Image
              src="/assets/starknet-dark.svg"
              alt="starknet"
              width={85}
              height={14}
              priority
              quality={100}
            />
          </Link>

          <div className="mt-10 flex w-full flex-col gap-4 sm:flex-row sm:gap-6">
            <Link
              href="/marketplace"
              className={buttonVariants({
                size: "lg",
              })}
            >
              <span>Explore Marketplace</span>
            </Link>
            <Button variant="outline" size="lg" className="group">
              <span>Start Trading Now</span>
              <RiArrowRightUpLine className="size-5 transition-all ease-in-out group-hover:rotate-45 sm:!size-6" />
            </Button>
          </div>
        </Wrapper>
      </div>
    </div>
  );
};

export default HomeHeroSection;
