import { useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { BACKEND_URL } from '../Constants';

export default function RegisterRestaurantModal({
  showRegisterRestaurantModal,
  onHide: handleCloseRegisterRestaurantModal,
}) {
  const businessNameRef = useRef(null);
  const locationDescriptionRef = useRef(null);
  const addressRef = useRef(null);
  const photoRef = useRef(null);
  const menuRef = useRef(null);
  const scheduleRef = useRef(null);

  const handleSubmitForm = async () => {
    const response = await fetch(BACKEND_URL, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        applicant: businessNameRef?.current?.value || null,
        locationDescription: locationDescriptionRef?.current?.value || null,
        address: addressRef?.current?.value || null,
        photo: photoRef?.current?.value || null,
        foodItems: menuRef?.current?.value || null,
        latitude: null,
        longitude: null,
        schedule: scheduleRef?.current?.value || null,
        location: null,
      }),
    });
    const resJson = await response.json();
    console.log('resJson', resJson);
    return resJson;
  };

  return (
    <Modal show={showRegisterRestaurantModal} onHide={handleCloseRegisterRestaurantModal}>
      <Modal.Header closeButton>
        <Modal.Title>Restaurant Registration</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3' controlId='applicant'>
            <Form.Label>Business Name</Form.Label>
            <Form.Control type='text' placeholder='Business Name' ref={businessNameRef} required />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formLocationDescription'>
            <Form.Label>Location Description</Form.Label>
            <Form.Control type='text' placeholder='Location Description' ref={locationDescriptionRef} required />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formAddress'>
            <Form.Label>Address</Form.Label>
            <Form.Control type='text' placeholder='Address' ref={addressRef} required />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formPhoto'>
            <Form.Label>Photo</Form.Label>
            <Form.Control type='text' placeholder='Photo' ref={photoRef} required />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formFoodItems'>
            <Form.Label>Menu</Form.Label>
            <Form.Control as='textarea' rows='5' placeholder='Menu' ref={menuRef} required />
            <Form.Text className='text-muted'></Form.Text>
          </Form.Group>

          <Form.Group className='mb-3' controlId='formSchedule'>
            <Form.Label>Schedule</Form.Label>
            <Form.Control as='textarea' rows='5' placeholder='Schedule' ref={scheduleRef} required />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleCloseRegisterRestaurantModal}>
          Close
        </Button>
        <Button
          variant='primary'
          onClick={() => {
            handleCloseRegisterRestaurantModal();
            handleSubmitForm();
          }}>
          Register
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
