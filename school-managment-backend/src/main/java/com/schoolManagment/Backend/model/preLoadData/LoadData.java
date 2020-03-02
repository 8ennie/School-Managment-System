package com.schoolManagment.Backend.model.preLoadData;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.schoolManagment.Backend.model.adminestration.ERole;
import com.schoolManagment.Backend.model.adminestration.Role;
import com.schoolManagment.Backend.model.adminestration.User;
import com.schoolManagment.Backend.model.school.Gender;
import com.schoolManagment.Backend.model.school.Grade;
import com.schoolManagment.Backend.model.school.Lesson;
import com.schoolManagment.Backend.model.school.LessonTime;
import com.schoolManagment.Backend.model.school.Student;
import com.schoolManagment.Backend.model.school.Subject;
import com.schoolManagment.Backend.model.school.Teacher;
import com.schoolManagment.Backend.repository.GradeRepository;
import com.schoolManagment.Backend.repository.LessonRepository;
import com.schoolManagment.Backend.repository.LessonTimeRepository;
import com.schoolManagment.Backend.repository.RoleRepository;
import com.schoolManagment.Backend.repository.StudentRepository;
import com.schoolManagment.Backend.repository.SubjectRepository;
import com.schoolManagment.Backend.repository.TeacherRepository;
import com.schoolManagment.Backend.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class LoadData implements ApplicationRunner{

	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private GradeRepository gradeRepository;
	
	@Autowired
	private StudentRepository studentRepository;
	
	@Autowired
	private SubjectRepository subjectRepository;

	
	@Autowired
	private TeacherRepository teacherRepository;
	
	@Autowired
	private LessonRepository lessonRepository;
	
	@Autowired
	private LessonTimeRepository lessonTimeRepository;
	
	@Autowired
	PasswordEncoder encoder;
	
	@Override
	public void run(ApplicationArguments args) throws Exception {
		log.info("Preload: " + roleRepository.save(new Role(ERole.ROLE_ADMIN)));
		log.info("Preload: " + roleRepository.save(new Role(ERole.ROLE_USER)));
		log.info("Preload: " + roleRepository.save(new Role(ERole.ROLE_STUDENT)));
		log.info("Preload: " + roleRepository.save(new Role(ERole.ROLE_TEACHER)));
		
		User admin = new User("admin","admin@admin.com",encoder.encode("adminadmin"));
		Set<Role> roles = new HashSet<>();
		Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN).orElseThrow(() -> new RuntimeException("Error: Role is not found."));;
		roles.add(adminRole);
		admin.setRoles(roles);
		log.info("Preload: " + userRepository.save(admin));
		
		log.info("Preload: " + gradeRepository.save(new Grade("5Ga")));
		log.info("Preload: " + gradeRepository.save(new Grade("5Gb")));
		log.info("Preload: " + gradeRepository.save(new Grade("5R")));
		log.info("Preload: " + gradeRepository.save(new Grade("6Ga")));
		log.info("Preload: " + gradeRepository.save(new Grade("6Gb")));
		log.info("Preload: " + gradeRepository.save(new Grade("6R")));
		
		Grade grade1 = gradeRepository.getOne(Long.valueOf(4));
		log.info("Preload: " + studentRepository.save(Student.builder().grade(grade1).firstName("Alice").lastName("Gray").gender(Gender.FEMALE).build()));
		log.info("Preload: " + studentRepository.save(Student.builder().grade(grade1).firstName("Simon").lastName("Great").gender(Gender.MALE).build()));
		log.info("Preload: " + studentRepository.save(Student.builder().grade(grade1).firstName("Bobby").lastName("Gras").gender(Gender.MALE).build()));
		
		log.info("Preload: " + subjectRepository.save(Subject.builder().name("German").build()));
		log.info("Preload: " + subjectRepository.save(Subject.builder().name("English").build()));
		log.info("Preload: " + subjectRepository.save(Subject.builder().name("Math").build()));
		
		Subject deutsch = subjectRepository.findByName("German").get();
		Subject english = subjectRepository.findByName("English").get();
		Subject math = subjectRepository.findByName("Math").get();
		log.info("Preload: " + teacherRepository.save(Teacher.builder().firstName("Amy").lastName("Tod").gender(Gender.FEMALE).subjects(Arrays.asList(deutsch,english)).build()));
		log.info("Preload: " + teacherRepository.save(Teacher.builder().firstName("Nick").lastName("Pattar").gender(Gender.FEMALE).subjects(Arrays.asList(deutsch,math)).build()));
		
		Teacher amy = teacherRepository.getOne(Long.valueOf(14));
	
		
		log.info("Preload: " + lessonTimeRepository.save(LessonTime.builder().hour(1).startTime(LocalTime.of(8, 10)).endTime(LocalTime.of(8, 55)).dayOfWeek(DayOfWeek.MONDAY).build()));
		LessonTime firstHour = lessonTimeRepository.findByHour(1).get();
		
		log.info("Preload: " + lessonRepository.save(Lesson.builder().lessonTime(firstHour).teacher(amy).subject(deutsch).grade(grade1).build()));
	}

}
