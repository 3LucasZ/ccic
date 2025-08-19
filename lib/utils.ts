import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates avatar fallback initials from a name.
 * @param name The full name string.
 * @returns A 1 or 2-character uppercase string for the fallback.
 */
export function fallbackFromName(name?: string | null): string {
  // Return a default if the name is invalid
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return '??';
  }

  // Split by one or more spaces
  const parts = name.trim().split(/\s+/); 

  // Handle a single-word name 
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }

  // Handle multi-word names
  const firstInitial = parts[0][0] || '';
  const lastInitial = parts[parts.length - 1][0] || '';

  return `${firstInitial}${lastInitial}`.toUpperCase();
}