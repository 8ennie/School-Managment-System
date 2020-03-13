package com.schoolManagment.Backend.model.school;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;

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
	
	
}
