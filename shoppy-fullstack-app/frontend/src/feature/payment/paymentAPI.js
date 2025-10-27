import { axiosPost } from '../../utils/dataFetch.js';

export const getPayment = async () => {
    // userid, orderId, itemName, totalPrice ...등의 정보가 들어갈 예정
    const { userId } = localStorage.getItem("loginInfo");
    const url = "/payment/kakao/ready"; // kakao qr을 호출하는 부분
    const data = {
        // int 타입으로 선은을 하였더라도 넘길때에는 String 타입으로 넘긴다.
        // 받을 때에는 parseInt 형식이나 valueOf를 이용해서 변경한다.
        "orderId" : "1234",
        "userId" : userId,
        "itemName" : "테스트 상품",
        "qty" : "10",
        "totalAmount" : "1000"
    }

    try {
        //qr 결제를 가지고있는 객체
        const kakaoReadyResult = await axiosPost(url, data);
        console.log("kakaoReadyResult >> ", kakaoReadyResult);

    } catch(error) {
        console.log("error :: " , error);
    }
}