import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Finds the index of an object in an array that exactly matches the properties and values
 * of a given object. The comparison is done by checking if both objects have the same number
 * of properties and if all properties have the same values.
 *
 * @template T - The type of the objects in the array. It extends the base `Object` type.
 * @param {T[]} array - An array of objects of type T to search through.
 * @param {T} obj - The object to find in the array. It should have the same properties and values
 *                  as the object in the array for a match.
 * @returns {number} - The index of the first matching object in the array, or -1 if no match is found.
 */
export function exactObjectIndex<T extends Object>(array: T[], obj: T) {
  return array.findIndex(
    (item) =>
      Object.keys(item).length === Object.keys(obj).length &&
      Object.keys(item).every((key) => item[key as keyof T] === obj[key as keyof T])
  );
}

/**
 * Checks if an array contains an object that exactly matches the properties and values
 * of a given object. The comparison is done by verifying that both objects have the same
 * number of properties and that all properties have the same values.
 *
 * @template T - The type of the objects in the array. It extends the base `Object` type.
 * @param {T[]} array - An array of objects of type T to search through.
 * @param {T} obj - The object to check for in the array. It should have the same properties and values
 *                  as the object in the array for a match.
 * @returns {boolean} - Returns `true` if there is at least one object in the array that matches
 *                      the given object, otherwise returns `false`.
 */
export function includesExactObject<T extends Object>(array: T[], obj: T) {
  return array.some(
    (item) =>
      Object.keys(item).length === Object.keys(obj).length &&
      Object.keys(item).every((key) => item[key as keyof T] === obj[key as keyof T])
  );
}

/**
 * Combines multiple class names into a single string, merging Tailwind CSS classes.
 *
 * This function uses `clsx` to conditionally combine class names and `twMerge`
 * to ensure that Tailwind CSS classes are merged correctly, allowing for the
 * elimination of conflicting classes.
 *
 * @param {...string[]} classNames - The array of product attributes.
 * @returns {string} a string of classNames after merging process.
 */
export function classNameMerge(...classNames: ClassValue[]) {
  return twMerge(clsx(classNames));
}
