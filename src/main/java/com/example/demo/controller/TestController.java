package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.service.SmsService;

@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    private SmsService smsService;

    @GetMapping("/sms")
    public String testSms() {
        smsService.sendSms("+916305388588", "🚀 Medicare SMS Working");
        return "SMS Sent!";
    }
}