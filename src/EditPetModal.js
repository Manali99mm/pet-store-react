import React from 'react'
import Modal from 'react-modal';
import PetForm from './PetForm';

export default function EditPetModal({ pet, onCancel, onSave }) {


    return (
        <Modal isOpen={true} onRequestClose={onCancel}>
            <h2>New Pet</h2>
            <PetForm pet={pet} onSave={onSave} onCancel={onCancel} />
        </Modal>
    )
}
