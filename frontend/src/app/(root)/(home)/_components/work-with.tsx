import Image from "next/image";
import Wrapper from "@/components/shared/wrapper";

const WorkWith = () => {
  return (
    <div className="bg-secondary/50 mb-16 border-y py-10 md:mb-56 md:py-32">
      <Wrapper className="space-y-12">
        <div className="flex items-center gap-10">
          <p className="text-sm font-medium tracking-wide sm:text-base">
            We&apos;ve worked with hundreds of amazing people
          </p>
          <span className="bg-border hidden h-px w-full flex-1 sm:flex" />
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
          <Image
            src="/assets/starknet.svg"
            alt="starknet"
            width={125}
            height={32}
            priority
            quality={100}
          />
          <Image
            src="/assets/argent.svg"
            alt="starknet"
            width={104}
            height={301}
            priority
            quality={100}
          />
        </div>
      </Wrapper>
    </div>
  );
};

export default WorkWith;
