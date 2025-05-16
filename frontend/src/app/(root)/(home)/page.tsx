import HomeBanner from "./_components/banner";
import CTA from "../_components/cta";
import HowItWorks from "./_components/how-it-works";
import Testimonies from "./_components/testimonies";
import WhyChooseUs from "./_components/why-choose-us";
import WorkWith from "./_components/work-with";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HomeBanner />
      <WorkWith />
      <HowItWorks />
      <Testimonies />
      <WhyChooseUs />
      <CTA />
    </div>
  );
}
