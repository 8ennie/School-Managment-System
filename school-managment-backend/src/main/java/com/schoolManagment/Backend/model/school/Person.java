package com.schoolManagment.Backend.model.school;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

import com.schoolManagment.Backend.model.adminestration.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Person {
	
	@Id
	@GeneratedValue
	private Long id;
	
	@NotNull
	private String firstName;
	
	private String lastName;
	
	@OneToOne
	private User user;
	
	@Enumerated(EnumType.STRING)
	private Gender gender;

	
	public Person (String firstName, String lastName) {
		this.firstName = firstName;
		this.lastName = lastName;
	}


	
	
	
}
