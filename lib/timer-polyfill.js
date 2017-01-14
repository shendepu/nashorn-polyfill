/*
 Source is originated from https://github.com/morungos/java-xmlhttprequest

 Articles about Nashorn:
 - https://blog.codecentric.de/en/2014/06/project-nashorn-javascript-jvm-polyglott/
 */
(function nashornEventLoopMain(context) {
  'use strict';

  var TimeUnit = Java.type("java.util.concurrent.TimeUnit");
  var Runnable = Java.type('java.lang.Runnable');
  var HashMap = Java.type('java.util.HashMap');

//   var finalException = null;

  var timerMap = new HashMap();
  var globalTimerId = 1;

  // __NASHORN_POLYFILL_TIMER__ type is ScheduledExecutorService
  var scheduler = context.__NASHORN_POLYFILL_TIMER__;

  var onTaskFinished = function () {
  };

//   var shutdown = function () {
//     timer.cancel();
//   };

  function createRunnable (fn, timerId, args, repeated) {
    return new Runnable {
      run: function () {
        try {
          fn.apply(context, args);
          if (!repeated) timerMap.remove(timerId);
        } catch (e) {
          console.error(e);
          console.trace(e);
          console.trace(fn);
          console.trace(args);
          console.trace(repeated);
          // Clear the task
//           if (repeated) {
          var task = timerMap.get(timerId);
          if (task) task.cancel();
//           }
          timerMap.remove(timerId);
        }
      }
    }
  }

  var setTimeout = function (fn, millis /* [, args...] */) {
    var args = [].slice.call(arguments, 2, arguments.length);

    var timerId = globalTimerId++;
    var runnable = createRunnable(fn, timerId, args, false);

    var task = scheduler.schedule(runnable, millis, TimeUnit.MILLISECONDS);
    timerMap.put(timerId, task);

    return timerId;
  };

  var setImmediate = function (fn /* [, args...] */) {
    var args = [].slice.call(arguments, 1, arguments.length);
    return setTimeout(fn, 0, args);
  }

  var clearImmediate = function (timerId) {
    clearTimeout(timerId);
  }

  var clearTimeout = function (timerId) {
    var task = timerMap.get(timerId);
    if (task) {
      task.cancel();
      timerMap.remove(timerId);
    }
  };

  var setInterval = function (fn, delay /* [, args...] */) {
    var args = [].slice.call(arguments, 2, arguments.length);

    var timerId = globalTimerId++;
    var runnable = createRunnable(fn, timerId, args, true);
    var task = scheduler.scheduleWithFixedDelay(runnable, delay, delay, TimeUnit.MILLISECONDS);
    timerMap.put(timerId, task);

    return timerId;
  };

  var clearInterval = function (timerId) {
    clearTimeout(timerId);
  };

  context.setTimeout = setTimeout;
  context.clearTimeout = clearTimeout;
  context.setImmediate = setImmediate;
  context.clearImmediate = clearImmediate;
  context.setInterval = setInterval;
  context.clearInterval = clearInterval;
  context.__nashorn_polyfill_timerMap = timerMap;
})(typeof global !== "undefined" && global || typeof self !== "undefined" && self || this);
