import React, {useState, useEffect} from 'react'
import 'leaflet/dist/leaflet.css';
import './App.css';
import Users from '../Users/Users'
import Map from '../Map/Map'

export default function App () {

  const [users, setUsers] = useState([
    {data: []}
  ])

  const [pages, setPages] = useState([])
  const [activePage, setActivePage] = useState(1)

  const credentials = window.btoa("fetest:root123456");
  const auth = { "Authorization" : `Basic ${credentials}` };

  const getUsers = () => {
    return fetch(`https://213.184.245.66:5010/api/get_all_people`, {
      method: 'GET',
      headers: auth,
    })
    .then((res) => {
      return res.json()
    })
    .then((res) => {
      const newUsers = users.map(obj => {
          return {...obj, data: res.data};
      });
      setUsers(newUsers)
      const pagesNumber = Math.ceil(newUsers[0].data.people.length / 3);
      const pagesArray = [];
      for(let i = 1; i <= pagesNumber; i++) {
        pagesArray.push(i);
      }
      setPages(pagesArray);
    })
  }

  function handleActiveButton(item) {
    setActivePage(item);
    console.log(item)
  }

  useEffect(() => {
    getUsers();
  }, [])


  return (
    <div className='container'>
      {console.log(users)}
      <Users pages={pages} 
             activePage={activePage} 
             handleActiveButton={handleActiveButton} 
             users={users}
             auth={auth}/>
      <Map />
    </div>


  )
}
