import { Nav } from 'react-bootstrap';

export default function RenderingBasedOnFetchStatus({ id, applicant }) {
  return (
    <Nav.Item as='li' key={id}>
      <Nav.Link href={`/${id}`}>
        {id}. {applicant}
      </Nav.Link>
    </Nav.Item>
  );
}
