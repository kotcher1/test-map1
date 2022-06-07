import React, {useState, useEffect} from 'react'
import './Users.css';

export default function Users({pages, activePage, handleActiveButton, users, auth}) {

  const itemsVar = (activePage - 1) * 3;

  return (
    <div className='container__users-list'>
      <div className='container__users'>
        {users[0].data.people && users[0].data.people.map((item, index) => {
          if((index === (itemsVar)) || (index === (itemsVar + 1)) || (index === (itemsVar + 2))) {
            return (
              <div className='container__user' key={index}>
                <Photo link={item.image_ref} auth={auth}/>
                <div className='container__user-fullname'>
                  <p className='container__user-name'>
                    {item.name}
                  </p>
                  <p className='container__user-midname'>
                    {item.midname}
                  </p>
                  <p className='container__user-surname'>
                    {item.surname}
                  </p> 
                </div>
              </div>
            )
          }
        })}
      </div>
      <div className="container__buttons">
        {pages.map((item) => {
          return <button className={`container__button ${item === activePage ? 'container__button_active' : ''}`} onClick={() => handleActiveButton(item)} key={item} > {item} </button>
        })}
      </div>
    </div>
  )
}

const Photo = ({link, auth}) => {
  const [image, setImage] = useState('')

  const getPhoto = (link) => {
    return fetch(`https://213.184.245.66:5010${link}`, {
      method: 'GET',
      headers: auth,
    })
    .then((res) => {
      return res.blob();
    })
    .then((res) => {
      let newImage = URL.createObjectURL(res);
      setImage(newImage)
    })
  }

  useEffect(() => {
    getPhoto(link);
  }, [])

  return (
    <img className='container__user-photo' src={image} alt="user"/>
  )
}