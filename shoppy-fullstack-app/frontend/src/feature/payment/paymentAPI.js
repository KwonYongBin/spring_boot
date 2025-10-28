import { axiosPost } from '../../utils/dataFetch.js';

/**
 결제
 */
export const getPayment = async(receiver, paymentInfo, cartList) => {
    console.log(cartList)
    const cidList = cartList.map(item => item.cid);
    const qty = cartList.reduce((sum, item) => sum + parseInt(item.qty), 0);
    const { userId } = JSON.parse(localStorage.getItem("loginInfo"));
    const url = "/payment/kakao/ready";
    const data = {
        "orderId" : "",
        "userId" : userId,
        "itemName" : cartList[0].name,
        "qty" : qty,
        "totalAmount" : cartList[0].totalPrice, // 결제 금액 (KRW)
        "receiver" : receiver, // springboot :: receiver inner class로 생성
        "paymentInfo" : paymentInfo, // springboot :: paymentInfo 'inner class'로 생성
        "cidList": JSON.stringify(cidList)
    }
    try {
        const kakaoReadyResult = await axiosPost(url, data);
        console.log("kakaoReadyResult --> ", kakaoReadyResult);

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