// Regular imports.
import { EnchantmentTypes } from '@minecraft/server';
/**
 * Attempts to get all enchantments on an item.
 * @param item Item to get enchantments from.
 * @returns
 */
export function getEnchantments(item) {
    // Intitialize enchaments return array.
    const enchantments = [];
    // If not an item or item does not have enchantments nbt component return empty array.
    if (!item || !item.hasComponent('minecraft:enchantments'))
        return enchantments;
    // Get the enchantment nbt component and typecast it as ItemEnchantsComponent.
    const component = item.getComponent('minecraft:enchantments');
    // For every key on EnchantmentTypes execute some code.
    for (const enchant of Object.keys(EnchantmentTypes)) {
        // If not item enchantments has enchant key in current iteration continue to next iteration.
        if (!component.enchantments.hasEnchantment(EnchantmentTypes[enchant]))
            continue;
        // Otherwise get level of current enchant on item provided.
        const value = component.enchantments.getEnchantment(EnchantmentTypes[enchant]);
        // Push data to final enchantment array
        enchantments.push(value);
    }
    // Return enchantments
    return enchantments;
}
