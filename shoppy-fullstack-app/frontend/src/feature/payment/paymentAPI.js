import { axiosPost } from '../../utils/dataFetch.js';

/**
 결제
 */
export const getPayment = async() => {
    const { userId } = JSON.parse(localStorage.getItem("loginInfo"));
    const url = "/payment/kakao/ready";
    console.log("userId --> ", userId);
    const data = {
        "orderId" : "1234",
        "userId" : userId,
        "itemName" : "테스트 상품",
        "qty" : "10",
        "totalAmount" : "1000", // 결제 금액 (KRW)
    }
    try {
        const kakaoReadyResult = await axiosPost(url, data);
        // window.location.href = response.data.next_redirect_pc_url;
        console.log("getPayment :: response --> ", kakaoReadyResult.next_redirect_pc_url);

        if (kakaoReadyResult.tid) {
            console.log("tid-->", kakaoReadyResult.tid);
            // setQrUrl(response.data.next_redirect_mobile_url);
            window.location.href = kakaoReadyResult.next_redirect_pc_url;
        }
    } catch (error) {
        console.error("QR 결제 요청 실패:", error);
    }
}

// import { axiosPost } from '../../utils/dataFetch.js';
//
// export const getPayment = async () => {
//     // userid, orderId, itemName, totalPrice ...등의 정보가 들어갈 예정
//     const { userId } = JSON.parse(localStorage.getItem("loginInfo")); // String 형식이기 때문에 JSON.parse로 변경해줘야 한다.
//     const url = "/payment/kakao/ready"; // kakao qr을 호출하는 부분
//     const data = {
//         // int 타입으로 선은을 하였더라도 넘길때에는 String 타입으로 넘긴다.
//         // 받을 때에는 parseInt 형식이나 valueOf를 이용해서 변경한다.
//         "orderId" : "", // 주문번호 보안을 위해서 Java에서 생성
//         "userId" : userId,
//         "itemName" : "테스트 상품",
//         "qty" : "10",
//         "totalAmount" : "1000"
//     }
//
//     try {
//         //qr 결제를 가지고있는 객체
//         const kakaoReadyResult = await axiosPost(url, data);
//         console.log("kakaoReadyResult >> ", kakaoReadyResult);
//         if(kakaoReadyResult) {
//             //새로운 페이지 연결
//             window.location.href = kakaoReadyResult.next_redirect_pc_url;
//         }
//
//     } catch(error) {
//         console.log("error :: " , error);
//     }
// }