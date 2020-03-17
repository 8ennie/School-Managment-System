package com.schoolManagment.Backend.model.school.help;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.schoolManagment.Backend.model.school.Student;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(
		uniqueConstraints = { 
				@UniqueConstraint(columnNames = "name")
})
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Grade {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	
	@OneToMany
	private List<Student> students;
	
	@Enumerated(EnumType.STRING)
	private EducationalStage educationalStage;
	
	public Grade(String name){
		this.name = name;
	}
	
}
