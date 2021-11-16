import styled from 'styled-components';

const NearbyAttractions = (props) => {
  const {
    activeCategory,
    activePoint,
    handleMenu,
    menuOpen,
    handleCategorySelection,
    handlePointSelect,
    mapPoints,
  } = props;

  return (
    <Root>
      <TitleContainer onClick={() => handleMenu(!menuOpen)} menuOpen={menuOpen}>
        <p className="body2">Select A Category</p>
        <p className="bold">{activeCategory}</p>
      </TitleContainer>

      <DropdownContainer isOpen={menuOpen} activeCategory={activeCategory}>
        { Object.keys( mapPoints ).map( (category, index) => (
            <Category
              key={ index }
              isActive={ category === activeCategory }
              onClick={ () => handleCategorySelection(category) }
            >
              <h6>{category}</h6>
            </Category>
          )
        )}
      </DropdownContainer>

      <ol>
        { mapPoints[ activeCategory ] && mapPoints[ activeCategory ].length > 0 &&
          mapPoints[ activeCategory ].map( (location, index) => (
            <ListItem 
              onClick={() => handlePointSelect(location)}
              key={index}
              isActive={activePoint === location}
            >
              { location.label }
            </ListItem>
          ))
        }
      </ol>
    </Root>
  );
};

export default NearbyAttractions;

const Root = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 20%;
  height: auto;
  border: 1px solid green;
`;

const ListItem = styled.li`
  font-weight: ${ (props) => (props.isActive ? 'bold' : 'normal') };
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 68px;
  background-color: lightgrey;
  padding-top: 12px;
  padding-left: 16px;
  padding-bottom: 12px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  &::after {
    content: 'V';
    position: absolute;
    right: 16px;
    bottom: 16px;
    height: 16px;
    width: 16px;
    /* background-image: url( ${require('../../assets/images/icons/chevron.svg')} ); */
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    transform: ${ (props) => (props.menuOpen ? 'rotate(180deg)' : 'rotate(0)') };
    transition: transform 0.3s ease;
  }

  p {
    &.bold {
      font-family: sans-serif;
      font-style: normal;
      font-stretch: normal;
      font-weight: bold;
      font-size: 16px;
      letter-spacing: normal;
      line-height: 1.5;
    }

    &.body2 {
      padding: 0;
      margin: 0;
    }
  }
`;

const DropdownContainer = styled.div`
  width: 100%;
  box-shadow: ${(props) => props.isOpen && '0 3px 8px 0 rgba(0, 0, 0, 0.1);'}; /* 0 2px 15px 0 rgba(0, 0, 0, 0.04), 0 5px 12px 0 rgba(0, 0, 0, 0.03); */
  transition: height 0.3s ease;
  position: absolute;
  top: 85px;
  z-index: 2;
  height: ${(props) => (props.isOpen ? '100vh' : 0)};
  overflow: hidden;
`;

const Category = styled.div`
  height: fit-content;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 24px;
  background-color: blue;
  border-bottom: 1px solid teal; 
  cursor: ${(props) => (props.isActive ? 'default' : 'pointer')};
  pointer-events: ${(props) => (props.isActive ? 'none' : 'auto')};

  h6 {
    font-family: 'stratos-medium', 'stratos', sans-serif;
    font-style: normal;
    font-stretch: normal;
    font-weight: bold;
    font-size: 16px;
    letter-spacing: 0.56;
    transition: color 0.3s ease;
    line-height: 1;
    color: ${(props) => props.isActive ? 'yellow' : 'white'};
  }

  &:hover {
    h6 {
      color: yellow;
    }
  }
`;
