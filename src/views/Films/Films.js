import React, { useEffect, useState } from 'react';
import FilmList from '../../components/FilmList';
import { fetchFilms } from '../../services/films';

export default function Films() {
  const [filmData, setfilmData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchFilms();
      setfilmData(data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <p>Films</p>
      <FilmList films={filmData} />
    </div>
  );
}
