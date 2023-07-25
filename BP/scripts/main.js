import { system } from "@minecraft/server"
import { Client } from "./client/Client";

import {
  Player
} from "./players/Player"

// Create a new instance of the Client class

/**
 * @param {Client} client
 */
const client = new Client();

// Listen for the "chatSend" event
client.on("chatSend", (/** @type {ChatSendBeforeEvent} */ data) => {

}, "before");
