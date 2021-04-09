export const filterProperties = (filterAttributes, itemAttributes) => {
  if (
    filterAttributes.minPrice !== "No Min" &&
    filterAttributes.minPrice > itemAttributes.price
  ) {
    return false;
  }

  if (
    filterAttributes.maxPrice !== "No Max" &&
    filterAttributes.maxPrice < itemAttributes.price
  ) {
    return false;
  }

  if (
    filterAttributes.minBeds !== "No Min" &&
    filterAttributes.minBeds > itemAttributes.bedrooms
  ) {
    return false;
  }

  if (
    filterAttributes.minBeds !== "No Min" &&
    filterAttributes.minBeds > itemAttributes.bedrooms
  ) {
    return false;
  }

  if (
    filterAttributes.maxBeds !== "No Max" &&
    filterAttributes.maxBeds < itemAttributes.bedrooms
  ) {
    return false;
  }

  if (filterAttributes.firstFloorPrimary && !itemAttributes.firstFloorPrimary) {
    return false;
  }

  let hvacAge = new Date().getFullYear() - itemAttributes.hvacYear;
  if (filterAttributes.hvacAgeRange < hvacAge) {
    return false;
  }

  let waterHeaterAge =
    new Date().getFullYear() - itemAttributes.waterHeaterYear;
  if (filterAttributes.waterHeaterAgeRange < waterHeaterAge) {
    return false;
  }

  let pricePerSqft = Math.round(itemAttributes.price / itemAttributes.sqft);
  console.log(pricePerSqft, filterAttributes.priceSqftMin);
  if (
    filterAttributes.minPriceSqft !== "No Min" &&
    filterAttributes.minPriceSqft > pricePerSqft
  ) {
    return false;
  }

  if (
    filterAttributes.maxPriceSqft !== "No Max" &&
    filterAttributes.maxPriceSqft < pricePerSqft
  ) {
    return false;
  }

  return true;
};

export const getPrice = (price) => {
  return "$" + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
