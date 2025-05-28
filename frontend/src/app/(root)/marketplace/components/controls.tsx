"use client";

import { VscFilter } from "react-icons/vsc";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Filters from "./filters";

const Controls = () => {
  return (
    <div className="bg-background flex w-full items-center justify-between gap-4 rounded-2xl border p-4">
      <div className="flex flex-1 items-center gap-4">
        <p className="hidden pl-2 text-sm font-medium sm:flex md:hidden lg:flex">
          Sort by:
        </p>

        <Select>
          <SelectTrigger
            defaultValue={["featured"]}
            className="!h-11 w-full sm:w-[160px]"
          >
            <SelectValue placeholder="Featured" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Customer Rating</SelectItem>
              <SelectItem value="newest">Newest Arrivals</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-4">
        <p className="hidden pl-2 text-sm font-medium sm:flex">
          Showing 1-8 of 24 products
        </p>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              size={"icon"}
              variant={"outline"}
              className="flex !rounded-sm md:hidden"
            >
              <VscFilter className="!size-5" />
              <span className="sr-only">Filters</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="right">
            <VisuallyHidden>
              <SheetHeader>
                <SheetTitle />
                <SheetDescription />
              </SheetHeader>
            </VisuallyHidden>
            <div className="flex h-full flex-col justify-between">
              <Filters />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Controls;
