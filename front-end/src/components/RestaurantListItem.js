import { Nav } from 'react-bootstrap';
import { Switch, Route, Link } from 'react-router-dom';

export default function RenderingBasedOnFetchStatus({ id, applicant }) {
  return (
    <Nav.Item as='li' key={id} href={`/${id}`}>
      <Nav.Link as={Link} to={`/${id}`}>
        {id}. {applicant}
      </Nav.Link>
    </Nav.Item>
  );
}
