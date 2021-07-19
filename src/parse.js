import {JSDOM} from "jsdom"

export default function(html) {
  const {window} = new JSDOM(html)
  const {document} = window

  return Array.from(document.querySelectorAll("a img")).reduce((acc, dom) => {
    const domLink = dom.parentElement
    const link = domLink.href

    if(isTargetUrl(link+"")) {
      acc = link
    }

    return acc
  }, "")
}

function isTargetUrl(url) {
  return /^https:\/\/r\.rakuten\.co\.jp\/[a-zA-Z0-9]{10,}\?mpe=[0-9]+$/.test(url) ||
    /^https:\/\/pmrd\.rakuten\.co\.jp\/\?r=[0-9a-zA-Z\%]{10,}\&p=[0-9a-zA-Z]+\&u=[0-9a-zA-Z]+$/.test(url)
}
