import "./App.css";
import { action, makeAutoObservable, observe, toJS } from "mobx";
import { MyContext } from "./context/MyContext";
import TodoCard from "./pages/TodoCard";

class TodoListClass {
  todos = [];
  selectedRows = [];
  selectedDoneRows = [];
  constructor() {
    makeAutoObservable(this, {
      addTodo: action.bound,
      setSelectedRows: action.bound,
      setSelectedDoneRows: action.bound,
      deleteTodo: action.bound,
      setToDone: action.bound,
      editTodo: action.bound,
      deleteSelectedTodo: action.bound,
      setSelectedToDone: action.bound,
    });
  }
  addTodo = (some) => {
    const key = Math.floor(Math.random() * 1000);
    this.todos.push({
      ...some,
      key: key,
      done: false,
    });
  };
  setSelectedRows = (rows) => {
    this.selectedRows = rows;
  };
  setSelectedDoneRows = (rows) => {
    this.selectedDoneRows = rows;
  };
  deleteTodo = (id) => {
    this.todos = this.todos.filter((td) => td.key !== id);
  };
  setToDone = (id) => {
    this.todos[id].done = true;
  };
  setToUndone = (id) => {
    this.todos[id].done = false;
  };
  editTodo = (id, data) => {
    this.todos[id].todo = data.todo;
    this.todos[id].date = data.date;
  };
  deleteSelectedTodo = (ids) => {
    this.todos = this.todos.filter((td) => !ids.includes(td.key));
    this.selectedRows = this.selectedRows.filter((td) => !ids.includes(td));
    this.selectedDoneRows = this.selectedDoneRows.filter(
      (td) => !ids.includes(td)
    );
  };
  setSelectedToDone = (ids) => {
    this.todos.map((td) => {
      ids.includes(td.key) ? (td.done = true) : (td.done = td.done);
      return td;
    });
    this.selectedRows = this.selectedRows.filter((td) => !ids.includes(td));
  };
}

const todoListClass = new TodoListClass();

function App() {
  return (
    <MyContext.Provider value={todoListClass}>
      <TodoCard />
    </MyContext.Provider>
  );
}

export default App;
