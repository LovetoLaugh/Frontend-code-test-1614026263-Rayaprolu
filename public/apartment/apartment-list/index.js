import Card from "../../components/Card";
import Spinner from "../../components/Spinner";
import PropTypes from "prop-types";
import "./apartment-list.css";

function ApartmentList({ list, loading }) {
  const noDataComp = <div>No Data to show</div>;

  return (
    <div>
      <div className="results-count">{list.length} results found</div>
      <div className="grid">
        {loading && <Spinner />}
        {!loading && list.length > 0
          ? list.map((apartment, i) => <Card key={i} data={apartment} />)
          : noDataComp}
      </div>
    </div>
  );
}

ApartmentList.defaultProps = {
  list: [],
  loading: false,
};

ApartmentList.proptyes = {
  list: PropTypes.array.isRequired,
  loading: PropTypes.bool,
};

export default ApartmentList;
