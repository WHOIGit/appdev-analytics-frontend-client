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
    setUrl(url);
    query && setQuery(query);
  };

  useEffect(() => {
    const setupParams = query => {
      const queryParams = {
        ...query,
        startDate: format(query.startDate, "yyyy-MM-dd"),
        endDate: format(query.endDate, "yyyy-MM-dd")
      };
      return queryParams;
    };

    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        console.log(url);
        const result = await axios(url, {
          params: setupParams(query)
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
