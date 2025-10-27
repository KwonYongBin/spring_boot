package com.springboot.shoppy_fullstack_app.dto;

import lombok.Data;

@Data
public class KakaoReadyResponse {
    private String tid; // 결제 고유 번호
    private String next_redirect_pc_url; // qr 코드에 접근할 수 있는 페이지
}

