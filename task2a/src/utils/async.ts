import { useRef } from 'react';

export function sleep(timeMs: number) {
  return new Promise((resolve) => setTimeout(resolve, timeMs));
}

class TypeAhead<T> {
  private queue: T[] = [];
  constructor(private delayMs: number, private onDequeue: (queue: T[]) => T[]) {}

  public enqueue(e: T) {
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

export function useTypeAhead<T>(delayMs: number, callback: (queue: T[]) => T[]) {
  const helper = useRef<TypeAhead<T>>();
  if (!helper.current) {
    helper.current = new TypeAhead(delayMs, callback);
  }
  return helper.current;
}
