package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Reminder;
import com.example.demo.repository.ReminderRepository;

@Service
public class ReminderService {

    @Autowired
    private ReminderRepository repo;

    public Reminder saveReminder(Reminder reminder) {
        return repo.save(reminder);
    }

    public List<Reminder> getRemindersByUser(Long userId) {
        return repo.findByUserId(userId);   // ✅ FIXED
    }
}