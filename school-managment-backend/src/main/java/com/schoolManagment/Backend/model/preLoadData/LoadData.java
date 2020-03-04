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
public class LoadData implements ApplicationRunner {

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

		User admin = new User("admin", "admin@admin.com", encoder.encode("adminadmin"));
		Set<Role> roles = new HashSet<>();
		Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
				.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
		;
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
		log.info("Preload: " + studentRepository.save(
				Student.builder().grade(grade1).firstName("Alice").lastName("Gray").gender(Gender.FEMALE).build()));
		log.info("Preload: " + studentRepository.save(
				Student.builder().grade(grade1).firstName("Simon").lastName("Great").gender(Gender.MALE).build()));
		log.info("Preload: " + studentRepository
				.save(Student.builder().grade(grade1).firstName("Bobby").lastName("Gras").gender(Gender.MALE).build()));

		log.info("Preload: " + subjectRepository.save(Subject.builder().name("German").build()));
		log.info("Preload: " + subjectRepository.save(Subject.builder().name("English").build()));
		log.info("Preload: " + subjectRepository.save(Subject.builder().name("Math").build()));

		Subject deutsch = subjectRepository.findByName("German").get().get(0);
		Subject english = subjectRepository.findByName("English").get().get(0);
		Subject math = subjectRepository.findByName("Math").get().get(0);
		log.info("Preload: " + teacherRepository.save(Teacher.builder().firstName("Amy").lastName("Tod")
				.gender(Gender.FEMALE).subjects(Arrays.asList(deutsch, english)).build()));
		log.info("Preload: " + teacherRepository.save(Teacher.builder().firstName("Nick").lastName("Pattar")
				.gender(Gender.FEMALE).subjects(Arrays.asList(deutsch, math)).build()));

		Teacher amy = teacherRepository.getOne(Long.valueOf(14));

		for (DayOfWeek day : DayOfWeek.values()) {
			if (day != DayOfWeek.SATURDAY && day != DayOfWeek.SUNDAY) {
				for (int i = 1; i < 11; i++) {
					switch (i) {
					case 1:
						log.info("Preload: " + lessonTimeRepository.save(LessonTime.builder().hour(i)
								.startTime(LocalTime.of(8, 10)).endTime(LocalTime.of(8, 55)).dayOfWeek(day).build()));
						break;
					case 2:
						log.info("Preload: " + lessonTimeRepository.save(LessonTime.builder().hour(i)
								.startTime(LocalTime.of(8, 55)).endTime(LocalTime.of(9, 40)).dayOfWeek(day).build()));
						break;
					case 3:
						log.info("Preload: " + lessonTimeRepository.save(LessonTime.builder().hour(i)
								.startTime(LocalTime.of(10, 00)).endTime(LocalTime.of(10, 45)).dayOfWeek(day).build()));
						break;
					case 4:
						log.info("Preload: " + lessonTimeRepository.save(LessonTime.builder().hour(i)
								.startTime(LocalTime.of(10, 45)).endTime(LocalTime.of(11, 30)).dayOfWeek(day).build()));
						break;
					case 5:
						log.info("Preload: " + lessonTimeRepository.save(LessonTime.builder().hour(i)
								.startTime(LocalTime.of(11, 45)).endTime(LocalTime.of(12, 30)).dayOfWeek(day).build()));
						break;
					case 6:
						log.info("Preload: " + lessonTimeRepository.save(LessonTime.builder().hour(i)
								.startTime(LocalTime.of(12, 30)).endTime(LocalTime.of(13, 15)).dayOfWeek(day).build()));
						break;
					case 7:
						log.info("Preload: " + lessonTimeRepository.save(LessonTime.builder().hour(i)
								.startTime(LocalTime.of(13, 30)).endTime(LocalTime.of(14, 15)).dayOfWeek(day).build()));
						break;
					case 8:
						log.info("Preload: " + lessonTimeRepository.save(LessonTime.builder().hour(i)
								.startTime(LocalTime.of(14, 15)).endTime(LocalTime.of(15, 00)).dayOfWeek(day).build()));
						break;
					case 9:
						log.info("Preload: " + lessonTimeRepository.save(LessonTime.builder().hour(i)
								.startTime(LocalTime.of(15, 15)).endTime(LocalTime.of(16, 00)).dayOfWeek(day).build()));
						break;
					case 10:
						log.info("Preload: " + lessonTimeRepository.save(LessonTime.builder().hour(i)
								.startTime(LocalTime.of(16, 00)).endTime(LocalTime.of(16, 45)).dayOfWeek(day).build()));
						break;
					default:
						break;
					}

				}
			}

		}
		LessonTime firstHour = lessonTimeRepository.findById(Long.valueOf(15)).get();
		LessonTime secondHourOnMonday = lessonTimeRepository.findById(Long.valueOf(16)).get();

		log.info("Preload: " + lessonRepository
				.save(Lesson.builder().lessonTime(firstHour).teacher(amy).subject(deutsch).grade(grade1).build()));
		log.info("Preload: " + lessonRepository.save(
				Lesson.builder().lessonTime(secondHourOnMonday).teacher(amy).subject(english).grade(grade1).build()));

	}

}
