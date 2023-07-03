import BookMark from "./Bookmark";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import Table from "./Table";
import QualitiesList from "./qualitiesList";

const UsersTable = ({userCrop, handleDeleteUser, currentSort, handleToggleBookMark, onSort}) => {
  const columns = {
    name: {path: "name", name: "Имя"},
    qualities: {
      name: "Качество",
      component: (user) => (<QualitiesList qualities={user.qualities} />)
    },
    professions: {path: "profession.name", name: "Профессия"},
    completedMeetings: {path: "completedMeetings", name: "Встретился раз"},
    rate: {path: 'rate', name: 'Оценка'},
    bookmark: {
      path: 'bookmark', 
      name: "Избранное", 
      component: (user) => (
        <BookMark
          status={user.bookmark}
          onClick={() => handleToggleBookMark(user._id)}
        />
      )
    },
    delete: {component: (user) => (
      <button className={"btn btn-danger"} onClick={() => handleDeleteUser(user._id)}>Удалить</button>
    )}
  }
  

  return (
    <Table onSort={onSort} selectedSort={currentSort} columns={columns} data={userCrop} />
  )
}

export default UsersTable;