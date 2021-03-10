import { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Header from "./components/Header";
import Movies from "./components/Movies";
import Search from "./components/Search";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [movies, setMovies] = useState([]);

  const onClickSearchHandler = () => {
    setShowForm((curr) => !curr);
  };

  return (
    <div>
      <Header />

      <Search onClick={onClickSearchHandler} />

      <Movies movies={movies} setMovies={setMovies} />

      <Form show={showForm} setShow={setShowForm} setMovies={setMovies} />
    </div>
  );
}

export default App;
