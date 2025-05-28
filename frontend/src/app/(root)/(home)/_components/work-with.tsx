import Image from "next/image";
import Wrapper from "@/components/shared/wrapper";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const WorkWith = () => {
  return (
    <div className="bg-primary mb-16 py-6 sm:h-[124px] sm:py-0 md:mb-40">
      <Wrapper className="flex h-full flex-wrap items-center justify-between gap-4 sm:gap-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <Avatar className="size-11 border-2 border-[#FCCD29]">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JJ</AvatarFallback>
            </Avatar>
            <Avatar className="-ml-4 size-11 border-2 border-[#FCCD29]">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>DN</AvatarFallback>
            </Avatar>
            <Avatar className="-ml-4 size-11 border-2 border-[#FCCD29]">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <Avatar className="-ml-4 size-11 border-2 border-[#FCCD29]">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>HD</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col gap-1 text-white">
            <p className="text-base leading-none font-semibold lg:text-lg">
              10k+ Farmers
            </p>
            <p className="text-sm leading-none font-semibold md:text-base">
              Connected to Consumers.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <Image
            src="/assets/starknet-light.svg"
            alt="starknet"
            width={125}
            height={32}
            priority
            quality={100}
          />
          <Image
            src="/assets/argent-light.svg"
            alt="starknet"
            width={90}
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
