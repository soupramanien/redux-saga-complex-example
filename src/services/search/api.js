// src/services/search/api.js
export const searchAddresses = async (query) => {
  const res = await fetch(
    "https://api-adresse.data.gouv.fr/search/?q=" + encodeURIComponent(query)
  );
  console.log(res.status);

  if (res.status !== 200) throw new Error();

  const { features } = await res.json();
  return features;
};
