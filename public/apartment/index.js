import React, { useState, useEffect } from "react";
import ApartmentFilter from "./apartment-filter";
import ApartmentList from "./apartment-list";
import apartmentSvc from "../services/apartments";
import { errorHandler } from "../util/error-handler";
import initialState from "../config/store";
import Notification from "../components/Notification/Notification";

import "./apartment.css";

function Apartment() {
  const {
    loading: initLoading,
    apartmentsList: initApartmentsList,
    error: initError,
  } = initialState;

  const [apartments, setApartments] = useState(initApartmentsList);
  const [loading, setLoading] = useState(initLoading);
  const [error, setError] = useState(initError);

  /**
   * convert 2D array to Object
   * @param {Object} resp
   * @returns Array
   */
  const massageData = (resp, f1, f2) => {
    let finaldata = [];
    resp[f2].forEach((ap) => {
      let obj = {};
      resp[f1].forEach((field, index) => {
        obj[field] = ap[index];
      });
      finaldata.push(obj);
    });

    return finaldata;
  };

  /**
   * handle failure scenario
   * @param {Object} err Errro Object
   */
  const failurehandler = (err) => {
    errorHandler(err);
    setError({ type: "error", msg: err.message });
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      let finaldata = [];
      try {
        const resp = await apartmentSvc.getApartments();
        if (!resp.errors) {
          finaldata = massageData(resp, "fields", "data");
        } else {
          setError({ type: "error", msg: resp.errors.join(", ") });
        }
      } catch (err) {
        failurehandler(err);
      }
      setApartments(finaldata);

      setLoading(false);
    })();
  }, []);

  /**
   * event handler for form submit
   * @param {Object} filterParms 
   */
  const handleFilter = async (filterParms) => {
    setLoading(true);
    let finaldata = [];

    try {
      const resp = await apartmentSvc.getApartments(filterParms);
      if (!resp.errors) {
        finaldata = massageData(resp, "fields", "data");
      } else {
        setError({ type: "error", msg: resp.errors.join(", ") });
      }
    } catch (err) {
      failurehandler(err);
    }

    setApartments(finaldata);
    setLoading(false);
  };

  return (
    <div>
      <div className="border pt-5 pl-5 pr-5 pb-3 mb-2">
        <ApartmentFilter
          loading={loading}
          onFilter={handleFilter}
          onReset={handleFilter}
        />
      </div>

      {error && <Notification type={error.type} msg={error.msg} />}

      <ApartmentList list={apartments} loading={loading} />
    </div>
  );
}

export default Apartment;
