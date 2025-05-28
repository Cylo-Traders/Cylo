"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiSearch2Line } from "react-icons/ri";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/utils";

const searchFilterSchema = z.object({
  product: z
    .string({
      required_error: "Please specify product.",
    })
    .min(2, "Product name must be at least 2 characters")
    .max(50),
  category: z
    .string({
      required_error: "Category is required",
    })
    .min(2, "Category is required"),
});

type SearchFilterSchemaProps = z.infer<typeof searchFilterSchema>;

const SearchFilter = () => {
  // 1. Define your form.
  const form = useForm<SearchFilterSchemaProps>({
    resolver: zodResolver(searchFilterSchema),
    defaultValues: {
      product: "",
      category: "",
    },
  });

  const {
    formState: { errors, isSubmitting },
  } = form;

  // 2. Define a submit handler.
  async function onSubmit(values: SearchFilterSchemaProps) {
    await new Promise((r) => setTimeout(r, 1500));
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-6 flex w-full flex-col gap-4 sm:flex-row"
      >
        <FormField
          control={form.control}
          name="product"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <div className="relative">
                  <RiSearch2Line className="text-muted-foreground absolute top-1/2 left-4 !size-5 -translate-y-1/2" />
                  <Input
                    aria-invalid={!!errors.product}
                    disabled={isSubmitting}
                    placeholder="Search for agricultural products..."
                    className="pl-12"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full flex-row gap-4 sm:w-max">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex-1">
                <Select
                  disabled={isSubmitting}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      aria-invalid={!!errors.category}
                      className="bg-background !h-12 w-full !px-5 sm:w-[200px]"
                    >
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            isLoading={isSubmitting}
            loadingText="Searching..."
            type="submit"
            className="!rounded-md !pr-7 !pl-6"
            size="lg"
          >
            <RiSearch2Line className="!size-5" />
            <span>Search</span>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SearchFilter;
