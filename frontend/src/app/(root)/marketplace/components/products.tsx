import { GoArrowRight } from "react-icons/go";

import { Button } from "@/components/ui/button";
import Wrapper from "@/components/shared/wrapper";

import MarketCard from "../../_components/market-card";
import SellerCard from "../../_components/seller-card";

import products from "@/lib/json/products.json";
import farmers from "@/lib/json/farmers.json";

const Products = () => {
  return (
    <div className="mb-16 md:mb-40">
      <div className="space-y-10">
        <div className="flex flex-col items-center gap-10">
          <Wrapper className="flex items-center justify-between">
            <h2 className="text-foreground max-w-[672px] text-2xl leading-none font-semibold sm:text-3xl md:text-4xl lg:text-[40px]">
              Explore Marketplace
            </h2>
          </Wrapper>
          <Wrapper
            max2
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {products.slice(0, 6).map((product, index) => (
              <MarketCard product={product} key={index} />
            ))}
          </Wrapper>
          <Button>
            <span>View All Items</span>
            <GoArrowRight className="!size-5" />
          </Button>
        </div>

        <div className="flex flex-col items-center gap-10">
          <Wrapper className="flex items-center justify-between">
            <h2 className="text-foreground max-w-[672px] text-2xl leading-none font-semibold sm:text-3xl md:text-4xl lg:text-[40px]">
              Explore Sellers
            </h2>
            <Button variant={"outline"}>View All</Button>
          </Wrapper>
          <Wrapper
            max2
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
          >
            {farmers.map((farmer, index) => (
              <SellerCard {...farmer} key={index} />
            ))}
          </Wrapper>
        </div>
      </div>
    </div>
  );
};

export default Products;
