import React, { useEffect, useState } from 'react';
import { fetchCharacters } from '../../services/characters';
import CharactersList from '../../components/CharactersList';
import Controls from './Controls';

export default function Characters() {
  const [characterData, setcharacterData] = useState([]);
  const [search, setSearch] = useState([]);
  const [race, setRace] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCharacters(race);
      setcharacterData(data);
    };
    fetchData();
  }, [race]);

  const handleClick = async () => {
    const characterData = await fetchCharacters(race, search);
    setcharacterData(characterData);
  };
  return (
    <div>
      <p>Characters</p>
      <Controls {...{ search, setSearch, race, setRace, handleClick }} />
      <CharactersList characters={characterData} />
    </div>
  );
}
