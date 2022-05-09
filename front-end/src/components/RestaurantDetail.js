import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BACKEND_URL, FetchStatus } from '../Constants';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';

export default function RestaurantDetail() {
  const [restaurant, setRestaurant] = useState({
    applicant: '',
    address: '',
    foodItems: '',
  });
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Success);
  const { id, applicant: name, address, foodItems } = restaurant;
  const menu = foodItems.split(':').map((r) => r.trim());

  let params = useParams();
  const RenderingBasedOnFetchStatus = {
    [FetchStatus.Success.name]: (
      <Card style={{ width: '30rem' }}>
        <Card.Img variant='top' src={`https://picsum.photos/id/${id}/300/200`} />
        <Card.Body>
          {/* <Card.Name>{name}</Card.Name> */}
          <Card.Title style={{ fontWeight: 'bold' }}>{name}</Card.Title>
        </Card.Body>
        <Card.Subtitle>Address</Card.Subtitle>
        <Card.Text>{address}</Card.Text>
        <Card.Subtitle>Menu</Card.Subtitle>
        <ListGroup className='list-group-flush'>
          {menu.map((menuItem, idx) => (
            <ListGroupItem key={idx}>{menuItem}</ListGroupItem>
          ))}
        </ListGroup>
      </Card>
    ),
    [FetchStatus.Failure.name]: <div>Fetch Failure</div>,
    [FetchStatus.Loading.name]: <div>Loading...</div>,
  };
  useEffect(() => {
    (async () => {
      try {
        setFetchStatus(FetchStatus.Loading);
        const restaurant = await (await fetch(BACKEND_URL + '/' + params.restaurantId)).json();
        console.log(restaurant);
        setRestaurant(restaurant);
        setFetchStatus(FetchStatus.Success);
      } catch (e) {
        setFetchStatus(FetchStatus.Failure);
      }
    })();
  }, [params.restaurantId]);

  return RenderingBasedOnFetchStatus[fetchStatus.name];
}
