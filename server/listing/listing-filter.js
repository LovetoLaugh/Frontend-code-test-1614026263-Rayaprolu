module.exports = (listings, { offset, limit, bedrooms, bathrooms, price }) => listings
    .filter(([listingBeds, listingPrice, listingBaths]) => (bedrooms == null || listingBeds >= bedrooms)
        && (bathrooms == null || listingBaths >= bathrooms)
        && (price == null || listingPrice <= price))
    .slice(offset, Number.parseInt(offset) + Number.parseInt(limit));
