
// 객체를 만들면 좋을 것 같다.
// 메뉴라고 하는 클래스를 만들겠다.
// 순대를 누르면 순대국이라는 객체가 생성되면 댐

function Menu(name, time){
    this.name = name;
    this.time = time;
} // 파일 쪼개면 좋다.

function Chef(name){
    this.status = "ready"; // cooking
    this.name = name
}

function Serv(name, time){
    this.status = "ready"; // cooking
    this.name = name;
    this.time = time;
}

//함수로 열어주는게 좋다 레디나 쿠킹은 내부에서만 알아야하니...
Chef.prototype.isAvailable = function(){
    return this.status === "ready";
};
Chef.prototype.cookAsync = function(menu) {
    var chef = this;
    // 뭘 요리해라 메뉴를 던진다. 메뉴로 받고 요리사가 요리하고 요리 끝낸다.
    return new Promise(function(resolve){
        setTimeout(function() {  
            resolve(chef);
        }, menu.time);
    })
};

Serv.prototype.isAvailable = function(){
    return this.status === "ready";
};

Serv.prototype.serveAsync = function() {
    var serv = this
    // 뭘 서빙해라라고 메뉴를 주고, 메뉴를 받은 서버는 서빙하고 서빙 끝낸다.
    return new Promise(function(resolve){
        setTimeout(function(){
            serv.status = "ready";
            resolve();
        }, serv.time);
    })
};

var orders = [];
var cookings = [];
var servings = [];

var chefs = [new Chef("1번셰프"), new Chef("2번셰프")];

var servs = [new Serv("1번서버", 5000), new Serv("2번서버", 5000)];





function renderOrders() {
    var ordersEl = document.getElementById("orders");
    ordersEl.innerHTML = "";
    orders.forEach(function(order){
        var liEl = document.createElement("li");
        liEl.textContent = order.name;
        ordersEl.append(liEl);
    });
}

function renderCookings(){
    var cookingsEl = document.getElementById("cookings");
    var serv = this
    cookingsEl.innerHTML = "";
    cookings.forEach(function(cooking){
        var liEl = document.createElement("li");
        liEl.textContent = cooking.name;
        cookingsEl.append(liEl);
    });
}

function renderServings(menu){
    var servingsEl = document.getElementById("servings");
    servingsEl.innerHTML = "";
    servings.forEach(function(serving){
        var liEl = document.createElement("li");
        liEl.textContent = serving.name;
        servingsEl.append(liEl);
    });
}



document.getElementById("sundae").onclick = function(){
    
    
    run(new Menu("아비꼬카레", 2000));
};

document.getElementById("heajang").onclick = function(){
    
    
    run(new Menu("삼겹살", 3000));
};

// 주문, 요리, 서빙의 메인 프로세스는 이 함수에서 전부 처리되어야 함.
// 화면이 뻗으면 안됨
function findAvailableChef() {
    return new Promise(function findChef (resolve) {
        var availableChef = chefs.find(chef => chef.isAvailable());
        if (availableChef !== undefined) {
            resolve(availableChef);
        }
        else {
            //TODO: available 한 요리사가 없을 경우
            setTimeout(function() { 
                findChef(resolve);
            }, 500);
        }
    });
}

function findAvailableServ() {
    return new Promise(function findServ (resolve) {
        var availableServ = servs.find(serv => serv.isAvailable());
        if (availableServ !== undefined){
            resolve(availableServ);
        } 
        else {
            setTimeout(function() { 
                findServ(resolve);
            }, 500);
        }
    });
  }


function run(menu) {
    // 주문 목록에 추가, 출력
    orders.push(menu);
    renderOrders();
  
  
    // 대기 중인 요리사 찾기 및 요리 시작
    findAvailableChef() // available 한 요리사가 있을 경우 then, 없을 경우 대기
    .then(function(chef) {
      cookings.push(menu);
      orders.splice(orders.indexOf(menu), 1);
      renderOrders();
      renderCookings();
      chef.status = "cooking";

      return chef.cookAsync(menu);
    })
    .then(function(chef) {
        chef.status = "ready";
        cookings.splice(cookings.indexOf(menu), 1);
        // servings.push(menu);
        renderCookings();
        // renderServings();
        return findAvailableServ() // 요리에서 삭제하고 서빙에 추가
        // findAvailableServer()
    })
    .then(function(serve) {
        servings.push(menu);
        // cookings.splice(cookings.indexOf(menu), 1);
        // renderCookings();
        renderServings(menu);
        serve.status = "serving";

        return serve.serveAsync()
    })
    .then(function() {
        servings.splice(servings.indexOf(menu), 1);
        renderServings();
        // return alert("완료")
    })


      
}
  