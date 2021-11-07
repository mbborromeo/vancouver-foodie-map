
const Point = (props) => {
  const { lat, lng, index } = props; /* , point, isActive, handleClick, */
  const { label } = props.point;

  return (
    <div
      lat={lat}
      lng={lng}
      // isActive={isActive}
      // onClick={() => handleClick(point)}
      index={index}
    >
      <div>
        <p className="body3 bold">{label}</p>
      </div>
      
      <h6>{index + 1}</h6>
    </div>
  );
};

export default Point;