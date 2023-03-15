import { Video } from "../types/Video"
import { extract } from "@extractus/feed-extractor"
import { FPGridItem } from "./fp-grid-item"

const WORKSPACE_ID = process.env.WORKSPACE_ID

const extractMediaId = (url: string): string => {
  const u = new URL(url)
  const id = u.searchParams.get("id")
  return id || ""
}

export class FPVideoGrid extends HTMLElement {
  constructor() {
    super()

    const tag = this.attributes["tag"]
    this.fetchVideos(tag)
  }
  
  async fetchVideos(tag: string) {
    const loading = document.createElement("span")
    loading.innerHTML = "Loading.." 
    this.innerHTML = ""
    this.appendChild(loading)
    const URL_BASE = `https://play.flowplayer.com/web/public/workspace/${WORKSPACE_ID}/videos/mrss?page_size=6`
    const URL = tag ? URL_BASE + `&tags=${encodeURIComponent(tag)}` : URL_BASE

    try {
      const result = await extract(URL, {
        getExtraEntryFields(entryData) {
          return {
            thumbnail: entryData["media:thumbnail"]["@_url"]
          }
        },
      })
      if (!result.entries) throw new Error("No videos found")
      this.setVideos(result.entries.map(e => ({
        title: e.title || "",
        id: extractMediaId(e.link || ""),
        thumbnail: (e as any).thumbnail
      })))
    } catch (e) {
      this.innerHTML = "Failed to load videos"
    }
  }

  setVideos(content: Video[]) {
    this.innerHTML = ""
    content.forEach(video => {
      console.log("video", video)
      const gridItem = document.createElement("fp-grid-item") as FPGridItem
      gridItem.title = video.title
      gridItem.mediaId = video.id
      gridItem.thumbnail = video.thumbnail

      gridItem.addEventListener("click", () => {
        const ev = new CustomEvent("media:selected", { bubbles: true })
        gridItem.dispatchEvent(ev)
      })

      this.appendChild(gridItem)
    })
  }
}
