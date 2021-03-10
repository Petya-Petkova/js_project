const fetcher = async (
  movie,
  year,
  plot,
  setData,
  setError,
  setLoading,
  setSubmitting
) => {
  var apiKey = "cc74a539";

  const url =
    "http://www.omdbapi.com/?t=" +
    movie +
    "&y=" +
    year +
    "&apiKey=" +
    apiKey +
    "&plot=" +
    plot;

  try {
    setSubmitting(true);
    setLoading(true);

    const response = await fetch(url, {
      method: "GET",
      dataType: "json",
    });
    if (response.ok) {
      const json = await response.json();

      if (json.Response === "False") {
        throw "No movie found";
      }

      setData(json);
      setError(false);
    } else {
      throw response;
    }
  } catch (e) {
    setError(e);
  } finally {
    setSubmitting(false);
    setLoading(false);
  }
};

export default fetcher;
