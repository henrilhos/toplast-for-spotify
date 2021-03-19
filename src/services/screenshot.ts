import { Options } from 'html2canvas'

class Screenshot {
  private readonly node?: HTMLElement

  private readonly html2canvas?: (
    element: HTMLElement,
    options?: Partial<Options>
  ) => Promise<HTMLCanvasElement>

  constructor({ node }: { node: HTMLElement }) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require, @typescript-eslint/no-unsafe-assignment
    const html2canvas = require('html2canvas')

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unnecessary-type-assertion
    this.html2canvas = html2canvas as typeof html2canvas
    this.node = node
  }

  public async downloadImage(fileName: string) {
    const canvas = await this.generateCanvas()

    if (!canvas) return

    const a = document.createElement('a')
    a.href = canvas
      .toDataURL('image/jpeg')
      .replace('image/jpeg', 'image/octet-stream')
    a.download = `${fileName}.jpg`
    a.click()
  }

  public async getImage() {
    const canvas = await this.generateCanvas()

    if (!canvas) return

    return canvas.toDataURL('image/jpeg')
    // .replace(/^data:image\/jpeg;base64,/, '')
  }

  private async generateCanvas() {
    if (!this.node) throw Error('Node element was not provide')
    if (!this.html2canvas) return

    return this.html2canvas(this.node, {
      allowTaint: true,
      useCORS: true,
      backgroundColor: '#000',
      scale: 1.5,
    })
  }
}

export { Screenshot }
