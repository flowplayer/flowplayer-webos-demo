import flowplayer, { Player } from "@flowplayer/player"
import OVPPlugin from "@flowplayer/player/plugins/ovp"
import WebOSPlugin from "@flowplayer/player/plugins/webos"
import SubtitlesPlugin from "@flowplayer/player/plugins/subtitles"
import AselPlugin from "@flowplayer/player/plugins/asel"
import QselPlugin from "@flowplayer/player/plugins/qsel"
import HSLPlugin from "@flowplayer/player/plugins/hls"
import "@flowplayer/player/flowplayer.css"

flowplayer(OVPPlugin, WebOSPlugin, SubtitlesPlugin, AselPlugin, HSLPlugin, QselPlugin)

export class FPPlayer extends HTMLElement {
  private _player: Player  

  constructor() {
    super()
  }

  get api() {
    return this._player
  }

  connectedCallback() {
    if (!this.isConnected || this._player) return
    this._player = flowplayer(this, {
      token: process.env.FLOWPLAYER_TOKEN
    })
  }

  playVideo(mediaId: string) {
    this._player.setSrc(mediaId)
    this._player.once("canplay", () => this._player.togglePlay(true))
  }

  stopVideo() {
    this._player.togglePlay(false)
  }
}