
import styled from 'styled-components';

const Point = (props) => {
  const { lat, lng, index, isActive, point, handleClick } = props;
  const { label } = props.point;

  return (
    <div
      lat={lat}
      lng={lng}
      isActive={isActive}
      onClick={() => handleClick(point)}
      index={index}
    >
      <Label isActive={isActive}>
        <p className="body3 bold">{label}</p>
      </Label>
      
      <Index isActive={isActive}>{index + 1}</Index>
    </div>
  );
};

export default Point;

const Label = styled.div`
  opacity: ${ (props) => (props.isActive ? 1 : 0) };
`;

const Index = styled.h6`
  color: ${ (props) => (props.isActive ? 'blue' : 'grey') };
`;
