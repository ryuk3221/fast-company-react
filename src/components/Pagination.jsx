import _ from 'lodash';

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage}) => {
  const pageCount = Math.ceil(itemsCount / pageSize);  
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);
  

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li className={currentPage === page ? "page-item active" : "page-item"}>
            <a className="page-link" onClick={() => onPageChange(page)} >{page}</a>
          </li>
        ))}
        
      </ul>
    </nav>
  );
}
 
export default Pagination;