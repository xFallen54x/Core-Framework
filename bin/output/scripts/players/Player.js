import { ModalForm, MessageForm, ActionForm } from "../forms/index.js";
// Define a Player class
export class Player {
    /**
     * Constructor for the Player class
     * @param {IPlayer} player - The player object from the "@minecraft/server" module
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
     * Get the position of the player
     *
     * @returns {Object} The location of the player
     */
    getPos() {
        return this._IPlayer.location;
    }
    /**
     * Set the display name of the player
     *
     * @param {string} name - The new display name for the player
     * @param {string} [color] - The color code for the display name (optional)
     */
    setDisplayName(name, color) {
        this.displayName = color ? `${color}${name}` : name;
        this._IPlayer.nameTag = this.displayName;
    }
    /**
     * Returns the IPlayer object.
     *
     * @return {IPlayer} The IPlayer object.
     */
    getIPlayer() {
        return this._IPlayer;
    }
    /**
     * Add a tag to the player
     *
     * @param {string} tag - The tag to add to the player
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
     * @param {string} tag - The tag to remove from the player
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
     * @param {string} tag - The tag to check for
     * @returns {boolean} True if the player has the tag, false otherwise
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
     * @returns {Array<string>} An array of all tags of the player
     */
    getTags() {
        return this._IPlayer.getTags();
    }
    /**
     * Add multiple tags to the player
     *
     * @param {Array<string>} tags - An array of tags to add to the player
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
     * @param {Array<string>} tags - An array of tags to remove from the player
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
     * @param {Array<string>} tags - An array of tags to check for
     * @returns {boolean} True if the player has all specified tags, false otherwise.
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
     * @param {number} x - The x-coordinate of the location.
     * @param {number} y - The y-coordinate of the location.
     * @param {number} z - The z-coordinate of the location.
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
        this._IPlayer.teleport(location);
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
}
