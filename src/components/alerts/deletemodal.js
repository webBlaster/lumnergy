import React from "react";
import { Button, Modal } from "react-bootstrap";

const deleteModal = ({ handleModalClose, show, deleteCartItems, itemId }) => {
  return (
    <>
      <Modal show={show} onHide={handleModalClose} className="">
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => deleteCartItems(itemId)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default deleteModal;
