import { useState, useEffect } from "react";

const useFetchCatImage = (apiKey) => {
  const [item, setItem] = useState([]);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);

  useEffect(() => {
    fetch("https://api.thecatapi.com/v1/images/search?mime_types=gif&?size=small&?limit=1", {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setItem(json);
        setDataIsLoaded(true);
      });
  }, [apiKey]);

  return { item, dataIsLoaded };
};

export default useFetchCatImage;
