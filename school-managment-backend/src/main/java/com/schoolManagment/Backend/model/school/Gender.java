package com.schoolManagment.Backend.model.school;

public enum Gender {

	MALE("male"), FEMALE("female");
	
	String name;
	
	Gender(String name){
		this.name = name;
	}
}
