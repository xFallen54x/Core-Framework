import type { Player } from '../players'
import type { ActionFormResponse } from '../types'
import { ActionFormData } from '@minecraft/server-ui'


/**
 * Creates a new ActionForm.
 */
export class ActionForm {
  protected readonly player: Player
  protected readonly form: any
  protected callback: ((res: ActionFormResponse) => void) | undefined
  protected canceled = false

  /**
   * Creates a new ActionForm.
   * @param {Player} player The player to recieve the form.
   */
  public constructor(player: Player) {
    this.player = player
    this.form = new ActionFormData()
  }

  /**
   * Sets the title of the form.
   * @param {string} title Form title.
   * @returns Form instance.
   */
  public setTitle(title: string): ActionForm {
    this.form.title(title)

    return this
  }

  /**
   * Sets the body of the form.
   * @param {string} body Form body.
   * @returns Form instance.
   */
  public setBody(body: string): ActionForm {
    this.form.body(body)

    return this
  }

  /**
   * Adds a button to the form.
   * @param {string} label The label on the button.
   * @param {string} icon The optional icon to display with the button.
   * @returns Form instance.
   */
  public addButton(label: string, icon?: string): ActionForm {
    this.form.button(label, icon ?? undefined)

    return this
  }

  /**
   * Sends the form to the player.
   * @param {(result: ActionFormResponse) => void} callback The response of the form.
   * @returns
   */
  public send(callback?: (result: ActionFormResponse) => void): void {
    if (this.canceled) {
      if (this.callback) {
        this.callback({
          isCanceled: true,
        })
      }
      if (!callback) return

      return callback({
        isCanceled: true,
      })
    }
    this.form
      .show(this.player.getIPlayer())
      .then((res: ActionFormResponse) => {
        if (!callback) return
        if (this.callback) {
          this.callback(res)
        }

        return callback(res)
      })
      .catch((err: any) => {
        console.error(err)
      })
  }

  /**
   * Private method for handling the form event.
   * @param callback
   */
  private result(callback: (data: ActionFormResponse) => void): void {
    this.callback = callback
  }
}