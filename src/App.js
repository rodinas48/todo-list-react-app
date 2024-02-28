import "./App.css";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
function App() {
  return (
    <div className="App col-12 col-md-10 col-lg-8 col-xl-5">
      <div className="Header">
        <h1>Todo List</h1>
      </div>
      <div className="main">
        <AddTask />
        <Tasks />
      </div>
    </div>
  );
}

export default App;
