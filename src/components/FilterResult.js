import CountryProfile from "./CountryProfile";

const FilterResult = ({
  countryData,
  filterQuery,
  isLoading,
  isClicked,
  handleSelected,
}) => {
  countryData =
    countryData.length <= 1
      ? countryData
      : countryData
          .filter((countryName) =>
            new RegExp(`(^(${filterQuery})| ${filterQuery})`, "gi").test(
              countryName.name.common
            )
          )
          .sort((a, b) => a.name.common.localeCompare(b.name.common));

  const length = countryData.length;

  return (
    <div>
      {length > 15 ? (
        <p>Too many to display. Please narrow your search</p>
      ) : length > 1 && !isClicked ? (
        countryData.map((country, i) => (
          <p className='link' key={i} onClick={handleSelected(country)}>
            {country.name.common}
          </p>
        ))
      ) : length === 1 ? (
        <CountryProfile data={countryData} />
      ) : !isLoading ? (
        <p>No match</p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FilterResult;
