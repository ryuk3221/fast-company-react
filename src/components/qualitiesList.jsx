import Qualitie from "./Qualitie";

const QualitiesList = ({qualities}) => {
  return (
    <>
      {qualities.map(item => (
          <Qualitie key={item._id} {...item}/>
      ))}
    </>
  )
}

export default QualitiesList;