import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import initialState from "../../config/store";

import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";

function ApartmentFilter({ onFilter, onReset, loading }) {
  const {
    price: initPrice,
    bathrooms: initBeds,
    bathrooms: initBaths,
    limit: initLimit,
  } = initialState.apartmentFilter;

  const [price, setPrice] = useState(initPrice);
  const [bedrooms, setBedrooms] = useState(initBeds);
  const [bathrooms, setBathrooms] = useState(initBaths);
  const [limit, setLimit] = useState(initLimit);

  /**
   * form submit handler for apartment filter
   * @param {Obj} evt
   */
  const submitHandler = (evt) => {
    evt.preventDefault();

    // do validation checks if any

    onFilter({
      price,
      bedrooms,
      bathrooms,
      limit,
    });
  };

  const resetForm = () => {
    // reset fields to its original values
    setPrice(initPrice);
    setBedrooms(initBeds);
    setBathrooms(initBaths);
    setLimit(initLimit);
  };

  const resetHandler = (evt) => {
    resetForm();
    onReset({
      price,
      bedrooms,
      bathrooms,
      limit,
    });
  };

  return (
    <div>
      <Form onSubmit={submitHandler} onReset={resetHandler} disabled={loading}>
        <Row form>
          <Col md={3}>
            <FormGroup>
              <Label for="price">Max Price:</Label>
              <Input
                type="number"
                id="price"
                placeholder="max price"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Label for="bedrooms">Min Bed rooms</Label>
              <Input
                id="bedrooms"
                type="number"
                placeholder="min beds"
                required
                min="0"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Label for="bathrooms">Min Bath rooms</Label>
              <Input
                id="bathrooms"
                type="number"
                required
                placeholder="min beds"
                min="0"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Label for="limit">Records limit:</Label>
              <Input
                id="limit"
                type="number"
                min="5"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>

        <Button type="submit" color="success">
          Filter
        </Button>
        <Button type="reset" color="danger">
          Reset
        </Button>
      </Form>
    </div>
  );
}

ApartmentFilter.defaultProps = {
  onFilter: () => {},
  onReset: () => {},
  loading: false,
};

ApartmentFilter.proptyes = {
  onFilter: PropTypes.func,
  onReset: PropTypes.func,
  loading: PropTypes.bool,
};

export default ApartmentFilter;
