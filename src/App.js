// Import Our Components
import AllPosts from "./pages/AllPosts"
import SinglePost from "./pages/SinglePost";
import Form from "./pages/Form";

// Import Hooks from React
import {useState, useEffect} from "react"

// Import Router 6 Component (Route -> Route, Switch -> Routes)
import {Route, Routes, Link, useNavigate} from "react-router-dom"


/////////////////////////
// Style Object
/////////////////////////
const h1 = {
  textAlign: "center",
  margin: "10px"
}

const button = {
  backgroundColor: "navy",
  display: "block",
  margin: "auto"
}

function App() {
  ///////////////////////////
  // State and Other Variables
  ///////////////////////////

  const navigate = useNavigate()

  const URL = 'https://qbart-masonite-todo-backend.herokuapp.com/todos/'

  // state to hold list of todos
  const [posts, setPosts] = useState([])

  // an empty todo for initializing the create form
  const nullToDo = {
    subject: "",
    details: ""
  }

  const [targetToDo, setTargetToDo] = useState(nullToDo)

  //////////////
  // Functions
  //////////////

   // function to get list of todos from API
   const getTodos = async () => {
    const response = await fetch(URL)
    const data = await response.json();
    setPosts(data);
  }

  const addToDo = async (newToDo) => {
    await fetch(URL, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newToDo)
    })

    getTodos()
  }

  const getTargetToDo = (todo) => {
    setTargetToDo(todo)
    navigate('/edit')
  }

  const updateToDo = async (todo) => {
    await fetch(URL + todo.id, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    })
    getTodos()
  }

  const deleteToDo = async (todo) => {
    await fetch(URL + todo.id, {
      method: 'delete'
    })
    getTodos()
    navigate('/')
  }

  //////////////
  // useEffects
  //////////////

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <div className="App">
      <h1 style={h1}>My To-do list</h1>
      <Link to='/new'><button style={button}>Create New Todo</button></Link>
      <Routes>
        <Route path='/' element={<AllPosts posts={posts} />} />
        <Route path="/post/:id" element={<SinglePost 
        posts={posts} 
        edit={getTargetToDo}
        deleteToDo={deleteToDo}
        />} />
        <Route path='new' element={<Form 
          initialTodo={nullToDo}
          handleSubmit={addToDo}
          buttonLabel="Create Todo"
        />} />
        <Route path="/edit" element={<Form
          initialTodo={targetToDo}
          handleSubmit={updateToDo}
          buttonLabel="Update Todo"
        />} />
      </Routes>
    </div>
  );
}

export default App;
