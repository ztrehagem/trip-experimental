export abstract class Trip {
  isSubmitting = false;
  isSubmitted = false;

  protected abstract executor(): Promise<void>;

  async execute () {
    try {
      this.isSubmitting = true
      await this.executor()
    } finally {
      this.isSubmitting = false
      this.isSubmitted = true
    }
  }
}
