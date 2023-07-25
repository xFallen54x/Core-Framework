import {
  BlockBreakAfterEvent,
  system,
  world
} from "@minecraft/server";
import { Client } from "./client/Client";

import { getCoordinatesBetween } from "./utils/index"

import {
  Player
} from "./players/Player"

// Create a new instance of the Client class

/**
 * @param {Client} client
 */
const client = new Client();

client.on('blockBreak', async (/** @type {BlockBreakAfterEvent} */ data) => {

}, "after")


