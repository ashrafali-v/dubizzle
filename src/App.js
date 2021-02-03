import React, { useState, useEffect } from 'react';
import './App.css';
import { Badge} from 'react-bootstrap';
function App() {
  useEffect(() => {
    //fetchItems();
  }, []);
  const [users, setUsers] = useState([]);
  const [forkArray, setforkArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const fetchForks = async (id) =>{
    const data = await fetch(`https://api.github.com/gists/${id}`);
    const forkArray = await data.json();
    setforkArray(forkArray);
  }
  const fetchItems = async () => {
    const data = await fetch(`https://api.github.com/users/${userName}/gists`);
    const userArray = await data.json();
    userArray.forEach(element => {
      fetchForks(element.id)
    });
    setUsers(userArray);
    setLoading(false);
  }
  function handleChange(event){
    const {name,value} = event.target;
    setUserName(value);
  }

  function submitUser(event){
    fetchItems();
    event.preventDefault();
  }
  return (
    <div className="App">
       <form onSubmit={submitUser}>
            <input type="search" placeholder="Search user name" name="name" value={userName} onChange={handleChange}></input>
            <button>Submit</button>
        </form>
      {users.map((item,i) => (
      <div key={item.id}>
        <span>{item.url}</span> &nbsp;{Object.keys(item.files).map(itemFile =>(
          <Badge variant="secondary">{item.files[itemFile].language}  </Badge>

        ))}
        {/* <span>{forkArray[i].username}</span> */}
      </div>
    ))}
    </div>
  );
}

export default App;
