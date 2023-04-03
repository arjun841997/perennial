import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import { getUsersAction, isLoading, selectUsers }from '../../redux/userSlice'
import { useDispatch,  useSelector } from 'react-redux';
import styles from './css/User.module.css';

export function User() {
  const dispatch = useDispatch();
  const usersProps = useSelector(selectUsers);
  const statusProps = useSelector(isLoading);  
  const [userSearch, setUserSearch] = useState("");
  const [users, setUsers] = useState([]);
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({ width:0, height: 0 });
  const [modalVisiblity, setModalVisiblity] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});


  useEffect(() => {
    dispatch(getUsersAction())
  },[dispatch])

  useEffect(() => {
    setUsers(usersProps)
  }, [usersProps])

  useLayoutEffect(() => {
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight
      });
    }
  }, []);

  const handleOnChangeUserSearch = (e) => {
    const searchParams = e.target.value
    setUserSearch(searchParams)    
    let filteredUsers = []    
    for(let i=0; i< usersProps.length; i++){
      const userName = usersProps[i].name.first + " " + usersProps[i].name.last            
      if(userName.toLowerCase().includes(searchParams.toLowerCase())){        
        filteredUsers.push(usersProps[i])
      }
    }    
    setUsers(filteredUsers)
  }

  return (
    <>    
    {modalVisiblity && 
      <div className={styles.modal} >
        <div className={styles.modalContent}>
          
          <span onClick={() => {setModalVisiblity(false)}} className={styles.close}>&times;</span>
          <img src={selectedUser.picture.large} alt="user "  width="50" height="50" />
          <p><h1>{selectedUser.name.first} {selectedUser.name.last}</h1>              
          <br />     <span>ID: {selectedUser.id.value}</span><br/>
                  <span>Phone no: {selectedUser.phone}</span><br/>
                  <span>Email : {selectedUser.email}</span> <br />
                  <span>City : {selectedUser.location.city}</span>  
                  </p>                    
        </div>
      </div>
    }        
  <div ref={targetRef}>  
    <h1 className={styles.title}>User Listing App</h1>       
    <input placeholder='Search User..' className={styles.input} onChange={handleOnChangeUserSearch} value={userSearch} />       
    {statusProps === "loading" ?     
    <div className={styles.loader}></div>
    :<>
    {users && users.length > 0 ? users.map((user) => {
      return (
        <div className={dimensions.width > 460 ? styles.card : styles.cardresponsive} onClick={() => {setModalVisiblity(true);setSelectedUser(user)}}>
            <img src={user.picture.large} alt="user "  width="50" height="50" />
            <div className={styles.container}>            
              <h1>{user.name.first} {user.name.last}</h1>              
              {
                dimensions.width > 460 && <>
                  <span>ID: {user.id.value}</span><br/>
                  <span>Phone no: {user.phone}</span>  
                </>
              }
              <br />
              <span>Email : {user.email}</span> <br />
              <span>City : {user.location.city}</span>            
            </div>
        </div>
      )
     
  })
  :
  <div className={styles.alignCenter}>No data found with given search.</div>
}
  </>
}

  </div> 
  </>
  );
}
