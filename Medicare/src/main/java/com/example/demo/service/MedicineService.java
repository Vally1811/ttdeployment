package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Medicine;
import com.example.demo.repository.MedicineRepository;

@Service
public class MedicineService {

    @Autowired
    private MedicineRepository repo;

    public Medicine saveMedicine(Medicine medicine) {
        return repo.save(medicine);
    }

    public List<Medicine> getAllMedicines() {
        return repo.findAll();
    }

    public List<Medicine> getByUserId(Long userId) {
        return repo.findByUserId(userId);
    }

    public void deleteMedicine(Long id) {
        repo.deleteById(id);
    }
}