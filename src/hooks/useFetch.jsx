import { useState, useEffect } from "react";

// API fetch hook
export default function useApi(url) {
  const [data, setData] = useState([]);
  const [tag, setTag] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setIsError(false);
        const fetchedData = await fetch(url);
        const json = await fetchedData.json();
        setData(json);
        if (json.data.tags) {
          setTag(json.data.tags[0]);
        }
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [url]);
  return { data, tag, isLoading, isError };
}
