package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.HealthRecord;
import com.example.demo.service.HealthRecordService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/health")
public class HealthRecordController {

    @Autowired
    private HealthRecordService service;

    @PostMapping("/add")
    public HealthRecord addRecord(@RequestBody HealthRecord record) {
        return service.saveRecord(record);
    }

    @GetMapping("/user/{userId}")
    public List<HealthRecord> getUserRecords(@PathVariable Long userId) {
        return service.getByUser(userId);
    }
}