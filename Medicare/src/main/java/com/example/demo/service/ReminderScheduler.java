package com.example.demo.service;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.example.demo.model.Reminder;
import com.example.demo.repository.ReminderRepository;

@Component
public class ReminderScheduler {

    @Autowired
    private ReminderRepository repo;

    @Autowired
    private SmsService smsService;

    // Runs every minute
    @Scheduled(fixedRate = 60000)
    public void checkReminders() {

        String currentTime = LocalTime.now()
                .format(DateTimeFormatter.ofPattern("HH:mm"));

        List<Reminder> reminders = repo.findAll();

        for (Reminder r : reminders) {

            if (r.getTime()!=null && r.getTime().equals(currentTime) && !Boolean.TRUE.equals(r.getTaken())) {

                String message = "💊 Reminder: Take " + r.getTitle();

                smsService.sendSms("+916305388588", message);
                System.out.println("Current Time: " + currentTime);
                System.out.println("DB Time: " + r.getTime());
                System.out.println("Sending SMS for: " + r.getTitle());

                r.setTaken(true); // avoid duplicate
                repo.save(r);
            }
        }
    }
}