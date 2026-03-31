//package com.example.demo.model;
//
//import jakarta.persistence.*;
//
//@Entity
//public class Reminder {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private Long medicineId;
//    private String reminderTime;
//    private boolean taken;
//
//    public Long getId() { return id; }
//
//    public Long getMedicineId() { return medicineId; }
//    public void setMedicineId(Long medicineId) { this.medicineId = medicineId; }
//
//    public String getReminderTime() { return reminderTime; }
//    public void setReminderTime(String reminderTime) { this.reminderTime = reminderTime; }
//
//    public boolean isTaken() { return taken; }
//    public void setTaken(boolean taken) { this.taken = taken; }
//}
package com.example.demo.model;

import jakarta.persistence.*;

@Entity
public class Reminder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String time;
    private String date;

    @Column(name = "user_id")   // ✅ IMPORTANT
    private Long userId;
    private Boolean taken = false;
    // GETTERS & SETTERS

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
    public Boolean getTaken() {
    	return taken;
    }
    public void setTaken(Boolean taken) {
    	this.taken=taken;
    }
}