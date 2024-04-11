import { useEffect, useState } from 'react';
import './App.css';

const useImageURL = () => {
  const [imageURL, setImageURL] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      fetch('https://jsonplaceholder.typicode.com/photos', { mode: 'cors' })
        .then((response) => {
          if (response.status >= 400) {
            throw new Error('server error');
          }
          return response.json();
        })
        .then((response) => setImageURL(response[0].url))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }, 1000);
  }, []);

  return { imageURL, error, loading };
};

function App() {
  const { imageURL, error, loading } = useImageURL();

  if (error) return <p>A network error was encountered</p>;
  if (loading) return <p>Loading...</p>;

  return (
    imageURL && (
      <>
        <h1>An image</h1>
        <img src={imageURL} alt={'placeholder text'} />
      </>
    )
  );
}

export default App;
