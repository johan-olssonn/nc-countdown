import { afterNextRender, Component, input } from '@angular/core'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  title = input()
  subtitle = input()

  private adjustFontSizeToContainer(
    textElement: HTMLElement | null,
    container: HTMLElement | null,
  ) {
    if (!textElement || !container) return

    let iterationCount = 0
    const maxIterations = 100

    while (Math.abs(textElement.clientWidth - container.clientWidth) > 10) {
      if (textElement.clientWidth > container.clientWidth) {
        textElement.style.fontSize = (parseInt(textElement.style.fontSize) - 1).toString() + 'px'
      } else {
        textElement.style.fontSize = (parseInt(textElement.style.fontSize) + 1).toString() + 'px'
      }

      iterationCount++
      if (iterationCount > maxIterations) {
        console.warn('Font size adjustment aborted: too many iterations.')
        break
      }
    }
  }

  constructor() {
    afterNextRender(() => {
      const title = document.getElementById('title')
      const subtitle = document.getElementById('subtitle')
      const container = document.getElementById('header')

      if (!title || !subtitle || !container) {
        return
      }

      const resizeObserver = new ResizeObserver(entries => {
        for (const entry of entries) {
          if (entry.target === title) {
            this.adjustFontSizeToContainer(title, container)
          } else if (entry.target === subtitle) {
            this.adjustFontSizeToContainer(subtitle, container)
          } else if (entry.target === container) {
            this.adjustFontSizeToContainer(title, container)
            this.adjustFontSizeToContainer(subtitle, container)
          }
        }
      })

      resizeObserver.observe(title)
      resizeObserver.observe(subtitle)
      resizeObserver.observe(container)
    })
  }
}
