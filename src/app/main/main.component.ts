import { ChangeDetectionStrategy, Component, signal, OnInit } from '@angular/core'
import { HeaderComponent } from '../components/header/header.component'
import { FormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker'
import { provideNativeDateAdapter } from '@angular/material/core'
import { getCountdownString } from '../../utils/getCountdownString'
import { getTomorrowsDate } from '../../utils/getTomorrowsDate'

const titleKey = 'nc-title'
const dateKey = 'nc-date'

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule],
  templateUrl: './main.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  title = signal(localStorage.getItem(titleKey))
  subtitle = signal('')
  date = signal(localStorage.getItem(dateKey) ? new Date(localStorage.getItem(dateKey) || '') : '')

  protected readonly minDate = signal(getTomorrowsDate())

  ngOnInit() {
    this.updateCountdownString()
    setInterval(() => {
      this.updateCountdownString()
    }, 1000)
  }

  protected onInput(event: Event) {
    localStorage.setItem(titleKey, (event.target as HTMLInputElement).value)
    this.title.set((event.target as HTMLInputElement).value)
  }

  protected onDateChange(event: MatDatepickerInputEvent<any, any>) {
    localStorage.setItem(dateKey, event.value)
    this.date.set(event.value)
  }

  private updateCountdownString() {
    if (!this.date()) {
      this.subtitle.set('')
      return
    }

    const currentDate = new Date()
    const futureDate = new Date(this.date())
    const countdownString = getCountdownString(currentDate, futureDate)

    this.subtitle.set(countdownString)
  }
}
