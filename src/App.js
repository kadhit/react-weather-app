import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import "./App.css";
import FilterResult from "./components/FilterResult";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");

  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const copyCountries = useRef([]);

  useEffect(() => {
    console.log("effect");
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        console.log(response.data);
        setIsLoading(false);
        copyCountries.current = response.data;
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  }, []);

  const handleFilterChange = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    setFilterQuery(event.target.value);
    setCountries(copyCountries.current);
    setIsClicked(false);
  };

  const handleSelected = (value) => () => {
    setCountries([value]);
    console.log("selected", [value]);
    setIsClicked(true);
  };

  return (
    <div className='App'>
      <div>
        <h1 style={{ marginBottom: "30px", fontSize: "32pt" }}>Weather App</h1>
        {!isLoading && !isError && (
          <div>
            <h3 className='search' style={{ marginBottom: "5px" }}>
              Search country here
            </h3>
            <input
              type='search'
              value={filterQuery}
              onChange={handleFilterChange}
              onFocus={handleFilterChange}
            />
          </div>
        )}
        {isLoading && !isError && <p>Now Loading...</p>}
        {isError && <p>Something went wrong</p>}
        {filterQuery && (
          <FilterResult
            countryData={countries}
            filterQuery={filterQuery}
            isLoading={isLoading}
            isClicked={isClicked}
            handleSelected={handleSelected}
          />
        )}
      </div>
    </div>
  );
};

export default App;
