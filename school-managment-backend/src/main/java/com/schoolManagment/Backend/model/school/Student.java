package com.schoolManagment.Backend.model.school;


import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import com.schoolManagment.Backend.model.school.help.Grade;

import javax.persistence.JoinColumn;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Student extends Person {
	
	@ManyToOne
	@JoinColumn(name = "grade_id")
	private Grade grade;
		
	
}
