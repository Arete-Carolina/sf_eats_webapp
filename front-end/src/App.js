import { useEffect, useState } from 'react';
import logo from './logo.svg';
import RestaurantListItem from './components/RestaurantListItem';
import { Navbar, Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import _ from 'lodash';

const BACKEND_URL = 'http://localhost:8080/api/restaurants';

class FetchStatus {
  static Success = new FetchStatus('Success');
  static Loading = new FetchStatus('Loading');
  static Failure = new FetchStatus('Failure');

  constructor(name) {
    this.name = name;
  }
}

class SortByOption {
  static AddressAsc = new SortByOption('Address Ascending');
  static AddressDesc = new SortByOption('Address Descending');
  static NameAsc = new SortByOption('Name Descending');
  static NameDesc = new SortByOption('Name Descending');

  constructor(label) {
    this.label = label;
  }
}

const getPagesForPagination = (pageNumber, totalPages) => {
  const [minPage, maxPage] = [1, totalPages];
  let [lowerBound, upperBound] = [pageNumber - 3, pageNumber + 3];

  const diffLowerBound = minPage - lowerBound;
  const diffUpperBound = upperBound - maxPage;
  if (diffLowerBound > 0) {
    lowerBound = minPage;
    upperBound += diffLowerBound;
    upperBound = Math.min(upperBound, maxPage);
  }

  if (diffUpperBound > 0) {
    upperBound = maxPage;
    lowerBound -= diffUpperBound;
    lowerBound = Math.max(lowerBound, minPage);
  }

  return _.range(lowerBound, upperBound + 1);
};

function App() {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Success);
  const [restaurants, setRestaurants] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  async function fetchRestaurants(page = 1, sortByCol = 'id', sortByDir = 'asc') {
    const sortBy = sortByCol + ',' + sortByDir;
    page -= 1;
    let searchParams = new URLSearchParams({ page, sortBy });
    try {
      setFetchStatus(FetchStatus.Loading);
      const data = await (await fetch(BACKEND_URL + '?' + searchParams)).json();
      const {
        content,
        pageable: { pageNumber },
        totalElements,
        totalPages,
      } = data;
      setRestaurants(content);
      setTotalElements(totalElements);
      setTotalPages(totalPages);
      setPageNumber(pageNumber + 1);
      setFetchStatus(FetchStatus.Success);
    } catch (e) {
      setFetchStatus(FetchStatus.Failure);
      console.error(`Error while fetching ${BACKEND_URL}`);
      console.error(e);
    }
  }

  useEffect(() => {
    (async () => {
      fetchRestaurants();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      fetchRestaurants(pageNumber);
    })();
  }, [pageNumber]);

  const pagesForPagination = getPagesForPagination(pageNumber, totalPages);
  const firstPageOnPagination = pagesForPagination[0];
  const lastPageOnPagination = pagesForPagination[pagesForPagination.length - 1];
  const RenderingBasedOnFetchStatus = {
    [FetchStatus.Success.name]: (
      <section>
        <ul>{restaurants.map((restaurant) => RestaurantListItem(restaurant))}</ul>
        <Pagination>
          <Pagination.First onClick={() => setPageNumber(1)} />
          <Pagination.Prev onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber === 1} />
          {1 < firstPageOnPagination && <Pagination.Ellipsis disabled />}

          {pagesForPagination.map((pageNum) => (
            <Pagination.Item key={pageNum} onClick={() => setPageNumber(pageNum)} active={pageNumber === pageNum}>
              {pageNum}
            </Pagination.Item>
          ))}

          {lastPageOnPagination < totalPages && <Pagination.Ellipsis disabled />}
          <Pagination.Next onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber === totalPages} />
          <Pagination.Last onClick={() => setPageNumber(totalPages)} />
        </Pagination>
      </section>
    ),
    [FetchStatus.Failure.name]: <div>Fetch Failure</div>,
    [FetchStatus.Loading.name]: <div>Loading...</div>,
  };

  return (
    <section className='App'>
      <Navbar bg='dark' variant='dark'>
        <Navbar.Brand href='#home' style={{ marginLeft: '1em' }}>
          SF Eats
        </Navbar.Brand>
      </Navbar>

      {RenderingBasedOnFetchStatus[fetchStatus.name]}
    </section>
  );
}

export default App;
