//package com.example.demo.repository;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//import com.example.demo.model.Reminder;
//import java.util.List;
//
//	    public interface ReminderRepository extends JpaRepository<Reminder, Long> {
//	        List<Reminder> findByUser_Id(Long userId);
//	
//}
package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.Reminder;
import java.util.List;

public interface ReminderRepository extends JpaRepository<Reminder, Long> {

    // ✅ CORRECT METHOD
    List<Reminder> findByUserId(Long userId);
}