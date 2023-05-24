
// 객체를 만들면 좋을 것 같다.
// 메뉴라고 하는 클래스를 만들겠다.
// 순대를 누르면 순대국이라는 객체가 생성되면 댐

function Menu(name, time){
    this.name = name;
    this.time = time;
} // 파일 쪼개면 좋다.

function Chef(){
    this.status = "ready"; // cooking
}

//함수로 열어주는게 좋다 레디나 쿠킹은 내부에서만 알아야하니...
Chef.prototype.isAvailable = function(){
    return this.status === "ready";
};
Chef.prototype.cookAsync = function(menu) {
    // 뭘 요리해라 메뉴를 던진다. 메뉴로 받고 요리사가 요리하고 요리 끝낸다.
    return new Promise(function(resolve){
        setTimeout(resolve, menu.time);
    })
};

var orders = [];
var cookings = [];
var servings = [];

var chefs = [new Chef(), new Chef()];

function renderOrders() {
    var ordersEl = document.getElementById("orders");
    ordersEl.innerHTML = "";
    orders.forEach(function(order){
        var liEl = document.createElement("li");
        liEl.textContent = order.name;
        ordersEl.append(liEl);
    });
}



document.getElementById("sundae").onclick = function(){
    
    
    run(new Menu("순대국", 1000));
};

document.getElementById("heajang").onclick = function(){
    
    
    run(new Menu("해장국", 2000));
};

// 주문, 요리, 서빙의 메인 프로세스는 이 함수에서 전부 처리되어야 함.
// 화면이 뻗으면 안됨
function run(menu) {
    // 주문 목록에 추가, 출력 (큐가 있어야한다?)
    orders.push(menu);  
    renderOrders();
    
    // 대기중인 요리사 찾기 (요리사가 있을 떄까지 대기해야 함.) => 비동기작업 Promise로 구현해서 작업. / 여유시간 줘야 처리할 수 있음.
    // 따로 함수를 빼지말고 런 함수 안에서 처리 필요.
    // var chef = findChef();
    findeChefAsyncs().then(function(chef){
         //요리사에게 요리시킴
        // -- 요리 목룍으로 넘어가야 함
        chef.cookAsync().then(function () {

        });
            // 서빙을 시킴.

            // 요리하는 것도 기다렸다가
            // -- 서빙 목록으로 넘어가야 함
    });


    
}