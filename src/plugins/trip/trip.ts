export abstract class Trip<P, Q, B> {
  isSubmitting = false;
  isSubmitted = false;
  protected params?: P;
  protected query?: Q;
  protected body?: B;

  setParams (params: P) {
    this.params = params
  }

  setQuery (query: Q) {
    this.query = query
  }

  setBody (body: B) {
    this.body = body
  }

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
