var AsciinemaPlayer = (function (exports) {
  'use strict';

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
        args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
        }

        _next(undefined);
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var runtime = {exports: {}};

  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  (function (module) {
    var runtime = (function (exports) {
      var Op = Object.prototype;
      var hasOwn = Op.hasOwnProperty;
      var undefined$1; // More compressible than void 0.
      var $Symbol = typeof Symbol === 'function' ? Symbol : {};
      var iteratorSymbol = $Symbol.iterator || '@@iterator';
      var asyncIteratorSymbol = $Symbol.asyncIterator || '@@asyncIterator';
      var toStringTagSymbol = $Symbol.toStringTag || '@@toStringTag';

      function define(obj, key, value) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true,
        });
        return obj[key];
      }
      try {
        // IE 8 has a broken Object.defineProperty that only works on DOM objects.
        define({}, '');
      } catch (err) {
        define = function (obj, key, value) {
          return (obj[key] = value);
        };
      }

      function wrap(innerFn, outerFn, self, tryLocsList) {
        // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
        var generator = Object.create(protoGenerator.prototype);
        var context = new Context(tryLocsList || []);

        // The ._invoke method unifies the implementations of the .next,
        // .throw, and .return methods.
        generator._invoke = makeInvokeMethod(innerFn, self, context);

        return generator;
      }
      exports.wrap = wrap;

      // Try/catch helper to minimize deoptimizations. Returns a completion
      // record like context.tryEntries[i].completion. This interface could
      // have been (and was previously) designed to take a closure to be
      // invoked without arguments, but in all the cases we care about we
      // already have an existing method we want to call, so there's no need
      // to create a new function object. We can even get away with assuming
      // the method takes exactly one argument, since that happens to be true
      // in every case, so we don't have to touch the arguments object. The
      // only additional allocation required is the completion record, which
      // has a stable shape and so hopefully should be cheap to allocate.
      function tryCatch(fn, obj, arg) {
        try {
          return {type: 'normal', arg: fn.call(obj, arg)};
        } catch (err) {
          return {type: 'throw', arg: err};
        }
      }

      var GenStateSuspendedStart = 'suspendedStart';
      var GenStateSuspendedYield = 'suspendedYield';
      var GenStateExecuting = 'executing';
      var GenStateCompleted = 'completed';

      // Returning this object from the innerFn has the same effect as
      // breaking out of the dispatch switch statement.
      var ContinueSentinel = {};

      // Dummy constructor functions that we use as the .constructor and
      // .constructor.prototype properties for functions that return Generator
      // objects. For full spec compliance, you may wish to configure your
      // minifier not to mangle the names of these two functions.
      function Generator() {}
      function GeneratorFunction() {}
      function GeneratorFunctionPrototype() {}

      // This is a polyfill for %IteratorPrototype% for environments that
      // don't natively support it.
      var IteratorPrototype = {};
      define(IteratorPrototype, iteratorSymbol, function () {
        return this;
      });

      var getProto = Object.getPrototypeOf;
      var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
      if (
        NativeIteratorPrototype &&
        NativeIteratorPrototype !== Op &&
        hasOwn.call(NativeIteratorPrototype, iteratorSymbol)
      ) {
        // This environment has a native %IteratorPrototype%; use it instead
        // of the polyfill.
        IteratorPrototype = NativeIteratorPrototype;
      }

      var Gp = (GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype));
      GeneratorFunction.prototype = GeneratorFunctionPrototype;
      define(Gp, 'constructor', GeneratorFunctionPrototype);
      define(GeneratorFunctionPrototype, 'constructor', GeneratorFunction);
      GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, 'GeneratorFunction');

      // Helper for defining the .next, .throw, and .return methods of the
      // Iterator interface in terms of a single ._invoke method.
      function defineIteratorMethods(prototype) {
        ['next', 'throw', 'return'].forEach(function (method) {
          define(prototype, method, function (arg) {
            return this._invoke(method, arg);
          });
        });
      }

      exports.isGeneratorFunction = function (genFun) {
        var ctor = typeof genFun === 'function' && genFun.constructor;
        return ctor
          ? ctor === GeneratorFunction ||
              // For the native GeneratorFunction constructor, the best we can
              // do is to check its .name property.
              (ctor.displayName || ctor.name) === 'GeneratorFunction'
          : false;
      };

      exports.mark = function (genFun) {
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
        } else {
          genFun.__proto__ = GeneratorFunctionPrototype;
          define(genFun, toStringTagSymbol, 'GeneratorFunction');
        }
        genFun.prototype = Object.create(Gp);
        return genFun;
      };

      // Within the body of any async function, `await x` is transformed to
      // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
      // `hasOwn.call(value, "__await")` to determine if the yielded value is
      // meant to be awaited.
      exports.awrap = function (arg) {
        return {__await: arg};
      };

      function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
          var record = tryCatch(generator[method], generator, arg);
          if (record.type === 'throw') {
            reject(record.arg);
          } else {
            var result = record.arg;
            var value = result.value;
            if (value && typeof value === 'object' && hasOwn.call(value, '__await')) {
              return PromiseImpl.resolve(value.__await).then(
                function (value) {
                  invoke('next', value, resolve, reject);
                },
                function (err) {
                  invoke('throw', err, resolve, reject);
                },
              );
            }

            return PromiseImpl.resolve(value).then(
              function (unwrapped) {
                // When a yielded Promise is resolved, its final value becomes
                // the .value of the Promise<{value,done}> result for the
                // current iteration.
                result.value = unwrapped;
                resolve(result);
              },
              function (error) {
                // If a rejected Promise was yielded, throw the rejection back
                // into the async generator function so it can be handled there.
                return invoke('throw', error, resolve, reject);
              },
            );
          }
        }

        var previousPromise;

        function enqueue(method, arg) {
          function callInvokeWithMethodAndArg() {
            return new PromiseImpl(function (resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }

          return (previousPromise =
            // If enqueue has been called before, then we want to wait until
            // all previous Promises have been resolved before calling invoke,
            // so that results are always delivered in the correct order. If
            // enqueue has not been called before, then it is important to
            // call invoke immediately, without waiting on a callback to fire,
            // so that the async generator function has the opportunity to do
            // any necessary setup in a predictable way. This predictability
            // is why the Promise constructor synchronously invokes its
            // executor callback, and why async functions synchronously
            // execute code before the first await. Since we implement simple
            // async functions in terms of async generators, it is especially
            // important to get this right, even though it requires care.
            previousPromise
              ? previousPromise.then(
                  callInvokeWithMethodAndArg,
                  // Avoid propagating failures to Promises returned by later
                  // invocations of the iterator.
                  callInvokeWithMethodAndArg,
                )
              : callInvokeWithMethodAndArg());
        }

        // Define the unified helper method that is used to implement .next,
        // .throw, and .return (see defineIteratorMethods).
        this._invoke = enqueue;
      }

      defineIteratorMethods(AsyncIterator.prototype);
      define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
        return this;
      });
      exports.AsyncIterator = AsyncIterator;

      // Note that simple async functions are implemented on top of
      // AsyncIterator objects; they just return a Promise for the value of
      // the final result produced by the iterator.
      exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        if (PromiseImpl === void 0) PromiseImpl = Promise;

        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);

        return exports.isGeneratorFunction(outerFn)
          ? iter // If outerFn is a generator, return the full iterator.
          : iter.next().then(function (result) {
              return result.done ? result.value : iter.next();
            });
      };

      function makeInvokeMethod(innerFn, self, context) {
        var state = GenStateSuspendedStart;

        return function invoke(method, arg) {
          if (state === GenStateExecuting) {
            throw new Error('Generator is already running');
          }

          if (state === GenStateCompleted) {
            if (method === 'throw') {
              throw arg;
            }

            // Be forgiving, per 25.3.3.3.3 of the spec:
            // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
            return doneResult();
          }

          context.method = method;
          context.arg = arg;

          while (true) {
            var delegate = context.delegate;
            if (delegate) {
              var delegateResult = maybeInvokeDelegate(delegate, context);
              if (delegateResult) {
                if (delegateResult === ContinueSentinel) continue;
                return delegateResult;
              }
            }

            if (context.method === 'next') {
              // Setting context._sent for legacy support of Babel's
              // function.sent implementation.
              context.sent = context._sent = context.arg;
            } else if (context.method === 'throw') {
              if (state === GenStateSuspendedStart) {
                state = GenStateCompleted;
                throw context.arg;
              }

              context.dispatchException(context.arg);
            } else if (context.method === 'return') {
              context.abrupt('return', context.arg);
            }

            state = GenStateExecuting;

            var record = tryCatch(innerFn, self, context);
            if (record.type === 'normal') {
              // If an exception is thrown from innerFn, we leave state ===
              // GenStateExecuting and loop back for another invocation.
              state = context.done ? GenStateCompleted : GenStateSuspendedYield;

              if (record.arg === ContinueSentinel) {
                continue;
              }

              return {
                value: record.arg,
                done: context.done,
              };
            } else if (record.type === 'throw') {
              state = GenStateCompleted;
              // Dispatch the exception by looping back around to the
              // context.dispatchException(context.arg) call above.
              context.method = 'throw';
              context.arg = record.arg;
            }
          }
        };
      }

      // Call delegate.iterator[context.method](context.arg) and handle the
      // result, either by returning a { value, done } result from the
      // delegate iterator, or by modifying context.method and context.arg,
      // setting context.delegate to null, and returning the ContinueSentinel.
      function maybeInvokeDelegate(delegate, context) {
        var method = delegate.iterator[context.method];
        if (method === undefined$1) {
          // A .throw or .return when the delegate iterator has no .throw
          // method always terminates the yield* loop.
          context.delegate = null;

          if (context.method === 'throw') {
            // Note: ["return"] must be used for ES3 parsing compatibility.
            if (delegate.iterator['return']) {
              // If the delegate iterator has a return method, give it a
              // chance to clean up.
              context.method = 'return';
              context.arg = undefined$1;
              maybeInvokeDelegate(delegate, context);

              if (context.method === 'throw') {
                // If maybeInvokeDelegate(context) changed context.method from
                // "return" to "throw", let that override the TypeError below.
                return ContinueSentinel;
              }
            }

            context.method = 'throw';
            context.arg = new TypeError("The iterator does not provide a 'throw' method");
          }

          return ContinueSentinel;
        }

        var record = tryCatch(method, delegate.iterator, context.arg);

        if (record.type === 'throw') {
          context.method = 'throw';
          context.arg = record.arg;
          context.delegate = null;
          return ContinueSentinel;
        }

        var info = record.arg;

        if (!info) {
          context.method = 'throw';
          context.arg = new TypeError('iterator result is not an object');
          context.delegate = null;
          return ContinueSentinel;
        }

        if (info.done) {
          // Assign the result of the finished delegate to the temporary
          // variable specified by delegate.resultName (see delegateYield).
          context[delegate.resultName] = info.value;

          // Resume execution at the desired location (see delegateYield).
          context.next = delegate.nextLoc;

          // If context.method was "throw" but the delegate handled the
          // exception, let the outer generator proceed normally. If
          // context.method was "next", forget context.arg since it has been
          // "consumed" by the delegate iterator. If context.method was
          // "return", allow the original .return call to continue in the
          // outer generator.
          if (context.method !== 'return') {
            context.method = 'next';
            context.arg = undefined$1;
          }
        } else {
          // Re-yield the result returned by the delegate method.
          return info;
        }

        // The delegate iterator is finished, so forget it and continue with
        // the outer generator.
        context.delegate = null;
        return ContinueSentinel;
      }

      // Define Generator.prototype.{next,throw,return} in terms of the
      // unified ._invoke helper method.
      defineIteratorMethods(Gp);

      define(Gp, toStringTagSymbol, 'Generator');

      // A Generator should always return itself as the iterator object when the
      // @@iterator function is called on it. Some browsers' implementations of the
      // iterator prototype chain incorrectly implement this, causing the Generator
      // object to not be returned from this call. This ensures that doesn't happen.
      // See https://github.com/facebook/regenerator/issues/274 for more details.
      define(Gp, iteratorSymbol, function () {
        return this;
      });

      define(Gp, 'toString', function () {
        return '[object Generator]';
      });

      function pushTryEntry(locs) {
        var entry = {tryLoc: locs[0]};

        if (1 in locs) {
          entry.catchLoc = locs[1];
        }

        if (2 in locs) {
          entry.finallyLoc = locs[2];
          entry.afterLoc = locs[3];
        }

        this.tryEntries.push(entry);
      }

      function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = 'normal';
        delete record.arg;
        entry.completion = record;
      }

      function Context(tryLocsList) {
        // The root entry object (effectively a try statement without a catch
        // or a finally block) gives us a place to store values thrown from
        // locations where there is no enclosing try statement.
        this.tryEntries = [{tryLoc: 'root'}];
        tryLocsList.forEach(pushTryEntry, this);
        this.reset(true);
      }

      exports.keys = function (object) {
        var keys = [];
        for (var key in object) {
          keys.push(key);
        }
        keys.reverse();

        // Rather than returning an object with a next method, we keep
        // things simple and return the next function itself.
        return function next() {
          while (keys.length) {
            var key = keys.pop();
            if (key in object) {
              next.value = key;
              next.done = false;
              return next;
            }
          }

          // To avoid creating an additional object, we just hang the .value
          // and .done properties off the next function object itself. This
          // also ensures that the minifier will not anonymize the function.
          next.done = true;
          return next;
        };
      };

      function values(iterable) {
        if (iterable) {
          var iteratorMethod = iterable[iteratorSymbol];
          if (iteratorMethod) {
            return iteratorMethod.call(iterable);
          }

          if (typeof iterable.next === 'function') {
            return iterable;
          }

          if (!isNaN(iterable.length)) {
            var i = -1,
              next = function next() {
                while (++i < iterable.length) {
                  if (hasOwn.call(iterable, i)) {
                    next.value = iterable[i];
                    next.done = false;
                    return next;
                  }
                }

                next.value = undefined$1;
                next.done = true;

                return next;
              };

            return (next.next = next);
          }
        }

        // Return an iterator with no values.
        return {next: doneResult};
      }
      exports.values = values;

      function doneResult() {
        return {value: undefined$1, done: true};
      }

      Context.prototype = {
        constructor: Context,

        reset: function (skipTempReset) {
          this.prev = 0;
          this.next = 0;
          // Resetting context._sent for legacy support of Babel's
          // function.sent implementation.
          this.sent = this._sent = undefined$1;
          this.done = false;
          this.delegate = null;

          this.method = 'next';
          this.arg = undefined$1;

          this.tryEntries.forEach(resetTryEntry);

          if (!skipTempReset) {
            for (var name in this) {
              // Not sure about the optimal order of these conditions:
              if (name.charAt(0) === 't' && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
                this[name] = undefined$1;
              }
            }
          }
        },

        stop: function () {
          this.done = true;

          var rootEntry = this.tryEntries[0];
          var rootRecord = rootEntry.completion;
          if (rootRecord.type === 'throw') {
            throw rootRecord.arg;
          }

          return this.rval;
        },

        dispatchException: function (exception) {
          if (this.done) {
            throw exception;
          }

          var context = this;
          function handle(loc, caught) {
            record.type = 'throw';
            record.arg = exception;
            context.next = loc;

            if (caught) {
              // If the dispatched exception was caught by a catch block,
              // then let that catch block handle the exception normally.
              context.method = 'next';
              context.arg = undefined$1;
            }

            return !!caught;
          }

          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            var record = entry.completion;

            if (entry.tryLoc === 'root') {
              // Exception thrown outside of any try block that could handle
              // it, so set the completion value of the entire function to
              // throw the exception.
              return handle('end');
            }

            if (entry.tryLoc <= this.prev) {
              var hasCatch = hasOwn.call(entry, 'catchLoc');
              var hasFinally = hasOwn.call(entry, 'finallyLoc');

              if (hasCatch && hasFinally) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                } else if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }
              } else if (hasCatch) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                }
              } else if (hasFinally) {
                if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }
              } else {
                throw new Error('try statement without catch or finally');
              }
            }
          }
        },

        abrupt: function (type, arg) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.tryLoc <= this.prev && hasOwn.call(entry, 'finallyLoc') && this.prev < entry.finallyLoc) {
              var finallyEntry = entry;
              break;
            }
          }

          if (
            finallyEntry &&
            (type === 'break' || type === 'continue') &&
            finallyEntry.tryLoc <= arg &&
            arg <= finallyEntry.finallyLoc
          ) {
            // Ignore the finally entry if control is not jumping to a
            // location outside the try/catch block.
            finallyEntry = null;
          }

          var record = finallyEntry ? finallyEntry.completion : {};
          record.type = type;
          record.arg = arg;

          if (finallyEntry) {
            this.method = 'next';
            this.next = finallyEntry.finallyLoc;
            return ContinueSentinel;
          }

          return this.complete(record);
        },

        complete: function (record, afterLoc) {
          if (record.type === 'throw') {
            throw record.arg;
          }

          if (record.type === 'break' || record.type === 'continue') {
            this.next = record.arg;
          } else if (record.type === 'return') {
            this.rval = this.arg = record.arg;
            this.method = 'return';
            this.next = 'end';
          } else if (record.type === 'normal' && afterLoc) {
            this.next = afterLoc;
          }

          return ContinueSentinel;
        },

        finish: function (finallyLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.finallyLoc === finallyLoc) {
              this.complete(entry.completion, entry.afterLoc);
              resetTryEntry(entry);
              return ContinueSentinel;
            }
          }
        },

        catch: function (tryLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.tryLoc === tryLoc) {
              var record = entry.completion;
              if (record.type === 'throw') {
                var thrown = record.arg;
                resetTryEntry(entry);
              }
              return thrown;
            }
          }

          // The context.catch method must only be called with a location
          // argument that corresponds to a known catch block.
          throw new Error('illegal catch attempt');
        },

        delegateYield: function (iterable, resultName, nextLoc) {
          this.delegate = {
            iterator: values(iterable),
            resultName: resultName,
            nextLoc: nextLoc,
          };

          if (this.method === 'next') {
            // Deliberately forget the last sent value so that we don't
            // accidentally pass it on to the delegate.
            this.arg = undefined$1;
          }

          return ContinueSentinel;
        },
      };

      // Regardless of whether this script is executing as a CommonJS module
      // or not, return the runtime object so that we can declare the variable
      // regeneratorRuntime in the outer scope, which allows this module to be
      // injected easily by `bin/regenerator --include-runtime script.js`.
      return exports;
    })(
      // If this script is executing as a CommonJS module, use module.exports
      // as the regeneratorRuntime namespace. Otherwise create a new empty
      // object. Either way, the resulting object will be used to initialize
      // the regeneratorRuntime variable at the top of this file.
      module.exports,
    );

    try {
      regeneratorRuntime = runtime;
    } catch (accidentalStrictMode) {
      // This module should not be running in strict mode, so the above
      // assignment should always work unless something is misconfigured. Just
      // in case runtime.js accidentally runs in strict mode, in modern engines
      // we can explicitly access globalThis. In older engines we can escape
      // strict mode using a global Function call. This could conceivably fail
      // if a Content Security Policy forbids using Function, but in that case
      // the proper solution is to fix the accidental strict mode problem. If
      // you've misconfigured your bundler to force strict mode and applied a
      // CSP to forbid Function, and you're not willing to fix either of those
      // problems, please detail your unique predicament in a GitHub issue.
      if (typeof globalThis === 'object') {
        globalThis.regeneratorRuntime = runtime;
      } else {
        Function('r', 'regeneratorRuntime = r')(runtime);
      }
    }
  })(runtime);

  var regenerator = runtime.exports;

  function _typeof(obj) {
    '@babel/helpers - typeof';

    if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype
          ? 'symbol'
          : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : (typeof Symbol !== 'undefined' && arr[Symbol.iterator]) || arr['@@iterator'];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i['return'] != null) _i['return']();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _arrayLikeToArray$1(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  function _unsupportedIterableToArray$1(o, minLen) {
    if (!o) return;
    if (typeof o === 'string') return _arrayLikeToArray$1(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === 'Object' && o.constructor) n = o.constructor.name;
    if (n === 'Map' || n === 'Set') return Array.from(o);
    if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
  }

  function _nonIterableRest() {
    throw new TypeError(
      'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
    );
  }

  function _slicedToArray(arr, i) {
    return (
      _arrayWithHoles(arr) ||
      _iterableToArrayLimit(arr, i) ||
      _unsupportedIterableToArray$1(arr, i) ||
      _nonIterableRest()
    );
  }

  const equalFn = (a, b) => a === b;
  const $PROXY = Symbol('solid-proxy');
  const signalOptions = {
    equals: equalFn,
  };
  let runEffects = runQueue;
  const NOTPENDING = {};
  const STALE = 1;
  const PENDING = 2;
  const UNOWNED = {
    owned: null,
    cleanups: null,
    context: null,
    owner: null,
  };
  var Owner = null;
  let Transition = null;
  let Listener = null;
  let Pending = null;
  let Updates = null;
  let Effects = null;
  let ExecCount = 0;
  function createRoot(fn, detachedOwner) {
    const listener = Listener,
      owner = Owner,
      root =
        fn.length === 0 && !false
          ? UNOWNED
          : {
              owned: null,
              cleanups: null,
              context: null,
              owner: detachedOwner || owner,
            };
    Owner = root;
    Listener = null;
    try {
      return runUpdates(() => fn(() => cleanNode(root)), true);
    } finally {
      Listener = listener;
      Owner = owner;
    }
  }
  function createSignal(value, options) {
    options = options ? Object.assign({}, signalOptions, options) : signalOptions;
    const s = {
      value,
      observers: null,
      observerSlots: null,
      pending: NOTPENDING,
      comparator: options.equals || undefined,
    };
    const setter = (value) => {
      if (typeof value === 'function') {
        value = value(s.pending !== NOTPENDING ? s.pending : s.value);
      }
      return writeSignal(s, value);
    };
    return [readSignal.bind(s), setter];
  }
  function createRenderEffect(fn, value, options) {
    const c = createComputation(fn, value, false, STALE);
    updateComputation(c);
  }
  function createEffect(fn, value, options) {
    runEffects = runUserEffects;
    const c = createComputation(fn, value, false, STALE);
    c.user = true;
    Effects ? Effects.push(c) : queueMicrotask(() => updateComputation(c));
  }
  function createMemo(fn, value, options) {
    options = options ? Object.assign({}, signalOptions, options) : signalOptions;
    const c = createComputation(fn, value, true, 0);
    c.pending = NOTPENDING;
    c.observers = null;
    c.observerSlots = null;
    c.comparator = options.equals || undefined;
    updateComputation(c);
    return readSignal.bind(c);
  }
  function batch(fn) {
    if (Pending) return fn();
    let result;
    const q = (Pending = []);
    try {
      result = fn();
    } finally {
      Pending = null;
    }
    runUpdates(() => {
      for (let i = 0; i < q.length; i += 1) {
        const data = q[i];
        if (data.pending !== NOTPENDING) {
          const pending = data.pending;
          data.pending = NOTPENDING;
          writeSignal(data, pending);
        }
      }
    }, false);
    return result;
  }
  function untrack(fn) {
    let result,
      listener = Listener;
    Listener = null;
    result = fn();
    Listener = listener;
    return result;
  }
  function onMount(fn) {
    createEffect(() => untrack(fn));
  }
  function onCleanup(fn) {
    if (Owner === null);
    else if (Owner.cleanups === null) Owner.cleanups = [fn];
    else Owner.cleanups.push(fn);
    return fn;
  }
  function getListener() {
    return Listener;
  }
  function children(fn) {
    const children = createMemo(fn);
    return createMemo(() => resolveChildren(children()));
  }
  function readSignal() {
    const runningTransition = Transition;
    if (this.sources && (this.state || runningTransition)) {
      const updates = Updates;
      Updates = null;
      this.state === STALE || runningTransition ? updateComputation(this) : lookDownstream(this);
      Updates = updates;
    }
    if (Listener) {
      const sSlot = this.observers ? this.observers.length : 0;
      if (!Listener.sources) {
        Listener.sources = [this];
        Listener.sourceSlots = [sSlot];
      } else {
        Listener.sources.push(this);
        Listener.sourceSlots.push(sSlot);
      }
      if (!this.observers) {
        this.observers = [Listener];
        this.observerSlots = [Listener.sources.length - 1];
      } else {
        this.observers.push(Listener);
        this.observerSlots.push(Listener.sources.length - 1);
      }
    }
    return this.value;
  }
  function writeSignal(node, value, isComp) {
    if (Pending) {
      if (node.pending === NOTPENDING) Pending.push(node);
      node.pending = value;
      return value;
    }
    if (node.comparator) {
      if (node.comparator(node.value, value)) return value;
    }
    let TransitionRunning = false;
    node.value = value;
    if (node.observers && node.observers.length) {
      runUpdates(() => {
        for (let i = 0; i < node.observers.length; i += 1) {
          const o = node.observers[i];
          if (TransitionRunning && Transition.disposed.has(o));
          if ((TransitionRunning && !o.tState) || (!TransitionRunning && !o.state)) {
            if (o.pure) Updates.push(o);
            else Effects.push(o);
            if (o.observers) markUpstream(o);
          }
          if (TransitionRunning);
          else o.state = STALE;
        }
        if (Updates.length > 10e5) {
          Updates = [];
          if (false);
          throw new Error();
        }
      }, false);
    }
    return value;
  }
  function updateComputation(node) {
    if (!node.fn) return;
    cleanNode(node);
    const owner = Owner,
      listener = Listener,
      time = ExecCount;
    Listener = Owner = node;
    runComputation(node, node.value, time);
    Listener = listener;
    Owner = owner;
  }
  function runComputation(node, value, time) {
    let nextValue;
    try {
      nextValue = node.fn(value);
    } catch (err) {
      handleError(err);
    }
    if (!node.updatedAt || node.updatedAt <= time) {
      if (node.observers && node.observers.length) {
        writeSignal(node, nextValue);
      } else node.value = nextValue;
      node.updatedAt = time;
    }
  }
  function createComputation(fn, init, pure, state = STALE, options) {
    const c = {
      fn,
      state: state,
      updatedAt: null,
      owned: null,
      sources: null,
      sourceSlots: null,
      cleanups: null,
      value: init,
      owner: Owner,
      context: null,
      pure,
    };
    if (Owner === null);
    else if (Owner !== UNOWNED) {
      {
        if (!Owner.owned) Owner.owned = [c];
        else Owner.owned.push(c);
      }
    }
    return c;
  }
  function runTop(node) {
    const runningTransition = Transition;
    if (node.state === 0 || runningTransition) return;
    if (node.state === PENDING || runningTransition) return lookDownstream(node);
    if (node.suspense && untrack(node.suspense.inFallback)) return node.suspense.effects.push(node);
    const ancestors = [node];
    while ((node = node.owner) && (!node.updatedAt || node.updatedAt < ExecCount)) {
      if (node.state || runningTransition) ancestors.push(node);
    }
    for (let i = ancestors.length - 1; i >= 0; i--) {
      node = ancestors[i];
      if (node.state === STALE || runningTransition) {
        updateComputation(node);
      } else if (node.state === PENDING || runningTransition) {
        const updates = Updates;
        Updates = null;
        lookDownstream(node, ancestors[0]);
        Updates = updates;
      }
    }
  }
  function runUpdates(fn, init) {
    if (Updates) return fn();
    let wait = false;
    if (!init) Updates = [];
    if (Effects) wait = true;
    else Effects = [];
    ExecCount++;
    try {
      return fn();
    } catch (err) {
      handleError(err);
    } finally {
      completeUpdates(wait);
    }
  }
  function completeUpdates(wait) {
    if (Updates) {
      runQueue(Updates);
      Updates = null;
    }
    if (wait) return;
    if (Effects.length)
      batch(() => {
        runEffects(Effects);
        Effects = null;
      });
    else {
      Effects = null;
    }
  }
  function runQueue(queue) {
    for (let i = 0; i < queue.length; i++) runTop(queue[i]);
  }
  function runUserEffects(queue) {
    let i,
      userLength = 0;
    for (i = 0; i < queue.length; i++) {
      const e = queue[i];
      if (!e.user) runTop(e);
      else queue[userLength++] = e;
    }
    const resume = queue.length;
    for (i = 0; i < userLength; i++) runTop(queue[i]);
    for (i = resume; i < queue.length; i++) runTop(queue[i]);
  }
  function lookDownstream(node, ignore) {
    const runningTransition = Transition;
    node.state = 0;
    for (let i = 0; i < node.sources.length; i += 1) {
      const source = node.sources[i];
      if (source.sources) {
        if (source.state === STALE || runningTransition) {
          if (source !== ignore) runTop(source);
        } else if (source.state === PENDING || runningTransition) lookDownstream(source, ignore);
      }
    }
  }
  function markUpstream(node) {
    const runningTransition = Transition;
    for (let i = 0; i < node.observers.length; i += 1) {
      const o = node.observers[i];
      if (!o.state || runningTransition) {
        o.state = PENDING;
        if (o.pure) Updates.push(o);
        else Effects.push(o);
        o.observers && markUpstream(o);
      }
    }
  }
  function cleanNode(node) {
    let i;
    if (node.sources) {
      while (node.sources.length) {
        const source = node.sources.pop(),
          index = node.sourceSlots.pop(),
          obs = source.observers;
        if (obs && obs.length) {
          const n = obs.pop(),
            s = source.observerSlots.pop();
          if (index < obs.length) {
            n.sourceSlots[s] = index;
            obs[index] = n;
            source.observerSlots[index] = s;
          }
        }
      }
    }
    if (node.owned) {
      for (i = 0; i < node.owned.length; i++) cleanNode(node.owned[i]);
      node.owned = null;
    }
    if (node.cleanups) {
      for (i = 0; i < node.cleanups.length; i++) node.cleanups[i]();
      node.cleanups = null;
    }
    node.state = 0;
    node.context = null;
  }
  function handleError(err) {
    throw err;
  }
  function resolveChildren(children) {
    if (typeof children === 'function' && !children.length) return resolveChildren(children());
    if (Array.isArray(children)) {
      const results = [];
      for (let i = 0; i < children.length; i++) {
        const result = resolveChildren(children[i]);
        Array.isArray(result) ? results.push.apply(results, result) : results.push(result);
      }
      return results;
    }
    return children;
  }

  const FALLBACK = Symbol('fallback');
  function dispose(d) {
    for (let i = 0; i < d.length; i++) d[i]();
  }
  function mapArray(list, mapFn, options = {}) {
    let items = [],
      mapped = [],
      disposers = [],
      len = 0,
      indexes = mapFn.length > 1 ? [] : null;
    onCleanup(() => dispose(disposers));
    return () => {
      let newItems = list() || [],
        i,
        j;
      return untrack(() => {
        let newLen = newItems.length,
          newIndices,
          newIndicesNext,
          temp,
          tempdisposers,
          tempIndexes,
          start,
          end,
          newEnd,
          item;
        if (newLen === 0) {
          if (len !== 0) {
            dispose(disposers);
            disposers = [];
            items = [];
            mapped = [];
            len = 0;
            indexes && (indexes = []);
          }
          if (options.fallback) {
            items = [FALLBACK];
            mapped[0] = createRoot((disposer) => {
              disposers[0] = disposer;
              return options.fallback();
            });
            len = 1;
          }
        } else if (len === 0) {
          mapped = new Array(newLen);
          for (j = 0; j < newLen; j++) {
            items[j] = newItems[j];
            mapped[j] = createRoot(mapper);
          }
          len = newLen;
        } else {
          temp = new Array(newLen);
          tempdisposers = new Array(newLen);
          indexes && (tempIndexes = new Array(newLen));
          for (start = 0, end = Math.min(len, newLen); start < end && items[start] === newItems[start]; start++);
          for (
            end = len - 1, newEnd = newLen - 1;
            end >= start && newEnd >= start && items[end] === newItems[newEnd];
            end--, newEnd--
          ) {
            temp[newEnd] = mapped[end];
            tempdisposers[newEnd] = disposers[end];
            indexes && (tempIndexes[newEnd] = indexes[end]);
          }
          newIndices = new Map();
          newIndicesNext = new Array(newEnd + 1);
          for (j = newEnd; j >= start; j--) {
            item = newItems[j];
            i = newIndices.get(item);
            newIndicesNext[j] = i === undefined ? -1 : i;
            newIndices.set(item, j);
          }
          for (i = start; i <= end; i++) {
            item = items[i];
            j = newIndices.get(item);
            if (j !== undefined && j !== -1) {
              temp[j] = mapped[i];
              tempdisposers[j] = disposers[i];
              indexes && (tempIndexes[j] = indexes[i]);
              j = newIndicesNext[j];
              newIndices.set(item, j);
            } else disposers[i]();
          }
          for (j = start; j < newLen; j++) {
            if (j in temp) {
              mapped[j] = temp[j];
              disposers[j] = tempdisposers[j];
              if (indexes) {
                indexes[j] = tempIndexes[j];
                indexes[j](j);
              }
            } else mapped[j] = createRoot(mapper);
          }
          mapped = mapped.slice(0, (len = newLen));
          items = newItems.slice(0);
        }
        return mapped;
      });
      function mapper(disposer) {
        disposers[j] = disposer;
        if (indexes) {
          const [s, set] = createSignal(j);
          indexes[j] = set;
          return mapFn(newItems[j], s);
        }
        return mapFn(newItems[j]);
      }
    };
  }
  function indexArray(list, mapFn, options = {}) {
    let items = [],
      mapped = [],
      disposers = [],
      signals = [],
      len = 0,
      i;
    onCleanup(() => dispose(disposers));
    return () => {
      const newItems = list() || [];
      return untrack(() => {
        if (newItems.length === 0) {
          if (len !== 0) {
            dispose(disposers);
            disposers = [];
            items = [];
            mapped = [];
            len = 0;
            signals = [];
          }
          if (options.fallback) {
            items = [FALLBACK];
            mapped[0] = createRoot((disposer) => {
              disposers[0] = disposer;
              return options.fallback();
            });
            len = 1;
          }
          return mapped;
        }
        if (items[0] === FALLBACK) {
          disposers[0]();
          disposers = [];
          items = [];
          mapped = [];
          len = 0;
        }
        for (i = 0; i < newItems.length; i++) {
          if (i < items.length && items[i] !== newItems[i]) {
            signals[i](() => newItems[i]);
          } else if (i >= items.length) {
            mapped[i] = createRoot(mapper);
          }
        }
        for (; i < items.length; i++) {
          disposers[i]();
        }
        len = signals.length = disposers.length = newItems.length;
        items = newItems.slice(0);
        return (mapped = mapped.slice(0, len));
      });
      function mapper(disposer) {
        disposers[i] = disposer;
        const [s, set] = createSignal(newItems[i]);
        signals[i] = set;
        return mapFn(s, i);
      }
    };
  }
  function createComponent(Comp, props) {
    return untrack(() => Comp(props));
  }

  function For(props) {
    const fallback = 'fallback' in props && {
      fallback: () => props.fallback,
    };
    return createMemo(mapArray(() => props.each, props.children, fallback ? fallback : undefined));
  }
  function Index(props) {
    const fallback = 'fallback' in props && {
      fallback: () => props.fallback,
    };
    return createMemo(indexArray(() => props.each, props.children, fallback ? fallback : undefined));
  }
  function Show(props) {
    let strictEqual = false;
    const condition = createMemo(() => props.when, undefined, {
      equals: (a, b) => (strictEqual ? a === b : !a === !b),
    });
    return createMemo(() => {
      const c = condition();
      if (c) {
        const child = props.children;
        return (strictEqual = typeof child === 'function' && child.length > 0) ? untrack(() => child(c)) : child;
      }
      return props.fallback;
    });
  }
  function Switch(props) {
    let strictEqual = false;
    const conditions = children(() => props.children),
      evalConditions = createMemo(
        () => {
          let conds = conditions();
          if (!Array.isArray(conds)) conds = [conds];
          for (let i = 0; i < conds.length; i++) {
            const c = conds[i].when;
            if (c) return [i, c, conds[i]];
          }
          return [-1];
        },
        undefined,
        {
          equals: (a, b) => a[0] === b[0] && (strictEqual ? a[1] === b[1] : !a[1] === !b[1]) && a[2] === b[2],
        },
      );
    return createMemo(() => {
      const [index, when, cond] = evalConditions();
      if (index < 0) return props.fallback;
      const c = cond.children;
      return (strictEqual = typeof c === 'function' && c.length > 0) ? untrack(() => c(when)) : c;
    });
  }
  function Match(props) {
    return props;
  }

  function memo(fn, equals) {
    return createMemo(
      fn,
      undefined,
      !equals
        ? {
            equals,
          }
        : undefined,
    );
  }

  function reconcileArrays(parentNode, a, b) {
    let bLength = b.length,
      aEnd = a.length,
      bEnd = bLength,
      aStart = 0,
      bStart = 0,
      after = a[aEnd - 1].nextSibling,
      map = null;
    while (aStart < aEnd || bStart < bEnd) {
      if (a[aStart] === b[bStart]) {
        aStart++;
        bStart++;
        continue;
      }
      while (a[aEnd - 1] === b[bEnd - 1]) {
        aEnd--;
        bEnd--;
      }
      if (aEnd === aStart) {
        const node = bEnd < bLength ? (bStart ? b[bStart - 1].nextSibling : b[bEnd - bStart]) : after;
        while (bStart < bEnd) parentNode.insertBefore(b[bStart++], node);
      } else if (bEnd === bStart) {
        while (aStart < aEnd) {
          if (!map || !map.has(a[aStart])) a[aStart].remove();
          aStart++;
        }
      } else if (a[aStart] === b[bEnd - 1] && b[bStart] === a[aEnd - 1]) {
        const node = a[--aEnd].nextSibling;
        parentNode.insertBefore(b[bStart++], a[aStart++].nextSibling);
        parentNode.insertBefore(b[--bEnd], node);
        a[aEnd] = b[bEnd];
      } else {
        if (!map) {
          map = new Map();
          let i = bStart;
          while (i < bEnd) map.set(b[i], i++);
        }
        const index = map.get(a[aStart]);
        if (index != null) {
          if (bStart < index && index < bEnd) {
            let i = aStart,
              sequence = 1,
              t;
            while (++i < aEnd && i < bEnd) {
              if ((t = map.get(a[i])) == null || t !== index + sequence) break;
              sequence++;
            }
            if (sequence > index - bStart) {
              const node = a[aStart];
              while (bStart < index) parentNode.insertBefore(b[bStart++], node);
            } else parentNode.replaceChild(b[bStart++], a[aStart++]);
          } else aStart++;
        } else a[aStart++].remove();
      }
    }
  }

  const $$EVENTS = '_$DX_DELEGATE';
  function render(code, element, init) {
    let disposer;
    createRoot((dispose) => {
      disposer = dispose;
      element === document ? code() : insert(element, code(), element.firstChild ? null : undefined, init);
    });
    return () => {
      disposer();
      element.textContent = '';
    };
  }
  function template(html, check, isSVG) {
    const t = document.createElement('template');
    t.innerHTML = html;
    let node = t.content.firstChild;
    if (isSVG) node = node.firstChild;
    return node;
  }
  function delegateEvents(eventNames, document = window.document) {
    const e = document[$$EVENTS] || (document[$$EVENTS] = new Set());
    for (let i = 0, l = eventNames.length; i < l; i++) {
      const name = eventNames[i];
      if (!e.has(name)) {
        e.add(name);
        document.addEventListener(name, eventHandler);
      }
    }
  }
  function addEventListener(node, name, handler, delegate) {
    if (delegate) {
      if (Array.isArray(handler)) {
        node[`$$${name}`] = handler[0];
        node[`$$${name}Data`] = handler[1];
      } else node[`$$${name}`] = handler;
    } else if (Array.isArray(handler)) {
      node.addEventListener(name, (e) => handler[0](handler[1], e));
    } else node.addEventListener(name, handler);
  }
  function classList$1(node, value, prev = {}) {
    const classKeys = Object.keys(value || {}),
      prevKeys = Object.keys(prev);
    let i, len;
    for (i = 0, len = prevKeys.length; i < len; i++) {
      const key = prevKeys[i];
      if (!key || key === 'undefined' || value[key]) continue;
      toggleClassKey(node, key, false);
      delete prev[key];
    }
    for (i = 0, len = classKeys.length; i < len; i++) {
      const key = classKeys[i],
        classValue = !!value[key];
      if (!key || key === 'undefined' || prev[key] === classValue || !classValue) continue;
      toggleClassKey(node, key, true);
      prev[key] = classValue;
    }
    return prev;
  }
  function style$1(node, value, prev = {}) {
    const nodeStyle = node.style;
    if (value == null || typeof value === 'string') return (nodeStyle.cssText = value);
    typeof prev === 'string' && (prev = {});
    let v, s;
    for (s in prev) {
      value[s] == null && nodeStyle.removeProperty(s);
      delete prev[s];
    }
    for (s in value) {
      v = value[s];
      if (v !== prev[s]) {
        nodeStyle.setProperty(s, v);
        prev[s] = v;
      }
    }
    return prev;
  }
  function insert(parent, accessor, marker, initial) {
    if (marker !== undefined && !initial) initial = [];
    if (typeof accessor !== 'function') return insertExpression(parent, accessor, initial, marker);
    createRenderEffect((current) => insertExpression(parent, accessor(), current, marker), initial);
  }
  function toggleClassKey(node, key, value) {
    const classNames = key.trim().split(/\s+/);
    for (let i = 0, nameLen = classNames.length; i < nameLen; i++) node.classList.toggle(classNames[i], value);
  }
  function eventHandler(e) {
    const key = `$$${e.type}`;
    let node = (e.composedPath && e.composedPath()[0]) || e.target;
    if (e.target !== node) {
      Object.defineProperty(e, 'target', {
        configurable: true,
        value: node,
      });
    }
    Object.defineProperty(e, 'currentTarget', {
      configurable: true,
      get() {
        return node || document;
      },
    });
    while (node !== null) {
      const handler = node[key];
      if (handler && !node.disabled) {
        const data = node[`${key}Data`];
        data !== undefined ? handler(data, e) : handler(e);
        if (e.cancelBubble) return;
      }
      node = node.host && node.host !== node && node.host instanceof Node ? node.host : node.parentNode;
    }
  }
  function insertExpression(parent, value, current, marker, unwrapArray) {
    while (typeof current === 'function') current = current();
    if (value === current) return current;
    const t = typeof value,
      multi = marker !== undefined;
    parent = (multi && current[0] && current[0].parentNode) || parent;
    if (t === 'string' || t === 'number') {
      if (t === 'number') value = value.toString();
      if (multi) {
        let node = current[0];
        if (node && node.nodeType === 3) {
          node.data = value;
        } else node = document.createTextNode(value);
        current = cleanChildren(parent, current, marker, node);
      } else {
        if (current !== '' && typeof current === 'string') {
          current = parent.firstChild.data = value;
        } else current = parent.textContent = value;
      }
    } else if (value == null || t === 'boolean') {
      current = cleanChildren(parent, current, marker);
    } else if (t === 'function') {
      createRenderEffect(() => {
        let v = value();
        while (typeof v === 'function') v = v();
        current = insertExpression(parent, v, current, marker);
      });
      return () => current;
    } else if (Array.isArray(value)) {
      const array = [];
      if (normalizeIncomingArray(array, value, unwrapArray)) {
        createRenderEffect(() => (current = insertExpression(parent, array, current, marker, true)));
        return () => current;
      }
      if (array.length === 0) {
        current = cleanChildren(parent, current, marker);
        if (multi) return current;
      } else if (Array.isArray(current)) {
        if (current.length === 0) {
          appendNodes(parent, array, marker);
        } else reconcileArrays(parent, current, array);
      } else {
        current && cleanChildren(parent);
        appendNodes(parent, array);
      }
      current = array;
    } else if (value instanceof Node) {
      if (Array.isArray(current)) {
        if (multi) return (current = cleanChildren(parent, current, marker, value));
        cleanChildren(parent, current, null, value);
      } else if (current == null || current === '' || !parent.firstChild) {
        parent.appendChild(value);
      } else parent.replaceChild(value, parent.firstChild);
      current = value;
    } else;
    return current;
  }
  function normalizeIncomingArray(normalized, array, unwrap) {
    let dynamic = false;
    for (let i = 0, len = array.length; i < len; i++) {
      let item = array[i],
        t;
      if (item instanceof Node) {
        normalized.push(item);
      } else if (item == null || item === true || item === false);
      else if (Array.isArray(item)) {
        dynamic = normalizeIncomingArray(normalized, item) || dynamic;
      } else if ((t = typeof item) === 'string') {
        normalized.push(document.createTextNode(item));
      } else if (t === 'function') {
        if (unwrap) {
          while (typeof item === 'function') item = item();
          dynamic = normalizeIncomingArray(normalized, Array.isArray(item) ? item : [item]) || dynamic;
        } else {
          normalized.push(item);
          dynamic = true;
        }
      } else normalized.push(document.createTextNode(item.toString()));
    }
    return dynamic;
  }
  function appendNodes(parent, array, marker) {
    for (let i = 0, len = array.length; i < len; i++) parent.insertBefore(array[i], marker);
  }
  function cleanChildren(parent, current, marker, replacement) {
    if (marker === undefined) return (parent.textContent = '');
    const node = replacement || document.createTextNode('');
    if (current.length) {
      let inserted = false;
      for (let i = current.length - 1; i >= 0; i--) {
        const el = current[i];
        if (node !== el) {
          const isParent = el.parentNode === parent;
          if (!inserted && !i) isParent ? parent.replaceChild(node, el) : parent.insertBefore(node, marker);
          else isParent && el.remove();
        } else inserted = true;
      }
    } else parent.insertBefore(node, marker);
    return [node];
  }

  var wasm;
  var heap = new Array(32).fill(undefined);
  heap.push(undefined, null, true, false);

  function getObject(idx) {
    return heap[idx];
  }

  var heap_next = heap.length;

  function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
  }

  function takeObject(idx) {
    var ret = getObject(idx);
    dropObject(idx);
    return ret;
  }

  function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    var idx = heap_next;
    heap_next = heap[idx];
    heap[idx] = obj;
    return idx;
  }

  var cachedTextDecoder = new TextDecoder('utf-8', {
    ignoreBOM: true,
    fatal: true,
  });
  cachedTextDecoder.decode();
  var cachegetUint8Memory0 = null;

  function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
      cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }

    return cachegetUint8Memory0;
  }

  function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
  }

  function debugString(val) {
    // primitive types
    var type = _typeof(val);

    if (type == 'number' || type == 'boolean' || val == null) {
      return ''.concat(val);
    }

    if (type == 'string') {
      return '"'.concat(val, '"');
    }

    if (type == 'symbol') {
      var description = val.description;

      if (description == null) {
        return 'Symbol';
      } else {
        return 'Symbol('.concat(description, ')');
      }
    }

    if (type == 'function') {
      var name = val.name;

      if (typeof name == 'string' && name.length > 0) {
        return 'Function('.concat(name, ')');
      } else {
        return 'Function';
      }
    } // objects

    if (Array.isArray(val)) {
      var length = val.length;
      var debug = '[';

      if (length > 0) {
        debug += debugString(val[0]);
      }

      for (var i = 1; i < length; i++) {
        debug += ', ' + debugString(val[i]);
      }

      debug += ']';
      return debug;
    } // Test for built-in

    var builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    var className;

    if (builtInMatches.length > 1) {
      className = builtInMatches[1];
    } else {
      // Failed to match the standard '[object ClassName]'
      return toString.call(val);
    }

    if (className == 'Object') {
      // we're a user defined class or Object
      // JSON.stringify avoids problems with cycles, and is generally much
      // easier than looping through ownProperties of `val`.
      try {
        return 'Object(' + JSON.stringify(val) + ')';
      } catch (_) {
        return 'Object';
      }
    } // errors

    if (val instanceof Error) {
      return ''.concat(val.name, ': ').concat(val.message, '\n').concat(val.stack);
    } // TODO we could test for more things here, like `Set`s and `Map`s.

    return className;
  }

  var WASM_VECTOR_LEN = 0;
  var cachedTextEncoder = new TextEncoder('utf-8');
  var encodeString =
    typeof cachedTextEncoder.encodeInto === 'function'
      ? function (arg, view) {
          return cachedTextEncoder.encodeInto(arg, view);
        }
      : function (arg, view) {
          var buf = cachedTextEncoder.encode(arg);
          view.set(buf);
          return {
            read: arg.length,
            written: buf.length,
          };
        };

  function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
      var buf = cachedTextEncoder.encode(arg);

      var _ptr = malloc(buf.length);

      getUint8Memory0()
        .subarray(_ptr, _ptr + buf.length)
        .set(buf);
      WASM_VECTOR_LEN = buf.length;
      return _ptr;
    }

    var len = arg.length;
    var ptr = malloc(len);
    var mem = getUint8Memory0();
    var offset = 0;

    for (; offset < len; offset++) {
      var code = arg.charCodeAt(offset);
      if (code > 0x7f) break;
      mem[ptr + offset] = code;
    }

    if (offset !== len) {
      if (offset !== 0) {
        arg = arg.slice(offset);
      }

      ptr = realloc(ptr, len, (len = offset + arg.length * 3));
      var view = getUint8Memory0().subarray(ptr + offset, ptr + len);
      var ret = encodeString(arg, view);
      offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
  }

  var cachegetInt32Memory0 = null;

  function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
      cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }

    return cachegetInt32Memory0;
  }
  /**
   * @param {number} w
   * @param {number} h
   * @returns {VtWrapper}
   */

  function create$1(w, h) {
    var ret = wasm.create(w, h);
    return VtWrapper.__wrap(ret);
  }
  var cachegetUint32Memory0 = null;

  function getUint32Memory0() {
    if (cachegetUint32Memory0 === null || cachegetUint32Memory0.buffer !== wasm.memory.buffer) {
      cachegetUint32Memory0 = new Uint32Array(wasm.memory.buffer);
    }

    return cachegetUint32Memory0;
  }

  function getArrayU32FromWasm0(ptr, len) {
    return getUint32Memory0().subarray(ptr / 4, ptr / 4 + len);
  }

  var u32CvtShim = new Uint32Array(2);
  var uint64CvtShim = new BigUint64Array(u32CvtShim.buffer);
  /**
   */

  var VtWrapper = /*#__PURE__*/ (function () {
    function VtWrapper() {
      _classCallCheck(this, VtWrapper);
    }

    _createClass(
      VtWrapper,
      [
        {
          key: '__destroy_into_raw',
          value: function __destroy_into_raw() {
            var ptr = this.ptr;
            this.ptr = 0;
            return ptr;
          },
        },
        {
          key: 'free',
          value: function free() {
            var ptr = this.__destroy_into_raw();

            wasm.__wbg_vtwrapper_free(ptr);
          },
          /**
           * @param {string} s
           * @returns {Uint32Array}
           */
        },
        {
          key: 'feed',
          value: function feed(s) {
            try {
              var retptr = wasm.__wbindgen_add_to_stack_pointer(-16);

              var ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
              var len0 = WASM_VECTOR_LEN;
              wasm.vtwrapper_feed(retptr, this.ptr, ptr0, len0);
              var r0 = getInt32Memory0()[retptr / 4 + 0];
              var r1 = getInt32Memory0()[retptr / 4 + 1];
              var v1 = getArrayU32FromWasm0(r0, r1).slice();

              wasm.__wbindgen_free(r0, r1 * 4);

              return v1;
            } finally {
              wasm.__wbindgen_add_to_stack_pointer(16);
            }
          },
          /**
           * @returns {string}
           */
        },
        {
          key: 'inspect',
          value: function inspect() {
            try {
              var retptr = wasm.__wbindgen_add_to_stack_pointer(-16);

              wasm.vtwrapper_inspect(retptr, this.ptr);
              var r0 = getInt32Memory0()[retptr / 4 + 0];
              var r1 = getInt32Memory0()[retptr / 4 + 1];
              return getStringFromWasm0(r0, r1);
            } finally {
              wasm.__wbindgen_add_to_stack_pointer(16);

              wasm.__wbindgen_free(r0, r1);
            }
          },
          /**
           * @param {number} l
           * @returns {any}
           */
        },
        {
          key: 'get_line',
          value: function get_line(l) {
            var ret = wasm.vtwrapper_get_line(this.ptr, l);
            return takeObject(ret);
          },
          /**
           * @returns {any}
           */
        },
        {
          key: 'get_cursor',
          value: function get_cursor() {
            var ret = wasm.vtwrapper_get_cursor(this.ptr);
            return takeObject(ret);
          },
        },
      ],
      [
        {
          key: '__wrap',
          value: function __wrap(ptr) {
            var obj = Object.create(VtWrapper.prototype);
            obj.ptr = ptr;
            return obj;
          },
        },
      ],
    );

    return VtWrapper;
  })();

  function load(_x, _x2) {
    return _load.apply(this, arguments);
  }

  function _load() {
    _load = _asyncToGenerator(
      /*#__PURE__*/ regenerator.mark(function _callee(module, imports) {
        var bytes, instance;
        return regenerator.wrap(
          function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  if (!(typeof Response === 'function' && module instanceof Response)) {
                    _context.next = 23;
                    break;
                  }

                  if (!(typeof WebAssembly.instantiateStreaming === 'function')) {
                    _context.next = 15;
                    break;
                  }

                  _context.prev = 2;
                  _context.next = 5;
                  return WebAssembly.instantiateStreaming(module, imports);

                case 5:
                  return _context.abrupt('return', _context.sent);

                case 8:
                  _context.prev = 8;
                  _context.t0 = _context['catch'](2);

                  if (!(module.headers.get('Content-Type') != 'application/wasm')) {
                    _context.next = 14;
                    break;
                  }

                  console.warn(
                    '`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n',
                    _context.t0,
                  );
                  _context.next = 15;
                  break;

                case 14:
                  throw _context.t0;

                case 15:
                  _context.next = 17;
                  return module.arrayBuffer();

                case 17:
                  bytes = _context.sent;
                  _context.next = 20;
                  return WebAssembly.instantiate(bytes, imports);

                case 20:
                  return _context.abrupt('return', _context.sent);

                case 23:
                  _context.next = 25;
                  return WebAssembly.instantiate(module, imports);

                case 25:
                  instance = _context.sent;

                  if (!(instance instanceof WebAssembly.Instance)) {
                    _context.next = 30;
                    break;
                  }

                  return _context.abrupt('return', {
                    instance: instance,
                    module: module,
                  });

                case 30:
                  return _context.abrupt('return', instance);

                case 31:
                case 'end':
                  return _context.stop();
              }
            }
          },
          _callee,
          null,
          [[2, 8]],
        );
      }),
    );
    return _load.apply(this, arguments);
  }

  function init(_x3) {
    return _init.apply(this, arguments);
  }

  function _init() {
    _init = _asyncToGenerator(
      /*#__PURE__*/ regenerator.mark(function _callee2(input) {
        var imports, _yield$load, instance, module;

        return regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                if (typeof input === 'undefined') {
                  input = new URL('index_bg.wasm', '');
                }

                imports = {};
                imports.wbg = {};

                imports.wbg.__wbindgen_object_drop_ref = function (arg0) {
                  takeObject(arg0);
                };

                imports.wbg.__wbindgen_number_new = function (arg0) {
                  var ret = arg0;
                  return addHeapObject(ret);
                };

                imports.wbg.__wbg_BigInt_1b7cf17b993da2bd = function (arg0, arg1) {
                  u32CvtShim[0] = arg0;
                  u32CvtShim[1] = arg1;
                  var n0 = uint64CvtShim[0];
                  var ret = BigInt(n0);
                  return addHeapObject(ret);
                };

                imports.wbg.__wbindgen_string_new = function (arg0, arg1) {
                  var ret = getStringFromWasm0(arg0, arg1);
                  return addHeapObject(ret);
                };

                imports.wbg.__wbg_set_fbb49ad265f9dee8 = function (arg0, arg1, arg2) {
                  getObject(arg0)[takeObject(arg1)] = takeObject(arg2);
                };

                imports.wbg.__wbg_new_949bbc1147195c4e = function () {
                  var ret = new Array();
                  return addHeapObject(ret);
                };

                imports.wbg.__wbg_new_ac32179a660db4bb = function () {
                  var ret = new Map();
                  return addHeapObject(ret);
                };

                imports.wbg.__wbg_new_0b83d3df67ecb33e = function () {
                  var ret = new Object();
                  return addHeapObject(ret);
                };

                imports.wbg.__wbindgen_is_string = function (arg0) {
                  var ret = typeof getObject(arg0) === 'string';
                  return ret;
                };

                imports.wbg.__wbg_push_284486ca27c6aa8b = function (arg0, arg1) {
                  var ret = getObject(arg0).push(getObject(arg1));
                  return ret;
                };

                imports.wbg.__wbg_new_342a24ca698edd87 = function (arg0, arg1) {
                  var ret = new Error(getStringFromWasm0(arg0, arg1));
                  return addHeapObject(ret);
                };

                imports.wbg.__wbg_set_a46091b120cc63e9 = function (arg0, arg1, arg2) {
                  var ret = getObject(arg0).set(getObject(arg1), getObject(arg2));
                  return addHeapObject(ret);
                };

                imports.wbg.__wbindgen_debug_string = function (arg0, arg1) {
                  var ret = debugString(getObject(arg1));
                  var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
                  var len0 = WASM_VECTOR_LEN;
                  getInt32Memory0()[arg0 / 4 + 1] = len0;
                  getInt32Memory0()[arg0 / 4 + 0] = ptr0;
                };

                imports.wbg.__wbindgen_throw = function (arg0, arg1) {
                  throw new Error(getStringFromWasm0(arg0, arg1));
                };

                if (
                  typeof input === 'string' ||
                  (typeof Request === 'function' && input instanceof Request) ||
                  (typeof URL === 'function' && input instanceof URL)
                ) {
                  input = fetch(input);
                }

                _context2.t0 = load;
                _context2.next = 21;
                return input;

              case 21:
                _context2.t1 = _context2.sent;
                _context2.t2 = imports;
                _context2.next = 25;
                return (0, _context2.t0)(_context2.t1, _context2.t2);

              case 25:
                _yield$load = _context2.sent;
                instance = _yield$load.instance;
                module = _yield$load.module;
                wasm = instance.exports;
                init.__wbindgen_wasm_module = module;
                return _context2.abrupt('return', wasm);

              case 31:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2);
      }),
    );
    return _init.apply(this, arguments);
  }

  var exports$1 = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    create: create$1,
    VtWrapper: VtWrapper,
    default: init,
  });

  const base64codes = [
    62, 0, 0, 0, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 0, 0, 0, 0, 0, 0, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
    36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
  ];

  function getBase64Code(charCode) {
    return base64codes[charCode - 43];
  }

  function base64_decode(str) {
    let missingOctets = str.endsWith('==') ? 2 : str.endsWith('=') ? 1 : 0;
    let n = str.length;
    let result = new Uint8Array(3 * (n / 4));
    let buffer;

    for (let i = 0, j = 0; i < n; i += 4, j += 3) {
      buffer =
        (getBase64Code(str.charCodeAt(i)) << 18) |
        (getBase64Code(str.charCodeAt(i + 1)) << 12) |
        (getBase64Code(str.charCodeAt(i + 2)) << 6) |
        getBase64Code(str.charCodeAt(i + 3));
      result[j] = buffer >> 16;
      result[j + 1] = (buffer >> 8) & 0xff;
      result[j + 2] = buffer & 0xff;
    }

    return result.subarray(0, result.length - missingOctets);
  }

  const wasm_code = base64_decode(
    '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AjYCFCADIAAoAgA2AhAMAQsgA0EANgIQCyADIAEgA0EQahA8IAMoAgAEQCADQQhqKAIAIgBFDQEgAygCBCAAQbC4wAAoAgAiAEHQACAAGxECAAALIAMoAgQhAiAAQQRqIAE2AgAgACACNgIAIANBIGokAA8LEHEAC8kBAQN/IwBBIGsiAiQAAkAgASABQQFqIgFLDQAgAEEEaigCACIDQQF0IgQgASABIARJGyIBQQggAUEISxshAQJAIAMEQCACQRhqQQE2AgAgAiADNgIUIAIgACgCADYCEAwBCyACQQA2AhALIAIgASACQRBqEDwgAigCAARAIAJBCGooAgAiAEUNASACKAIEIABBsLjAACgCACIAQdAAIAAbEQIAAAsgAigCBCEDIABBBGogATYCACAAIAM2AgAgAkEgaiQADwsQcQALxAEBCH8jAEEQayICJAAgASgCACEDIAJBCGogASgCCCIHEEwgAigCCCEBIAAgAigCDCIENgIEIAAgATYCAAJAIARFDQAgB0EMbCEFA0AgBUUNASADKAIAIQYgAiADKAIIIggQSyACKAIEIQkgAigCACAGIAhBFGwQvAEhBiABQQhqIAg2AgAgAUEEaiAJNgIAIAEgBjYCACABQQxqIQEgBUEMayEFIANBDGohAyAEQQFrIgQNAAsLIAAgBzYCCCACQRBqJAALwAEBAn8CQAJAIABBKGooAgAiBCAAKAI8IgNLBEAgASACSw0BIAAoAiAgA0EMbGoiAygCCCIEIAJJDQIgASACRwRAIAJBFGwgAygCACICaiEDIAIgAUEUbGohAiAAQZMBaiIAQQZqIQEDQCACQSA2AgAgAkEEaiAAKQAANwAAIAJBCmogASkAADcAACADIAJBFGoiAkcNAAsLDwsgAyAEQciLwAAQUQALIAEgAkHIi8AAEFQACyACIARByIvAABBTAAvMAQIDfwF+IwBBMGsiAiQAIAAtAJEBBEAgAEEAOgCRASAAKQJsIQQgACAAKQJUNwJsIAAgBDcCVCAAQfQAaiIBKQIAIQQgASAAQdwAaiIBKQIANwIAIAEgBDcCACAAQfwAaiIBKQIAIQQgASAAQeQAaiIBKQIANwIAIAEgBDcCACAAKQIsIQQgACAAKQIgNwIsIAAgBDcCICAAQTRqIgEoAgAhAyABIABBKGoiASgCADYCACABIAM2AgAgAEEAIAAoAhwQXgsgAkEwaiQAC7ABAQR/IwBBMGsiAiQAIAFBBGohBCABKAIERQRAIAEoAgAhASACQQhqIgNBCGoiBUEANgIAIAJCATcDCCACIAM2AhQgAkEYaiIDQRBqIAFBEGopAgA3AwAgA0EIaiABQQhqKQIANwMAIAIgASkCADcDGCACQRRqQeyZwAAgAxAXGiAEQQhqIAUoAgA2AgAgBCACKQMINwIACyAAQaSZwAA2AgQgACAENgIAIAJBMGokAAuoAQECfwJAAkACQCACBEBBASEEIAFBAE4NAQwCCyAAIAE2AgRBASEEDAELAkACQAJAAkAgAygCACIFBEAgAygCBCIDRQRAIAENAgwECyAFIAMgAiABEI4BIgNFDQIMBAsgAUUNAgsgASACEJoBIgMNAgsgACABNgIEIAIhAQwDCyACIQMLIAAgAzYCBEEAIQQMAQtBACEBCyAAIAQ2AgAgAEEIaiABNgIAC5QBAQJ/AkACQAJAAkACf0EBIQMCQAJAIAFBAE4EQCACKAIAIgRFDQEgAigCBCICDQQgAQ0CQQEMAwtBACEBDAYLIAENAEEBDAELIAFBARCaAQsiAkUNAQwCCyAEIAJBASABEI4BIgINAQsgACABNgIEQQEhAQwBCyAAIAI2AgRBACEDCyAAIAM2AgAgAEEIaiABNgIAC4UBAQN/IABBADYCCCAAQgQ3AgBBCCECA0ACQAJAIARFBEAgASACSw0BDAILIAIgAkEHaiICSw0BIAEgAk0NAQsgACgCBCADRgRAIAAgAxBlIAAoAgghAwsgACgCACADQQJ0aiACNgIAQQEhBCAAIAAoAghBAWoiAzYCCCACQQFqIQIMAQsLC7oCAQZ/AkAgACgCOCIERQ0AIAQgACgCGE8NACAAQcgAaigCACIBBEAgACgCQCEFIAEhAgNAAkAgBSABQQF2IANqIgFBAnRqKAIAIgYgBE8EQCABIQIgBCAGRw0BDAQLIAFBAWohAwsgAiADayEBIAIgA0sNAAsLAkAgAEFAayIAKAIIIgIgA08EQCACIAAoAgRGBEAgACACEGULIAAoAgAgA0ECdGoiAUEEaiABIAIgA2tBAnQQugEgACACQQFqNgIIIAEgBDYCAAwBCyMAQTBrIgAkACAAIAI2AgQgACADNgIAIABBHGpBAjYCACAAQSxqQd0ANgIAIABCAzcCDCAAQYicwAA2AgggAEHdADYCJCAAIABBIGo2AhggACAAQQRqNgIoIAAgADYCICAAQQhqQaCcwAAQcgALCwufAQEDfyMAQdAAayIAJAAgAEEzNgIMIABB+IHAADYCCCAAQQA2AhggAEIBNwMQIABBIGoiASAAQRBqEH0gAEEIaiICKAIAIAIoAgQgARC5AQRAQYyFwABBNyAAQcgAakGghsAAQZCGwAAQSgALIAAgAEEQaiIBKAIINgIEIAAgASgCADYCACAAKAIAIAAoAgQQvQEgARCKASAAQdAAaiQAC5MBAQJ/IAAtAAghASAAKAIEIgIEQCABQf8BcSEBIAACf0EBIAENABogACgCACEBAkAgAkEBRw0AIAAtAAlFDQAgAS0AAEEEcQ0AQQEgASgCGEGQn8AAQQEgAUEcaigCACgCDBEBAA0BGgsgASgCGEGRn8AAQQEgAUEcaigCACgCDBEBAAsiAToACAsgAUH/AXFBAEcLqQIBBn8CQCAAQcgAaigCACIBRQ0AIABBQGshAyAAKAJAIQUgACgCOCEEQQAhACABIQIDQAJAAkAgBSABQQF2IABqIgFBAnRqKAIAIgYgBE8EQCAEIAZGDQIgASECDAELIAFBAWohAAsgAiAAayEBIAAgAkkNAQwCCwsCQCADKAIIIgIgAUsEQCADKAIAIAFBAnRqIgAoAgAaIAAgAEEEaiACIAFBf3NqQQJ0ELoBIAMgAkEBazYCCAwBCyMAQTBrIgAkACAAIAI2AgQgACABNgIAIABBHGpBAjYCACAAQSxqQd0ANgIAIABCAzcCDCAAQcScwAA2AgggAEHdADYCJCAAIABBIGo2AhggACAAQQRqNgIoIAAgADYCICAAQQhqQbiLwAAQcgALCwuLAwEFfyMAQSBrIgYkACABBEAgBiABIAMgBCAFIAIoAhARBwAgBkEYaiAGQQhqKAIAIgE2AgAgBiAGKQMANwMQIAEgBigCFEkEQCMAQRBrIgIkAEEAIQUjAEEgayIDJAACQAJAIAZBEGoiBCgCBCIHIAFPBEAgB0UNAiAHQQJ0IQcgBCgCACEIIAFBAnQiCUUEQEEEIQogB0UNAiAIEBIMAgsgCCAHQQQgCRCOASIKDQEgAiAJNgIEIAJBCGpBBDYCAEEBIQUMAgsgA0EcakEANgIAIANBqIfAADYCGCADQgE3AgwgA0Ggh8AANgIIIANBCGpBqIfAABByAAsgBCABNgIEIAQgCjYCAAsgAiAFNgIAIANBIGokAAJAAkAgAigCAARAIAJBCGooAgAiAEUNASACKAIEIABBsLjAACgCACIAQdAAIAAbEQIAAAsgAkEQaiQADAELEHEACyAGKAIYIQELIAYoAhAhAiAAIAE2AgQgACACNgIAIAZBIGokAA8LQbiHwABBMBC2AQALfQEBfyMAQRBrIgQkACAEQQhqIAEoAgAgAiADEI8BIAQoAgwhAgJ/IAQoAghFBEACQCABKAIMRQ0AIAFBEGooAgAiA0EkSQ0AIAMQAAsgAUEBNgIMIAFBEGogAjYCAEEADAELQQELIQEgACACNgIEIAAgATYCACAEQRBqJAALeQEDfwJAIAAoAlBBAWoiAiAAKAJMIgNPBEAgAEEoaigCACIEIAJJDQEgAiADayIEIAEgASAESxshASAAKAIgIANBDGxqIAQgARB7IAAgAiABayACECAgACADIAIQXg8LIAMgAkHsi8AAEFQACyACIARB7IvAABBTAAt8AQF/AkAgAiAAQShqKAIAIgRJBEAgACgCICACQQxsaiIAKAIIIgIgAU0NASAAKAIAIAFBFGxqIgAgAykCADcCACAAQRBqIANBEGooAgA2AgAgAEEIaiADQQhqKQIANwIADwsgAiAEQaiLwAAQUQALIAEgAkGoi8AAEFEAC3YBA38gASAAKAIEIAAoAggiAmtLBEAgACACIAEQZCAAKAIIIQILIAAoAgAiBCACaiEDAkACQCABQQJPBEAgA0EBIAFBAWsiARC7ASAEIAEgAmoiAmohAwwBCyABRQ0BCyADQQE6AAAgAkEBaiECCyAAIAI2AggL4AMCB38BfiMAQRBrIgYkACABKAIAIQMgAjUCACEKIwBBMGsiAiQAIAIgCjcDCAJ/AkAgAy0AAkUEQCAKQoCAgICAgIAQVA0BIAJBBTYCFCACIAJBCGo2AhAgAkEsakEBNgIAIAJCAjcCHCACQcyEwAA2AhggAiACQRBqNgIoIwBB0ABrIgMkACADQQA2AhggA0IBNwMQIANBIGoiBCADQRBqEH0jAEEgayIFJAAgBEEcaigCACEIIAQoAhggBUEIaiIEQRBqIAJBGGoiB0EQaikCADcDACAEQQhqIAdBCGopAgA3AwAgBSAHKQIANwMIIAggBBAXIAVBIGokAARAQYyFwABBNyADQcgAakGghsAAQZCGwAAQSgALIANBCGoiBSADQRBqIgQoAgg2AgQgBSAEKAIANgIAIAMoAgggAygCDBC9ASEFIAQQigEgA0HQAGokAEEBDAILIAqnIApCIIinEAIhBUEADAELIAq6EAEhBUEACyEDIAYgBTYCBCAGIAM2AgAgAkEwaiQAIAYoAgQhAgJ/IAYoAgBFBEAgBiACNgIMIAFBBGogBkEMahChASAGKAIMIgFBJE8EQCABEAALQQAMAQtBAQshASAAIAI2AgQgACABNgIAIAZBEGokAAvwAQEDfyMAQbABayIBJAAgAUEIaiECIwBBsAFrIgMkAAJAAkAgAARAIAAoAgANASAAQQA2AgAgAiADIABBrAEQvAEiA0EEckGoARC8ARogABASIANBsAFqJAAMAgsQtAEACxC1AQALAkAgAigCBCIARQ0AIABBAXRFDQAgAigCABASCwJAIAFBFGoiACgCBCICRQ0AIAJBAnRFDQAgACgCABASCyABQShqIgAQYCAAEH4gAUE0aiIAEGAgABB+AkAgAUHIAGoiACgCBCICRQ0AIAAoAgAgAkECdEUNABASCyABQYwBahCKASABQbABaiQAC3YBA38CQCAAKAJQQQFqIgIgACgCTCIETwRAIABBKGooAgAiAyACSQ0BIAIgBGsiAyABIAEgA0sbIQEgACgCICAEQQxsaiADIAEQdSAAQQAgARAgIABBACACEF4PCyAEIAJB/IvAABBUAAsgAiADQfyLwAAQUwALfwEBfyMAQUBqIgUkACAFIAE2AgwgBSAANgIIIAUgAzYCFCAFIAI2AhAgBUEsakECNgIAIAVBPGpB4wA2AgAgBUICNwIcIAVBlJ7AADYCGCAFQeQANgI0IAUgBUEwajYCKCAFIAVBEGo2AjggBSAFQQhqNgIwIAVBGGogBBByAAtkAgJ/AX4CQAJAAkAgAa1CFH4iBEIgiKcNACAEpyICQQBIDQAgAkUNASACQQQQmgEiAw0CIAJBBEGwuMAAKAIAIgBB0AAgABsRAgAACxBxAAtBBCEDCyAAIAE2AgQgACADNgIAC2QCAn8BfgJAAkACQCABrUIMfiIEQiCIpw0AIASnIgJBAEgNACACRQ0BIAJBBBCaASIDDQIgAkEEQbC4wAAoAgAiAEHQACAAGxECAAALEHEAC0EEIQMLIAAgATYCBCAAIAM2AgALfAEBfyAALQAEIQEgAC0ABQRAIAFB/wFxIQEgAAJ/QQEgAQ0AGiAAKAIAIgEtAABBBHFFBEAgASgCGEGLn8AAQQIgAUEcaigCACgCDBEBAAwBCyABKAIYQYqfwABBASABQRxqKAIAKAIMEQEACyIBOgAECyABQf8BcUEARwtuAQJ/An8gACgCUCICIAAoAjwiA08EQCABIANqIgEgAiABIAJJGwwBCyABIANqIgEgACgCHEEBayICIAEgAkkbCyEBIABBADoApgEgACABNgI8IAAgACgCGEEBayIBIAAoAjgiACAAIAFLGzYCOAtdAQJ/AkACQAJAIAEgAWoiAiABSQ0AIAJBAEgNACACRQ0BIAJBAhCaASIDDQIgAkECQbC4wAAoAgAiAEHQACAAGxECAAALEHEAC0ECIQMLIAAgATYCBCAAIAM2AgALbwEEfyMAQSBrIgIkAEEBIQMCQCAAIAEQIw0AIAFBHGooAgAhBCABKAIYIAJBHGpBADYCACACQYSdwAA2AhggAkIBNwIMIAJBiJ3AADYCCCAEIAJBCGoQFw0AIABBBGogARAjIQMLIAJBIGokACADC24BAX8jAEEwayIDJAAgAyABNgIEIAMgADYCACADQRxqQQI2AgAgA0EsakHdADYCACADQgI3AgwgA0GAnsAANgIIIANB3QA2AiQgAyADQSBqNgIYIAMgAzYCKCADIANBBGo2AiAgA0EIaiACEHIAC24BAX8jAEEwayIDJAAgAyABNgIEIAMgADYCACADQRxqQQI2AgAgA0EsakHdADYCACADQgI3AgwgA0GUosAANgIIIANB3QA2AiQgAyADQSBqNgIYIAMgA0EEajYCKCADIAM2AiAgA0EIaiACEHIAC24BAX8jAEEwayIDJAAgAyABNgIEIAMgADYCACADQRxqQQI2AgAgA0EsakHdADYCACADQgI3AgwgA0G0osAANgIIIANB3QA2AiQgAyADQSBqNgIYIAMgA0EEajYCKCADIAM2AiAgA0EIaiACEHIAC24BAX8jAEEwayIDJAAgAyABNgIEIAMgADYCACADQRxqQQI2AgAgA0EsakHdADYCACADQgI3AgwgA0HoosAANgIIIANB3QA2AiQgAyADQSBqNgIYIAMgA0EEajYCKCADIAM2AiAgA0EIaiACEHIAC1sBAX8jAEEgayICJAAgAiAAKAIANgIEIAJBCGoiAEEQaiABQRBqKQIANwMAIABBCGogAUEIaikCADcDACACIAEpAgA3AwggAkEEakGkmMAAIAAQFyACQSBqJAALWwEBfyMAQSBrIgIkACACIAAoAgA2AgQgAkEIaiIAQRBqIAFBEGopAgA3AwAgAEEIaiABQQhqKQIANwMAIAIgASkCADcDCCACQQRqQeyZwAAgABAXIAJBIGokAAtbAQF/IwBBIGsiAiQAIAIgACgCADYCBCACQQhqIgBBEGogAUEQaikCADcDACAAQQhqIAFBCGopAgA3AwAgAiABKQIANwMIIAJBBGpB7JzAACAAEBcgAkEgaiQAC1sBAX8jAEEgayICJAAgAiAAKAIANgIEIAJBCGoiAEEQaiABQRBqKQIANwMAIABBCGogAUEIaikCADcDACACIAEpAgA3AwggAkEEakGMocAAIAAQFyACQSBqJAALWAEBfyMAQSBrIgIkACACIAA2AgQgAkEIaiIAQRBqIAFBEGopAgA3AwAgAEEIaiABQQhqKQIANwMAIAIgASkCADcDCCACQQRqQaSYwAAgABAXIAJBIGokAAtYAQF/IwBBIGsiAiQAIAIgADYCBCACQQhqIgBBEGogAUEQaikCADcDACAAQQhqIAFBCGopAgA3AwAgAiABKQIANwMIIAJBBGpBjKHAACAAEBcgAkEgaiQAC08BAX8CQAJAIAFBAE4EQCABRQ0BIAFBARCaASICDQIgAUEBQbC4wAAoAgAiAEHQACAAGxECAAALEHEAC0EBIQILIAAgATYCBCAAIAI2AgALoAUCB38BfiMAQRBrIgUkACAFQQhqIAEgAkECEEMgACIKAn8gBSgCCEUEQEEAIQIjAEEgayIEJAAgASkCDCELIAFBADYCDAJ/AkAgC6cEQCAEIAtCIIinIgg2AhggBEEQaiEJIAEoAgAhBiMAQfAAayIAJAACQCADLQAARQRAIABBCGoiBiADLQABuBABNgIEIAZBADYCACAAKAIMIQYgACgCCCEHDAELIAAgA0EBajYCJCAAIANBAmo2AiggACADQQNqNgIsIABBQGsiB0EUakEDNgIAIABB2ABqIgNBFGpBBDYCACAAQeQAakEENgIAIABCBDcC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DQEgAkEbai0AACABLQAPRw0BCyACQRxqLQAAIghBAkcgAS0AECIJQQJHc0UhBAJAAkACQCAIQQJGDQAgCUECRg0AIAggCUcNAyACQR1qLQAAIQQgAS0AESEJIAgNASAEIAlGIQQLIAQNAQwCCyAEIAlHDQEgAkEeai0AACABLQASRw0BIAJBH2otAAAgAS0AE0cNAQsgAkEgai0AAEUgAS0AFEEAR0YNACACQSFqLQAARSABLQAVQQBHRg0AIAJBImotAABFIAEtABZBAEdGDQAgAkEjai0AAEUgAS0AF0EAR0YNACACQSRqLQAARSABLQAYQQBHRg0AIAJBJWotAABFIAEtABlBAEdzDQELIAFBMGoiA0EYaiIIIAFBGGooAgA2AgAgA0EQaiIJIAFBEGopAwA3AwAgA0EIaiIOIAFBCGopAwA3AwAgASABKQMANwMwIAEoAigiAyABKAIkRgRAIAFBIGogAxBoIAEoAighAwsgASgCICADQRxsaiIEIAEpAzA3AgAgBEEIaiAOKQMANwIAIARBEGogCSkDADcCACAEQRhqIAgoAgA2AgAgASADQQFqNgIoQQRBBBCaASIDRQ0IIAMgAkEUaigCADYCACABIA0pAgA3AzAgASANQQZqKQEANwE2IAsgASkDMDcCACALQQZqIAEpATY3AQAgASADNgIAIAFCgYCAgBA3AgRBASEDDAELIAJBFGooAgAhAiABKAIEIANGBEAgASADEGUgASgCCCEDCyABKAIAIANBAnRqIAI2AgAgASABKAIIQQFqIgM2AggLIAwgBUEUaiIFRw0ACwwBCwwECyABKAIkIQQgASgCKCEDIAFBMGoiAkEYaiABQRhqKAIANgIAIAJBEGogAUEQaikDADcDACACQQhqIAFBCGopAwA3AwAgASABKQMANwMwIAMgBEcNAQsgAUEgaiADEGggASgCKCEDCyABKAIgIANBHGxqIgIgASkDMDcCACACQQhqIAFBMGoiBEEIaikDADcCACACQRBqIARBEGopAwA3AgAgAkEYaiAEQRhqKAIANgIAIAFBKGogA0EBaiICNgIAIAZBCGogAjYCACAGIAEpAyA3AgALIAFB0ABqJAAgCkEAOwEYIApBADoAGiMAQTBrIgQkACAEQRBqIgEgBigCCDYCBCABIAYoAgA2AgAgBCgCECENIAQo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ADYCBAsrACABIAJPBEAgAiAAIAJBDGxqIAEgAmsQDw8LQeyTwABBI0HclMAAEG0AC6wCAQZ/IAEoAggiAiABKAIESQRAIwBBEGsiAyQAIwBBIGsiBCQAAkAgASgCBCIFIAJPBEACQCAFRQ0AIAEoAgAhBgJAAkAgAkUEQEEBIQUgBhASDAELIAYgBUEBIAIQjgEiBUUNAQsgASACNgIEIAEgBTYCAAwBCyADIAI2AgQgA0EIakEBNgIAQQEhBwsgAyAHNgIAIARBIGokAAwBCyAEQRxqQQA2AgAgBEGUmMAANgIYIARCATcCDCAEQYyYwAA2AgggBEEIakGUmMAAEHIACwJAAkAgAygCAARAIANBCGooAgAiAEUNASADKAIEIABBsLjAACgCACIAQdAAIAAbEQIAAAsgA0EQaiQADAELEHEACyABKAIIIQILIAAgAjYCBCAAIAEoAgA2AgALNwAgAEEDOgAgIABCgICAgIAENwIAIAAgATYCGCAAQQA2AhAgAEEANgIIIABBHGpB9ITAADYCAAsgAQF/AkAgACgCBCIBRQ0AIAFBDGxFDQAgACgCABASCwseAAJAIABBBGooAgBFDQAgACgCACIARQ0AIAAQEgsLIAEBfwJAIAAoAgQiAUUNACAAQQhqKAIARQ0AIAEQEgsLHwACQCABQXxNBEAgACABQQQgAhCOASIADQELAAsgAAslACAARQRAQbiHwABBMBC2AQALIAAgAiADIAQgBSABKAIQEQkACyMAIABFBEBBuIfAAEEwELYBAAsgACACIAMgBCABKAIQEQUACyMAIABFBEBBuIfAAEEwELYBAAsgACACIAMgBCABKAIQERMACyMAIABFBEBBuIfAAEEwELYBAAsgACACIAMgBCABKAIQERUACyMAIABFBEBBuIfAAEEwELYBAAsgACACIAMgBCABKAIQEQoACyABAX8QBSECIAAgATYCBCAAQQA2AgAgAEEIaiACNgIACyEAIABFBEBBuIfAAEEwELYBAAsgACACIAMgASgCEBEDAAsfACAARQRAQbiHwABBMBC2AQALIAAgAiABKAIQEQAACxEAIAAoAgQEQCAAKAIAEBILCxwAIAEoAhhBxLHAAEEFIAFBHGooAgAoAgwRAQALEwAgACgCACIAQSRPBEAgABAACwsqACABKAIYQYSPwABBho/A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c2hyaW5rIHRvIGEgbGFyZ2VyIGNhcGFjaXR5AAAQACQAAAAvcnVzdGMvNzczN2UwYjVjNDEwMzIxNmQ2ZmQ4Y2Y5NDFiN2FiOWJkYmFhY2U3Yy9saWJyYXJ5L2FsbG9jL3NyYy9yYXdfdmVjLnJzLAAQAEwAAACrAQAACQAAAC9ob21lL3J1bm5lci8uY2FyZ28vcmVnaXN0cnkvc3JjL2dpdGh1Yi5jb20tMWVjYzYyOTlkYjllYzgyMy9zZXJkZS13YXNtLWJpbmRnZW4tMC40LjIvc3JjL3Nlci5yc4gAEABgAAAAnAAAACgAAABNYXAga2V5IGlzIG5vdCBhIHN0cmluZyBhbmQgY2Fubm90IGJlIGFuIG9iamVjdCBrZXljYWxsZWQgYE9wdGlvbjo6dW53cmFwKClgIG9uIGEgYE5vbmVgIHZhbHVlAABYARAAAAAAAHNyYy9saWIucnMAAGABEAAKAAAAIwAAAC0AAABgARAACgAAACgAAAAvAAAAY2FsbGVkIGBSZXN1bHQ6OnVud3JhcCgpYCBvbiBhbiBgRXJyYCB2YWx1ZQACAAAABAAAAAQAAAADAAAAZmdiZ2JvbGQBaXRhbGljdW5kZXJsaW5lc3RyaWtldGhyb3VnaGJsaW5raW52ZXJzZXJnYigsKQD5ARAABAAAAP0BEAABAAAA/QEQAAEAAAD+ARAAAQAAACBjYW4ndCBiZSByZXByZXNlbnRlZCBhcyBhIEphdmFTY3JpcHQgbnVtYmVyIAIQAAAAAAAgAhAALAAAAEVycm9yAAAABgAAAAQAAAAEAAAABwAAAAgAAAAMAAAABAAAAAkAAAAKAAAACwAAAGEgRGlzcGxheSBpbXBsZW1lbnRhdGlvbiByZXR1cm5lZCBhbiBlcnJvciB1bmV4cGVjdGVkbHkvcnVzdGMvNzczN2UwYjVjNDEwMzIxNmQ2ZmQ4Y2Y5NDFiN2FiOWJkYmFhY2U3Yy9saWJyYXJ5L2FsbG9jL3NyYy9zdHJpbmcucnMAAMMCEABLAAAAZgkAAA4AAAAMAAAAAAAAAAEAAAANAAAAL3J1c3RjLzc3MzdlMGI1YzQxMDMyMTZkNmZkOGNmOTQxYjdhYjliZGJhYWNlN2MvbGlicmFyeS9hbGxvYy9zcmMvcmF3X3ZlYy5yc1RyaWVkIHRvIHNocmluayB0byBhIGxhcmdlciBjYXBhY2l0eXwDEAAkAAAAMAMQAEwAAACrAQAACQAAAGNsb3N1cmUgaW52b2tlZCByZWN1cnNpdmVseSBvciBkZXN0cm95ZWQgYWxyZWFkeWYmAACSJQAACSQAAAwkAAANJAAACiQAALAAAACxAAAAJCQAAAskAAAYJQAAECUAAAwlAAAUJQAAPCUAALojAAC7IwAAACUAALwjAAC9IwAAHCUAACQlAAA0JQAALCUAAAIlAABkIgAAZSIAAMADAABgIgAAowAAAMUiAAAvaG9tZS9ydW5uZXIvLmNhcmdvL2dpdC9jaGVja291dHMvdnQtcnMtM2Y4ZDk1ZDc5ZmViMzdiNS8xZWQwOTM1L3NyYy9saWIucnNhc3NlcnRpb24gZmFpbGVkOiBjb2x1bW5zID4gMGQEEABLAAAA3QAAAAkAAABhc3NlcnRpb24gZmFpbGVkOiByb3dzID4gMAAAZAQQAEsAAADeAAAACQAAAGQEEABLAAAAjAIAABEAAABkBBAASwAAAK8CAAAaAAAAZAQQAEsAAAAtAwAAGgAAAGQEEABLAAAAMAMAABoAAABkBBAASwAAAJUDAAANAAAAZAQQAEsAAACaAwAADQAAAGQEEABLAAAApgMAAA0AAABkBBAASwAAAKsDAAANAAAAZAQQAEsAAAC4AwAACQAAAGQEEABLAAAA2AMAABgAAABkBBAASwAAAPEEAAAJAAAAZAQQAEsAAAD/BAAAJAAAAGQEEABLAAAACwUAABoAAABkBBAASwAAABMFAAAaAAAAAAAAAGQEEABLAAAAqgUAAAkAAABkBBAASwAAALIFAAAJAAAAZAQQAEsAAAASBwAAGgAAAGQEEABLAAAANQcAABcAAABkBBAASwAAADsHAAAJAAAAU29zUG1BcGNTdHJpbmdPc2NTdHJpbmdEY3NJZ25vcmVEY3NQYXNzdGhyb3VnaERjc0ludGVybWVkaWF0ZURjc1BhcmFtRGNzRW50cnlDc2lJZ25vcmVDc2lJbnRlcm1lZGlhdGVDc2lQYXJhbUNzaUVudHJ5RXNjYXBlSW50ZXJtZWRpYXRlRXNjYXBlR3JvdW5kUkdCAAAiAAAABAAAAAQAAAAjAAAASW5kZXhlZFBlbmZvcmVncm91bmQkAAAABAAAAAQAAAAlAAAAYmFja2dyb3VuZGJvbGQAACYAAAAEAAAABAAAACcAAABpdGFsaWN1bmRlcmxpbmVzdHJpa2V0aHJvdWdoYmxpbmtpbnZlcnNlQ2VsbCgAAAAEAAAABAAAACkAAAAqAAAABAAAAAQAAAArAAAALAAAAAQAAAAEAAAALQAAAEcxRzBBbHRlcm5hdGVQcmltYXJ5U2F2ZWRDdHhjdXJzb3JfeC4AAAAEAAAABAAAAC8AAABjdXJzb3JfeXBlbm9yaWdpbl9tb2RlYXV0b193cmFwX21vZGVWVHN0YXRlADAAAAAEAAAABAAAADEAAABwYXJhbXMAADIAAAAEAAAABAAAADMAAABpbnRlcm1lZGlhdGVzY29sdW1uc3Jvd3NidWZmZXIAADQAAAAEAAAABAAAADUAAABhbHRlcm5hdGVfYnVmZmVyYWN0aXZlX2J1ZmZlcl90eXBlAAA2AAAABAAAAAQAAAA3AAAAY3Vyc29yX3Zpc2libGVjaGFyc2V0AAAAOAAAAAQAAAAEAAAAOQAAAHRhYnM6AAAABAAAAAQAAAA7AAAAaW5zZXJ0X21vZGVuZXdfbGluZV9tb2RlbmV4dF9wcmludF93cmFwc3RvcF9tYXJnaW5ib3R0b21fbWFyZ2luc2F2ZWRfY3R4PAAAAAQAAAAEAAAAPQAAAGFsdGVybmF0ZV9zYXZlZF9jdHhhZmZlY3RlZF9saW5lcwAAAD4AAAAEAAAABAAAAD8AAABhc3NlcnRpb24gZmFpbGVkOiBtaWQgPD0gc2VsZi5sZW4oKS9ydXN0Yy83NzM3ZTBiNWM0MTAzMjE2ZDZmZDhjZjk0MWI3YWI5YmRiYWFjZTdjL2xpYnJhcnkvY29yZS9zcmMvc2xpY2UvbW9kLnJzWwkQAE0AAAB2CwAACQAAAGFzc2VydGlvbiBmYWlsZWQ6IGsgPD0gc2VsZi5sZW4oKQAAAFsJEABNAAAAoQsAAAkAAABhc3NlcnRpb24gZmFpbGVkOiBtaWQgPD0gc2VsZi5sZW4oKS9ydXN0Yy83NzM3ZTBiNWM0MTAzMjE2ZDZmZDhjZjk0MWI3YWI5YmRiYWFjZTdjL2xpYnJhcnkvY29yZS9zcmMvc2xpY2UvbW9kLnJzDwoQAE0AAAB2CwAACQAAAGFzc2VydGlvbiBmYWlsZWQ6IGsgPD0gc2VsZi5sZW4oKQAAAA8KEABN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',
  );

  var loadVt = async () => {
    await init(wasm_code);
    return exports$1;
  };

  function parseNpt(time) {
    if (typeof time === 'number') {
      return time;
    } else if (typeof time === 'string') {
      return time
        .split(':')
        .reverse()
        .map(parseFloat)
        .reduce(function (sum, n, i) {
          return sum + n * Math.pow(60, i);
        });
    } else {
      return undefined;
    }
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = (typeof Symbol !== 'undefined' && o[Symbol.iterator]) || o['@@iterator'];
    if (!it) {
      if (
        Array.isArray(o) ||
        (it = _unsupportedIterableToArray(o)) ||
        (allowArrayLike && o && typeof o.length === 'number')
      ) {
        if (it) o = it;
        var i = 0;
        var F = function F() {};
        return {
          s: F,
          n: function n() {
            if (i >= o.length) return {done: true};
            return {done: false, value: o[i++]};
          },
          e: function e(_e) {
            throw _e;
          },
          f: F,
        };
      }
      throw new TypeError(
        'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
      );
    }
    var normalCompletion = true,
      didErr = false,
      err;
    return {
      s: function s() {
        it = it.call(o);
      },
      n: function n() {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function e(_e2) {
        didErr = true;
        err = _e2;
      },
      f: function f() {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      },
    };
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === 'Object' && o.constructor) n = o.constructor.name;
    if (n === 'Map' || n === 'Set') return Array.from(o);
    if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
  var vt = loadVt(); // trigger async loading of wasm

  var Core = /*#__PURE__*/ (function () {
    // public
    function Core(driverFn, opts) {
      var _opts$speed;

      _classCallCheck(this, Core);

      this.state = 'initial';
      this.driver = null;
      this.driverFn = driverFn;
      this.changedLines = new Set();
      this.cursor = undefined;
      this.duration = null;
      this.cols = opts.cols;
      this.rows = opts.rows;
      this.startTime = null;
      this.speed = (_opts$speed = opts.speed) !== null && _opts$speed !== void 0 ? _opts$speed : 1.0;
      this.loop = opts.loop;
      this.idleTimeLimit = opts.idleTimeLimit;
      this.preload = opts.preload;
      this.startAt = parseNpt(opts.startAt);
      this.poster = opts.poster;
      this.eventHandlers = new Map([
        ['starting', []],
        ['waiting', []],
        ['reset', []],
        ['play', []],
        ['pause', []],
        ['terminalUpdate', []],
        ['seeked', []],
        ['ended', []],
      ]);
    }

    _createClass(Core, [
      {
        key: 'addEventListener',
        value: function addEventListener(eventName, handler) {
          this.eventHandlers.get(eventName).push(handler);
        },
      },
      {
        key: 'dispatchEvent',
        value: function dispatchEvent(eventName) {
          var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

          var _iterator = _createForOfIteratorHelper(this.eventHandlers.get(eventName)),
            _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done; ) {
              var h = _step.value;
              h(data);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        },
      },
      {
        key: 'init',
        value: (function () {
          var _init = _asyncToGenerator(
            /*#__PURE__*/ regenerator.mark(function _callee() {
              var _this = this,
                _this$cols,
                _this$rows;

              var playCount, feed, now, setTimeout, setInterval, reset, onFinish, wasWaiting, setWaiting;
              return regenerator.wrap(
                function _callee$(_context) {
                  while (1) {
                    switch ((_context.prev = _context.next)) {
                      case 0:
                        playCount = 0;
                        feed = this.feed.bind(this);
                        now = this.now.bind(this);

                        setTimeout = function setTimeout(f, t) {
                          return window.setTimeout(f, t / _this.speed);
                        };

                        setInterval = function setInterval(f, t) {
                          return window.setInterval(f, t / _this.speed);
                        };

                        reset = function reset(cols, rows) {
                          _this.resetVt(cols, rows);
                        };

                        onFinish = function onFinish() {
                          playCount++;

                          if (_this.loop === true || (typeof _this.loop === 'number' && playCount < _this.loop)) {
                            _this.restart();
                          } else {
                            _this.state = 'finished';

                            _this.dispatchEvent('ended');
                          }
                        };

                        wasWaiting = false;

                        setWaiting = function setWaiting(isWaiting) {
                          if (isWaiting && !wasWaiting) {
                            wasWaiting = true;

                            _this.dispatchEvent('waiting');
                          } else if (!isWaiting && wasWaiting) {
                            wasWaiting = false;

                            _this.dispatchEvent('play');
                          }
                        };

                        _context.next = 11;
                        return vt;

                      case 11:
                        this.wasm = _context.sent;
                        this.driver = this.driverFn(
                          {
                            feed: feed,
                            now: now,
                            setTimeout: setTimeout,
                            setInterval: setInterval,
                            onFinish: onFinish,
                            reset: reset,
                            setWaiting: setWaiting,
                          },
                          {
                            cols: this.cols,
                            rows: this.rows,
                            idleTimeLimit: this.idleTimeLimit,
                            startAt: this.startAt,
                          },
                        );

                        if (typeof this.driver === 'function') {
                          this.driver = {
                            start: this.driver,
                          };
                        }

                        this.duration = this.driver.duration;
                        this.cols =
                          (_this$cols = this.cols) !== null && _this$cols !== void 0 ? _this$cols : this.driver.cols;
                        this.rows =
                          (_this$rows = this.rows) !== null && _this$rows !== void 0 ? _this$rows : this.driver.rows;

                        if (this.preload) {
                          this.initializeDriver();
                        }

                        _context.t0 = !!this.driver.pauseOrResume;
                        _context.t1 = !!this.driver.seek;
                        _context.next = 22;
                        return this.renderPoster();

                      case 22:
                        _context.t2 = _context.sent;
                        return _context.abrupt('return', {
                          isPausable: _context.t0,
                          isSeekable: _context.t1,
                          poster: _context.t2,
                        });

                      case 24:
                      case 'end':
                        return _context.stop();
                    }
                  }
                },
                _callee,
                this,
              );
            }),
          );

          function init() {
            return _init.apply(this, arguments);
          }

          return init;
        })(),
      },
      {
        key: 'play',
        value: (function () {
          var _play = _asyncToGenerator(
            /*#__PURE__*/ regenerator.mark(function _callee2() {
              return regenerator.wrap(
                function _callee2$(_context2) {
                  while (1) {
                    switch ((_context2.prev = _context2.next)) {
                      case 0:
                        if (!(this.state == 'initial')) {
                          _context2.next = 5;
                          break;
                        }

                        _context2.next = 3;
                        return this.start();

                      case 3:
                        _context2.next = 6;
                        break;

                      case 5:
                        if (this.state == 'paused') {
                          this.resume();
                        } else if (this.state == 'finished') {
                          this.restart();
                        }

                      case 6:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                },
                _callee2,
                this,
              );
            }),
          );

          function play() {
            return _play.apply(this, arguments);
          }

          return play;
        })(),
      },
      {
        key: 'pause',
        value: function pause() {
          if (this.state == 'playing') {
            this.doPause();
          }
        },
      },
      {
        key: 'pauseOrResume',
        value: (function () {
          var _pauseOrResume = _asyncToGenerator(
            /*#__PURE__*/ regenerator.mark(function _callee3() {
              return regenerator.wrap(
                function _callee3$(_context3) {
                  while (1) {
                    switch ((_context3.prev = _context3.next)) {
                      case 0:
                        if (!(this.state == 'initial')) {
                          _context3.next = 5;
                          break;
                        }

                        _context3.next = 3;
                        return this.start();

                      case 3:
                        _context3.next = 16;
                        break;

                      case 5:
                        if (!(this.state == 'playing')) {
                          _context3.next = 9;
                          break;
                        }

                        this.doPause();
                        _context3.next = 16;
                        break;

                      case 9:
                        if (!(this.state == 'paused')) {
                          _context3.next = 13;
                          break;
                        }

                        this.resume();
                        _context3.next = 16;
                        break;

                      case 13:
                        if (!(this.state == 'finished')) {
                          _context3.next = 16;
                          break;
                        }

                        _context3.next = 16;
                        return this.restart();

                      case 16:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                },
                _callee3,
                this,
              );
            }),
          );

          function pauseOrResume() {
            return _pauseOrResume.apply(this, arguments);
          }

          return pauseOrResume;
        })(),
      },
      {
        key: 'stop',
        value: function stop() {
          if (typeof this.driver.stop === 'function') {
            this.driver.stop();
          }
        },
      },
      {
        key: 'seek',
        value: (function () {
          var _seek = _asyncToGenerator(
            /*#__PURE__*/ regenerator.mark(function _callee4(where) {
              return regenerator.wrap(
                function _callee4$(_context4) {
                  while (1) {
                    switch ((_context4.prev = _context4.next)) {
                      case 0:
                        _context4.next = 2;
                        return this.doSeek(where);

                      case 2:
                        this.dispatchEvent('seeked');

                      case 3:
                      case 'end':
                        return _context4.stop();
                    }
                  }
                },
                _callee4,
                this,
              );
            }),
          );

          function seek(_x) {
            return _seek.apply(this, arguments);
          }

          return seek;
        })(),
      },
      {
        key: 'getChangedLines',
        value: function getChangedLines() {
          if (this.changedLines.size > 0) {
            var lines = new Map();

            var _iterator2 = _createForOfIteratorHelper(this.changedLines),
              _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
                var i = _step2.value;
                lines.set(i, {
                  id: i,
                  segments: this.vt.get_line(i),
                });
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }

            this.changedLines.clear();
            return lines;
          }
        },
      },
      {
        key: 'getCursor',
        value: function getCursor() {
          if (this.cursor === undefined && this.vt) {
            var _this$vt$get_cursor;

            this.cursor =
              (_this$vt$get_cursor = this.vt.get_cursor()) !== null && _this$vt$get_cursor !== void 0
                ? _this$vt$get_cursor
                : false;
          }

          return this.cursor;
        },
      },
      {
        key: 'getCurrentTime',
        value: function getCurrentTime() {
          if (typeof this.driver.getCurrentTime === 'function') {
            return this.driver.getCurrentTime();
          } else if (this.startTime) {
            return (this.now() - this.startTime) / 1000;
          }
        },
      },
      {
        key: 'getRemainingTime',
        value: function getRemainingTime() {
          if (typeof this.duration === 'number') {
            return this.duration - Math.min(this.getCurrentTime(), this.duration);
          }
        },
      },
      {
        key: 'getProgress',
        value: function getProgress() {
          if (typeof this.duration === 'number') {
            return Math.min(this.getCurrentTime(), this.duration) / this.duration;
          }
        },
      },
      {
        key: 'getDuration',
        value: function getDuration() {
          return this.duration;
        }, // private
      },
      {
        key: 'start',
        value: (function () {
          var _start = _asyncToGenerator(
            /*#__PURE__*/ regenerator.mark(function _callee5() {
              var _this2 = this;

              var timeoutId, stop;
              return regenerator.wrap(
                function _callee5$(_context5) {
                  while (1) {
                    switch ((_context5.prev = _context5.next)) {
                      case 0:
                        this.dispatchEvent('starting');
                        timeoutId = setTimeout(function () {
                          _this2.dispatchEvent('waiting');
                        }, 2000);
                        _context5.next = 4;
                        return this.initializeDriver();

                      case 4:
                        this.dispatchEvent('terminalUpdate'); // clears the poster

                        _context5.next = 7;
                        return this.driver.start();

                      case 7:
                        stop = _context5.sent;
                        clearTimeout(timeoutId);

                        if (typeof stop === 'function') {
                          this.driver.stop = stop;
                        }

                        this.startTime = this.now();
                        this.state = 'playing';
                        this.dispatchEvent('play');

                      case 13:
                      case 'end':
                        return _context5.stop();
                    }
                  }
                },
                _callee5,
                this,
              );
            }),
          );

          function start() {
            return _start.apply(this, arguments);
          }

          return start;
        })(),
      },
      {
        key: 'doPause',
        value: function doPause() {
          if (typeof this.driver.pauseOrResume === 'function') {
            this.driver.pauseOrResume();
            this.state = 'paused';
            this.dispatchEvent('pause');
          }
        },
      },
      {
        key: 'resume',
        value: function resume() {
          if (typeof this.driver.pauseOrResume === 'function') {
            this.state = 'playing';
            this.driver.pauseOrResume();
            this.dispatchEvent('play');
          }
        },
      },
      {
        key: 'doSeek',
        value: (function () {
          var _doSeek = _asyncToGenerator(
            /*#__PURE__*/ regenerator.mark(function _callee6(where) {
              return regenerator.wrap(
                function _callee6$(_context6) {
                  while (1) {
                    switch ((_context6.prev = _context6.next)) {
                      case 0:
                        if (!(typeof this.driver.seek === 'function')) {
                          _context6.next = 8;
                          break;
                        }

                        _context6.next = 3;
                        return this.initializeDriver();

                      case 3:
                        if (this.state != 'playing') {
                          this.state = 'paused';
                        }

                        this.driver.seek(where);
                        return _context6.abrupt('return', true);

                      case 8:
                        return _context6.abrupt('return', false);

                      case 9:
                      case 'end':
                        return _context6.stop();
                    }
                  }
                },
                _callee6,
                this,
              );
            }),
          );

          function doSeek(_x2) {
            return _doSeek.apply(this, arguments);
          }

          return doSeek;
        })(),
      },
      {
        key: 'restart',
        value: (function () {
          var _restart = _asyncToGenerator(
            /*#__PURE__*/ regenerator.mark(function _callee7() {
              return regenerator.wrap(
                function _callee7$(_context7) {
                  while (1) {
                    switch ((_context7.prev = _context7.next)) {
                      case 0:
                        _context7.next = 2;
                        return this.doSeek(0);

                      case 2:
                        if (!_context7.sent) {
                          _context7.next = 5;
                          break;
                        }

                        this.resume();
                        this.dispatchEvent('play');

                      case 5:
                      case 'end':
                        return _context7.stop();
                    }
                  }
                },
                _callee7,
                this,
              );
            }),
          );

          function restart() {
            return _restart.apply(this, arguments);
          }

          return restart;
        })(),
      },
      {
        key: 'feed',
        value: function feed(data) {
          var _this3 = this;

          var affectedLines = this.vt.feed(data);
          affectedLines.forEach(function (i) {
            return _this3.changedLines.add(i);
          });
          this.cursor = undefined;
          this.dispatchEvent('terminalUpdate');
        },
      },
      {
        key: 'now',
        value: function now() {
          return performance.now() * this.speed;
        },
      },
      {
        key: 'initializeDriver',
        value: function initializeDriver() {
          if (this.initializeDriverPromise === undefined) {
            this.initializeDriverPromise = this.doInitializeDriver();
          }

          return this.initializeDriverPromise;
        },
      },
      {
        key: 'doInitializeDriver',
        value: (function () {
          var _doInitializeDriver = _asyncToGenerator(
            /*#__PURE__*/ regenerator.mark(function _callee8() {
              var _this$duration, _this$cols2, _this$rows2, meta;

              return regenerator.wrap(
                function _callee8$(_context8) {
                  while (1) {
                    switch ((_context8.prev = _context8.next)) {
                      case 0:
                        if (!(typeof this.driver.init === 'function')) {
                          _context8.next = 7;
                          break;
                        }

                        _context8.next = 3;
                        return this.driver.init();

                      case 3:
                        meta = _context8.sent;
                        this.duration =
                          (_this$duration = this.duration) !== null && _this$duration !== void 0
                            ? _this$duration
                            : meta.duration;
                        this.cols =
                          (_this$cols2 = this.cols) !== null && _this$cols2 !== void 0 ? _this$cols2 : meta.cols;
                        this.rows =
                          (_this$rows2 = this.rows) !== null && _this$rows2 !== void 0 ? _this$rows2 : meta.rows;

                      case 7:
                        this.ensureVt();

                      case 8:
                      case 'end':
                        return _context8.stop();
                    }
                  }
                },
                _callee8,
                this,
              );
            }),
          );

          function doInitializeDriver() {
            return _doInitializeDriver.apply(this, arguments);
          }

          return doInitializeDriver;
        })(),
      },
      {
        key: 'ensureVt',
        value: function ensureVt() {
          var _this$cols3, _this$rows3;

          var cols = (_this$cols3 = this.cols) !== null && _this$cols3 !== void 0 ? _this$cols3 : 80;
          var rows = (_this$rows3 = this.rows) !== null && _this$rows3 !== void 0 ? _this$rows3 : 24;

          if (this.vt !== undefined && this.vt.cols === cols && this.vt.rows === rows) {
            return;
          }

          this.initializeVt(cols, rows);
        },
      },
      {
        key: 'resetVt',
        value: function resetVt(cols, rows) {
          this.cols = cols;
          this.rows = rows;
          this.initializeVt(cols, rows);
        },
      },
      {
        key: 'initializeVt',
        value: function initializeVt(cols, rows) {
          this.vt = this.wasm.create(cols, rows);
          this.vt.cols = cols;
          this.vt.rows = rows;
          this.changedLines.clear();

          for (var i = 0; i < rows; i++) {
            this.changedLines.add(i);
          }

          this.dispatchEvent('reset', {
            cols: cols,
            rows: rows,
          });
        },
      },
      {
        key: 'renderPoster',
        value: (function () {
          var _renderPoster = _asyncToGenerator(
            /*#__PURE__*/ regenerator.mark(function _callee9() {
              var _this4 = this;

              var poster, cursor, lines, i;
              return regenerator.wrap(
                function _callee9$(_context9) {
                  while (1) {
                    switch ((_context9.prev = _context9.next)) {
                      case 0:
                        if (this.poster) {
                          _context9.next = 2;
                          break;
                        }

                        return _context9.abrupt('return');

                      case 2:
                        this.ensureVt();
                        poster = [];

                        if (!(this.poster.substring(0, 16) == 'data:text/plain,')) {
                          _context9.next = 8;
                          break;
                        }

                        poster = [this.poster.substring(16)];
                        _context9.next = 12;
                        break;

                      case 8:
                        if (!(this.poster.substring(0, 4) == 'npt:' && typeof this.driver.getPoster === 'function')) {
                          _context9.next = 12;
                          break;
                        }

                        _context9.next = 11;
                        return this.initializeDriver();

                      case 11:
                        poster = this.driver.getPoster(this.parseNptPoster(this.poster));

                      case 12:
                        poster.forEach(function (text) {
                          return _this4.vt.feed(text);
                        });
                        cursor = this.getCursor();
                        lines = [];

                        for (i = 0; i < this.vt.rows; i++) {
                          lines.push({
                            id: i,
                            segments: this.vt.get_line(i),
                          });
                          this.changedLines.add(i);
                        }

                        this.vt.feed('\x1bc'); // reset vt

                        this.cursor = undefined;
                        return _context9.abrupt('return', {
                          cursor: cursor,
                          lines: lines,
                        });

                      case 19:
                      case 'end':
                        return _context9.stop();
                    }
                  }
                },
                _callee9,
                this,
              );
            }),
          );

          function renderPoster() {
            return _renderPoster.apply(this, arguments);
          }

          return renderPoster;
        })(),
      },
      {
        key: 'parseNptPoster',
        value: function parseNptPoster(poster) {
          return parseNpt(poster.substring(4));
        },
      },
    ]);

    return Core;
  })();

  const $RAW = Symbol('store-raw'),
    $NODE = Symbol('store-node'),
    $NAME = Symbol('store-name');
  function wrap$1(value, name) {
    let p = value[$PROXY];
    if (!p) {
      Object.defineProperty(value, $PROXY, {
        value: (p = new Proxy(value, proxyTraps$1)),
      });
      const keys = Object.keys(value),
        desc = Object.getOwnPropertyDescriptors(value);
      for (let i = 0, l = keys.length; i < l; i++) {
        const prop = keys[i];
        if (desc[prop].get) {
          const get = desc[prop].get.bind(p);
          Object.defineProperty(value, prop, {
            get,
          });
        }
      }
    }
    return p;
  }
  function isWrappable(obj) {
    return (
      obj != null &&
      typeof obj === 'object' &&
      (obj[$PROXY] || !obj.__proto__ || obj.__proto__ === Object.prototype || Array.isArray(obj))
    );
  }
  function unwrap(item, set = new Set()) {
    let result, unwrapped, v, prop;
    if ((result = item != null && item[$RAW])) return result;
    if (!isWrappable(item) || set.has(item)) return item;
    if (Array.isArray(item)) {
      if (Object.isFrozen(item)) item = item.slice(0);
      else set.add(item);
      for (let i = 0, l = item.length; i < l; i++) {
        v = item[i];
        if ((unwrapped = unwrap(v, set)) !== v) item[i] = unwrapped;
      }
    } else {
      if (Object.isFrozen(item)) item = Object.assign({}, item);
      else set.add(item);
      const keys = Object.keys(item),
        desc = Object.getOwnPropertyDescriptors(item);
      for (let i = 0, l = keys.length; i < l; i++) {
        prop = keys[i];
        if (desc[prop].get) continue;
        v = item[prop];
        if ((unwrapped = unwrap(v, set)) !== v) item[prop] = unwrapped;
      }
    }
    return item;
  }
  function getDataNodes(target) {
    let nodes = target[$NODE];
    if (!nodes)
      Object.defineProperty(target, $NODE, {
        value: (nodes = {}),
      });
    return nodes;
  }
  function proxyDescriptor(target, property) {
    const desc = Reflect.getOwnPropertyDescriptor(target, property);
    if (!desc || desc.get || !desc.configurable || property === $PROXY || property === $NODE || property === $NAME)
      return desc;
    delete desc.value;
    delete desc.writable;
    desc.get = () => target[$PROXY][property];
    return desc;
  }
  function ownKeys(target) {
    if (getListener()) {
      const nodes = getDataNodes(target);
      (nodes._ || (nodes._ = createDataNode()))();
    }
    return Reflect.ownKeys(target);
  }
  function createDataNode() {
    const [s, set] = createSignal(undefined, {
      equals: false,
      internal: true,
    });
    s.$ = set;
    return s;
  }
  const proxyTraps$1 = {
    get(target, property, receiver) {
      if (property === $RAW) return target;
      if (property === $PROXY) return receiver;
      const value = target[property];
      if (property === $NODE || property === '__proto__') return value;
      const wrappable = isWrappable(value);
      if (getListener() && (typeof value !== 'function' || target.hasOwnProperty(property))) {
        let nodes, node;
        if (wrappable && (nodes = getDataNodes(value))) {
          node = nodes._ || (nodes._ = createDataNode());
          node();
        }
        nodes = getDataNodes(target);
        node = nodes[property] || (nodes[property] = createDataNode());
        node();
      }
      return wrappable ? wrap$1(value) : value;
    },
    set() {
      return true;
    },
    deleteProperty() {
      return true;
    },
    ownKeys: ownKeys,
    getOwnPropertyDescriptor: proxyDescriptor,
  };
  function setProperty(state, property, value) {
    if (state[property] === value) return;
    const array = Array.isArray(state);
    const len = state.length;
    const isUndefined = value === undefined;
    const notify = array || isUndefined === property in state;
    if (isUndefined) {
      delete state[property];
    } else state[property] = value;
    let nodes = getDataNodes(state),
      node;
    (node = nodes[property]) && node.$();
    if (array && state.length !== len) (node = nodes.length) && node.$();
    notify && (node = nodes._) && node.$();
  }
  function mergeStoreNode(state, value) {
    const keys = Object.keys(value);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      setProperty(state, key, value[key]);
    }
  }
  function updatePath(current, path, traversed = []) {
    let part,
      prev = current;
    if (path.length > 1) {
      part = path.shift();
      const partType = typeof part,
        isArray = Array.isArray(current);
      if (Array.isArray(part)) {
        for (let i = 0; i < part.length; i++) {
          updatePath(current, [part[i]].concat(path), traversed);
        }
        return;
      } else if (isArray && partType === 'function') {
        for (let i = 0; i < current.length; i++) {
          if (part(current[i], i)) updatePath(current, [i].concat(path), traversed);
        }
        return;
      } else if (isArray && partType === 'object') {
        const {from = 0, to = current.length - 1, by = 1} = part;
        for (let i = from; i <= to; i += by) {
          updatePath(current, [i].concat(path), traversed);
        }
        return;
      } else if (path.length > 1) {
        updatePath(current[part], path, [part].concat(traversed));
        return;
      }
      prev = current[part];
      traversed = [part].concat(traversed);
    }
    let value = path[0];
    if (typeof value === 'function') {
      value = value(prev, traversed);
      if (value === prev) return;
    }
    if (part === undefined && value == undefined) return;
    value = unwrap(value);
    if (part === undefined || (isWrappable(prev) && isWrappable(value) && !Array.isArray(value))) {
      mergeStoreNode(prev, value);
    } else setProperty(current, part, value);
  }
  function createStore(store, options) {
    const unwrappedStore = unwrap(store || {});
    const wrappedStore = wrap$1(unwrappedStore);
    function setStore(...args) {
      batch(() => updatePath(unwrappedStore, args));
    }
    return [wrappedStore, setStore];
  }

  function applyState(target, parent, property, merge, key) {
    const previous = parent[property];
    if (target === previous) return;
    if (!isWrappable(target) || !isWrappable(previous) || (key && target[key] !== previous[key])) {
      target !== previous && setProperty(parent, property, target);
      return;
    }
    if (Array.isArray(target)) {
      if (target.length && previous.length && (!merge || (key && target[0][key] != null))) {
        let i, j, start, end, newEnd, item, newIndicesNext, keyVal;
        for (
          start = 0, end = Math.min(previous.length, target.length);
          start < end && (previous[start] === target[start] || (key && previous[start][key] === target[start][key]));
          start++
        ) {
          applyState(target[start], previous, start, merge, key);
        }
        const temp = new Array(target.length),
          newIndices = new Map();
        for (
          end = previous.length - 1, newEnd = target.length - 1;
          end >= start &&
          newEnd >= start &&
          (previous[end] === target[newEnd] || (key && previous[end][key] === target[newEnd][key]));
          end--, newEnd--
        ) {
          temp[newEnd] = previous[end];
        }
        if (start > newEnd || start > end) {
          for (j = start; j <= newEnd; j++) setProperty(previous, j, target[j]);
          for (; j < target.length; j++) {
            setProperty(previous, j, temp[j]);
            applyState(target[j], previous, j, merge, key);
          }
          if (previous.length > target.length) setProperty(previous, 'length', target.length);
          return;
        }
        newIndicesNext = new Array(newEnd + 1);
        for (j = newEnd; j >= start; j--) {
          item = target[j];
          keyVal = key ? item[key] : item;
          i = newIndices.get(keyVal);
          newIndicesNext[j] = i === undefined ? -1 : i;
          newIndices.set(keyVal, j);
        }
        for (i = start; i <= end; i++) {
          item = previous[i];
          keyVal = key ? item[key] : item;
          j = newIndices.get(keyVal);
          if (j !== undefined && j !== -1) {
            temp[j] = previous[i];
            j = newIndicesNext[j];
            newIndices.set(keyVal, j);
          }
        }
        for (j = start; j < target.length; j++) {
          if (j in temp) {
            setProperty(previous, j, temp[j]);
            applyState(target[j], previous, j, merge, key);
          } else setProperty(previous, j, target[j]);
        }
      } else {
        for (let i = 0, len = target.length; i < len; i++) {
          applyState(target[i], previous, i, merge, key);
        }
      }
      if (previous.length > target.length) setProperty(previous, 'length', target.length);
      return;
    }
    const targetKeys = Object.keys(target);
    for (let i = 0, len = targetKeys.length; i < len; i++) {
      applyState(target[targetKeys[i]], previous, targetKeys[i], merge, key);
    }
    const previousKeys = Object.keys(previous);
    for (let i = 0, len = previousKeys.length; i < len; i++) {
      if (target[previousKeys[i]] === undefined) setProperty(previous, previousKeys[i], undefined);
    }
  }
  function reconcile(value, options = {}) {
    const {merge, key = 'id'} = options,
      v = unwrap(value);
    return (state) => {
      if (!isWrappable(state) || !isWrappable(v)) return v;
      applyState(
        v,
        {
          state,
        },
        'state',
        merge,
        key,
      );
      return state;
    };
  }

  const _tmpl$$6 = template(`<span></span>`);

  var Segment = function (props) {
    return (function () {
      var _el$ = _tmpl$$6.cloneNode(true);

      insert(_el$, function () {
        return props.text;
      });

      createRenderEffect(
        function (_p$) {
          var _v$ = className(props.attrs, props.extraClass),
            _v$2 = classList(props.attrs),
            _v$3 = style(props.attrs);

          _v$ !== _p$._v$ && (_el$.className = _p$._v$ = _v$);
          _p$._v$2 = classList$1(_el$, _v$2, _p$._v$2);
          _p$._v$3 = style$1(_el$, _v$3, _p$._v$3);
          return _p$;
        },
        {
          _v$: undefined,
          _v$2: undefined,
          _v$3: undefined,
        },
      );

      return _el$;
    })();
  };

  function className(attrs, extraClass) {
    var fg = attrs.get('inverse') ? (attrs.has('bg') ? attrs.get('bg') : 'bg') : attrs.get('fg');
    var bg = attrs.get('inverse') ? (attrs.has('fg') ? attrs.get('fg') : 'fg') : attrs.get('bg');
    var fgClass = colorClass(fg, attrs.get('bold'), 'fg-');
    var bgClass = colorClass(bg, attrs.get('blink'), 'bg-');
    var cls = extraClass !== null && extraClass !== void 0 ? extraClass : '';

    if (fgClass) {
      cls += ' ' + fgClass;
    }

    if (bgClass) {
      cls += ' ' + bgClass;
    }

    return cls;
  }

  function classList(attrs) {
    return {
      bright: attrs.has('bold'),
      italic: attrs.has('italic'),
      underline: attrs.has('underline'),
      blink: attrs.has('blink'),
    };
  }

  function colorClass(color, intense, prefix) {
    if (typeof color === 'number') {
      if (intense && color < 8) {
        color += 8;
      }

      return ''.concat(prefix).concat(color);
    } else if (color == 'fg' || color == 'bg') {
      return ''.concat(prefix).concat(color);
    }
  }

  function style(attrs) {
    var fg = attrs.get('inverse') ? attrs.get('bg') : attrs.get('fg');
    var bg = attrs.get('inverse') ? attrs.get('fg') : attrs.get('bg');
    var style = {};

    if (typeof fg === 'string') {
      style['color'] = fg;
    }

    if (typeof bg === 'string') {
      style['background-color'] = bg;
    }

    return style;
  }

  const _tmpl$$5 = template(`<span class="line"></span>`);
  var Line = function (props) {
    var segments = function segments() {
      if (typeof props.cursor === 'number') {
        var segs = [];
        var len = 0;
        var i = 0;

        while (i < props.segments.length && len + props.segments[i][0].length - 1 < props.cursor) {
          var seg = props.segments[i];
          segs.push(seg);
          len += seg[0].length;
          i++;
        }

        if (i < props.segments.length) {
          var _seg = props.segments[i];
          var cursorAttrsA = _seg[1];
          var cursorAttrsB = new Map(cursorAttrsA);
          cursorAttrsB.set('inverse', !cursorAttrsB.get('inverse'));
          var pos = props.cursor - len;

          if (pos > 0) {
            segs.push([_seg[0].substring(0, pos), _seg[1]]);
          }

          segs.push([_seg[0][pos], cursorAttrsA, ' cursor-a']);
          segs.push([_seg[0][pos], cursorAttrsB, ' cursor-b']);

          if (pos < _seg[0].length - 1) {
            segs.push([_seg[0].substring(pos + 1), _seg[1]]);
          }

          i++;

          while (i < props.segments.length) {
            var _seg2 = props.segments[i];
            segs.push(_seg2);
            i++;
          }
        }

        return segs;
      } else {
        return props.segments;
      }
    };

    return (function () {
      var _el$ = _tmpl$$5.cloneNode(true);

      insert(
        _el$,
        createComponent(Index, {
          get each() {
            return segments();
          },

          children: function children(s) {
            return createComponent(Segment, {
              get text() {
                return s()[0];
              },

              get attrs() {
                return s()[1];
              },

              get extraClass() {
                return s()[2];
              },
            });
          },
        }),
      );

      createRenderEffect(function () {
        return _el$.style.setProperty('height', props.height);
      });

      return _el$;
    })();
  };

  const _tmpl$$4 = template(`<pre class="asciinema-terminal"></pre>`);
  var Terminal = function (props) {
    var lineHeight = function lineHeight() {
      var _props$lineHeight;

      return (_props$lineHeight = props.lineHeight) !== null && _props$lineHeight !== void 0
        ? _props$lineHeight
        : 1.3333333333;
    };

    var terminalStyle = createMemo(function () {
      return {
        width: ''.concat(props.cols, 'ch'),
        height: ''.concat(lineHeight() * props.rows, 'em'),
        'font-size': ''.concat((props.scale || 1.0) * 100, '%'),
        'font-family': props.fontFamily,
        'line-height': ''.concat(lineHeight(), 'em'),
      };
    });

    var cursorCol = function cursorCol() {
      var _props$cursor;

      return (_props$cursor = props.cursor) === null || _props$cursor === void 0 ? void 0 : _props$cursor[0];
    };

    var cursorRow = function cursorRow() {
      var _props$cursor2;

      return (_props$cursor2 = props.cursor) === null || _props$cursor2 === void 0 ? void 0 : _props$cursor2[1];
    };

    return (function () {
      var _el$ = _tmpl$$4.cloneNode(true);

      var _ref$ = props.ref;
      typeof _ref$ === 'function' ? _ref$(_el$) : (props.ref = _el$);

      insert(
        _el$,
        createComponent(For, {
          get each() {
            return props.lines;
          },

          children: function children(line, i) {
            return (function () {
              var _c$ = memo(function () {
                return i() === cursorRow();
              }, true);

              return createComponent(Line, {
                get segments() {
                  return line.segments;
                },

                get cursor() {
                  return _c$() ? cursorCol() : null;
                },

                get height() {
                  return ''.concat(lineHeight(), 'em');
                },
              });
            })();
          },
        }),
      );

      createRenderEffect(
        function (_p$) {
          var _v$ = props.blink || props.cursorHold,
            _v$2 = props.blink,
            _v$3 = terminalStyle();

          _v$ !== _p$._v$ && _el$.classList.toggle('cursor', (_p$._v$ = _v$));
          _v$2 !== _p$._v$2 && _el$.classList.toggle('blink', (_p$._v$2 = _v$2));
          _p$._v$3 = style$1(_el$, _v$3, _p$._v$3);
          return _p$;
        },
        {
          _v$: undefined,
          _v$2: undefined,
          _v$3: undefined,
        },
      );

      return _el$;
    })();
  };

  const _tmpl$$3 = template(
      `<svg version="1.1" viewBox="0 0 12 12" class="icon"><path d="M1,0 L4,0 L4,12 L1,12 Z"></path><path d="M8,0 L11,0 L11,12 L8,12 Z"></path></svg>`,
    ),
    _tmpl$2 = template(
      `<svg version="1.1" viewBox="0 0 12 12" class="icon"><path d="M1,0 L11,6 L1,12 Z"></path></svg>`,
    ),
    _tmpl$3 = template(`<span class="playback-button"></span>`),
    _tmpl$4 = template(
      `<span class="progressbar"><span class="bar"><span class="gutter"><span></span></span></span></span>`,
    ),
    _tmpl$5 = template(
      `<div class="control-bar"><span class="timer"><span class="time-elapsed"></span><span class="time-remaining"></span></span><span class="fullscreen-button" title="Toggle fullscreen mode"><svg version="1.1" viewBox="0 0 12 12" class="icon"><path d="M12,0 L7,0 L9,2 L7,4 L8,5 L10,3 L12,5 Z"></path><path d="M0,12 L0,7 L2,9 L4,7 L5,8 L3,10 L5,12 Z"></path></svg><svg version="1.1" viewBox="0 0 12 12" class="icon"><path d="M7,5 L7,0 L9,2 L11,0 L12,1 L10,3 L12,5 Z"></path><path d="M5,7 L0,7 L2,9 L0,11 L1,12 L3,10 L5,12 Z"></path></svg></span></div>`,
    );

  function formatTime(seconds) {
    seconds = Math.floor(seconds);
    var m = Math.floor(seconds / 60);
    var s = seconds % 60;
    var time = '';

    if (m < 10) {
      time += '0';
    }

    time += ''.concat(m, ':');

    if (s < 10) {
      time += '0';
    }

    time += ''.concat(s);
    return time;
  }

  var ControlBar = function (props) {
    var e = function e(f) {
      return function (e) {
        e.preventDefault();
        f(e);
      };
    };

    var currentTime = function currentTime() {
      return typeof props.currentTime === 'number' ? formatTime(props.currentTime) : '--:--';
    };

    var remainingTime = function remainingTime() {
      return typeof props.remainingTime === 'number' ? '-' + formatTime(props.remainingTime) : currentTime();
    };

    var gutterBarStyle = function gutterBarStyle() {
      return {
        width: '100%',
        transform: 'scaleX('.concat(props.progress || 0),
        'transform-origin': 'left center',
      };
    };

    var onSeek = function onSeek(e) {
      if (e.altKey || e.shiftKey || e.metaKey || e.ctrlKey) {
        return;
      }

      var barWidth = e.currentTarget.offsetWidth;
      var rect = e.currentTarget.getBoundingClientRect();
      var mouseX = e.clientX - rect.left;
      var pos = mouseX / barWidth;
      return props.onSeekClick(''.concat(pos * 100, '%'));
    };

    return (function () {
      var _el$ = _tmpl$5.cloneNode(true),
        _el$5 = _el$.firstChild,
        _el$6 = _el$5.firstChild,
        _el$7 = _el$6.nextSibling,
        _el$8 = _el$5.nextSibling;

      insert(
        _el$,
        createComponent(Show, {
          get when() {
            return props.isPausable;
          },

          get children() {
            var _el$2 = _tmpl$3.cloneNode(true);

            addEventListener(_el$2, 'click', e(props.onPlayClick), true);

            insert(
              _el$2,
              createComponent(Switch, {
                get children() {
                  return [
                    createComponent(Match, {
                      get when() {
                        return props.isPlaying;
                      },

                      get children() {
                        return _tmpl$$3.cloneNode(true);
                      },
                    }),
                    createComponent(Match, {
                      get when() {
                        return !props.isPlaying;
                      },

                      get children() {
                        return _tmpl$2.cloneNode(true);
                      },
                    }),
                  ];
                },
              }),
            );

            return _el$2;
          },
        }),
        _el$5,
      );

      insert(_el$6, currentTime);

      insert(_el$7, remainingTime);

      addEventListener(_el$8, 'click', e(props.onFullscreenClick), true);

      insert(
        _el$,
        createComponent(Show, {
          get when() {
            return typeof props.progress === 'number' || props.isSeekable;
          },

          get children() {
            var _el$9 = _tmpl$4.cloneNode(true),
              _el$10 = _el$9.firstChild,
              _el$11 = _el$10.firstChild,
              _el$12 = _el$11.firstChild;

            _el$10.$$mousedown = onSeek;

            createRenderEffect(function (_$p) {
              return style$1(_el$12, gutterBarStyle(), _$p);
            });

            return _el$9;
          },
        }),
        null,
      );

      createRenderEffect(function () {
        return _el$.classList.toggle('seekable', props.isSeekable);
      });

      return _el$;
    })();
  };

  delegateEvents(['click', 'mousedown']);

  const _tmpl$$2 = template(`<div class="loading"></div>`);
  var LoaderOverlay = function (props) {
    var symbols = ['▓', '▒', '░', '▒'];
    var intervalId;
    var i = 1;
    var paddingText = '';

    for (var c = 0; c < props.cols - 1; c++) {
      paddingText = paddingText.concat(' ');
    }

    var padding = [paddingText, new Map()];
    var attrs = new Map([['inverse', true]]);
    var line = {
      segments: [padding, [symbols[0], attrs]],
    };

    var _createStore = createStore({
        lines: [line],
      }),
      _createStore2 = _slicedToArray(_createStore, 2),
      state = _createStore2[0],
      setState = _createStore2[1];

    onMount(function () {
      intervalId = setInterval(function () {
        var symbol = symbols[i % symbols.length];
        var line = {
          segments: [padding, [symbol, attrs]],
        };
        setState('lines', 0, line);
        i++;
      }, 250);
    });
    onCleanup(function () {
      clearInterval(intervalId);
    });
    return (function () {
      var _el$ = _tmpl$$2.cloneNode(true);

      insert(
        _el$,
        createComponent(Terminal, {
          get cols() {
            return props.cols;
          },

          get rows() {
            return props.rows;
          },

          get scale() {
            return props.scale;
          },

          get lines() {
            return state.lines;
          },

          get fontFamily() {
            return props.terminalFontFamily;
          },

          get lineHeight() {
            return props.terminalLineHeight;
          },
        }),
      );

      return _el$;
    })();
  };

  const _tmpl$$1 = template(
    `<div class="start-prompt"><div class="play-button"><div><span><svg version="1.1" viewBox="0 0 866.0254037844387 866.0254037844387" class="icon"><defs><mask id="small-triangle-mask"><rect width="100%" height="100%" fill="white"></rect><polygon points="508.01270189221935 433.01270189221935, 208.0127018922194 259.8076211353316, 208.01270189221927 606.217782649107" fill="black"></polygon></mask></defs><polygon points="808.0127018922194 433.01270189221935, 58.01270189221947 -1.1368683772161603e-13, 58.01270189221913 866.0254037844386" mask="url(#small-triangle-mask)" fill="white" class="play-btn-fill"></polygon><polyline points="481.2177826491071 333.0127018922194, 134.80762113533166 533.0127018922194" stroke="white" stroke-width="90" class="play-btn-stroke"></polyline></svg></span></div></div></div>`,
  );

  var StartOverlay = function (props) {
    var e = function e(f) {
      return function (e) {
        e.preventDefault();
        f(e);
      };
    };

    return (function () {
      var _el$ = _tmpl$$1.cloneNode(true);

      addEventListener(_el$, 'click', e(props.onClick), true);

      return _el$;
    })();
  };

  delegateEvents(['click']);

  const _tmpl$ = template(`<div class="asciinema-player-wrapper" tabindex="-1"><div></div></div>`);
  var Player = function (props) {
    var core = props.core;
    var autoPlay = props.autoPlay;

    var _createStore = createStore({
        coreState: 'initial',
        cols: props.cols,
        rows: props.rows,
        lines: [],
        cursor: undefined,
        charW: null,
        charH: null,
        bordersW: null,
        bordersH: null,
        containerW: null,
        containerH: null,
        showControls: false,
        showStartOverlay: !autoPlay,
        isPausable: true,
        isSeekable: true,
        isFullscreen: false,
        currentTime: null,
        remainingTime: null,
        progress: null,
        blink: true,
        cursorHold: false,
      }),
      _createStore2 = _slicedToArray(_createStore, 2),
      state = _createStore2[0],
      setState = _createStore2[1];

    var terminalCols = function terminalCols() {
      return state.cols || 80;
    };

    var terminalRows = function terminalRows() {
      return state.rows || 24;
    };

    var frameRequestId;
    var userActivityTimeoutId;
    var timeUpdateIntervalId;
    var blinkIntervalId;
    var wrapperRef;
    var playerRef;
    var terminalRef;
    var resizeObserver;
    core.addEventListener('starting', function () {
      setState('showStartOverlay', false);
    });
    core.addEventListener('waiting', function () {
      setState('coreState', 'waiting');
    });
    core.addEventListener('reset', function (_ref) {
      var cols = _ref.cols,
        rows = _ref.rows;

      if (rows < state.rows) {
        setState('lines', state.lines.slice(0, rows));
      }

      setState({
        cols: cols,
        rows: rows,
      });
    });
    core.addEventListener('play', function () {
      setState({
        coreState: 'playing',
        showStartOverlay: false,
      });
    });
    core.addEventListener('pause', function () {
      setState('coreState', 'paused');
    });
    core.addEventListener('seeked', function () {
      updateTime();
    });
    core.addEventListener('ended', function () {
      setState('coreState', 'paused');
    });
    core.addEventListener('terminalUpdate', function () {
      if (frameRequestId === undefined) {
        frameRequestId = requestAnimationFrame(updateTerminal);
      }
    });

    var measureDomElements = function measureDomElements() {
      setState({
        charW: terminalRef.clientWidth / terminalCols(),
        charH: terminalRef.clientHeight / terminalRows(),
        bordersW: terminalRef.offsetWidth - terminalRef.clientWidth,
        bordersH: terminalRef.offsetHeight - terminalRef.clientHeight,
        containerW: wrapperRef.offsetWidth,
        containerH: wrapperRef.offsetHeight,
      });
    };

    var setupResizeObserver = function setupResizeObserver() {
      resizeObserver = new ResizeObserver(function (_entries) {
        setState({
          containerW: wrapperRef.offsetWidth,
          containerH: wrapperRef.offsetHeight,
        });
        wrapperRef.dispatchEvent(
          new CustomEvent('resize', {
            detail: {
              el: playerRef,
            },
          }),
        );
      });
      resizeObserver.observe(wrapperRef);
    };

    onMount(
      /*#__PURE__*/ _asyncToGenerator(
        /*#__PURE__*/ regenerator.mark(function _callee() {
          var _yield$core$init, isPausable, isSeekable, poster;

          return regenerator.wrap(function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  console.debug('player mounted');
                  measureDomElements();
                  setupResizeObserver();
                  _context.next = 5;
                  return core.init();

                case 5:
                  _yield$core$init = _context.sent;
                  isPausable = _yield$core$init.isPausable;
                  isSeekable = _yield$core$init.isSeekable;
                  poster = _yield$core$init.poster;
                  setState({
                    isPausable: isPausable,
                    isSeekable: isSeekable,
                  });

                  if (poster !== undefined && !autoPlay) {
                    setState({
                      lines: poster.lines,
                      cursor: poster.cursor,
                    });
                  }

                  if (autoPlay) {
                    core.play();
                  }

                case 12:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee);
        }),
      ),
    );
    onCleanup(function () {
      core.stop();
      stopBlinking();
      stopTimeUpdates();
      resizeObserver.disconnect();
    });
    createEffect(function () {
      var s = state.coreState;

      if (s === 'playing') {
        startBlinking();
        startTimeUpdates();
      } else if (s !== 'initial') {
        stopBlinking();
        stopTimeUpdates();
        updateTime();
      }
    });

    var updateTerminal = function updateTerminal() {
      var changedLines = core.getChangedLines();

      if (changedLines) {
        changedLines.forEach(function (line, i) {
          setState('lines', i, reconcile(line));
        });
      }

      setState('cursor', reconcile(core.getCursor()));
      setState('cursorHold', true);
      frameRequestId = undefined;
    };

    var terminalSize = createMemo(function () {
      var _props$fit;

      if (!state.charW) {
        return;
      }

      console.debug('containerW = '.concat(state.containerW));
      var terminalW = state.charW * terminalCols() + state.bordersW;
      var terminalH = state.charH * terminalRows() + state.bordersH;
      var fit = (_props$fit = props.fit) !== null && _props$fit !== void 0 ? _props$fit : 'width';

      if (fit === 'both' || state.isFullscreen) {
        var containerRatio = state.containerW / state.containerH;
        var terminalRatio = terminalW / terminalH;

        if (containerRatio > terminalRatio) {
          fit = 'height';
        } else {
          fit = 'width';
        }
      }

      if (fit === false || fit === 'none') {
        return {};
      } else if (fit === 'width') {
        var scale = state.containerW / terminalW;
        return {
          scale: scale,
          width: state.containerW,
          height: terminalH * scale,
        };
      } else if (fit === 'height') {
        var _scale = state.containerH / terminalH;

        return {
          scale: _scale,
          width: terminalW * _scale,
          height: state.containerH,
        };
      } else {
        throw 'unsupported fit mode: '.concat(fit);
      }
    });

    var onFullscreenChange = function onFullscreenChange() {
      var _document$fullscreenE;

      setState(
        'isFullscreen',
        (_document$fullscreenE = document.fullscreenElement) !== null && _document$fullscreenE !== void 0
          ? _document$fullscreenE
          : document.webkitFullscreenElement,
      );
    };

    var toggleFullscreen = function toggleFullscreen() {
      if (state.isFullscreen) {
        var _ref3, _document$exitFullscr;

        ((_ref3 =
          (_document$exitFullscr = document.exitFullscreen) !== null && _document$exitFullscr !== void 0
            ? _document$exitFullscr
            : document.webkitExitFullscreen) !== null && _ref3 !== void 0
          ? _ref3
          : function () {}
        ).apply(document);
      } else {
        var _ref4, _wrapperRef$requestFu;

        ((_ref4 =
          (_wrapperRef$requestFu = wrapperRef.requestFullscreen) !== null && _wrapperRef$requestFu !== void 0
            ? _wrapperRef$requestFu
            : wrapperRef.webkitRequestFullscreen) !== null && _ref4 !== void 0
          ? _ref4
          : function () {}
        ).apply(wrapperRef);
      }
    };

    var onKeyPress = function onKeyPress(e) {
      if (e.altKey || e.metaKey || e.ctrlKey) {
        return;
      }

      if (e.shiftKey) {
        if (e.key == 'ArrowLeft') {
          core.seek('<<<');
        } else if (e.key == 'ArrowRight') {
          core.seek('>>>');
        } else {
          return;
        }

        e.preventDefault();
        return;
      }

      if (e.key == ' ') {
        core.pauseOrResume();
      } else if (e.key == 'f') {
        toggleFullscreen();
      } else if (e.key == 'ArrowLeft') {
        core.seek('<<');
      } else if (e.key == 'ArrowRight') {
        core.seek('>>');
      } else if (e.key.charCodeAt(0) >= 48 && e.key.charCodeAt(0) <= 57) {
        var pos = (e.key.charCodeAt(0) - 48) / 10;
        core.seek(''.concat(pos * 100, '%'));
      } else {
        return;
      }

      e.preventDefault();
    };

    var wrapperOnMouseMove = function wrapperOnMouseMove() {
      if (state.isFullscreen) {
        showControls(true);
      }
    };

    var playerOnMouseLeave = function playerOnMouseLeave() {
      if (!state.isFullscreen) {
        showControls(false);
      }
    };

    var startTimeUpdates = function startTimeUpdates() {
      timeUpdateIntervalId = setInterval(updateTime, 100);
    };

    var stopTimeUpdates = function stopTimeUpdates() {
      clearInterval(timeUpdateIntervalId);
    };

    var updateTime = function updateTime() {
      var currentTime = core.getCurrentTime();
      var remainingTime = core.getRemainingTime();
      var progress = core.getProgress();
      setState({
        currentTime: currentTime,
        remainingTime: remainingTime,
        progress: progress,
      });
    };

    var startBlinking = function startBlinking() {
      blinkIntervalId = setInterval(function () {
        setState(function (state) {
          var changes = {
            blink: !state.blink,
          };

          if (changes.blink) {
            changes.cursorHold = false;
          }

          return changes;
        });
      }, 500);
    };

    var stopBlinking = function stopBlinking() {
      clearInterval(blinkIntervalId);
      setState('blink', true);
    };

    var showControls = function showControls(show) {
      clearTimeout(userActivityTimeoutId);

      if (show) {
        userActivityTimeoutId = setTimeout(function () {
          return showControls(false);
        }, 2000);
      }

      setState('showControls', show);
    };

    var playerStyle = function playerStyle() {
      var style = {};

      if ((props.fit === false || props.fit === 'none') && props.terminalFontSize !== undefined) {
        if (props.terminalFontSize === 'small') {
          style['font-size'] = '12px';
        } else if (props.terminalFontSize === 'medium') {
          style['font-size'] = '18px';
        } else if (props.terminalFontSize === 'big') {
          style['font-size'] = '24px';
        } else {
          style['font-size'] = props.terminalFontSize;
        }
      }

      var size = terminalSize();

      if (size === undefined) {
        style['height'] = 0;
        return style;
      }

      if (size.width !== undefined) {
        style['width'] = ''.concat(size.width, 'px');
        style['height'] = ''.concat(size.height, 'px');
      }

      return style;
    };

    var playerClass = function playerClass() {
      var _props$theme;

      return 'asciinema-player asciinema-theme-'.concat(
        (_props$theme = props.theme) !== null && _props$theme !== void 0 ? _props$theme : 'asciinema',
      );
    };

    var terminalScale = function terminalScale() {
      var _terminalSize;

      return (_terminalSize = terminalSize()) === null || _terminalSize === void 0 ? void 0 : _terminalSize.scale;
    };

    var el = (function () {
      var _el$ = _tmpl$.cloneNode(true),
        _el$2 = _el$.firstChild;

      var _ref$ = wrapperRef;
      typeof _ref$ === 'function' ? _ref$(_el$) : (wrapperRef = _el$);

      _el$.addEventListener('webkitfullscreenchange', onFullscreenChange);

      _el$.addEventListener('fullscreenchange', onFullscreenChange);

      _el$.$$mousemove = wrapperOnMouseMove;
      _el$.$$keydown = onKeyPress;

      _el$.addEventListener('keypress', onKeyPress);

      var _ref$2 = playerRef;
      typeof _ref$2 === 'function' ? _ref$2(_el$2) : (playerRef = _el$2);

      _el$2.$$mousemove = function () {
        return showControls(true);
      };

      _el$2.addEventListener('mouseleave', playerOnMouseLeave);

      insert(
        _el$2,
        createComponent(Terminal, {
          get cols() {
            return terminalCols();
          },

          get rows() {
            return terminalRows();
          },

          get scale() {
            return terminalScale();
          },

          get blink() {
            return state.blink;
          },

          get lines() {
            return state.lines;
          },

          get cursor() {
            return state.cursor;
          },

          get cursorHold() {
            return state.cursorHold;
          },

          get fontFamily() {
            return props.terminalFontFamily;
          },

          get lineHeight() {
            return props.terminalLineHeight;
          },

          ref: function ref(r$) {
            var _ref$3 = terminalRef;
            typeof _ref$3 === 'function' ? _ref$3(r$) : (terminalRef = r$);
          },
        }),
        null,
      );

      insert(
        _el$2,
        createComponent(ControlBar, {
          get currentTime() {
            return state.currentTime;
          },

          get remainingTime() {
            return state.remainingTime;
          },

          get progress() {
            return state.progress;
          },

          get isPlaying() {
            return state.coreState == 'playing';
          },

          get isPausable() {
            return state.isPausable;
          },

          get isSeekable() {
            return state.isSeekable;
          },

          onPlayClick: function onPlayClick() {
            return core.pauseOrResume();
          },
          onFullscreenClick: toggleFullscreen,
          onSeekClick: function onSeekClick(pos) {
            return core.seek(pos);
          },
        }),
        null,
      );

      insert(
        _el$2,
        createComponent(Switch, {
          get children() {
            return [
              createComponent(Match, {
                get when() {
                  return state.showStartOverlay;
                },

                get children() {
                  return createComponent(StartOverlay, {
                    onClick: function onClick() {
                      return core.play();
                    },
                  });
                },
              }),
              createComponent(Match, {
                get when() {
                  return state.coreState == 'waiting';
                },

                get children() {
                  return createComponent(LoaderOverlay, {
                    get cols() {
                      return terminalCols();
                    },

                    get rows() {
                      return terminalRows();
                    },

                    get scale() {
                      return terminalScale();
                    },

                    get terminalFontFamily() {
                      return props.terminalFontFamily;
                    },

                    get terminalLineHeight() {
                      return props.terminalLineHeight;
                    },
                  });
                },
              }),
            ];
          },
        }),
        null,
      );

      createRenderEffect(
        function (_p$) {
          var _v$ = state.showControls,
            _v$2 = playerClass(),
            _v$3 = playerStyle();

          _v$ !== _p$._v$ && _el$.classList.toggle('hud', (_p$._v$ = _v$));
          _v$2 !== _p$._v$2 && (_el$2.className = _p$._v$2 = _v$2);
          _p$._v$3 = style$1(_el$2, _v$3, _p$._v$3);
          return _p$;
        },
        {
          _v$: undefined,
          _v$2: undefined,
          _v$3: undefined,
        },
      );

      return _el$;
    })();

    return el;
  };

  delegateEvents(['keydown', 'mousemove']);

  // Efficient array transformations without intermediate array objects.
  // Inspired by Clojure's transducers and Elixir's streams.
  var Stream = /*#__PURE__*/ (function (_Symbol$iterator) {
    function Stream(input, xfs) {
      _classCallCheck(this, Stream);

      this.input = input;
      this.xfs = xfs !== null && xfs !== void 0 ? xfs : [];
    }

    _createClass(Stream, [
      {
        key: 'map',
        value: function map(f) {
          return this.transform(Map$1(f));
        },
      },
      {
        key: 'flatMap',
        value: function flatMap(f) {
          return this.transform(FlatMap(f));
        },
      },
      {
        key: 'filter',
        value: function filter(f) {
          return this.transform(Filter(f));
        },
      },
      {
        key: 'take',
        value: function take(n) {
          return this.transform(Take(n));
        },
      },
      {
        key: 'drop',
        value: function drop(n) {
          return this.transform(Drop(n));
        },
      },
      {
        key: 'transform',
        value: function transform(f) {
          return new Stream(this.input, this.xfs.concat([f]));
        },
      },
      {
        key: 'toArray',
        value: function toArray() {
          return Array.from(this);
        },
      },
      {
        key: _Symbol$iterator,
        value: function value() {
          var _this = this;

          var i = 0;
          var v = 0;
          var values = [];
          var flushed = false;
          var xf = compose(this.xfs, function (val) {
            return values.push(val);
          });
          return {
            next: function next() {
              if (v === values.length) {
                values = [];
                v = 0;
              }

              while (values.length === 0 && i < _this.input.length) {
                xf.step(_this.input[i++]);
              }

              if (values.length === 0 && !flushed) {
                xf.flush();
                flushed = true;
              }

              if (values.length > 0) {
                return {
                  done: false,
                  value: values[v++],
                };
              } else {
                return {
                  done: true,
                };
              }
            },
          };
        },
      },
    ]);

    return Stream;
  })(Symbol.iterator);

  function Map$1(f) {
    return function (emit) {
      return function (input) {
        emit(f(input));
      };
    };
  }

  function FlatMap(f) {
    return function (emit) {
      return function (input) {
        f(input).forEach(emit);
      };
    };
  }

  function Filter(f) {
    return function (emit) {
      return function (input) {
        if (f(input)) {
          emit(input);
        }
      };
    };
  }

  function Take(n) {
    var c = 0;
    return function (emit) {
      return function (input) {
        if (c < n) {
          emit(input);
        }

        c += 1;
      };
    };
  }

  function Drop(n) {
    var c = 0;
    return function (emit) {
      return function (input) {
        c += 1;

        if (c > n) {
          emit(input);
        }
      };
    };
  }

  function compose(xfs, push) {
    return xfs.reverse().reduce(function (next, curr) {
      var xf = toXf(curr(next.step));
      return {
        step: xf.step,
        flush: function flush() {
          xf.flush();
          next.flush();
        },
      };
    }, toXf(push));
  }

  function toXf(xf) {
    if (typeof xf === 'function') {
      return {
        step: xf,
        flush: function flush() {},
      };
    } else {
      return xf;
    }
  }

  function asciicast(src, _ref, _ref2) {
    var feed = _ref.feed,
      now = _ref.now,
      setTimeout = _ref.setTimeout,
      onFinish = _ref.onFinish;
    var idleTimeLimit = _ref2.idleTimeLimit,
      startAt = _ref2.startAt;
    var cols;
    var rows;
    var frames;
    var duration;
    var effectiveStartAt;
    var timeoutId;
    var nextFrameIndex = 0;
    var elapsedVirtualTime = 0;
    var startTime;
    var pauseElapsedTime;

    function load() {
      return _load.apply(this, arguments);
    }

    function _load() {
      _load = _asyncToGenerator(
        /*#__PURE__*/ regenerator.mark(function _callee3() {
          var _idleTimeLimit;

          var asciicast, result;
          return regenerator.wrap(function _callee3$(_context3) {
            while (1) {
              switch ((_context3.prev = _context3.next)) {
                case 0:
                  if (!frames) {
                    _context3.next = 2;
                    break;
                  }

                  return _context3.abrupt('return');

                case 2:
                  _context3.t0 = loadAsciicast;
                  _context3.next = 5;
                  return doFetch(src);

                case 5:
                  _context3.t1 = _context3.sent;
                  asciicast = (0, _context3.t0)(_context3.t1);
                  cols = asciicast.cols;
                  rows = asciicast.rows;
                  idleTimeLimit =
                    (_idleTimeLimit = idleTimeLimit) !== null && _idleTimeLimit !== void 0
                      ? _idleTimeLimit
                      : asciicast.idleTimeLimit;
                  result = prepareFrames(asciicast.frames, idleTimeLimit, startAt);
                  frames = result.frames;

                  if (!(frames.length === 0)) {
                    _context3.next = 14;
                    break;
                  }

                  throw 'asciicast is missing events';

                case 14:
                  effectiveStartAt = result.effectiveStartAt;
                  duration = frames[frames.length - 1][0];

                case 16:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3);
        }),
      );
      return _load.apply(this, arguments);
    }

    function doFetch(_x) {
      return _doFetch.apply(this, arguments);
    }

    function _doFetch() {
      _doFetch = _asyncToGenerator(
        /*#__PURE__*/ regenerator.mark(function _callee4(_ref3) {
          var url, data, _ref3$fetchOpts, fetchOpts, response;

          return regenerator.wrap(function _callee4$(_context4) {
            while (1) {
              switch ((_context4.prev = _context4.next)) {
                case 0:
                  (url = _ref3.url),
                    (data = _ref3.data),
                    (_ref3$fetchOpts = _ref3.fetchOpts),
                    (fetchOpts = _ref3$fetchOpts === void 0 ? {} : _ref3$fetchOpts);

                  if (!(url !== undefined)) {
                    _context4.next = 12;
                    break;
                  }

                  _context4.next = 4;
                  return fetch(url, fetchOpts);

                case 4:
                  response = _context4.sent;

                  if (response.ok) {
                    _context4.next = 7;
                    break;
                  }

                  throw 'failed fetching asciicast file: '
                    .concat(response.statusText, ' (')
                    .concat(response.status, ')');

                case 7:
                  _context4.next = 9;
                  return response.text();

                case 9:
                  return _context4.abrupt('return', _context4.sent);

                case 12:
                  if (!(data !== undefined)) {
                    _context4.next = 19;
                    break;
                  }

                  if (typeof data === 'function') {
                    data = data();
                  }

                  _context4.next = 16;
                  return data;

                case 16:
                  return _context4.abrupt('return', _context4.sent);

                case 19:
                  throw 'failed fetching asciicast file: url/data missing in src';

                case 20:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4);
        }),
      );
      return _doFetch.apply(this, arguments);
    }

    function scheduleNextFrame() {
      var nextFrame = frames[nextFrameIndex];

      if (nextFrame) {
        var t = nextFrame[0] * 1000;
        var elapsedWallTime = now() - startTime;
        var timeout = t - elapsedWallTime;

        if (timeout < 0) {
          timeout = 0;
        }

        timeoutId = setTimeout(runFrame, timeout);
      } else {
        timeoutId = null;
        pauseElapsedTime = duration * 1000;
        onFinish();
      }
    }

    function runFrame() {
      var frame = frames[nextFrameIndex];
      var elapsedWallTime;

      do {
        feed(frame[1]);
        elapsedVirtualTime = frame[0] * 1000;
        frame = frames[++nextFrameIndex];
        elapsedWallTime = now() - startTime;
      } while (frame && elapsedWallTime > frame[0] * 1000);

      scheduleNextFrame();
    }

    function pause() {
      clearTimeout(timeoutId);
      timeoutId = null;
      pauseElapsedTime = now() - startTime;
    }

    function resume() {
      startTime = now() - pauseElapsedTime;
      pauseElapsedTime = null;
      scheduleNextFrame();
    }

    function _seek(where) {
      var isPlaying = !!timeoutId;

      if (isPlaying) {
        pause();
      }

      if (typeof where === 'string') {
        var _pauseElapsedTime;

        var currentTime =
          ((_pauseElapsedTime = pauseElapsedTime) !== null && _pauseElapsedTime !== void 0 ? _pauseElapsedTime : 0) /
          1000;

        if (where === '<<') {
          where = currentTime - 5;
        } else if (where === '>>') {
          where = currentTime + 5;
        } else if (where === '<<<') {
          where = currentTime - 0.1 * duration;
        } else if (where === '>>>') {
          where = currentTime + 0.1 * duration;
        } else if (where[where.length - 1] === '%') {
          where = (parseFloat(where.substring(0, where.length - 1)) / 100) * duration;
        }
      }

      var targetTime = Math.min(Math.max(where, 0), duration) * 1000;

      if (targetTime < elapsedVirtualTime) {
        feed('\x1bc'); // reset terminal

        nextFrameIndex = 0;
        elapsedVirtualTime = 0;
      }

      var frame = frames[nextFrameIndex];

      while (frame && frame[0] * 1000 < targetTime) {
        feed(frame[1]);
        elapsedVirtualTime = frame[0] * 1000;
        frame = frames[++nextFrameIndex];
      }

      pauseElapsedTime = targetTime;

      if (isPlaying) {
        resume();
      }
    }

    function _getPoster(time) {
      var posterTime = time * 1000;
      var poster = [];
      var nextFrameIndex = 0;
      var frame = frames[0];

      while (frame && frame[0] * 1000 < posterTime) {
        poster.push(frame[1]);
        frame = frames[++nextFrameIndex];
      }

      return poster;
    }

    return {
      init: (function () {
        var _init = _asyncToGenerator(
          /*#__PURE__*/ regenerator.mark(function _callee() {
            return regenerator.wrap(function _callee$(_context) {
              while (1) {
                switch ((_context.prev = _context.next)) {
                  case 0:
                    _context.next = 2;
                    return load();

                  case 2:
                    return _context.abrupt('return', {
                      cols: cols,
                      rows: rows,
                      duration: duration,
                    });

                  case 3:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee);
          }),
        );

        function init() {
          return _init.apply(this, arguments);
        }

        return init;
      })(),
      start: (function () {
        var _start = _asyncToGenerator(
          /*#__PURE__*/ regenerator.mark(function _callee2() {
            return regenerator.wrap(function _callee2$(_context2) {
              while (1) {
                switch ((_context2.prev = _context2.next)) {
                  case 0:
                    _seek(effectiveStartAt);

                    resume();

                  case 2:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, _callee2);
          }),
        );

        function start() {
          return _start.apply(this, arguments);
        }

        return start;
      })(),
      stop: function stop() {
        clearTimeout(timeoutId);
      },
      pauseOrResume: function pauseOrResume() {
        if (timeoutId) {
          pause();
          return false;
        } else {
          resume();
          return true;
        }
      },
      seek: function seek(where) {
        return _seek(where);
      },
      getPoster: function getPoster(t) {
        return _getPoster(t);
      },
      getCurrentTime: function getCurrentTime() {
        if (timeoutId) {
          return (now() - startTime) / 1000;
        } else {
          var _pauseElapsedTime2;

          return (
            ((_pauseElapsedTime2 = pauseElapsedTime) !== null && _pauseElapsedTime2 !== void 0
              ? _pauseElapsedTime2
              : 0) / 1000
          );
        }
      },
    };
  }

  function loadAsciicast(data) {
    var header;
    var events = new Stream([]);

    if (typeof data === 'string') {
      var result = parseJsonl(data);

      if (result !== undefined) {
        header = result.header;
        events = result.events;
      } else {
        header = JSON.parse(data);
      }
    } else if (_typeof(data) === 'object' && typeof data.version === 'number') {
      header = data;
    } else if (Array.isArray(data)) {
      header = data[0];
      events = new Stream(data).drop(1);
    } else {
      throw 'invalid data';
    }

    if (header.version === 1) {
      return buildAsciicastV1(header);
    } else if (header.version === 2) {
      return buildAsciicastV2(header, events);
    } else {
      throw 'asciicast v'.concat(header.version, ' format not supported');
    }
  }

  function parseJsonl(jsonl) {
    var lines = jsonl.split('\n');
    var header;

    try {
      header = JSON.parse(lines[0]);
    } catch (_error) {
      return;
    }

    var events = new Stream(lines)
      .drop(1)
      .filter(function (l) {
        return l[0] === '[';
      })
      .map(function (l) {
        return JSON.parse(l);
      });
    return {
      header: header,
      events: events,
    };
  }

  function buildAsciicastV1(data) {
    var time = 0;
    var frames = new Stream(data.stdout).map(function (e) {
      time += e[0];
      return [time, e[1]];
    });
    return {
      cols: data.width,
      rows: data.height,
      frames: frames,
    };
  }

  function buildAsciicastV2(header, events) {
    var frames = events
      .filter(function (e) {
        return e[1] === 'o';
      })
      .map(function (e) {
        return [e[0], e[2]];
      });
    return {
      cols: header.width,
      rows: header.height,
      idleTimeLimit: header.idle_time_limit,
      frames: frames,
    };
  }

  function batchFrames(frames) {
    var maxFrameTime = 1.0 / 60;
    var prevFrame;
    return frames.transform(function (emit) {
      var ic = 0;
      var oc = 0;
      return {
        step: function step(frame) {
          ic++;

          if (prevFrame === undefined) {
            prevFrame = frame;
            return;
          }

          if (frame[0] - prevFrame[0] < maxFrameTime) {
            prevFrame[1] += frame[1];
          } else {
            emit(prevFrame);
            prevFrame = frame;
            oc++;
          }
        },
        flush: function flush() {
          if (prevFrame !== undefined) {
            emit(prevFrame);
            oc++;
          }

          console.debug('batched '.concat(ic, ' frames to ').concat(oc, ' frames'));
        },
      };
    });
  }

  function prepareFrames(frames) {
    var idleTimeLimit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Infinity;
    var startAt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var prevT = 0;
    var shift = 0;
    var effectiveStartAt = startAt;
    var fs = Array.from(
      batchFrames(frames).map(function (e) {
        var delay = e[0] - prevT;
        var delta = delay - idleTimeLimit;
        prevT = e[0];

        if (delta > 0) {
          shift += delta;

          if (e[0] < startAt) {
            effectiveStartAt -= delta;
          }
        }

        return [e[0] - shift, e[1]];
      }),
    );
    return {
      frames: fs,
      effectiveStartAt: effectiveStartAt,
    };
  }

  function test(_ref, callbacks, opts) {
    var kind = _ref.kind;

    if (kind == 'random') {
      return random(callbacks);
    } else if (kind == 'clock') {
      return clock(callbacks, opts);
    }
  }

  function random(_ref2) {
    var feed = _ref2.feed,
      setTimeout = _ref2.setTimeout;
    var base = ' '.charCodeAt(0);
    var range = '~'.charCodeAt(0) - base;
    var timeoutId;

    var schedule = function schedule() {
      var t = Math.pow(5, Math.random() * 4);
      timeoutId = setTimeout(print, t);
    };

    var print = function print() {
      schedule();
      var char = String.fromCharCode(base + Math.floor(Math.random() * range));
      feed(char);
    };

    return function () {
      schedule();
      return function () {
        return clearInterval(timeoutId);
      };
    };
  }

  function clock(_ref3, _ref4) {
    var feed = _ref3.feed;
    var _ref4$cols = _ref4.cols,
      cols = _ref4$cols === void 0 ? 5 : _ref4$cols,
      _ref4$rows = _ref4.rows,
      rows = _ref4$rows === void 0 ? 1 : _ref4$rows;
    var middleRow = Math.floor(rows / 2);
    var leftPad = Math.floor(cols / 2) - 2;
    var intervalId;
    return {
      cols: cols,
      rows: rows,
      duration: 24 * 60,
      start: function start() {
        setTimeout(function () {
          feed('\x1B[?25l\x1B[1m\x1B['.concat(middleRow, 'B'));
        }, 0);
        intervalId = setInterval(function () {
          var d = new Date();
          var h = d.getHours();
          var m = d.getMinutes();
          feed('\r');

          for (var i = 0; i < leftPad; i++) {
            feed(' ');
          }

          feed('\x1b[32m');

          if (h < 10) {
            feed('0');
          }

          feed(''.concat(h));
          feed('\x1b[39;5m:\x1b[25;35m');

          if (m < 10) {
            feed('0');
          }

          feed(''.concat(m));
        }, 1000);
      },
      stop: function stop() {
        clearInterval(intervalId);
      },
      getCurrentTime: function getCurrentTime() {
        var d = new Date();
        return d.getHours() * 60 + d.getMinutes();
      },
    };
  }

  var Queue = /*#__PURE__*/ (function () {
    function Queue() {
      _classCallCheck(this, Queue);

      this.first = undefined;
      this.last = undefined;
      this.onPush = undefined;
    }

    _createClass(Queue, [
      {
        key: 'push',
        value: function push(item) {
          var node = {
            item: item,
          };

          if (this.last !== undefined) {
            this.last = this.last.next = node;
          } else {
            this.last = this.first = node;
          }

          if (this.onPush) {
            this.onPush(this.pop());
            this.onPush = undefined;
          }
        },
      },
      {
        key: 'pop',
        value: function pop() {
          var node = this.first;

          if (node !== undefined) {
            this.first = node.next;

            if (this.first === undefined) {
              this.last = undefined;
            }

            return node.item;
          } else {
            var thiz = this;
            return new Promise(function (resolve) {
              thiz.onPush = resolve;
            });
          }
        },
      },
      {
        key: 'forEach',
        value: function forEach(f) {
          var _this = this;

          var stop = false;

          var go = /*#__PURE__*/ (function () {
            var _ref = _asyncToGenerator(
              /*#__PURE__*/ regenerator.mark(function _callee() {
                var item;
                return regenerator.wrap(function _callee$(_context) {
                  while (1) {
                    switch ((_context.prev = _context.next)) {
                      case 0:
                        item = _this.pop();

                      case 1:
                        if (!(_typeof(item) !== 'object' || typeof item.then !== 'function')) {
                          _context.next = 9;
                          break;
                        }

                        if (!stop) {
                          _context.next = 4;
                          break;
                        }

                        return _context.abrupt('return');

                      case 4:
                        _context.next = 6;
                        return f(item);

                      case 6:
                        item = _this.pop();
                        _context.next = 1;
                        break;

                      case 9:
                        _context.next = 11;
                        return item;

                      case 11:
                        item = _context.sent;

                        if (!stop) {
                          _context.next = 14;
                          break;
                        }

                        return _context.abrupt('return');

                      case 14:
                        _context.next = 16;
                        return f(item);

                      case 16:
                        go();

                      case 17:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee);
              }),
            );

            return function go() {
              return _ref.apply(this, arguments);
            };
          })();

          setTimeout(go, 0);
          return function () {
            stop = true;
          };
        },
      },
    ]);

    return Queue;
  })();

  function buffer(feed, bufferTime) {
    var events = new Queue();
    var startTime;
    var stopFeeding = events.forEach(
      /*#__PURE__*/ (function () {
        var _ref = _asyncToGenerator(
          /*#__PURE__*/ regenerator.mark(function _callee(event) {
            var elapsedWallTime, elapsedStreamTime;
            return regenerator.wrap(function _callee$(_context) {
              while (1) {
                switch ((_context.prev = _context.next)) {
                  case 0:
                    elapsedWallTime = now() - startTime;
                    elapsedStreamTime = (event[0] + bufferTime) * 1000;

                    if (!(elapsedStreamTime > elapsedWallTime)) {
                      _context.next = 5;
                      break;
                    }

                    _context.next = 5;
                    return sleep(elapsedStreamTime - elapsedWallTime);

                  case 5:
                    feed(event[2]);

                  case 6:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee);
          }),
        );

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      })(),
    );
    return {
      pushEvent: function pushEvent(event) {
        if (startTime === undefined) {
          startTime = now();
        }

        if (event[1] != 'o') return;
        events.push(event);
      },
      pushText: function pushText(text) {
        if (startTime === undefined) {
          startTime = now();
        }

        var time = (now() - startTime) / 1000;
        events.push([time, 'o', text]);
      },
      stop: function stop() {
        stopFeeding();
      },
    };
  }

  function now() {
    return new Date().getTime();
  }

  function sleep(t) {
    return new Promise(function (resolve) {
      setTimeout(resolve, t);
    });
  }

  function websocket(_ref, _ref2) {
    var url = _ref.url,
      _ref$bufferTime = _ref.bufferTime,
      bufferTime = _ref$bufferTime === void 0 ? 0 : _ref$bufferTime;
    var feed = _ref2.feed,
      reset = _ref2.reset,
      setWaiting = _ref2.setWaiting;
    var utfDecoder = new TextDecoder();
    var socket;
    var buf;
    var reconnectDelay = 250;
    var _stop = false;

    function initBuffer() {
      if (buf !== undefined) buf.stop();
      buf = buffer(feed, bufferTime);
    }

    function connect() {
      socket = new WebSocket(url);
      socket.binaryType = 'arraybuffer';

      socket.onopen = function () {
        console.debug('websocket: opened');
        setWaiting(false);
        initBuffer();
        reconnectDelay = 250;
      };

      socket.onmessage = function (event) {
        if (typeof event.data === 'string') {
          var e = JSON.parse(event.data);

          if (e.cols !== undefined || e.width !== undefined) {
            var _e$cols, _e$rows;

            initBuffer();
            reset(
              (_e$cols = e.cols) !== null && _e$cols !== void 0 ? _e$cols : e.width,
              (_e$rows = e.rows) !== null && _e$rows !== void 0 ? _e$rows : e.height,
            );
          } else {
            buf.pushEvent(e);
          }
        } else {
          buf.pushText(utfDecoder.decode(event.data));
        }
      };

      socket.onclose = function (event) {
        if (_stop || event.wasClean) {
          console.debug('websocket: closed');
        } else {
          console.debug('websocket: unclean close, reconnecting in '.concat(reconnectDelay, '...'));
          setWaiting(true);
          setTimeout(connect, reconnectDelay);
          reconnectDelay = Math.min(reconnectDelay * 2, 5000);
        }
      };
    }

    return {
      start: function start() {
        connect();
      },
      stop: function stop() {
        _stop = true;
        if (buf !== undefined) buf.stop();
        if (socket !== undefined) socket.close();
      },
    };
  }

  function eventsource(_ref, _ref2) {
    var url = _ref.url,
      _ref$bufferTime = _ref.bufferTime,
      bufferTime = _ref$bufferTime === void 0 ? 0 : _ref$bufferTime;
    var feed = _ref2.feed,
      reset = _ref2.reset;
    var es;
    var buf;

    function initBuffer() {
      if (buf !== undefined) buf.stop();
      buf = buffer(feed, bufferTime);
    }

    return {
      start: function start() {
        es = new EventSource(url);
        es.addEventListener('open', function () {
          console.debug('eventsource: opened');
          initBuffer();
        });
        es.addEventListener('message', function (event) {
          var e = JSON.parse(event.data);

          if (e.cols !== undefined || e.width !== undefined) {
            var _e$cols, _e$rows;

            initBuffer();
            reset(
              (_e$cols = e.cols) !== null && _e$cols !== void 0 ? _e$cols : e.width,
              (_e$rows = e.rows) !== null && _e$rows !== void 0 ? _e$rows : e.height,
            );
          } else {
            buf.pushEvent(e);
          }
        });
        es.addEventListener('done', function () {
          console.debug('eventsource: closed');
          es.close();
        });
      },
      stop: function stop() {
        if (buf !== undefined) buf.stop();
        if (es !== undefined) es.close();
      },
    };
  }

  function create(src, elem) {
    var _opts$autoPlay;

    var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var core = new Core(getDriver(src), {
      cols: opts.cols,
      rows: opts.rows,
      loop: opts.loop,
      speed: opts.speed,
      preload: opts.preload,
      startAt: opts.startAt,
      poster: opts.poster,
      idleTimeLimit: opts.idleTimeLimit,
    });
    var props = {
      core: core,
      cols: opts.cols,
      rows: opts.rows,
      fit: opts.fit,
      autoPlay: (_opts$autoPlay = opts.autoPlay) !== null && _opts$autoPlay !== void 0 ? _opts$autoPlay : opts.autoplay,
      terminalFontSize: opts.terminalFontSize,
      terminalFontFamily: opts.terminalFontFamily,
      terminalLineHeight: opts.terminalLineHeight,
      theme: opts.theme,
    };
    var el;
    var dispose = render(function () {
      el = createComponent(Player, props);
      return el;
    }, elem);
    var player = {
      el: el,
      dispose: dispose,
      getCurrentTime: function getCurrentTime() {
        return core.getCurrentTime();
      },
      getDuration: function getDuration() {
        return core.getDuration();
      },
      play: function play() {
        return core.play();
      },
      pause: function pause() {
        return core.pause();
      },
      seek: function seek(pos) {
        return core.seek(pos);
      },
    };

    player.addEventListener = function (name, callback) {
      return core.addEventListener(name, callback.bind(player));
    };

    return player;
  }

  function getDriver(src) {
    if (typeof src === 'string') {
      if (src.substring(0, 5) == 'ws://' || src.substring(0, 6) == 'wss://') {
        src = {
          driver: 'websocket',
          url: src,
        };
      } else if (src.substring(0, 7) == 'test://') {
        src = {
          driver: 'test',
          kind: src.substring(7),
        };
      } else {
        src = {
          driver: 'asciicast',
          url: src,
        };
      }
    }

    if (src.driver === undefined) {
      src.driver = 'asciicast';
    }

    var drivers = new Map([
      ['asciicast', asciicast],
      ['websocket', websocket],
      ['eventsource', eventsource],
      ['test', test],
    ]);

    if (typeof src === 'function') {
      return src;
    } else if (drivers.has(src.driver)) {
      var driver = drivers.get(src.driver);
      return function (callbacks, opts) {
        return driver(src, callbacks, opts);
      };
    } else {
      throw 'unsupported driver: '.concat(JSON.stringify(src));
    }
  }

  exports.create = create;

  Object.defineProperty(exports, '__esModule', {value: true});

  return exports;
})({});
