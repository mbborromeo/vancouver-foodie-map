import styled from 'styled-components';

const Point = (props) => {
  const { lat, lng, index, isActive, point, handleClick } = props;
  const { label, desc } = props.point;

  return (
    <Root
      lat={lat}
      lng={lng}
      isActive={isActive}
      onClick={() => handleClick(point)}
      index={index}
    >
      <Label isActive={isActive}>
        <p className="body3 bold">{label}</p>
        <span>{desc}</span>
      </Label>
      
      <Index isActive={isActive}>{index + 1}</Index>
    </Root>
  );
};

export default Point;


/* points of interest on map */
const Root = styled.div`
  border-radius: 50%; /* circle shape */
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  height: 20px;
  width: 20px;
  position: relative;
  z-index: ${(props) => (props.isActive ? 100 : 3)};
  background-color: ${(props) => (props.isActive ? 'sandybrown' : 'brown')};
`;

const Label = styled.div`
  opacity: ${ (props) => (props.isActive ? 1 : 0) };
  pointer-events: none;
  height: fit-content;
  width: fit-content;
  padding: 0 10px 14px;  
  font-size: 12px;
  text-align: center;
  background-color: sandybrown;
  color: black;
  position: absolute;
  left: 50%;
  top: -10px;
  transform: translate(-50%, -100%);
  transition: opacity 0.3s ease;
  min-width: 126px;
  z-index: 3;

  /* triangle down arrow */
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 100%;
    transform: translateX(-50%);
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid sandybrown;
  }

  p {
    font-weight: bold;
  }
`;

const Index = styled.h6`
  color: ${ (props) => props.isActive ? 'black' : 'lightyellow' }; 
  font-weight: normal;
  font-size: 14px;
  text-align: center;
`;
