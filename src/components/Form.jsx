import { useEffect, useState } from "react";
import fetcher from "../services/fetcher";

const initFormData = { title: "", year: "", plot: "", category: "" };

const Form = ({ show, setShow, setMovies }) => {
  const [data, setData] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState(initFormData);

  const onChangeHandler = (e) => {
    setFormData((curr) => {
      return { ...curr, [e.target.id]: e.target.value };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    fetcher(
      formData.title,
      formData.year,
      formData.plot,
      setData,
      setError,
      setLoading,
      setSubmitting
    );
  };

  useEffect(() => {
    if (!error && !loading) {
      setMovies((curr) => {
        return curr.concat([data]);
      });

      setFormData(() => initFormData);

      setShow(false);
    }

    if (error && !loading) {
      setFormData(() => initFormData);

      setShow(false);

      alert("No movie found!");
    }
  }, [data, loading, loading, submitting]);

  if (!show) return <> </>;

  return (
    <div className="form-wrapper">
      <form onSubmit={onSubmit} className="form-container">
        <div>
          <div className="input-container">
            <label htmlFor="title">Заглавие</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Some movie"
              autoComplete="off"
              required
              value={formData.title}
              onChange={onChangeHandler}
            />
          </div>
        </div>
        <div>
          <div className="input-container">
            <label htmlFor="year">Година</label>
            <input
              type="text"
              id="year"
              name="year"
              placeholder="Some year"
              required
              value={formData.year}
              onChange={onChangeHandler}
            />
          </div>
        </div>
        <div>
          <div className="input-container">
            <label htmlFor="plot">Сюжет</label>
            <select
              id="plot"
              placeholder="Short"
              required
              value={formData.plot}
              onChange={onChangeHandler}
            >
              <option value="short">short</option>
              <option value="full">full</option>
            </select>
          </div>
        </div>
        <div>
          <div data-role="content" className="input-container">
            <label id="label-for-select" htmlFor="category">
              Категории
            </label>
            <select
              name="select-choice-1"
              id="category"
              value={formData.category}
              onChange={onChangeHandler}
            >
              <option value="">all</option>
              <option value="Drama">drama</option>
              <option value="Action">action</option>
              <option value="Adventure">adventure</option>
              <option value="Comedy">comedy</option>
              <option value="Horror">horror</option>
              <option value="Romance">romance</option>
            </select>
          </div>
        </div>
        <div>
          <button type="submit">Търси</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
