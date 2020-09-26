// eslint-disable-next-line
import React, { useEffect } from "react";
import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

import { listTravelHistories } from "./API";

require("dotenv").config();

function App() {
  const [travelHistories, setTravelHistories] = useState([]);
  const [showPopup, setShowPopup] = useState({});

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 23.259933,
    longitude: 77.412613,
    zoom: 4,
  });

  useEffect(() => {
    (async () => {
      const travelHistories = await listTravelHistories();
      setTravelHistories(travelHistories);
    })();
  }, []);

  const showAddingMarkerPopup = (event) => {
    console.log(event);
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
        <>
          <Marker
            key={entry._id}
            latitude={entry.latitude}
            longitude={entry.longitude}
          >
            {/* <div>{entry.title}</div> */}

            <div
              onClick={() =>
                setShowPopup({
                  showPopup,
                  [entry._id]: true,
                })
              }
            >
              <img
                class="marker"
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
              dynamicPosition={false}
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
        </>
      ))}
    </ReactMapGL>
  );
}

export default App;
