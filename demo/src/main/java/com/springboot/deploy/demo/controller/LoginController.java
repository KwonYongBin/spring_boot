package com.springboot.deploy.demo.controller;

import com.springboot.deploy.demo.dto.Member;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class LoginController {
    @GetMapping("/login")
    public String login(){
        return "login";
    }
    @PostMapping("/login")
    public String login(Member member, Model model){
        String result = "";

        if(member.getId().equals("test") && member.getPassword().equals("1234")) result = "로그인 성공";
        else result = "로그인 실패";

        model.addAttribute("result", result);

        return "loginResult";

    }

    @GetMapping("/signup")
    public String signup(){
        return "signup";
    }
}
