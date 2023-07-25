import { Player as IPlayer } from "@minecraft/server";

/**
 * Player class that extends the functionality of the IPlayer class from the @minecraft/server module.
  */
export class Player {
   /**
       * Creates a new Player instance.
         * @param {IPlayer} player - The IPlayer instance to extend.
            */
   constructor(player) {
      this._IPlayer = player;
      this.name = player.name;
      this.displayName = player.nameTag;
   }

   /**
      * Returns the IPlayer instance associated with this Player instance.
         * @returns {IPlayer} The IPlayer instance.
            */
   getIPlayer() {
      return this._IPlayer;
   }

   /**
      * Checks if the player has a specific tag.
         * @param {string} tag - The tag to check for.
            * @returns {boolean} True if the player has the tag, false otherwise.
               */
   hasTag(tag) {
      return this._IPlayer.hasTag(tag);
   }

   /**
      * Checks if the player has all of the specified tags.
         * @param {string[]} tags - An array of tags to check for.
            * @returns {boolean} True if the player has all of the tags, false otherwise.
               */
   hasTags(tags) {
      return tags.every((tag) => this.hasTag(tag));
   }

   /**
      * Adds a tag to the player.
         * @param {string} tag - The tag to add.
            */
   addTag(tag) {
      if (!this.hasTag(tag)) {
         this._IPlayer.addTag(tag);
      }
   }

   /**
      * Adds multiple tags to the player.
         * @param {string[]} tags - An array of tags to add.
            */
   addTags(tags) {
      tags.forEach((tag) => this.addTag(tag));
   }

   /**
      * Removes a tag from the player.
         * @param {string} tag - The tag to remove.
            */
   removeTag(tag) {
      if (this.hasTag(tag)) {
         this._IPlayer.removeTag(tag);
      }
   }

   /**
      * Removes multiple tags from the player.
         * @param {string[]} tags - An array of tags to remove.
            */
   removeTags(tags) {
      tags.forEach((tag) => this.removeTag(tag));
   }

   /**
      * Returns an array of all tags associated with the player.
         * @returns {string[]} An array of tags.
            */
   getTags() {
      return this._IPlayer.getTags();
   }

   /**
      * Sets the display name of the player.
         * @param {string} name - The new display name for the player.
            */
   setDisplayName(name) {
      this.displayName = name;
      this._IPlayer.nameTag = name;
   }
}
