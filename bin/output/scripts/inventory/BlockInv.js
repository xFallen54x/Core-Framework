// Regular imports.
import { Item } from '../item/Item.js';
/**
 * BeAPI block inventory wrapper.
 * Acts as a central point for easily interacting
 * with a block inventories.
 */
export class BlockInventory {
    /**
     * Core Framework block inventory wrapper.
     * Acts as a central point for easily interacting
     * with a block inventories.
     * @param client Client reference.
     * @param IInventory Inventory to wrap.
     */
    constructor(IInventory) {
        this._IInventory = IInventory;
        this._IContainer = IInventory.container;
    }
    /**
     * Get Minecraft inventory component being wrapped.
     * @returns
     */
    getIInventory() {
        return this._IInventory;
    }
    /**
     * Get Minecraft container component being wrapped.
     * @returns
     */
    getIContainer() {
        return this._IContainer;
    }
    /**
     * Gets the containers size.
     * @returns
     */
    getSize() {
        return this._IContainer.size;
    }
    /**
     * Gets the amount of empty slots in the container.
     * @returns
     */
    getEmptySlots() {
        return this._IContainer.emptySlotsCount;
    }
    /**
     * Gets the item in a specfic slot.
     * @param slot Slot to check item for.
     * @returns
     */
    getItem(slot) {
        return new Item(this._IContainer.getItem(slot));
    }
    /**
     * Sets an item in the container.
     * @param slot Slot to set item.
     * @param item Item to set.
     * @returns
     */
    setItem(slot, item) {
        return this._IContainer.setItem(slot, item.getIItem());
    }
    /**
     * Adds an item to the container,
     * most likely spits it out on ground if cannot fit.
     * @param item Item to add.
     * @returns
     */
    addItem(item) {
        return this._IContainer.addItem(item.getIItem());
    }
    /**
     * Transfer an item from this inventory to another inventory.
     * @param slot Slot to in current inventory.
     * @param otherSlot Slot in other inventory.
     * @param inventory Inventory to swap with.
     * @returns
     */
    transferItem(slot, otherSlot, inventory) {
        return this._IContainer.swapItems(slot, otherSlot, inventory.getIContainer());
    }
    /**
     * Swap items slots in current inventory.
     * @param slot First slot to swap.
     * @param otherContainer The container to swap with.
     * @returns
     */
    swapItem(slot, otherContainer) {
        return this._IContainer.transferItem(slot, otherContainer);
    }
}
