const Qualitie = ({color, _id, name}) => {
  return (
    <span className={"badge m-1 bg-" + color} key={_id}>{name}</span>
  )
}

export default Qualitie;