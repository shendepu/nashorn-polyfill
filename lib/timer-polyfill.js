/*
 Source is originated from https://github.com/morungos/java-xmlhttprequest

 Articles about Nashorn:
 - https://blog.codecentric.de/en/2014/06/project-nashorn-javascript-jvm-polyglott/
 */
(function nashornEventLoopMain(context) {
  'use strict';

  var TimerTask =  Java.type("java.util.TimerTask");
  var TimeUnit = Java.type("java.util.concurrent.TimeUnit");
  var HashMap = Java.type('java.util.HashMap');

//   var finalException = null;

  var timerMap = new HashMap(1);
  var globalTimerId = 1;

  var timer = context.__NASHORN_POLYFILL_TIMER__;

  var onTaskFinished = function () {
  };

//   var shutdown = function () {
//     timer.cancel();
//   };

  function createTimerTask (fn, timerId, args, repeated) {
    return new TimerTask {
      run: function () {
        try {
          fn.apply(context, args);
          if (!repeated) timerMap.remove(timerId);
        } catch (e) {
//           console.error(e);
//           console.trace(e);
//           console.trace(fn);
//           console.trace(args);
//           console.trace(repeated);
          // Clear the task
          if (repeated) {
            var task = timerMap.get(timerId);
            if (task) task.cancel();
          }
          timerMap.remove(timerId);
        }
      }
    }
  }

  var setTimeout = function (fn, millis /* [, args...] */) {
    var args = [].slice.call(arguments, 2, arguments.length);

    var timerId = globalTimerId++;
    var task = createTimerTask(fn, timerId, args, false);

    timerMap.put(timerId, task);

    timer.schedule(task, millis, TimeUnit.MILLISECONDS);

    return timerId;
  };

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
    var task = createTimerTask(fn, timerId, args, true);
    timerMap.put(timerId, task);

    timer.scheduleWithFixedDelay(task, delay, delay, TimeUnit.MILLISECONDS);

    return timerId;
  };

  var clearInterval = function (timerId) {
    clearTimeout(timerId);
  };

  context.setTimeout = setTimeout;
  context.clearTimeout = clearTimeout;
  context.setInterval = setInterval;
  context.clearInterval = clearInterval;
  context.__nashorn_polyfill_timerMap = timerMap;
})(typeof global !== "undefined" && global || typeof self !== "undefined" && self || this);
