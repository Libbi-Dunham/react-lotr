import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import CharactersList from './views/Characters/CharactersList';
import FilmList from './views/Films/FilmList';
import BookList from './views/Books/BookList';

function App() {
  const [films, setFilms] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getFilms();
    getCharacters();
    // getBooks();
  }, []);

  const getFilms = async () => {
    const response = await fetch(`${process.env.REACT_APP_SUPABASE_URL}/rest/v1/films`, {
      headers: {
        apikey: process.env.REACT_APP_SUPABASE_KEY,
        Authorization: `Bearer ${process.env.REACT_APP_SUPABASE_KEY}`,
      },
    });

    const data = await response.json();
    const filmData = data.map((film) => [
      film.item,
      film.title.toLowerCase().replace(/ /g, '-'),
      film.box_office_total,
      film.academy_award_nominations,
    ]);
    setFilms(filmData);
    return [FilmList];
  };

  const getCharacters = async () => {
    const response = await fetch(`${process.env.REACT_APP_SUPABASE_KEY}/rest/v1/characters`, {
      headers: {
        apikey: process.env.REACT_APP_SUPABASE_KEY,
        Authorization: `Bearer ${process.env.REACT_APP_SUPABASE_KEY}`,
      },
    });
    const data = await response.json();
    const characterData = data.map((character) => ({
      name: character.name,
      birth: character.birth,
      death: character.death,
      dates:
        character.dates === character.death ? 'Unknown' : `${character.birth} - ${character.death}`,
    }));

    setCharacters(characterData);
    return [CharactersList];
  };

  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <NavLink to="/" data-testid="home">
            Home
          </NavLink>
          <NavLink to="/films" data-testid="film-link">
            Films
          </NavLink>
          <NavLink to="/characters" data-testid="char-link">
            Characters
          </NavLink>
          <NavLink to="/books" data-testid="book-link">
            Books
          </NavLink>
        </header>
        <Switch>
          <Route exact path="/"></Route>
          <Route path="/films">
            <FilmList films={films} setFilms={setFilms} />
          </Route>
          <Route path="/characters">
            <CharactersList characters={characters} setCharacters={setCharacters} />
          </Route>
          <Route path="/books">
            <BookList books={books} setBooks={setBooks} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
