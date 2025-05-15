import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAddress(address: string) {
  if (!address) return "";
  if (address.length <= 10) return address;
  return address.slice(0, 5) + "..." + address.slice(-4);
}

export function formatCurrency(currency: number) {
  const amount = currency / 1e18;
  return amount || 0;
}
