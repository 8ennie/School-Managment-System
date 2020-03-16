package com.schoolManagment.Backend.model.school;

import java.time.DayOfWeek;
import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.AllArgsConstructor;
import lombok.Data;
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
@Data
public class Teacher extends Person{

	@ManyToMany
	private List<Subject> subjects;
	
	@ElementCollection(targetClass = DayOfWeek.class)
	@Enumerated(EnumType.STRING)
	private List<DayOfWeek> daysWorking;
	
	private boolean substituteTeacher;
	
}
