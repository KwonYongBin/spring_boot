package com.springboot.study.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class MemberController {
    @GetMapping("/login")
    public String login(){
        return "login"; //로그인 화면
    }

    /** Spring Legacy 버전 --> ModelAndView 객체를 활용하여 데이터 및 view 전송 (3.0 버전 전송 사용 방법)
        @PostMapping("login")
        public ModelAndView login(@RequestParam String id, @RequestParam String pass) {
            ModelAndView model = new ModelAndView();

            String result = "";
            if(id.equals("test") && pass.equals("1234")) result = "[ModelAndView]로그인 성공!!";
            else result = "[ModelAndView]로그인 실패" ;

            model.addObject("result", result);
            model.setViewName("loginResult");
            return model;
        }
    */

    @PostMapping("/login")
    public String login( //login overriding
            @RequestParam String id,
            @RequestParam String pass,
            Model model
    ){
        String result = "";
        if(id.equals("test") && pass.equals("1234")) result = "로그인 성공!!";
        else result = "로그인 실패" ;

        model.addAttribute("result", result);

        return "loginResult"; //view name : ==> loginResult.html
    }

    @GetMapping("/signup")
    public String signup(){
        return "signup"; //회원가입
    }
}
