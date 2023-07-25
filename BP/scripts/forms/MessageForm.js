import { MessageFormData } from "@minecraft/server-ui"

/**
 * Creates a new MessageForm.
 */
export class MessageForm {
    canceled = false

    /**
     * Creates a new MessageForm.
     * @param {Player} player The player to recieve the form.
     * @param {Client} client The registered client to handle the form.
     */
    constructor(player, client) {
        this.player = player
        this._client = client
        this.form = new MessageFormData()
    }

    /**
     * Sets the title of the form.
     * @param {string} title Form title.
     * @returns Form instance.
     */
    setTitle(title) {
        this.form.title(title)

        return this
    }

    /**
     * Sets the body of the form.
     * @param {string} body Form body.
     * @returns Form instance.
     */
    setBody(body) {
        this.form.body(body)

        return this
    }

    /**
     * Sets the label for button one.
     * @param {string} label Button label.
     * @returns Form instance.
     */
    setButton1(label) {
        this.form.button1(label)

        return this
    }

    /**
     * Sets the label for button two.
     * @param {string} label Button label.
     * @returns Form instance.
     */
    setButton2(label) {
        this.form.button2(label)

        return this
    }

    /**
     * Sends the form to the player.
     * @param {(result) => void} callback The response of the form.
     * @returns
     */
    send(callback) {
        if (this.canceled) {
            if (this.callback) {
                this.callback({
                    isCanceled: true
                })
            }
            if (!callback) return

            return callback({
                isCanceled: true
            })
        }
        this.form
            .show(this.player.getIPlayer())
            .then(res => {
                if (!callback) return
                if (this.callback) {
                    this.callback(res)
                }

                return callback(res)
            })
            .catch(err => {
                console.error(err)
            })
    }

    /**
     * Private method for handling the form event.
     * @param callback
     */
    result(callback) {
        this.callback = callback
    }
}
