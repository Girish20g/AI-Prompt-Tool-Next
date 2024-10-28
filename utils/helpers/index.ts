export function capitalizeFirstLetter(str: string) {
  if (!str) return str; // Return if string is empty or undefined
  return str.charAt(0).toUpperCase() + str.slice(1);
}
