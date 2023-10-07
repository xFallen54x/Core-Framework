// Define imports
import {
  system,
  world,
  Player as IPlayer,
  EntityHealthComponent,
  EntityComponent,
  TitleDisplayOptions,
} from "@minecraft/server";
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
   *
   * @param player - The player object from the "@minecraft/server" module
   */
  constructor(player: IPlayer) {
    this._IPlayer = player;
    this.name = player.name;
    this.displayName = player.nameTag;
  }

  /**
   * Destroys the instance of the Player.
   *
   * @param reason - The reason for destroying the instance. Default value is "Instance of Player was destroyed."
   */
  public destroy(reason = "Instance of Player was destroyed.") {
    this._IPlayer.runCommand(`kick "${this.displayName}" ${reason}`);
  }

  /**
   * Retrieves the ID of the player.
   *
   * @return The ID of the player.
   */
  public getId(): string {
    return this._IPlayer.id;
  }

  /**
   * Get the position of the player
   *
   * @returns The location of the player
   */
  getPos(): { x: number; y: number; z: number } {
    return this._IPlayer.location;
  }

  /**
   * Set the display name of the player
   *
   * @param name - The new display name for the player
   * @param color - The color code for the display name (optional)
   */
  public setDisplayName(name: string, color: string) {
    this.displayName = color ? `${color}${name}` : name;
    this._IPlayer.nameTag = this.displayName;
  }

  /**
   * Returns the IPlayer object.
   *
   * @returns The IPlayer object.
   */
  public getIPlayer(): IPlayer {
    return this._IPlayer;
  }

  /**
   * Add a tag to the player
   *
   * @param tag - The tag to add to the player
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
   * @param tag - The tag to remove from the player
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
   * @param tag - The tag to check for
   * @returns True if the player has the tag, false otherwise
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
   * @returns An array of all tags of the player
   */
  public getTags(): Array<string> {
    return this._IPlayer.getTags();
  }

  /**
   * Add multiple tags to the player
   *
   * @param tags - An array of tags to add to the player
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
   * @param tags - An array of tags to remove from the player
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
   * @param tags - An array of tags to check for
   * @returns True if the player has all specified tags, false otherwise.
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
   * @param x - The x-coordinate of the location.
   * @param y - The y-coordinate of the location.
   * @param z - The z-coordinate of the location.
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

  /**
   * Retrieves a component by name from the player.
   *
   * @param name - The name of the component to retrieve.
   * @returns The retrieved component.
   */
  public getComponent(name: string): EntityComponent {
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
  public getHealth(): number {
    const healthComponent = this.getComponent(
      "health"
    ) as EntityHealthComponent;
    if (healthComponent) {
      return healthComponent.currentValue;
    }
  }

  /**
   *  Set the player's health.
   *
   * @param health The health to set.
   * If health is less than 0, the player will be killed.
   * @returns True if the health was set successfully, false otherwise.
   */
  public setHealth(health: number): boolean {
    if (typeof health !== "number") {
      throw new Error("Health must be a number");
    }
    const healthComponent = this.getComponent(
      "health"
    ) as EntityHealthComponent;
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
  public sendTitle(message: string): void {
    const display = this._IPlayer.onScreenDisplay;
    display.setTitle(message);
  }

  /**
   * Sends a subtitle to the player.
   * @param message Message content to set.
   */
  public sendSubtitle(message: string): void {
    const display = this._IPlayer.onScreenDisplay;
    display.updateSubtitle(message);
  }
}
