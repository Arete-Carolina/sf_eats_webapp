import { useEffect, useState } from 'react';
import logo from './logo.svg';
import RestaurantListItem from './components/RestaurantListItem';
import { Navbar, Pagination, InputGroup, Dropdown, DropdownButton, Button } from 'react-bootstrap';
import { Switch, Route, Routes } from 'react-router-dom';
import RestaurantDetail from './components/RestaurantDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import _ from 'lodash';
import { BACKEND_URL, FetchStatus } from './Constants';
import RegisterRestaurantModal from './components/RegisterRestaurantModal';

class SortByOption {
  static IdAsc = new SortByOption('Id Ascending', 'id,asc');
  static IdDesc = new SortByOption('Id Descending', 'id,desc');
  static AddressAsc = new SortByOption('Address Ascending', 'address,asc');
  static AddressDesc = new SortByOption('Address Descending', 'address,desc');
  static NameAsc = new SortByOption('Name Ascending', 'applicant,asc');
  static NameDesc = new SortByOption('Name Descending', 'applicant,desc');

  constructor(label, queryVal) {
    this.label = label;
    this.queryVal = queryVal;
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
  const [sortBy, setSortBy] = useState(SortByOption.IdAsc);
  const [showRegisterRestaurantModal, setShowRegisterRestaurantModal] = useState(false);
  const handleOpenRegisterRestaurantModal = () => setShowRegisterRestaurantModal(true);
  const handleCloseRegisterRestaurantModal = () => setShowRegisterRestaurantModal(false);
  async function fetchRestaurants(page = 1, sortByOption = SortByOption.IdAsc) {
    const sortBy = sortByOption.queryVal;
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
      fetchRestaurants(pageNumber, sortBy);
    })();
  }, [pageNumber, sortBy]);

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

  const Home = () => (
    <>
      <InputGroup d='mb-3'>
        <DropdownButton variant='outline-primary' title='Sort By' id='input-group-dropdown-1'>
          <Dropdown.Item onClick={() => setSortBy(SortByOption.NameAsc)}>{SortByOption.NameAsc.label}</Dropdown.Item>
          <Dropdown.Item onClick={() => setSortBy(SortByOption.NameDesc)}>{SortByOption.NameDesc.label}</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => setSortBy(SortByOption.AddressAsc)}>
            {SortByOption.AddressAsc.label}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSortBy(SortByOption.AddressDesc)}>
            {SortByOption.AddressDesc.label}
          </Dropdown.Item>
        </DropdownButton>
      </InputGroup>
      {RenderingBasedOnFetchStatus[fetchStatus.name]}
    </>
  );

  return (
    <section className='App'>
      <Navbar bg='dark' variant='dark'>
        <Navbar.Brand href='/' style={{ marginLeft: '1em' }}>
          SF Eats
        </Navbar.Brand>
        <Button variant='primary' onClick={handleOpenRegisterRestaurantModal}>
          Register a Restaurant!
        </Button>
      </Navbar>
      <RegisterRestaurantModal
        showRegisterRestaurantModal={showRegisterRestaurantModal}
        onHide={handleCloseRegisterRestaurantModal}
      />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path=':restaurantId' element={<RestaurantDetail />} />
      </Routes>
    </section>
  );
}

export default App;
