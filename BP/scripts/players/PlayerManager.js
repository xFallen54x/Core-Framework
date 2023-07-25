import {
  world,
  system,
  Player as IPlayer
} from "@minecraft/server";
import { Client } from "../client/Client";
import { Player } from "./Player";

export class PlayerManager {
  /**
   * Creates a new instance of the PlayerManager class.
   * @param {Client} client - The client instance.
   */
  constructor(client) {
    this.Players = new Map();
    this.client = client;

    this.registerEvents();
  }

  /**
   * Adds a player to the player manager.
   * @param {IPlayer} player - The player to add.
   */
  addPlayer(player) {
    if (player === undefined) return
    this.Players.set(player.name, player);
  }

  /**
   * Adds a player to the player manager by name.
   * @param {string} name - The name of the player to add.
   */
  addPlayerByName(name) {
    const player = world.getAllPlayers().find(player => player.name === name);
    if (player === undefined) return;

    this.addPlayer(player);
  }

  /**
   * Removes a player from the player manager.
   * @param {IPlayer} player - The player to remove.
   */
  removePlayer(player) {
    this.Players.delete(player);
  }

  /**
   * Gets an IPlayer object by player name.
   * @param {string} name - The name of the player.
   * @returns {IPlayer | undefined} - The IPlayer object or undefined if not found.
   */
  getIPlayer(name) {
    if (this.Players.has(name)) {
      return this.Players.get(name).getIPlayer();
    }
    const player = world.getAllPlayers().find(player => player.name === name);
    return player;
  }

  /**
   * Gets a Player object by player name.
   * @param {string} name - The name of the player.
   * @returns {Player | undefined} - The Player object or undefined if not found.
   */
  getPlayer(name) {
    if (this.Players.has(name)) {
      return this.Players.get(name);
    }
    if (this.world.getAllPlayers().find(plr => plr.name === name)) {
      const player = this.addPlayerByName(name);
      return player;
    }
    return;
  }

  /**
   * Registers event listeners for player join and leave events.
   */
  registerEvents() {
    // Listen for the "playerJoin" event
    this.client.on(
      "playerJoin",
      (/** @type {{ playerName: string; }} */ data) => {
        // If the joining player is not already in the player manager, add them
        if (!this.Players.has(data.playerName)) {
          // Wait for a short time before adding the player to ensure they have fully joined
          system.runTimeout(() => {
            this.addPlayer(this.getIPlayer(data.playerName));
          }, 100);
        }
      },
      "after"
    );

    // Listen for the "playerLeave" event
    this.client.on(
      "playerLeave",
      (/** @type {{ playerName: string; }} */ data) => {
        // If the leaving player is in the player manager, remove them
        if (this.Players.has(data.playerName)) {
          const player = this.getIPlayer(data.playerName);
          this.removePlayer(player);
        }
      },
      "after"
    );
  }
}
