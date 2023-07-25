import { ModalFormData } from "@minecraft/server-ui"

/**
 * Creates a new ModalForm.
 */
export class ModalForm {
    canceled = false

    /**
     * Creates a new ModalForm.
     * @param {Player} player The player to recieve the form.
     * @param {Client} client The registered client to handle the form.
     */
    constructor(player, client) {
        this.player = player
        this._client = client
        this.form = new ModalFormData()
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
     * Adds a text input box to the form.
     * @param {string} label The label of the input box.
     * @param {string} placeHolderText Text to be displayed as a background behind the input box.
     * @param {string} defaultValue Optinal default text to be already inputed in the input box.
     * @returns Form instance.
     */
    addInput(label, placeHolderText, defaultValue) {
        this.form.textField(label, placeHolderText, defaultValue ?? "")

        return this
    }

    /**
     * Adds a dropdown menu to the form.
     * @param {string} label The label of the dropdown menu.
     * @param {string[]} options The array of strings to be displayed in the dropdown menu.
     * @param {number} defaultValueIndex Optional default selected string.
     * @returns Form instance.
     */
    addDropdown(label, options, defaultValueIndex) {
        this.form.dropdown(label, options, defaultValueIndex ?? 0)

        return this
    }

    /**
     * Adds a number slidder to the form.
     * @param {string} label The label of the number slidder.
     * @param {number} minimumValue Minimum value that can be selected.
     * @param {number} maximumValue Maximum value that can be selected.
     * @param {number} valueStep Amount of values that go up or down when slidden.
     * @param {number} defaultValue Optional default number value.
     * @returns Form instance.
     */
    addSlider(label, minimumValue, maximumValue, valueStep, defaultValue) {
        this.form.slider(
            label,
            minimumValue,
            maximumValue,
            valueStep,
            defaultValue ?? 0
        )

        return this
    }

    /**
     * Adds a toggle switch to the form.
     * @param {string} label Label of the toggle switch.
     * @param {boolean} defaultValue Default value if the switch should be already toggled.
     * @returns Form instance.
     */
    addToggle(label, defaultValue) {
        this.form.toggle(label, defaultValue ?? false)

        return this
    }

    /**
     * Adds a icon image to the form.
     * @WARNING This method appears to do nothing at the moment.
     * @param {string} iconPath Path to the texture file.
     * @returns Form instance.
     */
    addIcon(iconPath) {
        this.form.icon(iconPath)

        return this
    }

    /**
     * Sends the form to the player.
     * @param {(result: ModalFormResponse) => void} callback The response of the form.
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
