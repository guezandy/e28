console.log("eell");
let app = new Vue({
  el: "#app",
  data: {
    isAdmin: ["1", "2", "3"]
  }
});

// console.log("1", app.data["isAdmin"]);
// console.log("2", app.data.isAdmin);
console.log("3", app.$data.isAdmin);
// console.log("4", $app.data.isAdmin);
console.log("5", app.isAdmin);
