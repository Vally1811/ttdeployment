package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.HealthRecord;
import com.example.demo.repository.HealthRecordRepository;

@Service
public class HealthRecordService {

    @Autowired
    private HealthRecordRepository repo;

    public HealthRecord saveRecord(HealthRecord record) {
        record.setRecordedAt(LocalDateTime.now());
        return repo.save(record);
    }

    public List<HealthRecord> getByUser(Long userId) {
        return repo.findByUserId(userId);
    }
}