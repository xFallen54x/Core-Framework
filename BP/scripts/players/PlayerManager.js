import {
  world,
  system,
  Player as IPlayer,
  PlayerJoinAfterEvent,
  PlayerLeaveAfterEvent,
  PlayerSpawnAfterEvent
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
    this.Players.delete(player.name);
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

    return;
  }

  /**
   * Registers event listeners for player join and leave events.
   */
  registerEvents() {
    // Listen for the "playerJoin" event
    this.client.on(
      "playerJoin",
      (/** @type {PlayerJoinAfterEvent} */ player) => {
        // If the joining player is not already in the player manager, add them
        if (!this.getPlayer(player.playerName)) {
          // Listen for the "playerSpawn" event
          this.client.on("playerSpawn",
            (/** @type {PlayerSpawnAfterEvent} */ data) => {
              // If the spawing player is equal to the joining player
              if (data.player.name === player.playerName) {
                this.addPlayer(data.player)
              }
            },
            "after"
          );
        }
      },
      "after"
    );

    // Listen for the "playerLeave" event
    this.client.on(
      "playerLeave",
      (/** @type {PlayerLeaveAfterEvent} */ data) => {
        // If the leaving player is in the player manager, remove them
        if (this.getPlayer(data.playerName)) {
          const player = this.getIPlayer(data.playerName);
          this.removePlayer(player);
        }
      },
      "after"
    );
  }
}
