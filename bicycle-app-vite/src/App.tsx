import { Map, MapMarker } from "react-kakao-maps-sdk"


const pstList  = [
  { lat: 33.55635, lng: 126.795841, info:"여긴 강남이 아닙니다." },
  { lat: 33.45635, lng: 126.795841, info:"여긴 커피를 팔지 않습니다" },
  { lat: 33.35635, lng: 126.795841, info:"메가커피 환영!" }
]

function App() {

  return (
    <>
      <Map
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{ width: "100%", height: "360px" }}
      >
        {
          pstList.map((pst)=>{
            return <MapMarker key={pst.lat+pst.lng} position={pst} onClick={()=>{
              console.log(pst.info);
            }}></MapMarker>
          })
        }
      </Map>
    </>
  )
}

export default App
