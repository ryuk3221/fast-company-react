import Qualitie from "./Qualitie";
import BookMark from "./Bookmark";

const User = ({
    _id, 
    name, 
    qualities, 
    profession, 
    completedMeetings, 
    rate, 
    handleDeleteUser,
    onToggleBookMark,
    bookmark
  }) => {
    
  return (
    <tr key={_id}>
      <td>{name}</td>
      <td>
        {qualities.map(item => (
          <Qualitie {...item}/>
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}</td>
      <td>
      <BookMark
        status={bookmark}
        onClick={() => onToggleBookMark(_id)}
      />
      </td>
      <td><button className={"btn btn-danger"} onClick={() => handleDeleteUser(_id)}>Удалить</button></td>
      </tr>
  )
}

export default User;