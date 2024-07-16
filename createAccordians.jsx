import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
    .then(response => response.json())
    .then(res => setUsers(res?.users));
  }, [])

  const Accordian = ({user}) => {
      const [isOpen, setOpen] = useState(false);
    return(
       <div onClick={isOpen => setOpen(isOpen => !isOpen)}>
         <div  className='accordian-closed'>{user?.firstName + user?.lastName}</div>  
            {isOpen ?
            <div className='accordian-open'>
              <span>Age:{user?.age}</span>
              <span>Gender: {user?.gender}</span>
              <span>Phone: {user?.phone}</span>
            </div>:
               null
            }
        </div>
    )
  }

  return (
    <div className="App">
      {users.map((item,index) => {
        return (
          <Accordian user={item} />
        )
      })
      }
    </div>
  );
}

export default App;


.App {
  text-align: center;
  display: grid;
  place-items: center;
}

.accordian-closed{
  display: block;
  width: 200px;
  height: 30px;
  border: 1px solid black;
  padding: 5px;
}
.accordian-open{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 100px;
  border: 1px solid black;
  padding: 5px;
  gap: 5px
}
