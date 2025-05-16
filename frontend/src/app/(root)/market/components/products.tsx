import Wrapper from "@/components/shared/wrapper";
import Filters from "./filters";
import Controls from "./controls";
import ProductCard from "@/components/shared/product-card";

const Products = () => {
  return (
    <div className="flex-1 pt-10 pb-16 md:pb-40">
      <Wrapper className="flex gap-6">
        <div className="bg-background sticky top-[120px] left-0 hidden h-max w-full max-w-[300px] rounded-2xl border p-5 md:top-[152px] md:flex">
          <Filters />
        </div>

        <div className="flex w-full flex-col gap-6">
          <Controls />

          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <ProductCard key={index} />
            ))}
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Products;
