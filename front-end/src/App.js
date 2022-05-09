import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import RestaurantListItem from './components/RestaurantListItem';

const BACKEND_URL = 'http://localhost:8080/api/restaurants';

class FetchStatus {
  static Success = new FetchStatus('Success');
  static Loading = new FetchStatus('Loading');
  static Failure = new FetchStatus('Failure');

  constructor(name) {
    this.name = name;
  }
}

function App() {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Success);
  const [restaurants, setRestaurants] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        setFetchStatus(FetchStatus.Loading);
        const data = await (await fetch(BACKEND_URL)).json();
        const {
          content,
          pageable: { pageNumber },
          totalElements,
          totalPages,
        } = data;
        setRestaurants(content);
        setTotalElements(totalElements);
        setTotalPages(totalPages);
        setPageNumber(pageNumber);
        setFetchStatus(FetchStatus.Success);
      } catch (e) {
        setFetchStatus(FetchStatus.Failure);
        console.error(`Error while fetching ${BACKEND_URL}`);
        console.error(e);
      }
    })();
  }, []);

  const RenderingBasedOnFetchStatus = {
    [FetchStatus.Success.name]: <ul>{restaurants.map((restaurant) => RestaurantListItem(restaurant))}</ul>,
    [FetchStatus.Failure.name]: <div>Fetch Failure</div>,
    [FetchStatus.Loading.name]: <div>Loading...</div>,
  };

  return (
    <section className='App'>
      <header className='App-header'>{RenderingBasedOnFetchStatus[fetchStatus.name]}</header>
    </section>
  );
}

export default App;
