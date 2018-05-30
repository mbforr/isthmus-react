import { Widget } from '@carto/airship';

export default Widget.extend`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  width: 350px;
  @media(max-width: 600px){
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    height: 285px;
    flex-basis: 300px;
    flex-grow: 0;
    flex-shrink: 0;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
  }
`;
