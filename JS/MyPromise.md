```js
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
	status = PENDING;
	value = undefined;
	reason = undefined;
	onFulfilledCallbacks = [];
	onRejectedCallbacks = [];

	constructor(executor) {
		try {
			executor(this.resolve, this.reject);
		} catch (error) {
			this.reject(error);
		}
	}

	resolve = (value) => {
		if (this.status === PENDING) {
			this.status = FULFILLED;
			this.value = value;
			this.onFulfilledCallbacks.forEach((callback) => callback(this.value));
		}
	};

	reject = (reason) => {
		if (this.status === PENDING) {
			this.status = REJECTED;
			this.reason = reason;
			this.onRejectedCallbacks.forEach((callback) => callback(this.reason));
		}
	};

	then = (onFulfilled, onRejected) => {
		if (typeof onFulfilled !== 'function') {
			onFulfilled = (value) => value;
		}
		if (typeof onRejected !== 'function') {
			onRejected = (reason) => {
				throw reason;
			};
		}
		const promise2 = new MyPromise((resolve, reject) => {
			const fulfilledMicrotask = () => {
				queueMicrotask(() => {
					try {
						const value = onFulfilled(this.value);
						resolvePromise(promise2, value, resolve, reject);
					} catch (error) {
						reject(error);
					}
				});
			};
			const rejectedMicrotask = () => {
				queueMicrotask(() => {
					try {
						const value = onRejected(this.reason);
						resolvePromise(promise2, value, resolve, reject);
					} catch (error) {
						reject(error);
					}
				});
			};
			if (this.status === FULFILLED) {
				fulfilledMicrotask();
			} else if (this.status === REJECTED) {
				rejectedMicrotask();
			} else {
				this.onFulfilledCallbacks.push(onFulfilled);
				this.onRejectedCallbacks.push(onRejected);
			}
		});
		return promise2;
	};

	catch = (onRejected) => {
		return this.then(null, onRejected);
	};

	finally = (callback) => {
		return this.then(
			(value) => MyPromise.resolve(callback()).then(() => value),
			(reason) =>
				MyPromise.resolve(callback()).catch(() => {
					throw reason;
				})
		);
	};

	static resolve = (value) => {
		return new MyPromise((resolve, reject) => {
			if (value instanceof MyPromise) {
				return value;
			}
			if (value && typeof value.then === 'function') {
				queueMicrotask(() => {
					value.then(resolve, reject);
				});
			} else {
				resolve(value);
			}
		});
	};

	static reject = (reason) => {
		return new MyPromise((_, reject) => {
			reject(reason);
		});
	};

	static all(promisesIterator) {
		return new MyPromise((resolve, reject) => {
			if (typeof promisesIterator[Symbol.iterator] !== 'function') {
				reject(new TypeError('Promise.all requires an iterable argument.'));
				return;
			}
			const values = [];
			const len = promisesIterator.length || promisesIterator.size;
			let count = 0;
			if (len === 0) {
				return resolve(values);
			}
			const promises = Array.from(promisesIterator);
			promises.forEach((promise, index) => {
				MyPromise.resolve(promise)
					.then((value) => {
						values[index] = value;
						if (++count === len) {
							resolve(values);
						}
					})
					.catch((reason) => {
						reject(reason);
					});
			});
		});
	}
}

function resolvePromise(promise2, value, resolve, reject) {
	if (promise2 === value) {
		reject(new TypeError('Chaining cycle detected for promise'));
		return;
	}
	let called = false;
	if (value && (typeof value === 'object' || typeof value === 'function')) {
		try {
			if (typeof value.then === 'function') {
				const then = value.then;
				then.call(
					value,
					(value2) => {
						if (called) {
							return;
						}
						called = true;
						resolvePromise(promise2, value2, resolve, reject);
					},
					(reason) => {
						if (called) {
							return;
						}
						called = true;
						reject(reason);
					}
				);
				// value.then(resolve, reject);
			} else {
				resolve(value);
			}
		} catch (error) {
			reject(error);
		}
	} else {
		resolve(value);
	}
}
```
