import { useState, useEffect } from 'react';
import api from '../API/index';
import User from './User';
import SearchStatus from './SearchStatus';
import Pagination from './Pagination';
import { paginate } from '../utils/paginate';
import GroupList from './GroupList';

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions]  = useState();
  const [selectedProf, setSelectedProf] = useState();
  
  const pageSize = 4;

  useEffect(() => {
    const getProfs = async () => {
      const responseProfessions = await api.professions();
      setProfessions( responseProfessions);
      
    }
    getProfs();
  },[])

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf])
  

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  }

  const filteredUsers = selectedProf ? users.filter(user => user.profession.name === selectedProf.name) : users;
  const usersLength = filteredUsers.length;
 
  const userCrop = paginate(filteredUsers, currentPage, pageSize);

  

  const handleDeleteUser = (id) => {
    setUsers(users.filter( user => user._id !== id));
  }

  const handleToggleBookMark = (id) => {
    setUsers(
        users.map((user) => {
            if (user._id === id) {
                console.log('Избранное')
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        })
    );
    console.log(id);
}
  
  const handleItemSelect = (item) => {
    setSelectedProf(item);
  }

  const clearFilter = () => {
    setSelectedProf(undefined);
  }

  return (
    <div className="users" style={{display: "flex"}}>
      <div className="users-left">
        <SearchStatus users={usersLength}/>
        {professions && (
          <>
            <GroupList 
              items={professions} 
              onItemSelect={handleItemSelect}
              selectedItem={selectedProf}
            />
            <button className="btn  m-2 btn-secondary" onClick={clearFilter}>Сбросить фильтры</button>
          </>
        )}
      </div>
      <div className="users-right">
        {usersLength > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Проффесия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">Избранное</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {userCrop.map(user => (
              <User {...user} handleDeleteUser={handleDeleteUser} onToggleBookMark={handleToggleBookMark} key={user._id} />
            ))}
          </tbody>
        </table>
        )}
        <Pagination 
          itemsCount = {usersLength}
          pageSize = {pageSize}
          onPageChange = {handlePageChange}
          currentPage = {currentPage}
        />
      </div>
    </div>
  )
}

export default Users;