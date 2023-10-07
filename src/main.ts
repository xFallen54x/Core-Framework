import { ItemUseOnAfterEvent, world } from "@minecraft/server";
import { Player } from "./players/index.js";

world.afterEvents.chatSend.subscribe((data) => {
    const player = new Player(data.sender);
    const inv = player.getInventory();

    
})