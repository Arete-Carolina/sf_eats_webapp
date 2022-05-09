import { useParams } from 'react-router-dom';
import {useState} from 'react';

export default function RestaurantDetail() {
  const [restaurant, setRestaurant] = useState({});
  let params = useParams();

  useEffect(() => {
    async () {

    }
  })

  return <h2>Restaurant: {params.restaurantId}</h2>;
}
