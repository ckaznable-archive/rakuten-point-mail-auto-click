import {google} from "googleapis"
import {Buffer} from "buffer"
import authorize from "./auth.js"

export default async function() {
  const _ = new Agent
  await _.init()
  return _
}

class Agent {
  constructor() {
    this.gmail = null
  }

  async init() {
    const auth = await authorize()
    this.gmail = google.gmail({version: 'v1', auth})
  }

  /**
   * 
   * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
   * @param {Array<gmail_v1.Schema$Message>} labels
   */
  async getMailList(auth) {
    const res = await this.gmail.users.messages.list({
      userId: "me",
      q: "label:unread subject:(クリック OR deポイント)",
      maxResults: 300
    })

    return res.data.messages.map(({id})=>id)
  }

  async markAsRead(id) {
    await this.gmail.users.messages.modify({
      userId: "me", id,
      requestBody: {
        removeLabelIds: ["UNREAD"]
      }
    })
  }

  async getMailHTML(id) {
    const res = await this.gmail.users.messages.get({
      userId: "me", id
    })

    const buff = Buffer.from(res.data.payload.body.data, 'base64')
    return buff.toString('ascii')
  }
}
