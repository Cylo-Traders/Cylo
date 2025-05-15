import Wrapper from "@/components/shared/wrapper";
import { siteConfig } from "@/config/site.config";

const Banner = () => {
  return (
    <div className="py-16 md:py-40">
      <Wrapper>
        <div className=""></div>
        <h1 className="text-primary w-max max-w-5xl text-3xl leading-[1.3] font-medium sm:text-4xl md:text-5xl lg:text-[64px]">
          {siteConfig.title}: Empowering Farmers, <br /> Connecting Buyers.
        </h1>
        <p className="text-muted-foreground mt-4 max-w-3xl text-base font-normal md:text-lg lg:text-xl lg:leading-[1.5]">
          {siteConfig.description}
        </p>
      </Wrapper>
    </div>
  );
};

export default Banner;
