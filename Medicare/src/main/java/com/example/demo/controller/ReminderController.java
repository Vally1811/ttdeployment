package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Reminder;
import com.example.demo.service.ReminderService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/reminders")
public class ReminderController {

    @Autowired
    private ReminderService service;

    // ✅ ADD REMINDER
    @PostMapping("/add")
    public Reminder addReminder(@RequestBody Reminder reminder) {
        return service.saveReminder(reminder);
    }

    // ✅ GET REMINDERS BY USER
    @GetMapping("/user/{userId}")
    public List<Reminder> getRemindersByUser(@PathVariable Long userId) {
        return service.getRemindersByUser(userId);
    }
}
