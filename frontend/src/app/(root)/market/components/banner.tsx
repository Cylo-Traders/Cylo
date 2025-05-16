import Wrapper from "@/components/shared/wrapper";
import SearchFilter from "./search-filter";
import { siteConfig } from "@/config/site.config";

const MarketplaceBanner = () => {
  return (
    <div className="bg-background border-b py-16 md:py-20">
      <Wrapper>
        <h2 className="text-primary max-w-[672px] text-2xl font-medium sm:text-3xl md:text-4xl lg:text-[40px]">
          {siteConfig.title}&apos;s Marketplace
        </h2>
        <p className="text-muted-foreground mt-4 max-w-[672px] text-base font-normal md:text-lg lg:leading-[1.5]">
          Browse and purchase agricultural products directly from farmers around
          the world. All transactions are secured by Starknet blockchain
          technology.
        </p>

        <SearchFilter />
      </Wrapper>
    </div>
  );
};

export default MarketplaceBanner;
