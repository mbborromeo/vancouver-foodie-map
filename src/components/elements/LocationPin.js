// import { Icon } from '@iconify/react';
// import locationIcon from '@iconify/icons-mdi/map-marker';
import styled from 'styled-components';

const LocationPin = ({ text }) => (
  <Root>
    {/* <Icon icon={ locationIcon } className="pin-icon" /> */}
    <div style={{ width: '80px', height: '80px', border: '5px solid gold', }}></div>
    <p className="pin-text">{ text }</p>
  </Root>
);

export default LocationPin;

const Root = styled.div`
  display: flex;
  align-items: center;
  width: 180px;
  color: var(--main-blue);

  div {
    border-radius: 50%;
  }

  .pin-icon {
    font-size: 4rem;
  }

  .pin-text {
    font-size: 1.3em;
  }
`;
