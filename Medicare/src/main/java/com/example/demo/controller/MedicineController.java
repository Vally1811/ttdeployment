package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Medicine;
import com.example.demo.service.MedicineService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/medicines")
public class MedicineController {

    @Autowired
    private MedicineService service;

    // ADD MEDICINE
    @PostMapping("/add")
    public Medicine addMedicine(@RequestBody Medicine medicine) {
        return service.saveMedicine(medicine);
    }

    // GET ALL MEDICINES
    @GetMapping("/all")
    public List<Medicine> getAllMedicines() {
        return service.getAllMedicines();
    }

    // GET MEDICINES BY USER (ONLY ONE METHOD)
    @GetMapping("/user/{userId}")
    public List<Medicine> getByUser(@PathVariable Long userId) {
        return service.getByUserId(userId);
    }

    // DELETE MEDICINE
    @DeleteMapping("/{id}")
    public String deleteMedicine(@PathVariable Long id) {
        service.deleteMedicine(id);
        return "Deleted Successfully";
    }
}