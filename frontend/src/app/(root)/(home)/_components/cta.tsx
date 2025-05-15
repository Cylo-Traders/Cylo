import { RiArrowRightUpLine } from "react-icons/ri";

import Wrapper from "@/components/shared/wrapper";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site.config";

const CTA = () => {
  return (
    <div className="mb-16 md:mb-56">
      <Wrapper>
        <div className="bg-foreground rounded-4xl px-6 pt-20 pb-10 sm:px-8 md:px-12 md:py-32">
          <div className="mx-auto max-w-4xl">
            <div className="max-w-xl">
              <h2 className="font-display text-background text-2xl font-medium text-balance sm:text-3xl md:text-4xl">
                Join the Future of Agriculture
              </h2>
              <div className="mt-3 flex sm:mt-6">
                <p className="text-background/80 text-base sm:leading-[1.6]">
                  Whether you&apos;re a farmer looking to sell directly or a
                  buyer seeking fresh, quality products, {siteConfig.title} is
                  your trusted marketplace.
                </p>
              </div>

              <div className="mt-10 flex flex-col items-center gap-2 border-t border-white/10 pt-10 sm:flex-row">
                <Button
                  size="lg"
                  variant={"secondary"}
                  className="w-full !px-6 sm:w-max"
                >
                  <span>Get Started</span>
                </Button>
                <Button
                  size="lg"
                  variant={"link"}
                  className="!text-secondary group w-full !px-6 sm:w-max"
                >
                  <span>Explore Marketplace</span>
                  <RiArrowRightUpLine className="!size-4 transition-all ease-in-out group-hover:rotate-45" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default CTA;
