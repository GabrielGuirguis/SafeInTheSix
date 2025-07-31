import "./App.css";
import { MapProvider } from "./components/MapContainer/MapProvider";
import { MapContainer } from "./components/MapContainer/MapContainer";
import { SelectionModal } from "./components/UI/SideBar";
import { TopBar } from "./components/UI/TopBar";

function App() {
  return (
    <>
    <TopBar/>
      <div className="relative w-full h-screen pt-[50px]">
        <MapProvider>
          <div className="absolute inset-0 z-0">
            <MapContainer />
          </div>

          
          <SelectionModal />
          

        </MapProvider>
      </div>
    </>
  );
}

export default App;
