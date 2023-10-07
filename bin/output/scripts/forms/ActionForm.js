import { ActionFormData } from '@minecraft/server-ui';
/**
 * Creates a new ActionForm.
 */
export class ActionForm {
    /**
     * Creates a new ActionForm.
     * @param {Player} player The player to recieve the form.
     */
    constructor(player) {
        this.canceled = false;
        this.player = player;
        this.form = new ActionFormData();
    }
    /**
     * Sets the title of the form.
     * @param {string} title Form title.
     * @returns Form instance.
     */
    setTitle(title) {
        this.form.title(title);
        return this;
    }
    /**
     * Sets the body of the form.
     * @param {string} body Form body.
     * @returns Form instance.
     */
    setBody(body) {
        this.form.body(body);
        return this;
    }
    /**
     * Adds a button to the form.
     * @param {string} label The label on the button.
     * @param {string} icon The optional icon to display with the button.
     * @returns Form instance.
     */
    addButton(label, icon) {
        this.form.button(label, icon ?? undefined);
        return this;
    }
    /**
     * Sends the form to the player.
     * @param {(result: ActionFormResponse) => void} callback The response of the form.
     * @returns
     */
    send(callback) {
        if (this.canceled) {
            if (this.callback) {
                this.callback({
                    isCanceled: true,
                });
            }
            if (!callback)
                return;
            return callback({
                isCanceled: true,
            });
        }
        this.form
            .show(this.player.getIPlayer())
            .then((res) => {
            if (!callback)
                return;
            if (this.callback) {
                this.callback(res);
            }
            return callback(res);
        })
            .catch((err) => {
            console.error(err);
        });
    }
    /**
     * Private method for handling the form event.
     * @param callback
     */
    result(callback) {
        this.callback = callback;
    }
}
