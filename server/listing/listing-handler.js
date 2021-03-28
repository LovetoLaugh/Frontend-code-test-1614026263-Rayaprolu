const {check, validationResult} = require('express-validator');
const listingFilter = require('./listing-filter');
const {fields, data: listings} = require('./listings.json');

const exists = (value) => value != null;
const validators = [
    check('offset', 'Offset must be an integer >= 0').if(exists).isInt({min: 0}),
    check('limit', 'Limit must be an integer >= 0').if(exists).isInt({min: 0}),
    check('bathrooms', 'Bathrooms must be an integer >= 0').if(exists).isInt({min: 0}),
    check('bedrooms', 'Bedrooms must be an integer >= 0').if(exists).isInt({min: 0}),
    check('price', 'Price must be >= 0').if(exists).isFloat({min: 0}),
];

const validate = async (req) => {
    await Promise.all(validators.map((validator) => validator.run(req)));
    return validationResult(req).array().map(({msg}) => msg);
};

module.exports = async (req, res) => {
    const errors = await validate(req);
    if (errors.length) {
        return res.status(400).send({errors});
    }

    const {query} = req;
    const data = listingFilter(listings, {offset: 0, limit: 10, ...query});
    res.status(200).send({
        fields,
        data,
        offset: Number.parseInt(query.offset || 0),
        limit: Number.parseInt(query.limit || 10),
        count: data.length,
        total: listings.length,
    });
};

