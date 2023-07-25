import { world, system } from "@minecraft/server";
import { PlayerManager } from "../players/PlayerManager";

/**
 * Represents a client.
 */
export class Client {
  constructor() {
    this.playerManager = new PlayerManager(this)
  }

  /**
   * Returns an object containing logging methods.
   */
  log() {
    return {
      /**
       * Logs an info message.
       * @param {string} message - The message to log.
       * @param {...any} args - Additional arguments to log.
       */
      info: (message, ...args) => {
        this.playerManager.sendMessageToAll(message)
      },

      /**
       * Logs an error message.
       * @param {string} message - The message to log.
       * @param {...any} args - Additional arguments to log.
       */
      error: (message, ...args) => {
        this.playerManager.sendMessageToAll(message)
      },

      /**
       * Logs a warning message.
       * @param {string} message - The message to log.
       * @param {...any} args - Additional arguments to log.
       */
      warn: (message, ...args) => {
        this.playerManager.sendMessageToAll(message)
      },
    };
  }

  /**
   * Returns PlayerManager Class
   * @returns {PlayerManager}
   */

  getPlayerManager() {
    return this.playerManager
  }

  /**
   * Subscribes a callback to an event.
   * @param {string} event - The name of the event to subscribe to.
   * @param {function} callback - The callback function to execute when the event is triggered.
   * @param {string} eventType - The type of event ("before" or "after").
   */
  on(event, callback, eventType) {
    switch (eventType) {
      case "before":
        if (!world.beforeEvents[event]) {
          this.log().warn(
            `${event} does not exist on the world.beforeEvents Class`
          );
          break;
        }

        world.beforeEvents[event].subscribe(callback)
        break;

      case "after":
        if (!world.afterEvents[event]) {
          this.log().warn(`${event} does not exist on the worldAfter.Events Class`);
          break;
        }

        world.afterEvents[event].subscribe(callback);
        break;

      case undefined:
        break;
    }
  }

  registerClient() {

  }
}
