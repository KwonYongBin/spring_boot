import { login, logout } from '../../feature/auth/authSlice.js';
import { validateFormCheck } from '../../utils/validate.js';
import { axiosPost } from '../../utils/dataFetch.js';


export const getLogin = (formData, param) => async(dispatch) => {

    if(validateFormCheck(param)) {
        /**
            SpringBoot - @RestController, @PostMapping("/member/login")로 데이터를 넘겨야 함
            axios api - post로 데이터를 넘기는 방법
            axios({ 사용 방법
                method: 'post',
                url: '/user/12345',
                data: {
                firstName: 'Fred',
                lastName: 'Flintstone'
                }
            })
         */
        const url = "http://localhost:8080/member/login";
        const result = await axiosPost(url, formData);
        if(result) {
            dispatch(login({"userId":formData.id}));   
            return true;          
        } 
    }
    return false;
}

export const getLogout = () => async(dispatch) => {
    dispatch(logout());
    return true;
}
