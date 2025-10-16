import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit'
import cartSlice from '../feature/cart/cartSlice.js'
import productSlice from '../feature/Product/ProductSlice.js'
import authSlice from '../feature/auth/authSlice.js'

//액션 로깅 처리 담당 미들웨어
const myLoggerMiddlware = (store) => (next) => (action) => {
    console.log("dispatch::", action)
    const result = next(action);
    console.log("next action ::", store.getState());

    return result;
}

//장바구니 상태 저장 : 로컬 스토리지 저장
const myScartSaveMiddleware = (store) => (next) => (action) => {
    const result = next(action);

    //장바구니 (cartSlice) 경우에만 저장
    if(typeof action.type === "string" && action.type.startsWith("cart/")) { //store에 저장되어 있는 cart카가 가지고 있는 cartSlice를 가지고 옴
        const cart = store.getState().cart; //getState() 객체를 반환하는 함수
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    return result;
}


export const store = configureStore({
    reducer: {
        cart: cartSlice,
        product: productSlice,
        auth: authSlice
    },
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware()
//             .concat(myLoggerMiddlware)
//             .concat(myScartSaveMiddleware)
})




// export const Bicycleapi = () => {
//   // 1단계 결과를 저장할 State (네트워크 객체들의 배열)
//   const [krNetworks, setKrNetworks] = useState([]);
//
//   // 2단계 결과를 저장할 State (상세 데이터 배열)
//   const [detailedData, setDetailedData] = useState([]);
//
//   const [isLoading,setIsLoading] = useState(false);
// // --- 1단계: 네트워크 목록 가져오기 ---
//   useEffect(() => {
//     const fetchNetworks = async () => {
//         setIsLoading(true)
//       try {
//         const response = await axios.get('http://api.citybik.es/v2/networks');
//         const networks = response.data.networks;
//
//         // filter를 사용해 대한민국('KR') 네트워크 모두 가져오기 (결과는 배열)
//         const southKoreaNetworks = networks.filter(
//           (network) => network.location.country === 'KR'
//         );
//
//         if (southKoreaNetworks.length > 0) { // 👈 배열의 길이가 0보다 클 때만 실행
//           console.log('--- 1단계: 대한민국 네트워크 목록 ---');
//           console.log(`총 ${southKoreaNetworks.length}개의 네트워크를 찾았습니다.`);
//
//           // State에 네트워크 객체 배열 저장
//           setKrNetworks(southKoreaNetworks);
//
//           // 각 네트워크의 ID를 출력하는 코드는 잘하셨습니다!
//           southKoreaNetworks.map((item) => console.log("네트워크 ID:", item.id));
//
//         } else {
//           console.log('대한민국 자전거 공유 네트워크 데이터를 찾을 수 없습니다.');
//         }
//       } catch (error) {
//         console.error('API 호출 중 오류 발생:', error);
//       } finally{
//         setIsLoading(false)
//       }
//     };
//     fetchNetworks();
//   }, []); // 컴포넌트 마운트 시 한 번만 실행
//
//   // --- 2단계: 네트워크 목록을 기반으로 상세 데이터 가져오기 ---
//   // krNetworks 상태가 채워지면 (1단계가 완료되면) 이 훅이 실행됩니다.
//   useEffect(() => {
//     // krNetworks 배열에 데이터가 있을 때만 실행
//     if (krNetworks.length > 0) {
//       const fetchDetailedData = async () => {
//         // 1. 모든 상세 API 호출을 Promise 배열로 만듭니다.
//         const detailPromises = krNetworks.map(network =>
//           axios.get(`http://api.citybik.es/v2/networks/${network.id}`)
//         );
//
//         try {
//           // 2. Promise.all로 모든 요청이 완료될 때까지 기다립니다.
//           const detailResponses = await Promise.all(detailPromises);
//
//           // 3. 응답 배열에서 실제 네트워크 상세 데이터만 추출합니다.
//           const allDetailedData = detailResponses.map(res => res.data.network);
//
//           // State에 상세 데이터 배열 저장
//           setDetailedData(allDetailedData);
//
//           console.log('\n--- 2단계: 모든 네트워크의 상세 정류소 데이터 ---');
//           console.log(allDetailedData);
//
//           // 예시: 첫 번째 네트워크의 정류소 정보를 console에 출력
//           if (allDetailedData.length > 0) {
//               console.log(`\n--- [${allDetailedData[0].name}] 상세 정류소 목록 ---`);
//               console.log(allDetailedData[0].stations);
//               console.log(`\n--- [${allDetailedData[1].name}] 상세 정류소 목록 ---`);
//               console.log(allDetailedData[1].stations);
//           }
//
//         } catch (error) {
//           console.error('2단계 상세 정보 호출 중 오류 발생:', error);
//         }
//       };
//
//       fetchDetailedData();
//     }
//   }, [krNetworks]); // 👈 krNetworks 상태가 변경될 때마다 실행
//
//   return (
//     <div>
//       <h2>대한민국 자전거 공유 데이터</h2>
//       <p>총 **{krNetworks.length}** 개의 네트워크 정보를 찾았습니다. 상세 정보 로딩 완료.</p>
//       <p>**콘솔(F12)을 확인**하시면 상세 데이터를 볼 수 있습니다.</p>
//
//       {/* 화면에 불러온 데이터의 이름을 표시 */}
//       {isLoading?detailedData.map((network, index) => (
//         <div key={network.id} style={{marginTop: '5px'}}>
//             ✅ **{network.name}** ({network.location.city}) - 정류소: {network.stations.length}개
//         </div>
//       )):<h1>로딩중....</h1>}
//     </div>
//   );
// };