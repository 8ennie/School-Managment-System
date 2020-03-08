package com.schoolManagment.Backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.schoolManagment.Backend.model.school.Teacher;
import com.schoolManagment.Backend.repository.TeacherRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/teachers")
public class TeacherController {
	
	@Autowired
	TeacherRepository teacherRepository;
	
	public ResponseEntity<Teacher> save (Teacher teacher) {
		return null;
	}
	
}
