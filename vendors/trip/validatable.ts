import { Trip } from './trip'

export abstract class ValidatableTrip<P, Q, B, V> extends Trip<P, Q, B> {

  invalid?: V

  protected abstract validator(): V;

  validate() {
    this.invalid = this.validator();
    return this.invalid
  }
}
