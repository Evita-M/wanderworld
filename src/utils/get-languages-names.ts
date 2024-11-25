export const getLanguagesNames = (
  langCodes: string[],
  languages: { id: string; label: string }[]
): string => {
  return langCodes
    .map((langCode) => {
      const language = languages.find((lang) => lang.id === langCode);
      return language ? language.label : langCode;
    })
    .join(', ');
};
