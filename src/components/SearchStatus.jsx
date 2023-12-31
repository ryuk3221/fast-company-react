const SearchStatus = ({users}) => {

  const renderPhrase = (number) => {
    const lastOne = Number(number.toString().slice(-1));
    if (number > 4 && number < 15) return "Человек тусанёт";
    if ([2, 3, 4].includes(lastOne)) return "Человка тусанут";
    if (lastOne === 1) return "Человек тусанёт";
  }

  return (
    <h2>
      <span 
        className={"badge bg-" + (users > 0 ? 'primary' : 'danger')}
      >
      {users > 0 ? `${users} ${renderPhrase(users)} с тобой` : "Никто с тобой не тусанет"}
    </span></h2>
  )
}

export default SearchStatus;