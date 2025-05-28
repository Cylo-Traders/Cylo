import MarketplaceBanner from "./components/hero-section";
import Products from "./components/products";

export default function MarketplacePage() {
  return (
    <div className="flex flex-col">
      <MarketplaceBanner />
      <Products />
    </div>
  );
}
