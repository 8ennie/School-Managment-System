package com.schoolManagment.Backend.payload.response;
import java.util.List;

import com.schoolManagment.Backend.model.school.Person;

import lombok.Data;

@Data
public class JwtResponse {
	private String token;
	private String type = "Bearer";
	private Long id;
	private String username;
	private String email;
	private Person person;
	private List<String> roles;

	public JwtResponse(String accessToken, Long id, String username, String email, Person person, List<String> roles) {
		this.token = accessToken;
		this.id = id;
		this.username = username;
		this.email = email;
		this.person = person;
		this.roles = roles;
	}

	
}