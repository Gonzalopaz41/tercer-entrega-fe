import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    let mounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          if (mounted) setData(null);
          if (response.status === 404) {
            if (mounted) setError({ message: 'No se encontraron resultados', status: 404 });
            return;
          }
          if (mounted) setError({ message: `Error HTTP ${response.status}`, status: response.status });
          return;
        }

        const result = await response.json();
        if (mounted) setData(result);
      } catch (err) {
        if (mounted) {
          setData(null);
          setError({ message: err.message || 'Error de conexión', status: null });
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();

    return () => { mounted = false; };
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
