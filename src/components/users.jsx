import { useState } from 'react';
import api from '../API/index';
import User from './User';
import SearchStatus from './SearchStatus';
import Pagination from './Pagination';
import { paginate } from '../utils/paginate';
import GroupList from './GroupList';

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const [currentPage, setCurrentPage] = useState(1);
  const usersLength = users.length;
  const pageSize = 4;

  const handlePageChange = (pageIndex) => {
    console.log('Page : ', pageIndex);
    setCurrentPage(pageIndex);
  }

 
  const userCrop = paginate(users, currentPage, pageSize);

  console.log(userCrop);

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
  

  return (
    <>
    <GroupList items={}/>
    <SearchStatus users={users}/>
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
    </>
  )
}

export default Users;