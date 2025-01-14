import CalculatorButtonComponent from '@/components/dashboard/calculator-button/calculator-button.component';
import { CalculatorService } from '@/services/Calculator.service';
import { ChangeDetectionStrategy, Component, computed, inject, viewChildren } from '@angular/core';

@Component({
  selector: 'app-calculator',
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(keyup)': 'handleKeyboardEvent($event)',
  }
})
export default class CalculatorComponent {
  private calculatorService = inject(CalculatorService);

  public calculatorButtons = viewChildren(CalculatorButtonComponent);


  public resultText = computed(() => this.calculatorService.resultText());
  public subResultText = computed(() => this.calculatorService.subResultText());
  public lastOperator = computed(() => this.calculatorService.lastOperator());

  handleClick(key: string) {
    this.calculatorService.constructNumber(key);
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    const keyEquivalents: Record<string, string> = {
      Escape: 'C',
      Clear: 'C',
      x: '*',
    };

    const key = keyEquivalents[event.key] || event.key;
    this.handleClick(key);
  }
}
