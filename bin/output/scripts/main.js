import { world } from "@minecraft/server";
import { Player } from "./players/index.js";
world.afterEvents.itemUseOn.subscribe((data) => {
    const player = new Player(data.source);
    const form = player.createMessageForm();
    form.setTitle("Item Use");
    form.setBody(`You used ${data.itemStack.nameTag} on ${data.block.typeId}`);
    form.send((res) => {
        if (res.isCanceled) {
            return;
        }
        player.getIPlayer().sendMessage(`You used ${data.itemStack.nameTag} on ${data.block.typeId}`);
    });
});
