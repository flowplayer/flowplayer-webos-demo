import LOGO from "../../images/logo.png"
export class FPAppHeader extends HTMLElement {
  constructor() {
    super()
    const img = document.createElement("img")
    img.src = LOGO
    img.classList.add("brand")
    this.appendChild(img)
  }
}
