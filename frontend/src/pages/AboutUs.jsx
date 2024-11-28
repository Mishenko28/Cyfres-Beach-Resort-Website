import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"

export default function AboutUs() {


    return (
        <div className="about-us">
            <div className="about-us-cont">
                <h1>Contact us:</h1>
                <h2>Phone: 0912 3456 789</h2>
                <h2>Email: cyfresbeachresort@gmail.com</h2>
                <h3>We are locatesd at 40 Baloy Long Beach Rd, Olongapo, 2200 Zambales</h3>
            </div>
            <div className="map-cont">
                <MapContainer
                    center={[14.848557622998818, 120.25367986336242]}
                    zoom={25}
                    style={{ height: "100%", width: "100%" }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />

                    <Marker position={[14.848557622998818, 120.25367986336242]}>
                        <Popup>Cyfres Beach Resort</Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    )
}