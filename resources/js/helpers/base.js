import clsx from "clsx";
import { twMerge } from "tailwind-merge";

// cn (clsx + twMerge)
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function formatSongDuration(duration) {
    return `${Math.floor(duration / 60)
        ?.toString()
        ?.padStart(2, "0")}:${Math.floor(duration % 60)
        ?.toString()
        ?.padStart(2, "0")}`;
}
