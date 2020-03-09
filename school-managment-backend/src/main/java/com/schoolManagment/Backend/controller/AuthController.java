package com.schoolManagment.Backend.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.schoolManagment.Backend.model.adminestration.ERole;
import com.schoolManagment.Backend.model.adminestration.Role;
import com.schoolManagment.Backend.model.adminestration.User;
import com.schoolManagment.Backend.model.school.Teacher;
import com.schoolManagment.Backend.payload.request.LoginRequest;
import com.schoolManagment.Backend.payload.request.SignupRequest;
import com.schoolManagment.Backend.payload.response.JwtResponse;
import com.schoolManagment.Backend.payload.response.MessageResponse;
import com.schoolManagment.Backend.repository.RoleRepository;
import com.schoolManagment.Backend.repository.UserRepository;
import com.schoolManagment.Backend.security.jwt.JwtUtils;
import com.schoolManagment.Backend.security.services.UserDetailsImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();		
		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity.ok(new JwtResponse(jwt, 
												 userDetails.getId(), 
												 userDetails.getUsername(), 
												 userDetails.getEmail(),
												 userDetails.getPerson(),
												 roles));
	}
	
	
	
	

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Username is already taken!"));
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!"));
		}

		// Create new user's account
		User user = new User(signUpRequest.getUsername(), 
							 signUpRequest.getEmail(),
							 encoder.encode(signUpRequest.getPassword()));

		Set<Role> roles = setRoles(signUpRequest.getRole());

		user.setRoles(roles);
		userRepository.save(user);

		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}
	
	
	@PostMapping("/signup/teacher")
	public ResponseEntity<?> registerTeacher(@RequestBody Teacher teacher) {
		System.out.println(teacher);
		User user = new User(teacher.getId().toString(), 
				 teacher.getFirstName() + "." + teacher.getLastName() + "@fcsf.de",
				 encoder.encode(teacher.getFirstName() + teacher.getId()));
		
		Role teacherRole = roleRepository.findByName(ERole.ROLE_TEACHER).get();
		Set<Role> roles = new HashSet<>();
		roles.add(teacherRole);
		
		user.setRoles(roles);
		user.setPerson(teacher);
		User newUser = userRepository.save(user);
		
		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}




	private Set<Role> setRoles(Set<String> strRoles) {
		Set<Role> roles = new HashSet<>();

		if (strRoles == null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "admin":
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);

					break;
				case "teacher":
					Role teacherRole = roleRepository.findByName(ERole.ROLE_TEACHER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(teacherRole);

					break;
				case "student":
					Role studentRole = roleRepository.findByName(ERole.ROLE_STUDENT)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(studentRole);

					break;
				default:
					Role userRole = roleRepository.findByName(ERole.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(userRole);
				}
			});
		}
		return roles;
	}
}