import type { Player } from '../players'
import type { MessageFormResponse } from '../types'
// @ts-ignore FIXME: Once typings are made
import { MessageFormData } from '@minecraft/server-ui'

/**
 * Creates a new MessageForm.
 */
export class MessageForm {
  protected readonly player: Player
  protected readonly form: any
  protected callback: ((res: MessageFormResponse) => void) | undefined
  protected canceled = false

  /**
   * Creates a new MessageForm.
   * @param {Player} player The player to recieve the form.
   */
  public constructor(player: Player) {
    this.player = player
    this.form = new MessageFormData()
  }

  /**
   * Sets the title of the form.
   * @param {string} title Form title.
   * @returns Form instance.
   */
  public setTitle(title: string): MessageForm {
    this.form.title(title)

    return this
  }

  /**
   * Sets the body of the form.
   * @param {string} body Form body.
   * @returns Form instance.
   */
  public setBody(body: string): MessageForm {
    this.form.body(body)

    return this
  }

  /**
   * Sets the label for button one.
   * @param {string} label Button label.
   * @returns Form instance.
   */
  public setButton1(label: string): MessageForm {
    this.form.button1(label)

    return this
  }

  /**
   * Sets the label for button two.
   * @param {string} label Button label.
   * @returns Form instance.
   */
  public setButton2(label: string): MessageForm {
    this.form.button2(label)

    return this
  }

  /**
   * Sends the form to the player.
   * @param {(result: MessageFormResponse) => void} callback The response of the form.
   * @returns
   */
  public send(callback?: (res: MessageFormResponse) => void): void {
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
      .then((res: MessageFormResponse) => {
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
  private result(callback: (data: MessageFormResponse) => void): void {
    this.callback = callback
  }
}