import * as common from './common.js';

export const success =  0x00ff00;
export const warning = 0xff9900;
export const error = 0xff0000;

export const topgg = 0xff3366;
export const banana = 0xffcc00;

export const linear = 0x5E6AD2;
export const linearRestore = 0x7BFB7B;

/**
 * COnverts hex color string to hexadecimal.
 *
 * *Example:*
 *
 * "#00FF00" -> 0x00FF00 
 * @param hexColor - string
 * @returns 
 */
export function hexColorToHexValue(hexColor: string): number {
    return parseInt(hexColor.substring(1), 16);
};

/**
 * Grabs a list of all variables exported by this file, and returns a random one
 * @param this 
 * @returns 
 */
export function random(this: object): number {
    const keys = Object.keys(this).filter((key: string) => key !== "random");
    const randomKey = keys[common.RNG(keys.length - 1)];

    return (this as Record<string, number>)[randomKey];
};