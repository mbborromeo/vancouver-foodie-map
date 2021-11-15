import styled from 'styled-components';

const NearbyAttractions = (props) => {
  const {
    activeCategory,
    activePoint,
    // handleMenu,
    // menuOpen,
    // handleCategorySelection,
    handlePointSelect,
    mapPoints,
  } = props;

  return (
    <Root>
      { Object.keys( mapPoints ).map( (category, index) => (
            <h6 key={ index }>
              { category }
            </h6>
          )
        )
      }

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