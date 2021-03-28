const listingFilter = require('./listing-filter.js');
const {data: listings} = require('./listings.json');

const baseQuery = {offset: 0, limit: 10}

describe('listing-filter', () => {
    it('handles empty parameters', () => {
        const response = listingFilter(listings, baseQuery);
        expect(response.length).toBe(10);
    });

    it('filters on # bathrooms', () => {
        const bathrooms = 3;
        const response = listingFilter(listings, {...baseQuery, bathrooms});
        expect(response.every(([, , baths]) => baths >= bathrooms)).toBe(true);
    });

    it('filters on # bedrooms', () => {
        const bedrooms = 2;
        const response = listingFilter(listings, {...baseQuery, bedrooms});
        expect(response.every(([beds]) => beds >= bedrooms)).toBe(true);
    });

    it('filters on max price', () => {
        const price = 2000;
        const response = listingFilter(listings, {...baseQuery, price});
        expect(response.every(([, listPrice]) => listPrice <= price)).toBe(true);
    });

    it('filters on all bedrooms, bathrooms and price', () => {
        const bathrooms = 3;
        const bedrooms = 2;
        const price = 3000;
        const response = listingFilter(listings, {...baseQuery, bathrooms, bedrooms, price});

        expect(
            response.every(([beds, listPrice, baths]) => (
                beds >= bedrooms
                && listPrice <= price
                && baths >= bathrooms
            ))
        ).toBe(true);
    });

    it('properly enforces the limit', () => {
        const limit = 5;
        const response = listingFilter(listings, {...baseQuery, limit});
        expect(response.length).toBe(limit);
    });

    it('properly enforces the offset', () => {
        const offset = 5;
        const response = listingFilter(listings, {...baseQuery, offset});
        expect(response[0]).toBe(listings[offset]);
    });

    it('properly enforces the offset and limit together', () => {
        const offset = 5;
        const limit = 5;
        const response = listingFilter(listings, {...baseQuery, offset, limit});
        expect(response[response.length -1]).toBe(listings[offset + limit -1]);
    });
});
