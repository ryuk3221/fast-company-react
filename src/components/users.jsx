import { useState, useEffect } from 'react';
import api from '../API/index';
import User from './User';
import SearchStatus from './SearchStatus';
import Pagination from './Pagination';
import { paginate } from '../utils/paginate';
import GroupList from './GroupList';
import UsersTable from './usersTable';
import _ from 'lodash';

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions]  = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({iter: "name", order: "asc"});

  
  const pageSize = 8;

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
 
  const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

  const userCrop = paginate(sortedUsers, currentPage, pageSize);

  

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

  const handleSort = (item) => {
    setSortBy(item);
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
          <UsersTable 
            userCrop={userCrop} 
            handleToggleBookMark={handleToggleBookMark} 
            handleDeleteUser={handleDeleteUser} 
            onSort={handleSort}
            currentSort={sortBy}
          />
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