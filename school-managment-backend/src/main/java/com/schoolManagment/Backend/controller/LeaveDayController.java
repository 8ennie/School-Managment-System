package com.schoolManagment.Backend.controller;

import java.util.Arrays;
import java.util.List;
import org.springframework.hateoas.CollectionModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.schoolManagment.Backend.model.school.help.LeaveType;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/leaveDays")
public class LeaveDayController {
	
	@GetMapping("/types")
	ResponseEntity<CollectionModel<LeaveType>> getLeaveDayTypes() {
		List<LeaveType> leaveTypes = Arrays.asList(LeaveType.values());
		return ResponseEntity.ok(new CollectionModel<>(leaveTypes));
	}
}
