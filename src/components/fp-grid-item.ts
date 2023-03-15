export class FPGridItem extends HTMLElement {
  static get observedAttributes() {
    return ["title", "mediaId"]
  }
  private _title: string
  private _mediaId: string
  private _thumbnail: string
  constructor() {
    super()
    //this.render()
  }

  connectedCallback() {
    if (!this.isConnected) return
    this.render()
  }

  get thumbnail() {
    return this._thumbnail
  }

  set thumbnail(val: string) {
    this._thumbnail = val
    this.render()
  }

  get title() {
    return this._title
  }

  set title(val: string) {
    this._title = val
    this.render()
  }

  get mediaId() {
    return this._mediaId
  }

  set mediaId(val: string) {
    this._mediaId = val
    this.render()
  }
  
  render() {
    this.innerHTML = ""
    const title = document.createElement("span")
    title.classList.add("title")
    title.innerText = this._title
    this.appendChild(title)
    this.style.setProperty("background-image", `url('${this._thumbnail}')`)
  }

  attributeChangedCallback() {
    this.render()
  }
}