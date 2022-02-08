import React, { useState, useEffect } from 'react';
import './style/RickAndMorty.css';

const RickAndMorty = () => {
  const [characters, setCharacters] = useState([]); //itera el array de objetos
  const [character, setCharacter] = useState(''); // obtiene el valor (por id) del personaje
  const [characterSelected, setCharacterSelected] = useState({}); //devuelve el valor de un personaje
  const [loading, setLoading] = useState(false);
  // const [state, setState] = useState({
  //   characters: [],
  //   character: '',
  //   characterSelected: {},
  // });

  useEffect(() => {
    apiFetch();
  }, []);

  useEffect(() => {
    showUpCharacter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character]);

  const apiFetch = async () => {
    setLoading(true);
    const api = await fetch('https://rickandmortyapi.com/api/character');
    const res = await api.json();
    setLoading(false);
    setCharacters(res.results);
    // setState({...state, characters: res.results});
  };

  const showUpCharacter = async () => {
    if (characterSelected !== '') {
      setLoading(true);
      const api = await fetch(
        `https://rickandmortyapi.com/api/character/${character}`
      );
      const res = await api.json();
      setLoading(false);
      setCharacterSelected(res);
    }
  };

  return (
    <div className='cardContainer'>
      <h2>Rick and Morty App</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <select
          value={character}
          onChange={(e) => setCharacter(e.target.value)}>
          <option value=''>- Select character -</option>
          {characters.map((character) => (
            <option value={character.id} key={character.id}>
              {character.name}
            </option>
          ))}
        </select>
      )}
      <div>
        {characterSelected?.name ? (
          <div className='targetContainer'>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <img
                  src={characterSelected.image}
                  alt={characterSelected.name}
                />
                <div className='targetText'>
                  <h3>{characterSelected.name}</h3>
                  <p>
                    species: <b>{characterSelected.species}</b>
                  </p>
                  <p>
                    status: <b>{characterSelected.status}</b>
                  </p>
                </div>
              </>
            )}
          </div>
        ) : (
          <p>Seleccione un personaje</p>
        )}
      </div>
    </div>
  );
};

export default RickAndMorty;