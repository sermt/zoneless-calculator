import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, input, output, signal, viewChild } from '@angular/core';

@Component({
  selector: 'app-calculator-button',
  imports: [CommonModule],
  templateUrl: './calculator-button.component.html',
  styleUrls: ['./calculator-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400'
  }
})
export default class CalculatorButtonComponent {
  public isPressed = signal(false);
  public onClick = output<string>();
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');

  public isCommand = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });

  public isDoubleSize = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });

  handleClick() {
    if (!this.contentValue()?.nativeElement) {
      return;
    }

    const value = this.contentValue()!.nativeElement.innerText;

    this.onClick.emit(value.trim());
  }

  // It is used to apply a style when a key is pressed on the keyboard
  public keyboardPressedStyle(key: string) {
    if (!this.contentValue()) return;

    const value = this.contentValue()!.nativeElement.innerText;

    if (value !== key) return;

    this.isPressed.set(true);

    setTimeout(() => {
      this.isPressed.set(false);
    }, 100);
  }
}
