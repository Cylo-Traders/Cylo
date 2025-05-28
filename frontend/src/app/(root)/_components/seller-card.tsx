import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FC } from "react";
import { GoPlus } from "react-icons/go";

const SellerCard: FC<IFarmer> = ({ name, username, avatar, country }) => {
  return (
    <div className="border-foreground group rounded-[40px/40px] border-2 p-6">
      <div className="mb-5">
        <div className="bg-secondary border-foreground relative aspect-square w-full overflow-hidden rounded-[40px/40px] border-2">
          <Image
            src={avatar}
            alt={name ?? username ?? "Farmer's Image"}
            priority
            quality={100}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-125"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <p className="text-base font-semibold">
          {name ? name : `@${username}`}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-2 md:gap-4">
          <p className="text-sm font-medium">{country}</p>

          <Button size="sm" className="!h-8">
            <span className="text-xs font-semibold">Explore Products</span>
            <GoPlus className="!size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SellerCard;
