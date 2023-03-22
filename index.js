const addTodo = () => {
  let url = "http://localhost:4000/";
  let item = document.getElementsByName("new_todo")[0].value;
  console.log(item);
  var myHeaders = new Headers();
  myHeaders.append("content-type", "application/json");

  var raw = JSON.stringify({
    query:
      "mutation AddTodo($desc: String!) {\n  addTodo(desc: $desc) {\n    code\n    success\n    message \n    todo {\n      desc\n      id\n      done\n    }\n  }\n}",
    variables: {
      desc: item,
    },
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:4000/", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
  location.reload();
};

const isHideChecked = () => {
  let checked = document.getElementsByName("hide-done")[0].checked;
  console.log(checked);
  return checked;
};

const toggleTodo = (id) => {
  let raw = JSON.stringify({
    query: `
    mutation Mutation($toggleTodoId: ID!) {
      toggleTodo(id: $toggleTodoId) {
        code
        success
        message
        todo {
          id
          desc
          done
        }
      }
    }`,
    variables: {
      id: id,
    },
  });

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:4000/", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
  location.reload();
};

const isHiddenSet = () => {
  let hidden = window.localStorage.getItem("hideDone");
  return !hidden;
};

const url = "http://localhost:4000";
var myHeaders = new Headers();
var list_div = document.getElementById("list_section");
var list = document.getElementsByTagName("ul")[0];
myHeaders.append("content-type", "application/json");
let h = isHiddenSet();
console.log("Hidden:", h);
var raw = JSON.stringify({
  query: "query getAllTodos {\n  todos {\n    id\n    desc\n    done\n  }\n}",
});

var requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow",
};

fetch(url, requestOptions)
  .then((response) => response.json())
  .then((result) => {
    console.log(result);
    let todos = result.data.todos;
    console.log(todos);
    todos.forEach((element) => {
      let hide = document.getElementById("hd").value;
      console.log(hide);
      let checked = element.done == true ? "checked" : "";
      console.log("🚀 ~ file: index.js:72 ~ todos.forEach ~ checked:", checked);
      let node = document.createElement("li");
      let checkbox =
        "<input type='checkbox' " +
        "id=" +
        element.id +
        " " +
        checked +
        " onclick=\"toggleTodo('" +
        element.id +
        "')\" /> ";
      console.log(
        "🚀 ~ file: index.js:106 ~ todos.forEach ~ checkbox:",
        checkbox
      );
      node.innerHTML = checkbox + element.desc;
      console.log(
        "🚀 ~ file: index.js:80 ~ todos.forEach ~ node.innerHTML:",
        node.innerHTML
      );
      list.appendChild(node);
    });
  })
  .catch((error) => console.log("error", error));
