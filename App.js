import React, { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
const App = () => {
  const [item, setItem] = useState([]);
const [newtask, setNewTask] = useState("");
const handleSubmit = (e) => {
  e.preventDefault();
  axios.post('http://localhost:5000/addtask', { todo: newtask }).then(
    arr => setItem(arr.data)
  )
    };
  useEffect(() => {
    axios
      .get("http://localhost:5000/gettasks")
      .then((arr) => setItem(arr.data));
  }, []);

const deleteHandler = id =>{
  axios.delete(`http://localhost:5000/delete/${id}`).then(arr => setItem(arr.data))
}



  return (
  <div><center>
<form onSubmit={handleSubmit}>
  <input type="text" placeholder="Enter your task" value={newtask} 
  onChange={(e) => setNewTask(e.target.value)} />
  <button type="submit" value="Add Task">Add Task</button>
</form>


    {item.map(task => {
      return (
        <div key={task._id}>
          <h3>{task.todo}</h3><button onClick={() => deleteHandler(task._id)}>Delete</button>
        </div>
      );
    })}</center>
  </div>
);
};
export default App;
