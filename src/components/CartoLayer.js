import { Component } from 'react';
import PropTypes from 'prop-types';
import carto from 'carto.js';
import { connect } from 'react-redux';
import { getTargetStore, setMap } from '../actions/mapsettings';

class CartoLayer extends Component {
  static contextTypes = {
    map: PropTypes.object,
  };

  static propTypes = {
    source: PropTypes.string,
    style: PropTypes.string,
    client: PropTypes.object,
    click: PropTypes.bool,
    hidden: PropTypes.bool,
    analyzedStore: PropTypes.number
  }

  constructor(props) {
    super(props);
    this.state = {
      ...props
    }

    const { hidden, source, style, click, analyzedStore } = props;

    const cartoSource = new carto.source.SQL(source);
    const cartoStyle = new carto.style.CartoCSS(style);

    this.popup = L.popup({ closeButton: false });

    this.layer = new carto.layer.Layer(cartoSource, cartoStyle);

    this.setVisibility(hidden)
    this.layerClick(click)
  }

  componentDidMount() {
    const { client } = this.props;
    client.addLayer(this.layer);
    client.getLeafletLayer().addTo(this.context.map)

    this.props.setMap(this.context.map);
  }

  shouldComponentUpdate(nextProps) {
    this.props.setMap(this.context.map);
    return nextProps.style !== this.props.style || nextProps.hidden !== this.props.hidden;
  }

  setVisibility = isHidden => {
    isHidden ? this.layer.hide() : this.layer.show();
  }

  getTarget = (target) => {
    target ? this.props.getTargetStore(target) : this.props.getTargetStore(0)
  }

  layerClick = click => {
    click ?
      this.layer.on(carto.layer.events.FEATURE_CLICKED, d => {
        this.getTarget(d.data.cartodb_id)
      }).setFeatureClickColumns(['nearest_city', 'cartodb_id'])
    :
    console.log('SET FALSE', this.layer)
  }

  //create a func that like above takes a value and gets

  render() {

    const { hidden, style, click, analyzedStore } = this.props;

    const layerStyle = this.layer.getStyle();

    layerStyle.setContent(style).then(() => this.setVisibility(hidden));

    return null;
  }
}

const mapStateToProps = (state, props) => ({
  stores: state.mapsettings.stores,
  map: state.mapsettings.map
});

const mapDispatchToProps = (dispatch) => ({
    getTargetStore: (item) => dispatch(getTargetStore(item)),
    setMap: (map) => dispatch(setMap(map))
})

export default connect(mapStateToProps, mapDispatchToProps)(CartoLayer);
