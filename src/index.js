import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import './index.css';
import NewPetModal from './NewPetModal';
import EditPetModal from './EditPetModal';
import Pet from "./Pet.js";
import { listPets, createPet, updatePet, deletePet } from './api.js'

const App = () => {
  const [pets, setPets] = useState([]);
  const [isNewPetOpen, setNewPetOpen] = useState(false);
  const [currentPet, setCurrentPet] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    listPets()
      .then(pets => setPets(pets))
      .finally(() => setLoading(false))

    // async function getData(params) {
    //   setLoading(true)
    //   try {
    //     const res = await fetch("http://localhost:3001/pets")
    //     const pets = await res.json()
    //     setPets(pets)
    //     setLoading(false)
    //   } catch (error) {
    //     setLoading(false)
    //   }
    // }

    // getData()

  }, [])

  const addPet = async (pet) => {
    return createPet(pet)
      .then(newPet => {
        setPets([
          ...pets,
          newPet
        ])
        setNewPetOpen(false)
      })
  }

  const savePet = async (pet) => {
    return updatePet(pet).then(updatedPet => {
      setPets(pets =>
        pets.map(pet =>
          pet.id === updatedPet.id ? updatedPet : pet
        ))
      setCurrentPet(null)
    })
  }

  const removePet = (byePet) => {
    const result = window.confirm(`Are you sure you want to adopt ${byePet.name}?`)
    if (result) {
      deletePet(byePet).then(() => {
        setPets(pets =>
          pets.filter(pet => pet.id !== byePet.id)
        )
      })
    }
  }

  return (
    <main>
      <h1>Adopt-a-Pet</h1>
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <ul>
            {pets.map(pet => (
              <li key={pet.id}>
                <Pet
                  onEdit={() => setCurrentPet(pet)}
                  pet={pet}
                  onRemove={() => removePet(pet)}
                />
              </li>
            ))}
          </ul>
          <button onClick={() => setNewPetOpen(true)}>Add a Pet</button>
        </>
      )}
      {isNewPetOpen && (<NewPetModal onSave={addPet} onCancel={() => setNewPetOpen(false)} ></NewPetModal>)}
      {currentPet && (
        <EditPetModal
          pet={currentPet}
          onCancel={() => setCurrentPet(null)}
          onSave={savePet}
        />
      )}
    </main>
  );
};

const el = document.querySelector('#root')
Modal.setAppElement(el)

ReactDOM.render(
  <App />, el
);