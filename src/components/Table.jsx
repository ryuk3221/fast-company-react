import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

const Table = ({onSort, selectedSort, columns, data, children}) => {
  return (
    <table className="table">
      {children || 
        <>
          <TableHeader onSort={onSort} selectedSort={selectedSort} columns={columns}/>
          <TableBody {...{columns,data: data}}/>
        </>
      }
    </table>
  )
}

export default Table;