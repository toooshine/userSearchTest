import React, {useState, useEffect} from 'react';
import ListOfUsers from './ListOfUsers';
import './App.css';

function App() {

  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setErreur] = useState('');

  useEffect(() => {
    if(searchTerm !== ''){
      const searchResults=[];
      setUsers([]);

      // Search Github users and list

      const fetchData = async () => {
        const response = await fetch(`https://api.github.com/search/users?q=${searchTerm}`);
        if(response.ok){
          const data = await response.json();
          if (data){
            setErreur('');
            data.items.map(user => searchResults.push(user.login));
            setUsers(searchResults);
          }
      }else{
        setErreur(response.status);
        setSearchTerm('')
      }
        
      }
      fetchData();
    }
    
  }, [searchTerm]);

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  const listOfUsers = 
    searchTerm &&
    users.map((user,i) => <ListOfUsers key={i} users={user} />);

  // Handle error cases

  const errorHandleFunction = (errorCode) => {
    if(errorCode === 403){
      return(
        <p style={{textAlign:'center', color:'red'}}>Rate limit exceeded, please try again in one minute </p>
      )
    }else{
      return(
        <p style={{textAlign:'center', color:'red'}}>Sorry, errors occurred </p>
      )
    }
    
  }
    
  const searchFunction = 
    <div>
      {listOfUsers}
    </div>;

  return (
    <div>
      <h1 style={{textAlign:'center'}}>Github user search</h1>
      <div className="App">
        <input type='text'  placeholder="Search" value={searchTerm}
          onChange={handleChange} />
      </div>
      { error !== '' ? errorHandleFunction(error) : searchFunction}
    </div>
  );
}

export default App;
