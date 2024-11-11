import first from "../math/first";
import BehaviorSubject from "../rx/BehaviorSubject";
import queued, { IWrappedQueuedFn as IWrappedFnInternal } from "./queued";

/**
 * Represents a wrapped function definition.
 * @template T - The return type of the wrapped function.
 * @template P - The parameter types of the wrapped function.
 */
export interface IWrappedLockFn<T extends any = any, P extends any[] = any> extends IWrappedFnInternal<T, P> {
    beginLock(): void;
    endLock(): Promise<void>;
}

/**
 * A special symbol representing a value that should never be used or returned.
 *
 * @type {symbol}
 */
const NEVER_VALUE = Symbol('never');

/**
 * Wraps a promise function with lock functionality.
 *
 * @param promise - The promise function to be wrapped.
 * @returns The wrapped function with lock functionality.
 */
export const lock = <T extends any = any, P extends any[] = any[]>(promise: (...args: P) => Promise<T>): IWrappedLockFn<T, P> => {

    let lockCount = 0;
    let lockSubject = new BehaviorSubject(lockCount);

    /**
     * Waits for the lock to be unlocked.
     * @returns - Resolves when the lock is unlocked.
     */
    const waitForUnlock = () => new Promise<void>((resolve) => {
        const handler = () => {
            if (lockSubject.data === 0) {
                resolve();
                return;
            }
            lockSubject.once(handler);
        }
        handler();
    });

    /**
     * Executes a function, after waiting for the unlock signal.
     *
     * @function
     * @param args - The arguments to pass to the function.
     * @returns - A promise that resolves to the value returned by the function.
     */
    const executeFn = queued(async (...args: P) => {
        await waitForUnlock();
        if (first(args) === NEVER_VALUE) {
            return null as never;
        }
        return await promise(...args);
    });

    /**
     * Asynchronous function wrapper.
     * @param args - Arguments to be passed to the wrapped function.
     * @returns - A promise that resolves to the result of the wrapped function.
     */
    const wrappedFn = async (...args: P) => {
        return await executeFn(...args);
    };

    /**
     * Removes all the wrapped functions that are stored in the wrappedFn collection.
     * @function wrappedFn.clear
     * @returns
     */
    wrappedFn.clear = () => {
        lockSubject.next(0);
        lockCount = 0;
        lockSubject = new BehaviorSubject(lockCount);
        executeFn.clear();
    };

    /**
     * Cancels the execution of a wrapped function.
     *
     * @function cancel
     * @memberof wrappedFn
     *
     */
    wrappedFn.cancel = () => {
        wrappedFn.clear();
        executeFn.cancel();
    };

    /**
     * Begins a lock for the wrapped function.
     *
     * @function beginLock
     * @memberof wrappedFn
     */
    wrappedFn.beginLock = () => {
        lockCount += 1;
        lockSubject.next(lockCount);
    };

    /**
     * Releases the lock after the wrapped function has completed execution.
     *
     * @param wrappedFn - The function that is wrapped and needs the lock released.
     * @returns - The result of executing the wrapped function.
     */
    wrappedFn.endLock = async () => {
        lockCount = Math.max(lockCount - 1, 0);
        lockSubject.next(lockCount);
        await (executeFn as Function)(NEVER_VALUE);
    };

    return wrappedFn;
};

export default lock;
