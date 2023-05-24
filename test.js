function delay(ms) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, ms);
    });
  }
  
delay(3000).then(function() {
        console.log('3초후 실행');
    })
    .then(function(){
        delay(1000)
        .then(function () {
            console.log('1초 후 실행');
        });
    });