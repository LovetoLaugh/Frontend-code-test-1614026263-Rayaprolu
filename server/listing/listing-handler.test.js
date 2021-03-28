const listingHandler = require('./listing-handler.js');
const {data: listings} = require('./listings.json');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe('listing-handler', () => {
    it('responds with a 200 when sent an empty query', async (done) => {
        const response = mockResponse();
        await listingHandler({query: {}}, response);
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.send).toHaveBeenCalled();

        done();
    });

    it('responds with a 200 when sent a valid query', async (done) => {
        const response = mockResponse();
        await listingHandler({query: {bedrooms: 1, bathrooms: 1, price: 2000}}, response);
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.send).toHaveBeenCalled();

        done()
    });

    it('responds with a 400 when sent an invalid query', async (done) => {
        const response = mockResponse();
        await listingHandler({query: {bedrooms: -1, bathrooms: 'a', price: {x:'x'}}}, response);
        expect(response.status).toHaveBeenCalledWith(400);
        const [[body]] = response.send.mock.calls;
        expect('errors' in body);

        done();
    });

    it('returns the correct fields', async (done) => {
        const response = mockResponse();
        await listingHandler({query: {}}, response);

        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.send).toHaveBeenCalled();

        const [[body]] = response.send.mock.calls;
        const returnedProperties = Object.keys(body);
        expect(returnedProperties).toEqual(['fields', 'data', 'offset', 'limit', 'count', 'total']);
        expect(body.offset).toBe(0);
        expect(body.limit).toBe(10);
        expect(body.total).toBe(listings.length)

        done();
    })
});
