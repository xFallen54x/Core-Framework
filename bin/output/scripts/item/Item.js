// Regular imports.
import { EnchantmentTypes, Enchantment } from '@minecraft/server';
import { getEnchantments } from './getEnchantments.js';
/**
 * Item wraps Minecrafts IItem. It adds helpful methods
 * utilizing item components cutting out the complication for
 * you.
 */
export class Item {
    /**
     * Item wraps Minecrafts IItem. It adds helpful methods
     * utilizing item components cutting out the complication for
     * you.
     * @param client Client reference.
     * @param IItem Minecraft Item to wrap.
     */
    constructor(IItem) {
        this._IItem = IItem;
    }
    /**
     * Get the wrapped Minecraft item.
     * @returns
     */
    getIItem() {
        return this._IItem;
    }
    /**
     * Get the items id.
     * @returns
     */
    getId() {
        return this._IItem.typeId;
    }
    /**
     * Get the item stack amount.
     * @returns
     */
    getAmount() {
        return this._IItem.amount;
    }
    /**
     * Set the item amount.
     * @param amount New amount.
     */
    setAmount(amount) {
        this._IItem.amount = amount;
    }
    /**
     * Get the items name tag.
     * @returns
     */
    getNameTag() {
        return this._IItem.nameTag;
    }
    /**
     * Set the items name tag.
     * @param nameTag New name.
     */
    setNameTag(nameTag) {
        this._IItem.nameTag = nameTag;
    }
    /**
     * Get the items lore.
     * @returns
     */
    getLore() {
        return this._IItem.getLore();
    }
    /**
     * Check if the lore includes the string provided.
     * @param lore string to check.
     * @returns
     */
    hasLore(lore) {
        if (this.getLore().find((x) => x === lore))
            return true;
        return false;
    }
    /**
     * Set the items lore.
     * @param lore Array of lore strings.
     */
    setLore(lore) {
        this._IItem.setLore(lore);
    }
    /**
     * Trigger a Minecraft event on the item.
     * @param event Minecraft event to trigger.
     */
    triggerEvent(event) {
        this._IItem.triggerEvent(event);
    }
    /**
     * Get the items components.
     * @TODO create typings
     * @returns
     */
    getComponents() {
        return this._IItem.getComponents();
    }
    /**
     * Check if the item has a component.
     * @param component Component id.
     * @returns
     */
    hasComponent(component) {
        return this._IItem.hasComponent(component);
    }
    /**
     * Get a specidic component on the item.
     * @param component Component id.
     * @TODO create typings
     * @returns
     */
    getComponent(component) {
        return this._IItem.getComponent(component);
    }
    /**
     *
     * Gets all enchants on the item.
     *
     * @warning This is currently broken
     * @returns
     */
    getEnchantments() {
        return getEnchantments(this._IItem);
    }
    /**
     * Adds an enchant to the item.
     * @param enchantment Enchant name..
     * @param level Enchant level.
     * @returns true means success
     */
    addEnchantment(enchantment, level) {
        // If item does not have enchants component return.
        if (!this.hasComponent('minecraft:enchantments'))
            return false;
        // Get component from item.
        const component = this._IItem.getComponent('minecraft:enchantments');
        // Gets the enchantments
        const enchantments = component.enchantments;
        // Attempt add the enchantment.
        const res = enchantments.addEnchantment(new Enchantment(EnchantmentTypes[enchantment].toString(), level));
        // Sets the enchantments to the component
        component.enchantments = enchantments;
        // Return result from add enchant.
        return res;
    }
    /**
     * Removes an enchant from the item.
     * @param enchantment Enchant name.
     * @returns true means success
     */
    removeEnchantment(enchantment) {
        // If item does not have enchants component return.
        if (!this.hasComponent('minecraft:enchantments'))
            return false;
        // If not item has enchant return false.
        if (!this.hasEnchantment(enchantment))
            return false;
        // Get enchants component.
        const component = this._IItem.getComponent('minecraft:enchantments');
        // Gets the enchantments
        const enchantments = component.enchantments;
        // Remove enchant from enchants component.
        enchantments.removeEnchantment(EnchantmentTypes[enchantment].toString());
        // Sets the enchantments to the component
        component.enchantments = enchantments;
        // Return true.
        return true;
    }
    /**
     * Checks if item has an enchantment.
     * @param enchantment Enchant name.
     * @returns
     */
    hasEnchantment(enchantment) {
        // If item does not have enchants component return.
        if (!this.hasComponent('minecraft:enchantments'))
            return false;
        // Get enchants component.
        const component = this._IItem.getComponent('minecraft:enchantments');
        // Return whether enchant exists or no.
        return component.enchantments.hasEnchantment(EnchantmentTypes[enchantment].toString()) === 0 ? false : true;
    }
    /**
     * Attempts to get the enchantment from item.
     * @param enchantment Enchant name.
     * @returns can return `undefined`
     */
    getEnchantment(enchantment) {
        // If item does not have enchants component return.
        if (!this.hasComponent('minecraft:enchantments'))
            return;
        // If item does not have enchant return.
        if (!this.hasEnchantment(enchantment))
            return;
        // Get enchants component.
        const component = this._IItem.getComponent('minecraft:enchantments');
        // Return component enchant provided.
        return component.enchantments.getEnchantment(EnchantmentTypes[enchantment].toString());
    }
    /**
     * Set item in inventory or block slot.
     * @param slot Slot number
     * @param inventory Inventory.
     */
    setInSlot(slot, inventory) {
        inventory.setItem(slot, this);
    }
}
