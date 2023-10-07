import { ModalForm, MessageForm, ActionForm } from "../forms/index.js";
import { EntityInventory } from "inventory/index.js";
// Define a Player class
export class Player {
    /**
     * Constructor for the Player class
     *
     * @param player - The player object from the "@minecraft/server" module
     */
    constructor(player) {
        // Protected player states.
        this._isSwimming = false;
        this._isInWater = false;
        this._isGrounded = true;
        this._isBurning = false;
        this._isMoving = false;
        this._isSprinting = false;
        this._isRiding = false;
        this._isSleeping = false;
        this._isAlive = true;
        this._isMuted = false;
        this._isFlying = false;
        this._IPlayer = player;
        this.name = player.name;
        this.displayName = player.nameTag;
    }
    /**
     * Destroys the instance of the Player.
     *
     * @param reason - The reason for destroying the instance. Default value is "Instance of Player was destroyed."
     */
    destroy(reason = "Instance of Player was destroyed.") {
        this._IPlayer.runCommand(`kick "${this.displayName}" ${reason}`);
    }
    /**
     * Retrieves the ID of the player.
     *
     * @return The ID of the player.
     */
    getId() {
        return this._IPlayer.id;
    }
    /**
     * Retrieves the name of the player.
     *
     * @returns The name of the player.
     */
    getName() {
        return this.name;
    }
    /**
     * Retrieves the name of the player.
     *
     * @returns The Display name of the player.
     */
    getDisplayName() {
        return this.displayName;
    }
    /**
     * Get the position of the player
     *
     * @returns The location of the player
     * @deprecated Use getLocation instead
     */
    getPos() {
        return this._IPlayer.location;
    }
    /**
     * Set the display name of the player
     *
     * @param name - The new display name for the player
     * @param color - The color code for the display name (optional)
     */
    setDisplayName(name, color) {
        this.displayName = color ? `${color}${name}` : name;
        this._IPlayer.nameTag = this.displayName;
    }
    /**
     * Returns the IPlayer object.
     *
     * @returns The IPlayer object.
     */
    getIPlayer() {
        return this._IPlayer;
    }
    /**
     * Add a tag to the player
     *
     * @param tag - The tag to add to the player
     */
    addTag(tag) {
        if (typeof tag !== "string") {
            throw new Error("Tag must be a string");
        }
        this._IPlayer.addTag(tag);
    }
    /**
     * Remove a tag from the player
     *
     * @param tag - The tag to remove from the player
     */
    removeTag(tag) {
        if (typeof tag !== "string") {
            throw new Error("Tag must be a string");
        }
        this._IPlayer.removeTag(tag);
    }
    /**
     * Check if the player has a specific tag
     *
     * @param tag - The tag to check for
     * @returns True if the player has the tag, false otherwise
     */
    hasTag(tag) {
        if (typeof tag !== "string") {
            throw new Error("Tag must be a string");
        }
        return this._IPlayer.hasTag(tag);
    }
    /**
     * Get all tags of the player
     *
     * @returns An array of all tags of the player
     */
    getTags() {
        return this._IPlayer.getTags();
    }
    /**
     * Add multiple tags to the player
     *
     * @param tags - An array of tags to add to the player
     */
    addTags(tags) {
        if (!Array.isArray(tags)) {
            throw new Error("Tags must be an array");
        }
        for (const tag of tags) {
            if (this.hasTag(tag))
                continue;
            this.addTag(tag);
        }
    }
    /**
     * Remove multiple tags from the player
     *
     * @param tags - An array of tags to remove from the player
     */
    removeTags(tags) {
        if (!Array.isArray(tags)) {
            throw new Error("Tags must be an array");
        }
        for (const tag of tags) {
            if (this.hasTag(tag)) {
                this.removeTag(tag);
            }
        }
    }
    /**
     * Check if the player has all specified tags
     *
     * @param tags - An array of tags to check for
     * @returns True if the player has all specified tags, false otherwise.
     */
    hasTags(tags) {
        if (!Array.isArray(tags)) {
            throw new Error("Tags must be an array");
        }
        return tags.every((tag) => this.hasTag(tag));
    }
    /**
     * Teleport the player to a specific location.
     *
     * @param x - The x-coordinate of the location.
     * @param y - The y-coordinate of the location.
     * @param z - The z-coordinate of the location.
     *
     * @returns True if the player was teleported, false otherwise
     */
    teleport(x, y, z) {
        if (typeof x !== "number" ||
            typeof y !== "number" ||
            typeof z !== "number") {
            throw new Error("Coordinates must be numbers");
        }
        const location = this.getPos();
        location.x = x;
        location.y = y;
        location.z = z;
        try {
            this._IPlayer.teleport(location);
        }
        catch (error) {
            return false;
        }
        return true;
    }
    /**
     * Creates a new modal form on the player.
     * @returns
     */
    createModalForm() {
        return new ModalForm(this);
    }
    /**
     * Creates a new message form on the player.
     * @returns
     */
    createMessageForm() {
        return new MessageForm(this);
    }
    /**
     * Creates a new action form on the player.
     * @returns
     */
    createActionForm() {
        return new ActionForm(this);
    }
    /**
     * Retrieves a component by name from the player.
     *
     * @param name - The name of the component to retrieve.
     * @returns The retrieved component.
     */
    getComponent(name) {
        if (typeof name !== "string") {
            throw new Error("Component name must be a string");
        }
        return this._IPlayer.getComponent(name);
    }
    /**
     * Retrieves the health value of the entity.
     *
     * @returns The current health value of the entity.
     */
    getHealth() {
        const healthComponent = this.getComponent("health");
        if (healthComponent) {
            return healthComponent.currentValue;
        }
    }
    /**
     *  Set the player's health.
     *
     * @param health The health to set. If health is less than 0, the player will be killed.
     * @returns True if the health was set successfully, false otherwise.
     */
    setHealth(health) {
        if (typeof health !== "number") {
            throw new Error("Health must be a number");
        }
        const healthComponent = this.getComponent("health");
        if (healthComponent) {
            healthComponent.setCurrentValue(health);
        }
        return true;
    }
    /**
     * Sends a title to the player.
     * @param message Message content to set.
     * @param options Options for the title message.
     */
    sendTitle(message) {
        const display = this._IPlayer.onScreenDisplay;
        display.setTitle(message);
    }
    /**
     * Sends a subtitle to the player.
     * @param message Message content to set.
     */
    sendSubtitle(message) {
        const display = this._IPlayer.onScreenDisplay;
        display.updateSubtitle(message);
    }
    /**
     * Sends a message to the player.
     *
     * @param message Message content to set.
     */
    sendMessage(message) {
        this._IPlayer.sendMessage(message);
    }
    /**
     * TODO: Mute the player.
     * Mutes the player.
     *
     * @param reason Reason for muting the player.
     */
    mutePlayer(reason) {
        // Your code to mute the player goes here
    }
    /**
     * TODO: Unmute the player.
     * Unmutes the player.
     *
     * @param reason Reason for unmute the player.
     */
    unmutePlayer(reason) {
    }
    /**
     * Kicks the player.
     *
     * @param reason Reason for kicking the player.
     */
    kick(reason = "You have been kicked from the game!") {
        this.destroy(reason);
    }
    /**
     * TODO: Ban the player.
     * Bans the player.
     *
     * @param reason Reason for banning the player.
     * @param duration Duration for the ban.
     */
    ban(reason, duration) {
        // code to ban the player goes here
    }
    /** TODO: Unban the player.
     * Unbans the player.
     *
     * @param reason Reason for unbanning the player.
     */
    unban(reason) {
    }
    /**
     * Gets the players current location.
     * @returns The cordinates of the player.
     */
    getLocation() {
        const pos = this._IPlayer.location;
        return {
            x: Math.floor(pos.x),
            y: Math.floor(pos.y),
            z: Math.floor(pos.z),
        };
    }
    /**
     * Gets precise location (decimals)
     * @returns
     */
    getPreciseLocation() {
        const pos = this._IPlayer.location;
        return {
            x: pos.x,
            y: pos.y,
            z: pos.z,
        };
    }
    /**
     * Gets the players inventory.
     * @returns
     */
    getInventory() {
        return new EntityInventory(this._IPlayer.getComponent('minecraft:inventory'));
    }
    /**
     * Gets players selected slot in hotbar.
     * @returns
     */
    getSelectedSlot() {
        return this._IPlayer.selectedSlot;
    }
}
