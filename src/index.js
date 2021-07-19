import getAgent from "./agent.js"
import getUrl from "./parse.js"
import {stdout} from "single-line-log"
import fetch from "node-fetch"

async function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

;(async () => {
  const agent = await getAgent()
  const mailList = await agent.getMailList()
  for (let index=0; index<mailList.length; index++) {
    const id = mailList[index]
    const html = await agent.getMailHTML(id)
    const url = getUrl(html)

    if(url) {
      await fetch(url, {
        headers: {
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:90.0) Gecko/20100101 Firefox/90.0",
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3"
        }
      })
    }

    stdout(`${index+1}/${mailList.length}`)
    await agent.markAsRead(id)
    await sleep(1500)
  }
})()
