import "./styles.css";
import { FaBed, FaBath, FaDollarSign, FaMapMarkerAlt } from "react-icons/fa";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardFooter,
} from "reactstrap";

function CardItem({ data }) {
  return (
    <Card>
      <CardImg
        top
        src={`./img/${data.image_id}.jpg`}
        alt={data.building_name}
      />
      <CardBody>
        <CardTitle tag="h5">{data.building_name}</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          <FaMapMarkerAlt /> {data.address}, {data.city}, {data.state}
        </CardSubtitle>
        <CardText></CardText>
      </CardBody>
      <CardFooter>
        <div className="w-25 d-inline-block">
          <FaBed title="bed rooms"/> {data.bedrooms}
        </div>
        <div className="w-25 d-inline-block">
          <FaBath title="bath rooms"/> {data.bathrooms}
        </div>
        <div className="w-25 d-inline-block">
          <FaDollarSign title="price"/> {data.price}
        </div>
      </CardFooter>
    </Card>
  );
}

export default CardItem;
