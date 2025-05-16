import MarketplaceBanner from "./components/banner";
import Products from "./components/products";

export default function MarketplacePage() {
  return (
    <div className="bg-secondary mb-16 flex flex-col md:mb-40">
      <MarketplaceBanner />
      <Products />
    </div>
  );
}
