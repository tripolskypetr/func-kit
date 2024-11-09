/**
 * Generates a random string using the UUID library.
 *
 * @returns A randomly generated string.
 */
declare const randomString: () => string;

/**
 * Compares the full text in a given data object with a search term.
 *
 * @template T - The generic type for the data object.
 * @param data - The data object to compare.
 * @param search - The search term to compare against the data object.
 * @param keys - The keys in the data object to compare against.
 * @returns - Returns true if the full text in the data object contains the search term, false otherwise.
 */
declare const compareFulltext: <T extends Record<string, any>>(data: T, search: string, ...keys: string[]) => boolean;

/**
 * Determines the state of a given promise.
 *
 * @param promise - The promise to check the state of.
 *
 * @returns - The state of the promise, which can be either 'sync' or 'async'.
 */
declare const promiseState: <T = any>(promise: Promise<T> | T) => "sync" | "async";
declare const promiseValue: <T = any>(promise: Promise<T> | T) => T | null;

/**
 * Compares two arrays and determines if they are equal.
 *
 * @param a_arr - The first array to compare.
 * @param b_arr - The second array to compare.
 * @returns - Returns `true` if the arrays are equal, otherwise `false`.
 */
declare const compareArray: (a_arr: any, b_arr: any) => boolean;

/**
 * Check if a given value is an object.
 *
 * @param obj - The value to check.
 * @returns - Returns `true` if the value is an object, else `false`.
 */
declare const isObject: (obj: any) => boolean;

/**
 * Represents a set of parameters for custom symbol validation and replacement.
 * @interface
 */
interface IParams {
    symbol?: string;
    allowed?: RegExp | ((char: string, idx: number) => boolean);
    replace?: (char: string) => string | null;
}
/**
 * Formats a raw string using a template and optional parameters.
 *
 * @param raw - The raw string to be formatted.
 * @param template - The template string used for formatting.
 * @param [params] - Optional parameters for customization.
 * @param [params.symbol='0'] - The symbol used in the template to indicate characters to be replaced.
 * @param [params.allowed] - A function or regular expression used to filter characters in the raw string.
 * @param [params.replace] - A function used to replace characters in the raw string.
 * @returns The formatted string.
 */
declare const formatText: (raw: string, template: string, { symbol, allowed, replace, }?: IParams) => string;

/**
 * @interface IClearable
 * @description An interface representing an object that can be cleared.
 */
interface IClearable$4 {
    clear: () => void;
}
/**
 * Creates a function that is only executed once, and then memoizes and returns the result.
 *
 * @template T - The type of the function to be executed once.
 * @param run - The function to be executed once.
 * @returns - The executed function with additional "clear" method to reset the execution state.
 */
declare const singleshot: <T extends (...args: any[]) => any>(run: T) => T & IClearable$4;

/**
 * Interface for classes that can be cleared.
 * @interface
 */
interface IClearable$3 {
    clear: () => void;
}
/**
 * Interface for reading task status
 * @interface
 */
interface ITaskStatus {
    getStatus: () => "pending" | "fulfilled" | "rejected" | "ready";
}
/**
 * A class representing a task.
 *
 * @class
 */
declare class Task {
    readonly target: Promise<any>;
    private _status;
    /**
     * Retrieves the current status value.
     *
     * @return The value of the status.
     */
    get status(): "pending" | "fulfilled" | "rejected";
    /**
     * Constructor for creating an instance of the class.
     *
     * @param target - The target promise to be handled.
     *
     * @return - This method does not return any value.
     */
    constructor(target: Promise<any>);
}
/**
 * Represents a higher-order function that runs a task only once and provides a way to clear the result.
 * @template T - The function type.
 * @param run - The function to be executed.
 * @returns - The wrapped function with additional clear functionality.
 */
declare const singlerun: <T extends (...args: any[]) => any>(run: T) => T & IClearable$3 & ITaskStatus;

/**
 * Represents a wrapped function that returns a promise.
 * @template T - The type of the result of the wrapped function.
 * @template P - The types of the parameters of the wrapped function.
 */
interface IWrappedFn$1<T extends any = any, P extends any[] = any> {
    (...args: P): Promise<T | typeof CANCELED_SYMBOL>;
    cancel(): void;
}
/**
 * Symbol representing cancellation status.
 *
 * @type {Symbol}
 * @name CANCELED_SYMBOL
 */
declare const CANCELED_SYMBOL: unique symbol;
/**
 * Wraps a promise function and provides cancellation functionality.
 *
 * @param promise - The promise function to wrap.
 * @returns The wrapped function with cancellation capability.
 * @template T - The type of the promise's resolved value.
 * @template P - The type of the promise function's arguments.
 */
declare const cancelable: <T extends unknown = any, P extends any[] = any[]>(promise: (...args: P) => Promise<T>) => IWrappedFn$1<T, P>;

/**
 * Interface representing an object that can be cleared and flushed.
 */
interface IClearable$2 {
    clear: () => void;
    flush: () => void;
    pending: () => boolean;
}
/**
 * Creates a debounced version of a function.
 *
 * @template T - The type of the original function.
 * @param run - The function to debounce.
 * @param [delay=1000] - The delay in milliseconds before executing the debounced function.
 * @returns - The debounced function with additional methods for clearing and flushing.
 */
declare const debounce: <T extends (...args: any[]) => any>(run: T, delay?: number) => T & IClearable$2;

/**
 * Represents a wrapped function that returns a Promise.
 * @template T - The type of the value returned by the wrapped function.
 * @template P - The types of the parameters of the wrapped function.
 */
interface IWrappedFn<T extends any = any, P extends any[] = any> {
    (...args: P): Promise<T | typeof CANCELED_SYMBOL>;
    clear(): void;
    cancel(): void;
}
/**
 * Creates a wrapper function for a Promise that allows for cancellation and clearing of queued Promises.
 *
 * @template T - The resolved value of the Promise.
 * @template P - The types of the arguments passed to the promise function.
 * @param promise - The promise function to be wrapped.
 * @returns - The wrapped function.
 */
declare const queued: <T extends unknown = any, P extends any[] = any[]>(promise: (...args: P) => Promise<T>) => IWrappedFn<T, P>;

/**
 * Interface for objects that can be cleared.
 *
 * @interface
 */
interface IClearable$1 {
    clear: () => void;
}
/**
 * Caches the result of a function based on the change of arguments.
 * @template T - The type of the function to be cached.
 * @template A - The type of the arguments of the function.
 * @param changed - Function to determine if the arguments have changed.
 * @param run - The function to be cached.
 * @returns - The cached function with additional clear method.
 */
declare const cached: <T extends (...args: A) => any, A extends any[]>(changed: (prevArgs: A, currentArgs: A) => boolean, run: T) => T & IClearable$1;

/**
 * Interface representing a clearable object.
 * @template K - The type of the key.
 */
interface IClearable<K = string> {
    clear: (key?: K) => void;
}
/**
 * Represents a generic control interface with key-value pair operations.
 * @template K The type of keys.
 * @template V The type of values.
 * @interface
 */
interface IControl<K, V> {
    /**
     * Adds a key-value pair to the control.
     * @param key The key to add.
     * @param value The value to associate with the key.
     */
    add: (key: K, value: V) => void;
    /**
     * Removes a key and its associated value from the control.
     * @param key The key to remove.
     * @returns true if ok
     */
    remove: (key: K) => boolean;
}
/**
 * A memoization function that caches the result of a function based on its arguments.
 *
 * @template T - The function type that will be memoized
 * @template A - The argument types of the function
 * @template K - The key type used to store the memoized results
 * @param key - A function that generates a unique key based on the arguments of the original function
 * @param run - The original function to be memoized
 * @returns - A memoized version of the original function with the ability to clear the cache
 */
declare const memoize: <T extends (...args: A) => any, A extends any[], K = string>(key: (args: A) => K, run: T) => T & IClearable<K> & IControl<K, ReturnType<T>>;

interface IError extends Error {
}
/**
 * Represents a configuration interface.
 *
 * @interface
 */
interface IConfig {
    allowedErrors?: {
        new (): IError;
    }[];
    fallback?: (error: Error) => void;
    defaultValue: null | false;
}
/**
 * A higher-order function that wraps the provided function with a try-catch block. It catches any errors that occur during the execution of the function and handles them according to
 * the specified configuration.
 *
 * @template T - The type of the function being wrapped
 * @template A - An array of arguments that the function accepts
 * @template V - The type of the value returned by the function
 *
 * @param run - The function to be wrapped
 * @param config - The configuration object
 * @param config.fallback - The fallback function to be called with the caught error (optional)
 * @param config.defaultValue - The default value to be returned if an error occurs (optional, default: null)
 *
 * @returns - The wrapped function that handles errors and returns the result or the default value
 */
declare const trycatch: <T extends (...args: A) => any, A extends any[], V extends unknown>(run: T, { allowedErrors, fallback, defaultValue, }?: Partial<IConfig>) => (...args: A) => ReturnType<T> | null;

/**
 * Delays the execution for the specified amount of time.
 *
 * @param [timeout=1000] - The duration to wait in milliseconds.
 * @returns A promise that resolves once the timeout has elapsed.
 */
declare const sleep: (timeout?: number) => Promise<void>;

/**
 * A utility function to deep flatten an array of objects.
 *
 * @param arr - The input array to be deep flattened.
 * @returns - The deep flattened array.
 * @template T - The type of elements in the input array.
 */
declare const deepFlat: <T = any>(arr?: T[]) => T[];

type Function$2 = (...args: any[]) => any;
/**
 * Compose multiple functions together to create a new function that applies the given functions from right to left.
 * If no functions are given, the composed function will simply return the input argument.
 * If only one function is given, the composed function will simply return the output of that function.
 *
 * @param funcs - The functions to be composed.
 * @returns - The composed function.
 */
declare const compose: (...funcs: Function$2[]) => Function$2;

/**
 * TObserver is an interface that represents an observable object.
 * It provides various methods to transform, filter, merge, and consume data emitted by the observable.
 *
 * @template Data - The type of data emitted by the observable.
 */
interface TObserver$1<Data = unknown> {
    /**
     * Unsubscribe Function
     *
     * @returns
     */
    unsubscribe: () => void;
    /**
     * Applies a callback function to each value in a map and returns an observer for the result.
     *
     * @template T - The generic type of the result
     * @param callbackfn - The callback function to be applied to each value
     * @returns - An observer for the result of the callback function
     */
    map: <T = unknown>(callbackfn: (value: Data) => T) => TObserver$1<T>;
    /**
     * Applies a callback function to each element of the Data array and flattens the result into a single array.
     *
     * @template T - The type of elements in the result array.
     * @param callbackfn - A function that transforms each element of the Data array into an array of values.
     * @returns - An observer that emits the flattened array of transformed values.
     */
    flatMap: <T = any>(callbackfn: (value: Data) => T[]) => TObserver$1<T>;
    /**
     * Represents a function to reduce the data in an array-like structure.
     *
     * @template T - The type of the accumulator and current value.
     * @param callbackfn - A function that accepts the accumulator (acm) and the current value (cur), and returns the new accumulator value.
     * @param begin - The initial value of the accumulator.
     * @returns - Returns a TObserver object to observe the reduced value.
     */
    reduce: <T = any>(callbackfn: (acm: T, cur: Data) => T, begin: T) => TObserver$1<T>;
    /**
     * Asynchronously applies a callback function to each element of the data stream and returns a TObserver<T> object.
     *
     * @template T - The type of the result returned by the callback function.
     * @param callbackfn - The callback function to apply to each element of the data stream.
     * @param [fallbackfn] - Optional fallback function to handle any errors that occur during the mapping process.
     * @returns - The observer object that can be used to subscribe and handle the mapped data stream.
     */
    mapAsync: <T = unknown>(callbackfn: (value: Data) => Promise<T>, fallbackfn?: (e: Error) => void) => TObserver$1<T>;
    /**
     * @template T - The type of the target observer
     * @param callbackfn - The callback function to be executed
     * @returns - The observer of type T
     */
    operator: <T = any>(callbackfn: (target: TObserver$1<Data>) => TObserver$1<T>) => TObserver$1<T>;
    /**
     * Creates a filtered observer that applies a callback function to each value emitted by the source observer and only emits the values for which the callback returns true.
     *
     * @param callbackfn - A function called for each value emitted by the source observer. Should return true to include the value in the filtered observer
     *, or false otherwise.
     * @returns A new observer that only emits values for which the callback returns true.
     */
    filter: (callbackfn: (value: Data) => boolean) => TObserver$1<Data>;
    /**
     * Merges the provided observer with another observer of type T, returning a new observer that emits values
     * of type `Data | T`.
     *
     * @template T - The type of the observer to merge with.
     * @param observer - The observer to merge with.
     * @returns - The merged observer.
     */
    merge: <T = unknown>(observer: TObserver$1<T>) => TObserver$1<Data | T>;
    /**
     * Represents a tap function that takes a callback function to be executed.
     *
     * @param callbackfn - The callback function to be executed.
     * @returns - The observer used for subscribing to the tap function.
     *
     * @template Data - The type of data that the callback function takes as input.
     */
    tap: (callbackfn: (value: Data) => void) => TObserver$1<Data>;
    /**
     * Represents a function that splits an array into multiple arrays of a specified length.
     *
     * @returns An observer that emits an array of arrays where each subarray contains a maximum of 20 elements.
     */
    split: () => TObserver$1<ReadonlyArray<FlatArray<Data[], 20>>>;
    /**
     * Creates a debounced observer with optional delay.
     *
     * @param [delay] - The delay in milliseconds before emitting the observation.
     * @returns - The debounced observer.
     */
    debounce: (delay?: number) => TObserver$1<Data>;
    /**
     * Creates a delayed observer with optional delay.
     *
     * @param [delay] - The delay in milliseconds before emitting the observation.
     * @returns - The debounced observer.
     */
    delay: (delay?: number) => TObserver$1<Data>;
    /**
     * A function that returns an observer with optional interval.
     *
     * @param [interval] - The optional interval in milliseconds.
     * @returns - An observer.
     */
    repeat: (interval?: number) => TObserver$1<Data>;
    /**
     * Represents a connection with a callback function.
     * @typicalname connect
     *
     * @param callbackfn - The callback function to be executed when a value is received.
     * @param value - The value received by the callback function.
     * @returns - A function that can be used to disconnect the connection.
     */
    connect: (callbackfn: (value: Data) => void) => () => void;
    /**
     * Executes a given callback function once and returns a function that can be used to cancel the execution.
     *
     * @param callbackfn - The callback function to execute once.
     * @returns - A function that can be used to cancel the execution of the callback function.
     */
    once: (callbackfn: (value: Data) => void) => () => void;
    /**
     * Represents a function that returns a TObserver object.
     *
     * @typedef share
     * @returns The TObserver object
     */
    share: () => TObserver$1<Data>;
    /**
     * Converts the given value to a Promise with the specified data type.
     *
     * @function toPromise
     * @returns A Promise with the specified data type.
     */
    toPromise: () => Promise<Data>;
    /**
     * Represents an iterator context.
     *
     * @interface
     */
    toIteratorContext: () => {
        iterate(): AsyncGenerator<Data, void, unknown>;
        done(): void;
    };
}
/**
 * Represents an observable class that can be used to observe changes in data.
 * @template Data - The type of data that the observable emits.
 */
type TObservable$1<Data = unknown> = Omit<TObserver$1<Data>, keyof {
    unsubscribe: never;
    connect: never;
    once: never;
    share: never;
}>;

declare const LISTEN_CONNECT: unique symbol;
declare const LISTEN_DISCONNECT: unique symbol;
type Fn = (...args: any[]) => void;
/**
 * A class representing an Observer.
 *
 * @template Data - The type of data to observe.
 */
declare class Observer<Data = any> implements TObserver$1<Data> {
    private readonly dispose;
    private readonly broadcast;
    private _isShared;
    /**
     * Returns the current value of the 'isShared' property.
     *
     * @returns - The value of the 'isShared' property.
     */
    get isShared(): boolean;
    /**
     * Returns whether the given event has any listeners.
     *
     * @returns True if there are listeners for the event, otherwise false.
     */
    get hasListeners(): boolean;
    constructor(dispose: Fn);
    /**
     * Sets up a listener for the connect event on the broadcast channel.
     *
     * @param fn - The callback function to be executed once the connect event is triggered.
     * @returns
     */
    [LISTEN_CONNECT](fn: () => void): void;
    /**
     * Adds a listener for the DISCONNECT_EVENT.
     *
     * @param fn - The function to be executed when the event occurs.
     */
    [LISTEN_DISCONNECT](fn: () => void): void;
    /**
     * Subscribe a given observer to the global broadcast event.
     *
     * @param observer - The observer subscribing to the event.
     * @param callback - The callback function to be executed when the event is triggered.
     * @returns
     */
    private _subscribe;
    /**
     * Unsubscribes a callback function from the observer event.
     *
     * @param callback - The callback function to unsubscribe.
     * @returns
     */
    private _unsubscribe;
    /**
     * Tries to dispose the object if it has no listeners and is not shared.
     * If disposed successfully, emits the DISCONNECT_EVENT.
     */
    private tryDispose;
    /**
     * Creates a new Observer.
     * @template T - The type of the value emitted by the observer.
     * @param callbackfn - A function to apply to each value emitted by the observer.
     * @returns - The created Observer.
     */
    map: <T = any>(callbackfn: (value: Data) => T) => Observer<T>;
    /**
     * Applies a callback function to each value emitted by the Observable and flattens the resulting values into a new Observable.
     *
     * @template T - The type of values emitted by the Observable.
     *
     * @param callbackfn - A callback function that accepts a value emitted by the Observable and returns an array of values or a single value.
     *
     * @returns - A new Observer that emits the flattened values.
     */
    flatMap: <T = any>(callbackfn: (value: Data) => T[]) => Observer<T>;
    /**
     * Operator function to create a new observer with a transformed data type.
     *
     * @template T - The type of the transformed data.
     * @param callbackfn - A callback function that takes the target observer and returns a new observer with transformed data.
     * @returns - A new observer with the transformed data type.
     */
    operator: <T = any>(callbackfn: (target: TObserver$1<Data>) => TObserver$1<T>) => TObserver$1<T>;
    /**
     * Reduces the data emitted by an Observer using a callback function and an initial value.
     *
     * @template T - The type of the accumulator and the return value.
     * @param callbackfn - The callback function to execute on each emitted value.
     *   It takes an accumulator value and the current value being emitted, and returns the new accumulator value.
     * @param begin - The initial value of the accumulator.
     * @returns - An Observer that emits the accumulated value after each emission.
     */
    reduce: <T = any>(callbackfn: (acm: T, cur: Data) => T, begin: T) => Observer<T>;
    /**
     * Creates and returns an observer function that splits an array of data
     * into a nested array of a specified length.
     *
     * @returns The split observer function.
     */
    split: () => Observer<ReadonlyArray<FlatArray<Data[], 20>>>;
    /**
     * Creates an Observer with asynchronous mapping functionality.
     *
     * @template T - The type of the result of the mapping function.
     * @param callbackfn - The function used to map the incoming data.
     * @param [fallbackfn] - An optional fallback function to handle error cases. If not provided, the error will be rethrown.
     * @returns - The created Observer.
     */
    mapAsync: <T = any>(callbackfn: (value: Data) => Promise<T>, fallbackfn?: (e: Error) => void) => Observer<T>;
    /**
     * Creates a filtered observer.
     *
     * @param callbackfn - The filter callback function.
     * @returns The filtered observer.
     */
    filter: (callbackfn: (value: Data) => boolean) => Observer<Data>;
    /**
     * Attaches a callback function to the tap observer. The callback function will be called with a value of type `Data` when the tap observer is triggered.
     *
     * @param callbackfn - A callback function that takes a value of type `Data` as an argument.
     * @returns - An observer object that can be used to manage the tap subscription.
     */
    tap: (callbackfn: (value: Data) => void) => Observer<Data>;
    /**
     * Creates a debounced observer that emits values at a specified delay.
     *
     * @param delay - The delay (in milliseconds) between value emissions.
     * @returns The debounced observer.
     */
    debounce: (delay?: number) => Observer<Data>;
    /**
     * Creates a delayed observer that emits values at a specified delay.
     *
     * @param delay - The delay (in milliseconds) between value emissions.
     * @returns The debounced observer.
     */
    delay: (delay?: number) => Observer<Data>;
    /**
     * Emits the specified data to all observers.
     *
     * @param data - The data to be emitted.
     */
    emit: (data: Data) => Promise<void>;
    /**
     * Subscribes to the `OBSERVER_EVENT` and invokes the provided callback function.
     * Emits the `CONNECT_EVENT`.
     * Returns a composed function that will try to dispose and unsubscribe the callback.
     *
     * @param callbackfn - The callback function to be invoked when `OBSERVER_EVENT` is emitted.
     * @returns - The composed function that will try to dispose and unsubscribe the callback.
     */
    connect: (callbackfn: (value: Data) => void) => Function$2;
    /**
     * Executes a callback function once and provides a way to unsubscribe from further executions.
     *
     * @param callbackfn - The callback function to be executed once.
     * @returns - A function that can be called to unsubscribe from further executions of the callback.
     */
    once: (callbackfn: (value: Data) => void) => Fn;
    /**
     * Marks a variable as shared.
     *
     * @returns The shared variable object.
     */
    share: () => this;
    /**
     * Creates an observable sequence that emits values at specified intervals.
     * @param [interval=1000] - The time interval between emissions in milliseconds.
     * @returns The observer object to subscribe to.
     */
    repeat: (interval?: number) => Observer<Data>;
    /**
     * Merges an observer with the given observer, returning a new observer that emits values from both observers.
     *
     * @template T - The type of value emitted by the observer.
     * @param observer - The observer to merge with.
     * @returns - The merged observer.
     */
    merge: <T = any>(observer: TObserver$1<T>) => Observer<Data | T>;
    /**
     * Unsubscribes from all events and performs cleanup.
     *
     * @function
     * @name unsubscribe
     * @memberOf undefined
     *
     * @returns
     */
    unsubscribe: () => void;
    /**
     * Converts the current instance to a Promise that resolves with the data.
     *
     * @returns A Promise that resolves with the data.
     */
    toPromise: () => Promise<Data>;
    /**
     * Creates a context for iterating asynchronously using a generator function.
     *
     * @returns The iterator context object.
     * @property iterate - The generator function that can be used to iterate over the values.
     * @property done - Marks the iteration as complete.
     */
    toIteratorContext: () => {
        iterate: () => AsyncGenerator<Awaited<Data>, void, unknown>;
        done(): void;
    };
}

/**
 * Interface representing a subject that can be subscribed to and trigger callbacks when data is updated.
 *
 * @template Data - The type of data that the subject emits.
 */
interface TSubject$1<Data = unknown> {
    /**
     * Subscribe to receive data updates.
     *
     * @param callback - The callback function to be called when data is received.
     *                             It takes a single parameter, `data`, of type `Data`.
     *                             The callback function is expected to have a `void` return type.
     *
     * @returns - The unsubscribe function. Call this function to stop receiving data updates.
     *                      It has a `void` return type.
     *
     * @typedef Data - The data received by the callback function.
     * @property [property1] - The first property of the data.
     * @property [property2] - The second property of the data.
     * @property [property3] - The third property of the data.
     */
    subscribe: (callback: (data: Data) => void) => () => void;
    /**
     * Executes the provided callback function once, and returns a cleanup function.
     *
     * @param callback - A callback function to be executed once.
     *                            - The callback function is expected to take one argument of type Data and have no return value.
     *
     * @returns - A cleanup function that can be executed to cancel any pending or ongoing execution of the callback.
     */
    once: (callback: (data: Data) => void) => () => void;
    /**
     * Executes the next function with the provided data.
     *
     * @param data - The data to be passed to the next function.
     * @returns
     */
    next: (data: Data) => void;
}

type Function$1 = (...args: any[]) => void;
/**
 * Represents a subject that can emit data and be subscribed to.
 * @class
 * @implements {TSubject<Data>}
 * @implements {TObservable<Data>}
 * @template Data - The type of data that the subject emits.
 */
declare class Subject<Data = any> implements TSubject$1<Data>, TObservable$1<Data> {
    private _emitter;
    constructor();
    /**
     * Maps the values of the observer using the given callback function.
     *
     * @template T - The type of the mapped values.
     * @param callbackfn - A function that maps each value of the observer.
     * @returns - An observer with the mapped values.
     */
    map: <T = any>(callbackfn: (value: Data) => T) => TObserver$1<T>;
    /**
     * Applies a transformation function to each value emitted by the observer and flattens the result into a single observer.
     * @template T - The type of values emitted by the observer.
     * @param callbackfn - The transformation function to apply to each value emitted by the observer.
     * @returns - The observer that emits the flattened values.
     */
    flatMap: <T = any>(callbackfn: (value: Data) => T[]) => TObserver$1<T>;
    /**
     * Applies a reducer function to each value emitted by the observer and returns a single accumulated value.
     *
     * @template T - The type of the accumulated value and emitted values
     * @param callbackfn - A function that accepts the accumulated value and the current emitted value, and returns the new accumulated value
     * @param begin - The initial value for the accumulator
     * @returns - An observer that emits the accumulated value when the original observer completes
     */
    reduce: <T = any>(callbackfn: (acm: T, cur: Data) => T, begin: T) => TObserver$1<T>;
    /**
     * Asynchronously maps the emitted values of the observer using the provided callback function.
     *
     * @template T - The type of the mapped values.
     * @param callbackfn - The callback function that maps the emitted values of the observer.
     * @param [fallbackfn] - The optional fallback function that handles errors during mapping.
     * @returns - Returns a new observer that emits the mapped values.
     */
    mapAsync: <T = any>(callbackfn: (value: Data) => Promise<T>, fallbackfn?: (e: Error) => void) => TObserver$1<T>;
    /**
     * Applies a filtering function to the observer and returns a new observer with filtered values.
     *
     * @param callbackfn - A function that tests each value in the observer. Should return true or false.
     * @returns - A new observer with filtered values.
     */
    filter: (callbackfn: (value: Data) => boolean) => TObserver$1<Data>;
    /**
     * The tap function allows you to perform side effects without modifying the observed data.
     *
     */
    tap: (callbackfn: (value: Data) => void) => TObserver$1<Data>;
    /**
     * Applies a callback function to the values emitted by an observer.
     *
     * @param callbackfn - The callback function to apply to the emitted values.
     * @returns - An observer with the applied operator.
     *
     * @template T - The type of values emitted by the observer.
     *
     * @category Observables
     */
    operator: <T = any>(callbackfn: (value: TObserver$1<Data>) => TObserver$1<T>) => TObserver$1<T>;
    /**
     * Splits the observed data into batches of arrays.
     *
     * @returns - The observer that emits batches of arrays.
     */
    split: () => Observer<ReadonlyArray<FlatArray<Data[], 20>>>;
    /**
     * Creates a debounced observer with an optional delay.
     * @param [delay] - The delay in milliseconds before emitting the data.
     * @returns - The debounced observer.
     */
    debounce: (delay?: number) => TObserver$1<Data>;
    /**
     * Creates a delayed observer with an optional delay.
     * @param [delay] - The delay in milliseconds before emitting the data.
     * @returns - The delayed observer.
     */
    delay: (delay?: number) => TObserver$1<Data>;
    /**
     * Creates an observer that repeats emitting values at a specified interval.
     *
     * @param [interval] - The time interval at which to repeat emitting values.
     * @returns - The created observer.
     */
    repeat: (interval?: number) => TObserver$1<Data>;
    /**
     * Merges the provided observer with the current observer instance.
     * Returns a new observer that emits values from both observers.
     *
     * @param observer - The observer to merge with the current observer.
     * @returns - A new observer that emits values from both observers.
     */
    merge: <T = any>(observer: TObserver$1<T>) => TObserver$1<Data | T>;
    /**
     * Subscribes to an event.
     *
     * @param callback - The callback function to be invoked when the event is triggered.
     * @returns - A function to unsubscribe from the event.
     */
    subscribe: (callback: Function$1) => () => void;
    /**
     * Unsubscribes all event listeners.
     *
     * @function unsubscribeAll
     * @instance
     * @returns - No return value.
     */
    unsubscribeAll: () => void;
    /**
     * Executes the provided callback function only once.
     * The callback function will be invoked when the specified event occurs for the first time.
     *
     * @param callback - The function to be executed only once.
     * @returns - A function that removes the registered event listener.
     */
    once: (callback: Function$1) => () => void;
    /**
     * Calls the next method to emit the specified data using the SUBJECT_EVENT event.
     *
     * @param data - The data to be emitted.
     * @return - Resolves when the emission is complete.
     */
    next(data: Data): Promise<void>;
    /**
     * Creates a new observer to observe the data emitted by a source.
     *
     * @template TObserver - The type of observer.
     * @template Data - The type of data emitted by the source.
     * @returns - The created observer.
     */
    toObserver(): TObserver$1<Data>;
    /**
     * Converts an observer-based asynchronous operation into a promise-based asynchronous operation.
     *
     * @function toPromise
     * @instance
     * @returns A promise representing the completion or failure of the asynchronous operation.
     */
    toPromise: () => Promise<Data>;
    /**
     * Converts the current object to an iterator context.
     *
     * @function
     * @returns The iterator context representing the current object.
     */
    toIteratorContext: () => {
        iterate(): AsyncGenerator<Data, void, unknown>;
        done(): void;
    };
}

/**
 * Represents a behavior subject.
 * @template Data The type of data that the behavior subject holds.
 * @extends TSubject<Data>
 * @interface
 */
interface TBehaviorSubject$1<Data = unknown> extends TSubject$1<Data> {
    data: Data | null;
}

/**
 * Represents a BehaviorSubject that extends the Subject class and provides the functionality of an observable and an observer.
 *
 * @template Data - The type of the data that the BehaviorSubject holds.
 */
declare class BehaviorSubject<Data = any> extends Subject<Data> implements TBehaviorSubject$1<Data>, TObservable$1<Data> {
    private _data;
    constructor(_data?: Data | null);
    /**
     * Retrieves the data stored in the instance.
     *
     * @return The data stored in the instance.
     */
    get data(): Data;
    /**
     * Sets the given data and calls the next method of the super class asynchronously.
     *
     * @param data - The data to be set.
     * @return Resolves when super class's next method is called.
     */
    next: (data: Data) => Promise<void>;
    /**
     * Creates a new observer.
     *
     * @returns The observer instance.
     */
    toObserver: () => TObserver$1<Data>;
}

type EventKey = string | symbol;
type Function = (...args: any[]) => void;
/**
 * Class representing an event emitter.
 * @class
 */
declare class EventEmitter {
    private _events;
    /**
     * Check if the object has any listeners attached to it.
     *
     * @return True if the object has listeners, false otherwise.
     */
    get hasListeners(): boolean;
    /**
     * Retrieves the listeners associated with the given event key.
     *
     * @param key - The event key to retrieve the listeners for.
     * @returns An array of listeners associated with the given event key.
     */
    getListeners: (key: EventKey) => Function[];
    /**
     * Subscribes a callback function to the specified event name.
     *
     * @param eventName - The key of the event.
     * @param callback - The callback function to be executed when the event is triggered.
     * @returns
     */
    subscribe: (eventName: EventKey, callback: Function) => void;
    /**
     * Removes a callback function from the list of event listeners for the specified event.
     *
     * @param eventName - The key of the event to unsubscribe from.
     * @param callback - The callback function to remove from the event listeners.
     * @returns
     */
    unsubscribe: (eventName: EventKey, callback: Function) => void;
    /**
     * Clears all event handlers registered for the current object.
     * @function
     * @returns
     */
    unsubscribeAll: () => void;
    /**
     * Subscribes a callback function to the given event name. The callback function will be triggered only once when the event is emitted.
     *
     * @param eventName - The name of the event to subscribe to.
     * @param callback - The callback function to be executed when the event is emitted.
     * @returns - A function that can be called to unsubscribe the callback function from the event.
     */
    once: (eventName: EventKey, callback: Function) => () => void;
    /**
     * Emits the given event with the specified arguments.
     *
     * @param eventName - The name of the event to emit.
     * @param args - The arguments to pass to the event listeners.
     * @returns - A promise that resolves when all event listeners have completed.
     */
    emit: (eventName: EventKey, ...args: any[]) => Promise<void>;
}

interface ICounted<T> {
    value: T;
    count: number;
}

/**
 * Represents a collection of static operator functions.
 */
declare class Operator {
    static take: <T = any>(count: number) => (target: TObserver$1<T>) => TObserver$1<T>;
    static skip: <T = any>(the: number) => (target: TObserver$1<T>) => TObserver$1<T>;
    static pair: <T = any>(by?: number) => (target: TObserver$1<T>) => TObserver$1<[T, T]>;
    static group: <T = any>(by: number) => (target: TObserver$1<T>) => TObserver$1<T[]>;
    static strideTricks: <T = any>(strideSize: number, step?: number) => (target: TObserver$1<T[]>) => TObserver$1<T[][]>;
    static distinct: <T = any, V = any>(getCompareValue?: (value: T) => V) => (target: TObserver$1<T>) => TObserver$1<T>;
    static liveness: <T = any>(fallbackfn: () => void, waitFor?: number) => (target: TObserver$1<T>) => TObserver$1<T>;
    static count: <T = any>() => (target: TObserver$1<T>) => TObserver$1<ICounted<T>>;
}

/**
 * The Source class provides utility functions for creating and manipulating Observers.
 */
declare class Source {
    /**
     * Merges multiple observers into a single observer.
     *
     * @template A - The type of observer A.
     * @template B - The type of observer B.
     * @template C - The type of observer C.
     * @template D - The type of observer D.
     * @template E - The type of observer E.
     * @template F - The type of observer F.
     * @template G - The type of observer G.
     * @template H - The type of observer H.
     * @template I - The type of observer I.
     * @template J - The type of observer J.
     *
     * @param observers - An array of observers to merge.
     *
     * @returns - The merged observer.
     */
    static merge: <A = never, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never, J = never>(observers: [TObserver$1<A>, TObserver$1<B>?, TObserver$1<C>?, TObserver$1<D>?, TObserver$1<E>?, TObserver$1<F>?, TObserver$1<G>?, TObserver$1<H>?, TObserver$1<I>?, TObserver$1<J>?]) => TObserver$1<A | B | C | D | E | F | G | H | I | J>;
    /**
     * Creates a join observer that combines the values emitted by multiple Observers into a single Observable.
     *
     * @template A - The type of the value emitted by the first Observer.
     * @template B - The type of the value emitted by the second Observer.
     * @template C - The type of the value emitted by the third Observer.
     * @template D - The type of the value emitted by the fourth Observer.
     * @template E - The type of the value emitted by the fifth Observer.
     * @template F - The type of the value emitted by the sixth Observer.
     * @template G - The type of the value emitted by the seventh Observer.
     * @template H - The type of the value emitted by the eighth Observer.
     * @template I - The type of the value emitted by the ninth Observer.
     * @template J - The type of the value emitted by the tenth Observer.
     *
     * @param observers - An array of Observers to join.
     * @param options - Optional parameters for the join operation, including a buffer and a race flag.
     * @param options.buffer - An array to store the latest emitted values from each Observer. Defaults to an empty array.
     * @param options.race - A boolean flag indicating whether to emit the combined values immediately or wait for all Observers to emit a value. Defaults to false.
     *
     * @returns An Observer that emits an array of values, each value being the latest emitted value from the corresponding Observer.
     */
    static join: <A = never, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never, J = never>(observers: [TObserver$1<A>, TObserver$1<B>?, TObserver$1<C>?, TObserver$1<D>?, TObserver$1<E>?, TObserver$1<F>?, TObserver$1<G>?, TObserver$1<H>?, TObserver$1<I>?, TObserver$1<J>?], { race, buffer, }?: {
        buffer?: [A, B?, C?, D?, E?, F?, G?, H?, I?, J?];
        race?: boolean;
    }) => TObserver$1<[A, B, C, D, E, F, G, H, I, J]>;
    /**
     * @typedef Unicast
     * @template Data - The type of data the observer handles.
     *
     * @property factory - A factory function to create the observer.
     * @property isUnicasted - Indicates whether the observer is unicast.
     *
     * @returns - A unicast observer instance.
     */
    static unicast: <Data = any>(factory: () => TObserver$1<Data>) => TObserver$1<Data> & {
        isUnicasted: true;
    };
    /**
     * Creates a multicast observer.
     *
     * @template Data - The type of data being observed.
     * @param factory - A factory function that creates the observer.
     * @returns - The multicast observer.
     */
    static multicast: <Data = any>(factory: () => TObserver$1<Data>) => TObserver$1<Data> & {
        isMulticasted: true;
        getRef: any;
    };
    /**
     * Creates a hot observable that emits data as it is received from the given emitter.
     *
     * @template Data The type of data emitted by the observable.
     * @param emitter The function that receives a callback to emit data. It should return a cleanup function or `undefined`.
     * @returns The observer that allows subscribing to and unsubscribing from the emitted data.
     */
    static createHot: <Data = any>(emitter: (next: (data: Data) => void) => ((() => void) | void)) => Observer<Data>;
    /**
     * Creates a cold observable.
     *
     * @param emitter - The emitter function which is called when a subscriber is added.
     *                            It should return a function that is called when the subscription is unsubscribed,
     *                            or return `undefined` if no cleanup is needed.
     * @returns - The created observer.
     */
    static createCold: <Data = any>(emitter: (next: (data: Data) => void) => ((() => void) | void)) => Observer<Data>;
    /**
     * Creates a new instance of the Cold object.
     */
    static create: <Data = any>(emitter: (next: (data: Data) => void) => ((() => void) | void)) => Observer<Data>;
    /**
     * Creates a pipe that connects an observer to a subject and emits output values based on a given emitter function.
     *
     * @param target - The observer that will receive output values.
     * @param emitter - A function that takes a subject and a next function and returns an unsubscribe function.
     * @returns The observer that is connected to the subject and emits output values.
     * @template Data - The type of data that will be observed.
     * @template Output - The type of output that will be emitted.
     */
    static pipe: <Data = any, Output = any>(target: TObserver$1<Data>, emitter: (subject: TSubject$1<Data>, next: (output: Output) => void) => ((() => void) | void)) => Observer<Output>;
    static fromInterval: (delay: number) => TObserver$1<number>;
    static fromPromise: <Data = any>(callbackfn: () => Promise<Data>, fallbackfn?: (e: Error) => void) => TObserver$1<Data>;
    static fromDelay: (delay: number) => TObserver$1<void>;
    static fromArray: <Data = any>(data: Data) => TObserver$1<ReadonlyArray<FlatArray<Data[], 20>>>;
    /**
     * Creates a new observer that emits a value from the given data or function.
     *
     * @param data - The data or function to emit from the observer.
     * @returns - The created observer.
     */
    static fromValue: <Data = any>(data: Data | (() => Data)) => TObserver$1<Data>;
    /**
     * Creates an observer from the given subject and returns it.
     *
     * @template Data - The type of data emitted by the observer.
     * @param subject - The subject to create the observer from.
     * @returns - The observer created from the subject.
     */
    static fromSubject: <Data = any>(subject: TSubject$1<Data>) => Observer<Data>;
    /**
     * Creates an observer from a BehaviorSubject.
     *
     * @template Data The type of data emitted by the BehaviorSubject.
     * @param subject - The BehaviorSubject to create the observer from.
     * @returns The observer created from the BehaviorSubject.
     */
    static fromBehaviorSubject: <Data = any>(subject: TBehaviorSubject$1<Data>) => Observer<Data>;
}

type TSubject<Data = void> = TSubject$1<Data>;
type TObserver<Data = void> = TObserver$1<Data>;
type TObservable<Data = void> = TObservable$1<Data>;
type TBehaviorSubject<Data = unknown> = TBehaviorSubject$1<Data>;

export { BehaviorSubject, CANCELED_SYMBOL as CANCELED_PROMISE_SYMBOL, EventEmitter, Observer, Operator, Source, Subject, type TBehaviorSubject, type TObservable, type TObserver, type TSubject, Task, cached, cancelable, compareArray, compareFulltext, compose, debounce, deepFlat, formatText, isObject, memoize, promiseState, promiseValue, queued, randomString, singlerun, singleshot, sleep, trycatch };
