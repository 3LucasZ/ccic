import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { colors } from "./colors";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function nameToImg(name?: string | null): string {
  // Return a default if the name is invalid
  if (!name || typeof name !== "string" || name.trim() === "") {
    return "https://github.com/shadcn.png";
  }
  const colorArray = Object.values(colors);
  const index = Math.abs(hashCode(name)) % colorArray.length;
  const ret = `https://ui-avatars.com/api/?name=${name.replace(
    " ",
    "+"
  )}&color=${colorArray[index]["400"].substring(1)}`;
  // console.log(ret);
  return ret;
}
export const nameToInitials = (name: string) => {
  // Split by one or more spaces
  const parts = name.trim().split(/\s+/);
  // Handle a single-word name
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  // Handle multi-word names
  const firstInitial = parts[0][0] || "";
  const lastInitial = parts[parts.length - 1][0] || "";
  return `${firstInitial}${lastInitial}`;
};
const hashCode = (s: string) =>
  s.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);

export function emailToName(email: string | null) {
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return "";
  }

  // Split the email into the local part and the domain.
  const atIndex = email.indexOf("@");
  const localPart = email.substring(0, atIndex);

  // Remove common separators like periods, hyphens, and underscores.
  const cleanedPart = localPart.replace(/[._-]/g, " ");

  // Split the cleaned part into potential name components.
  const parts = cleanedPart.split(" ").filter((part) => part.length > 1);

  // Capitalize each part and join them.
  const name = parts
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");

  // Return the inferred name, or 'Could not infer name' if no parts were found.
  if (name.length <= 0) return "";
  return name;
}

export function uidVerify(uid: string) {
  if (!uid || typeof uid !== "string") {
    return false;
  }
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
  return uuidRegex.test(uid);
}
