import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";

export default function useApiDataFetch(initialUrl, initalQuery) {
  const [data, setData] = useState(null);
  const [url, setUrl] = useState(initialUrl);
  const [query, setQuery] = useState(initalQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const buildApiRequest = (url, query) => {
    console.log(query);
    setUrl(url);
    query && setQuery(query);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        console.log(url);
        const result = await axios(url, {
          params: {
            start_date: format(query.startDate, "yyyy-MM-dd"),
            end_date: format(query.endDate, "yyyy-MM-dd")
          }
        });
        console.log(result);
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url, query]);

  return [{ data, isLoading, isError }, buildApiRequest];
}
