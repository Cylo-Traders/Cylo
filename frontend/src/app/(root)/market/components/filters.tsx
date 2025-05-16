import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { categories } from "@/lib/utils";
import { Star } from "lucide-react";

const Filters = () => {
  return (
    <div className="flex size-full flex-col pt-10 sm:pt-0">
      <div className="flex items-center justify-between gap-4">
        <p className="text-lg font-semibold">Filters</p>
        <p className="cursor-pointer text-sm font-semibold text-green-700">
          Reset All
        </p>
      </div>

      <Accordion
        defaultValue={["item-1"]}
        type="multiple"
        className="my-2 w-full"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2">
              {categories.map((category) => (
                <div
                  key={category.value}
                  className="flex items-center space-x-2"
                >
                  <Checkbox id={`category-${category.value.toLowerCase()}`} />
                  <label
                    htmlFor={`category-${category.value.toLowerCase()}`}
                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Product Type</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2">
              {["Organic", "Conventional", "Fair Trade", "Local"].map(
                (type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox id={`type-${type.toLowerCase()}`} />
                    <label
                      htmlFor={`type-${type.toLowerCase()}`}
                      className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {type}
                    </label>
                  </div>
                ),
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Seller Rating</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox id={`rating-${rating}`} />
                  <label
                    htmlFor={`rating-${rating}`}
                    className="flex items-center text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {Array(rating)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className="size-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    {Array(5 - rating)
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i} className="size-4 text-gray-300" />
                      ))}
                    <span className="ml-1">& Up</span>
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button size={"lg"} className="mt-auto w-full rounded-sm">
        Apply Filters
      </Button>
    </div>
  );
};

export default Filters;
