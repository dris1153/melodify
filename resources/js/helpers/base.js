import clsx from "clsx";
import { twMerge } from "tailwind-merge";

// cn (clsx + twMerge)
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
