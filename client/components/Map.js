import React, {Component} from 'react'
import mapboxgl from 'mapbox-gl'

class Map extends Component {
  componentDidMount() {
    const {location} = this.props
    mapboxgl.accessToken =
      'pk.eyJ1IjoiZmVyZ2VlMzIiLCJhIjoiY2pveWxjczF1MmtsejNycm55cGIzeDV0aiJ9.FOLWH9mDuRmvEVrqgLY9WQ'
    console.log('=====', mapboxgl.accessToken)
    console.log('=====', mapboxgl)

    const map = new mapboxgl.Map({
      container: 'map',
      center: [-87.6354, 41.8885],
      zoom: 12,
      style: 'mapbox://styles/mapbox/streets-v10'
    })

    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        searchInput: location
      })
    )
  }

  render() {
    return <div id="map" />
  }
}

export default Map
