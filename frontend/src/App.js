// eslint-disable-next-line
import React, { useEffect } from "react";
import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

import { listTravelHistories } from "./API";
import EnterTravelHistory from "./EnterTravelHistory";

require("dotenv").config();

function App() {
  // eslint-disable-next-line
  const [travelHistories, setTravelHistories] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 23.259933,
    longitude: 77.412613,
    zoom: 4,
  });

  const getEntries = async () => {
    const travelHistories = await listTravelHistories();
    setTravelHistories(travelHistories);
  };

  useEffect(() => {
    
    getEntries();
  }, []);

  const showAddingMarkerPopup = (event) => {
    const [longitude, latitude] = event.lngLat;

    setAddEntryLocation({
      
      longitude,
      latitude,
    });
  };

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/prateekp99/ckfhxw2vk08jt19med49panjv"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      onDblClick={showAddingMarkerPopup}
    >
      {travelHistories.map((entry) => (
        <React.Fragment key={entry._id}>
          <Marker latitude={entry.latitude} longitude={entry.longitude}>
            

            <div
              onClick={() =>
                setShowPopup({
                  showPopup,
                  [entry._id]: true,
                })
              }
            >
              <img
                className="marker"
                style={{
                  height: `${6 * viewport.zoom}px`,
                  width: `${6 * viewport.zoom}px`,
                }}
                src="https://i.ibb.co/zRbhLHm/pointer.png"
                alt="marker"
              />
            </div>
          </Marker>
          {showPopup[entry._id] ? (
            <Popup
              latitude={entry.latitude}
              longitude={entry.longitude}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              onClose={() => setShowPopup({})}
              anchor="top"
            >
              <div className="popup">
                <h3>{entry.title}</h3>
                <p>{entry.description}</p>
                <small>
                  Visited On: {new Date(entry.visitDate).toLocaleDateString()}
                </small>
              </div>
            </Popup>
          ) : null}
        </React.Fragment>
      ))}

      {addEntryLocation ? (
        <>
          <Marker
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
          >
            

            <div>
              <img
                className="marker"
                style={{
                  height: `${6 * viewport.zoom}px`,
                  width: `${6 * viewport.zoom}px`,
                }}
                src="https://i.ibb.co/NZs4nj2/g-pointer.png"
                alt="marker"
              />
            </div>
          </Marker>
          <Popup
            longitude={addEntryLocation.longitude}
            latitude={addEntryLocation.latitude}
            
            closeButton={true}
            closeOnClick={false}
            dynamicPosition={true}
            onClose={() => setAddEntryLocation(null)}
            anchor="top"
          >
            <div className="popup">
              <EnterTravelHistory
                onClose={() => {
                  setAddEntryLocation(null);
                 // getEntries();
                }}
                location={addEntryLocation}
              />
            </div>
          </Popup>
        </>
      ) : null}
    </ReactMapGL>
  );
}

export default App;
