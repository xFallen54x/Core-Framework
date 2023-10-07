import { world } from "@minecraft/server";
import { Player } from "./players/index.js";
world.afterEvents.chatSend.subscribe((data) => {
    const player = new Player(data.sender);
    const inv = player.getInventory();
    for (let slot = 0; slot < inv.getSize(); slot++) {
        const item = inv.getItem(slot);
        if (item.getId() === "minecraft:air")
            continue;
        player.sendMessage(`Slot ${slot}: ${item.getId}:${item.getAmount()}`);
    }
});
