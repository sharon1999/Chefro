import { useState } from "react";

export default function useFetch(action) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const fn = async (...args) => {
    setLoading(true);
    try {
      const result = await action(...args);
      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, fn };
}
