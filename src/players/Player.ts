// Import system, world, and Player from "@minecraft/server" module
import { system, world, Player as IPlayer } from "@minecraft/server";

import { ModalForm, MessageForm, ActionForm } from "../forms/index.js";

// Define a Player class
export class Player {
  protected readonly _IPlayer: IPlayer;
  protected readonly name: string;
  public displayName: string;

  // Protected player states.
  protected _isSwimming = false;
  protected _isInWater = false;
  protected _isGrounded = true;
  protected _isBurning = false;
  protected _isMoving = false;
  protected _isSprinting = false;
  protected _isRiding = false;
  protected _isSleeping = false;
  protected _isAlive = true;
  protected _isMuted = false;
  protected _isFlying = false;

  /**
   * Constructor for the Player class
   * @param {IPlayer} player - The player object from the "@minecraft/server" module
   */
  constructor(player: IPlayer) {
    this._IPlayer = player;
    this.name = player.name;
    this.displayName = player.nameTag;
  }

  /**
   * Get the position of the player
   * 
   * @returns {Object} The location of the player
   */
  getPos(): { x: number; y: number; z: number } {
    return this._IPlayer.location;
  }

  /**
   * Set the display name of the player
   * 
   * @param {string} name - The new display name for the player
   * @param {string} [color] - The color code for the display name (optional)
   */
  public setDisplayName(name: string, color: string) {
    this.displayName = color ? `${color}${name}` : name;
    this._IPlayer.nameTag = this.displayName;
  }

  /**
   * Returns the IPlayer object.
   *
   * @return {IPlayer} The IPlayer object.
   */
  public getIPlayer(): IPlayer {
    return this._IPlayer;
  }

  /**
   * Add a tag to the player
   * 
   * @param {string} tag - The tag to add to the player
   */
  public addTag(tag: string) {
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
  public removeTag(tag: string) {
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
  public hasTag(tag: string): boolean {
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
  public getTags(): Array<string> {
    return this._IPlayer.getTags();
  }

  /**
   * Add multiple tags to the player
   * 
   * @param {Array<string>} tags - An array of tags to add to the player
   */
  public addTags(tags: Array<string>) {
    if (!Array.isArray(tags)) {
      throw new Error("Tags must be an array");
    }
    for (const tag of tags) {
      if (this.hasTag(tag)) continue;
      this.addTag(tag);
    }
  }

  /**
   * Remove multiple tags from the player
   * 
   * @param {Array<string>} tags - An array of tags to remove from the player
   */
  public removeTags(tags: Array<string>) {
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
  public hasTags(tags: Array<string>): boolean {
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
  public teleport(x: number, y: number, z: number) {
    if (
      typeof x !== "number" ||
      typeof y !== "number" ||
      typeof z !== "number"
    ) {
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
  public createModalForm(): ModalForm {
    return new ModalForm(this);
  }

  /**
   * Creates a new message form on the player.
   * @returns
   */
  public createMessageForm(): MessageForm {
    return new MessageForm(this);
  }

  /**
   * Creates a new action form on the player.
   * @returns
   */
  public createActionForm(): ActionForm {
    return new ActionForm(this);
  }
}
