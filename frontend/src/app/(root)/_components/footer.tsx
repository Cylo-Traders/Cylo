import Image from "next/image";
import Link from "next/link";
import { RiTwitterXLine } from "react-icons/ri";
import { RxInstagramLogo } from "react-icons/rx";
import { PiLinkedinLogo } from "react-icons/pi";
import { PiFacebookLogo } from "react-icons/pi";

import Wrapper from "@/components/shared/wrapper";
import { siteConfig } from "@/config/site.config";
import { TbLeaf2 } from "react-icons/tb";

const footerLinks = [
  {
    title: "Quick Links",
    routes: [
      {
        label: "Home",
        path: "/",
      },
      {
        label: "Features",
        path: "/",
      },
      {
        label: "How It Works",
        path: "/",
      },
      {
        label: "Trust & Security",
        path: "/",
      },
      {
        label: "Marketplace",
        path: "/",
      },
    ],
  },
  {
    title: "Legal",
    routes: [
      {
        label: "Terms of Service",
        path: "/",
      },
      {
        label: "Privacy Policy",
        path: "/",
      },
      {
        label: "Cookie Policy",
        path: "/",
      },
      {
        label: "Disclaimers",
        path: "/",
      },
    ],
  },
  {
    title: "Contact",
    routes: [
      {
        label: "About US",
        path: "/",
      },
      {
        label: "FAQ",
        path: "/",
      },
      {
        label: "Contact",
        path: "/",
      },
      {
        label: "Support",
        path: "/",
      },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="flex w-full flex-col">
      <Wrapper>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          <nav>
            <ul role="list" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <div className="font-display text-foreground text-sm font-semibold tracking-wider">
                    {link.title}
                  </div>
                  <ul
                    role="list"
                    className="text-muted-foreground mt-4 text-sm"
                  >
                    {link.routes.map((route) => (
                      <li key={route.label} className="mt-4">
                        <Link
                          className="hover:text-foreground transition"
                          href={route.path}
                        >
                          {route.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex lg:justify-end">
            <div className="max-w-[363px]">
              <Link
                href="/"
                className="flex w-fit items-center gap-2 text-xl font-extrabold"
              >
                <TbLeaf2 className="!size-7" />
                <span>{siteConfig.title}.</span>
              </Link>
              <p className="text-muted-foreground mt-3 text-[15px] leading-[1.6]">
                {siteConfig.ogDescription}
              </p>

              <div className="mt-6 flex items-center gap-5">
                <RiTwitterXLine className="text-muted-foreground hover:text-primary size-6 cursor-pointer transition" />
                <RxInstagramLogo className="text-muted-foreground hover:text-primary size-6 cursor-pointer transition" />
                <PiLinkedinLogo className="text-muted-foreground hover:text-primary size-6 cursor-pointer transition" />
                <PiFacebookLogo className="text-muted-foreground hover:text-primary size-6 cursor-pointer transition" />
                <span className="bg-border h-px w-full flex-1" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-24 mb-20 flex w-full flex-col items-center justify-center gap-4 border-t pt-10 sm:h-[81px] sm:flex-row sm:items-end sm:justify-between sm:pt-0">
          <p className="flex items-center gap-3">
            <span className="text-sm font-medium">Powered by</span>{" "}
            <Image
              src="/assets/starknet.svg"
              alt="starknet"
              width={95}
              height={24}
              priority
              quality={100}
            />
          </p>

          <p className="text-sm font-medium">
            © 2025 {siteConfig.title}. All rights reserved.
          </p>
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;
