
const NearbyAttractions = (props) => {
  const {
    activeCategory,
    // activePoint,
    // handleMenu,
    // menuOpen,
    handleCategorySelection,
    // handlePointSelect,
    mapPoints,
  } = props;

  return (
    <div>
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
            <li key={ index }>
              { location.label }
            </li>
          ))
        }
      </ol>
    </div>
  );
};

export default NearbyAttractions;
