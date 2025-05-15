import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const Wrapper = forwardRef<HTMLElement, React.ComponentProps<"section">>(
  ({ children, className, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn("mx-auto w-full max-w-[1240px] px-6", className)}
        {...props}
      >
        {children}
      </section>
    );
  },
);

Wrapper.displayName = "Wrapper";

export default Wrapper;
