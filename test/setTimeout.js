(function (context) {
  function test(name) {
    return function () { print(name); }
  }

  setTimeout(test('setTimeout 0'), 0);
  setTimeout(test('setTimeout 500ms'), 500);

  print('The process has to be terminated manually afterwards, since timer-polyfill has global reference.');
})(this);
