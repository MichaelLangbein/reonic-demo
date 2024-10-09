export function sleep(timeMs: number) {
  return new Promise((resolve) => setTimeout(resolve, timeMs));
}

export class TypeAhead<T> {
  private queue: T[] = [];
  constructor(private delayMs: number, private onDequeue: (queue: T[]) => T[]) {}

  public event(e: T) {
    this.queue.push(e);
    this.startTimer();
  }

  private ongoingTimeout?: number;
  private startTimer() {
    if (this.ongoingTimeout) {
      clearTimeout(this.ongoingTimeout);
    }

    this.ongoingTimeout = setTimeout(() => {
      this.dequeue();
      this.ongoingTimeout = undefined;
    }, this.delayMs);
  }

  private dequeue() {
    if (this.queue.length > 0) this.queue = this.onDequeue(this.queue);
  }
}
