import React, {Component} from 'react'
import mapboxgl from 'mapbox-gl'
import axios from 'axios'

class Map extends Component {
  async componentDidMount() {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiZmVyZ2VlMzIiLCJhIjoiY2pveWxjczF1MmtsejNycm55cGIzeDV0aiJ9.FOLWH9mDuRmvEVrqgLY9WQ'

    const {data} = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        this.props.location
      )}.json?access_token=${mapboxgl.accessToken}`
    )

    const pos = data.features[0].geometry.coordinates

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      center: pos,
      zoom: 14,
      style: 'mapbox://styles/mapbox/streets-v10'
    })

    new mapboxgl.Marker().setLngLat(pos).addTo(map)
  }

  render() {
    // return <div id="map" style={{width: '100%', height: '300px'}} />
    return (
      <div
        ref={el => (this.mapContainer = el)}
        className="map"
        style={{width: '100%', height: '300px'}}
      />
    )
  }
}

export default Map
