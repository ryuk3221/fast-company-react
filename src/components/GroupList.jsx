const GroupList = ({items, onItemSelect, valueProperty, contentProperty, selectedItem}) => {
  return ( 
    <ul className="list-group">
      {Object.keys(items).map(item => (
        <li
          style={{cursor: 'pointer'}}
          key={items[item][valueProperty]} 
          className={"list-group-item" + (selectedItem === items[item] ? " active" : "")}
          onClick={() => onItemSelect(items[item])}
        >
          {items[item][contentProperty]}
        </li>
      ))}
    </ul>
  );
};

GroupList.defaultProps = {
  valueProperty: '_id',
  contentProperty: 'name'
}
 
export default GroupList;