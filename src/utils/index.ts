/**
 * Sleep for a while.
 * @param interval Sleep time (ms)
 * @example
 * await sleep(1000);
 *
 * sleep(1000).then(() => {
 *    // do something...
 * })
 */
export function sleep(interval: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), interval);
  });
}

/**
 *
 * @param fn {Function} The task to be executed, and the task ends when true is returned.
 * @param options The total number and interval of task execution.
 * @returns
 */
export async function polling(
  fn: () => Promise<boolean> | boolean,
  options?: Partial<{ times: number; interval: number }>
) {
  const times = options?.times ?? 10;
  const interval = options?.interval ?? 1000;

  let currentLoop = 0;
  while (currentLoop < times) {
    const success = await fn();
    if (success) {
      return true;
    }
    await sleep(interval);
    currentLoop++;
  }

  return false;
}

export * from "./formatters";
