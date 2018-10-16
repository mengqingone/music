function log(t) {
    console.log(t);
}
setImmediate(function() {
    setImmediate(function() {
        log(1);
        setImmediate(function() { log(2); });
        setImmediate(function() { log(3); });
    });
    setImmediate(function() {
        log(4);
        setImmediate(function() { log(5); });
        setImmediate(function() { log(6); });
    });
});
// process.nextTick(function() {
//     process.nextTick(function() {
//       log(1);
//       process.nextTick(function() { log(2); });
//       process.nextTick(function() { log(3); });
//     });
//     process.nextTick(function() {
//       log(4);
//       process.nextTick(function() { log(5); });
//       process.nextTick(function() { log(6); });
//     });
//   });
  setTimeout(function timeout() {
    console.log('TIMEOUT FIRED');
  }, 3)