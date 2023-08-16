// Import system, world, and Player from "@minecraft/server" module
import {
  system,
  world,
  Player as IPlayer,
} from "@minecraft/server"

// Define a Player class
class Player {
  /**
   * Constructor for the Player class
   * @param {IPlayer} player - The player object from the "@minecraft/server" module
   */
  constructor(player) {
    this._IPlayer = player
    this.name = player.name
    this.displayName = player.nameTag
  }

  /**
   * Get the position of the player
   * @returns {Object} The location of the player
   */
  getPos() {
    return this._IPlayer.location
  }

  /**
   * Set the display name of the player
   * @param {string} name - The new display name for the player
   * @param {string} [color] - The color code for the display name (optional)
   */
  setDisplayName(name, color) {
    if (color) {
      this.displayName = `${color}${name}`
      this._IPlayer.nameTag = this.displayName
    } else {
      this.displayName = name
      this._IPlayer.nameTag = name
    }
  }

  /**
   * Add a tag to the player
   * @param {string} tag - The tag to add to the player
   */
  addTag(tag) {
    if (typeof tag !== 'string') {
      throw new Error('Tag must be a string');
    }
    this._IPlayer.addTag(tag)
  }

  /**
   * Remove a tag from the player
   * @param {string} tag - The tag to remove from the player
   */
  removeTag(tag) {
    if (typeof tag !== 'string') {
      throw new Error('Tag must be a string');
    }
    this._IPlayer.removeTag(tag)
  }

  /**
   * Check if the player has a specific tag
   * @param {string} tag - The tag to check for
   * @returns {boolean} True if the player has the tag, false otherwise
   */
  hasTag(tag) {
    if (typeof tag !== 'string') {
      throw new Error('Tag must be a string');
    }
    return this._IPlayer.hasTag(tag);
  }

  /**
   * Get all tags of the player
   * @returns {Array<string>} An array of all tags of the player
   */
  getTags() {
    return this._IPlayer.getTags()
  }

  /**
   * Add multiple tags to the player
   * @param {Array<string>} tags - An array of tags to add to the player
   */
  addTags(tags) {
    if (!Array.isArray(tags)) {
      throw new Error('Tags must be an array');
    }
    for (const tag of tags) {
      if (this.hasTag(tag)) continue;
      this.addTag(tag)
    }
  }

  /**
   * Remove multiple tags from the player
   * @param {Array<string>} tags - An array of tags to remove from the player
   */
  removeTags(tags) {
    if (!Array.isArray(tags)) {
      throw new Error('Tags must be an array');
    }
    for (const tag of tags) {
      if (this.hasTag(tag)) {
        this.removeTag(tag)
      }
    }
  }

  /**
   * Check if the player has all specified tags
   * @param {Array<string>} tags - An array of tags to check for
   * @returns {boolean} True if the player has all specified tags, false otherwise.
   */
  hasTags(tags) {
    if (!Array.isArray(tags)) {
      throw new Error('Tags must be an array');
    }
    let hasAllTags = true;
    for (const tag of tags) {
      if (this.hasTag(tag)) continue;
      hasAllTags = false;
    }
    return hasAllTags;
  }

  /**
   * Teleport the player to a specific location.
   *
   * @param {number} x - The x-coordinate of the location.
   * @param {number} y - The y-coordinate of the location.
   * @param {number} z - The z-coordinate of the location.
   */
  teleport(x, y, z) {
    if (
      typeof x !== 'number' ||
      typeof y !== 'number' ||
      typeof z !== 'number'
    ) {
      throw new Error('Coordinates must be numbers');
    }
    
    const location = this._IPlayer.location;
    
    location.x = x;
    location.y = y;
    location.z = z;
    
    this._IPlayer.teleport(location);
    
    return true;
  }

}

// Export Player class as a named export.
export { Player };
