import './App.css'
import { MapProvider } from './components/MapContainer/Map'
import { MapContainer } from './components/MapContainer/MapContainer'

function App() {
  

  return (
    <>
      <MapProvider>
        <MapContainer/>
      </MapProvider>
    </>
  )
}

export default App
