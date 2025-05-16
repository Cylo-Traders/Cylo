import Wrapper from "@/components/shared/wrapper";
import { siteConfig } from "@/config/site.config";
import { BanknoteArrowUp, Check, ShoppingCart } from "lucide-react";

const howItWorksData = [
  {
    title: "Place an Order with Crypto Confidence",
    description:
      "Buyers browse available farm products, choose what they need, and complete their purchase securely using cryptocurrency. Payments are held in smart contract escrow until delivery is confirmed, ensuring both parties are protected.",
    icon: ShoppingCart,
  },
  {
    title: "Confirm Product Delivery & Quality",
    description:
      "Once the buyer receives their goods and verifies product quality, they confirm delivery on the platform. This confirmation automatically triggers the release of funds held in escrow to the seller, maintaining full transparency and trust.",
    icon: Check,
  },
  {
    title: "Receive Transparent Payment via Starknet",
    description:
      "Farmers are paid out directly through Starknet’s efficient Layer 2 infrastructure, receiving their earnings minus a minimal platform service fee. Every transaction is verifiable on-chain, ensuring financial clarity and trustless fulfillment.",
    icon: BanknoteArrowUp,
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="mb-16 md:mb-56">
      <Wrapper className="space-y-12">
        <div className="w-full">
          <h2 className="text-primary max-w-[672px] text-2xl font-medium sm:text-3xl md:text-4xl lg:text-[40px]">
            How {siteConfig.title} Works
          </h2>
          <p className="text-muted-foreground mt-4 max-w-[672px] text-base font-normal md:text-lg lg:leading-[1.5]">
            Our platform makes agricultural trading simple, secure, and
            transparent.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {howItWorksData.map((item, index) => (
            <div
              key={index}
              className="bg-background rounded-3xl border p-6 transition-all delay-150 duration-300 hover:-translate-y-3 hover:scale-105 hover:shadow-md lg:p-8"
            >
              <div className="bg-secondary mb-4 flex size-20 items-center justify-center rounded-full">
                <item.icon className="text-primary size-9" />
              </div>
              <h3 className="font-display mt-6 text-xl font-semibold md:text-2xl">
                {item.title}
              </h3>
              <p className="text-muted-foreground mt-4 text-base leading-[1.6]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  );
};

export default HowItWorks;
