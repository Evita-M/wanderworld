export const getCountriesNames = (
  countryCodes: string[],
  countries: { id: string; label: string }[]
): string => {
  return countryCodes
    .map((countryCode) => {
      const country = countries.find((country) => country.id === countryCode);
      return country ? country.label : null;
    })
    .join(', ');
};
