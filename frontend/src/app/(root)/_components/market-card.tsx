"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { GoPlus } from "react-icons/go";
import { FC } from "react";
import Image from "next/image";
import { cn, getInitials } from "@/lib/utils";
import StarRating from "@/components/shared/star-rating";
import { useCartStore } from "@/lib/store";
import { toast } from "sonner";

interface ProductCardProps {
  product: IProduct;
}

const MarketCard: FC<ProductCardProps> = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const { image, title, ratings, available, farmer, price } = product;

  return (
    <div className="border-foreground group rounded-[40px/40px] border-2 p-6">
      <div className="mb-5 flex items-center gap-3">
        <Avatar className="size-10">
          <AvatarImage src={farmer?.avatar ?? ""} />
          <AvatarFallback className="text-sm font-medium">
            {getInitials(farmer?.name ?? "Anonymous")}
          </AvatarFallback>
        </Avatar>
        <p className="text-xs font-semibold">@{farmer?.username}</p>
      </div>

      <div className="mb-5">
        <div className="bg-secondary relative aspect-square w-full overflow-hidden rounded-[40px/40px]">
          <Image
            src={image}
            alt={title}
            priority
            quality={100}
            fill
            className={cn(
              "object-cover transition-transform duration-500 group-hover:scale-125",
              {
                "brightness-50": !available,
              },
            )}
          />

          {!available && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Button
                variant={"destructive"}
                disabled
                className="-rotate-12 !opacity-100"
              >
                Our of Stock
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between gap-6">
          <p className="truncate text-base font-semibold">{title}</p>
          <p className="text-primary text-lg font-bold">${price}</p>
        </div>
        <p className="text-xs font-medium">
          {available ? "In Stock" : "Unavailable"}
        </p>

        <div className="flex h-8 flex-wrap items-center justify-between gap-2 md:gap-4">
          <div className="flex items-center gap-0.5">
            <StarRating rating={ratings} />
          </div>

          {available && (
            <Button
              size="sm"
              className="!h-full"
              disabled={!available}
              onClick={() => {
                toast.success(`"${product.title}" added to cart.`);
                addToCart(product);
              }}
            >
              <span className="text-xs font-semibold">Add to cart</span>
              <GoPlus className="!size-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketCard;
