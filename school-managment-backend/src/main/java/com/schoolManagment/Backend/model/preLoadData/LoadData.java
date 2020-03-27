//package com.schoolManagment.Backend.model.preLoadData;
//
//import java.time.DayOfWeek;
//import java.time.LocalTime;
//import java.util.Arrays;
//import java.util.Date;
//import java.util.HashSet;
//import java.util.Set;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.ApplicationArguments;
//import org.springframework.boot.ApplicationRunner;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Component;
//
//import com.schoolManagment.Backend.model.adminestration.ERole;
//import com.schoolManagment.Backend.model.adminestration.Role;
//import com.schoolManagment.Backend.model.adminestration.User;
//import com.schoolManagment.Backend.model.school.LeaveDay;
//import com.schoolManagment.Backend.model.school.Lesson;
//import com.schoolManagment.Backend.model.school.Person;
//import com.schoolManagment.Backend.model.school.Student;
//import com.schoolManagment.Backend.model.school.Subject;
//import com.schoolManagment.Backend.model.school.Teacher;
//import com.schoolManagment.Backend.model.school.help.EducationalStage;
//import com.schoolManagment.Backend.model.school.help.Gender;
//import com.schoolManagment.Backend.model.school.help.Grade;
//import com.schoolManagment.Backend.model.school.help.LeaveType;
//import com.schoolManagment.Backend.model.school.help.LessonTime;
//import com.schoolManagment.Backend.repository.GradeRepository;
//import com.schoolManagment.Backend.repository.LeaveDayRepository;
//import com.schoolManagment.Backend.repository.LessonInstanceRepository;
//import com.schoolManagment.Backend.repository.LessonRepository;
//import com.schoolManagment.Backend.repository.LessonTimeRepository;
//import com.schoolManagment.Backend.repository.PersonRepository;
//import com.schoolManagment.Backend.repository.RoleRepository;
//import com.schoolManagment.Backend.repository.StudentRepository;
//import com.schoolManagment.Backend.repository.SubjectRepository;
//import com.schoolManagment.Backend.repository.TeacherRepository;
//import com.schoolManagment.Backend.repository.UserRepository;
//
//import lombok.extern.slf4j.Slf4j;
//
//@Component
//@Slf4j
//public class LoadData implements ApplicationRunner {
//
//	@Autowired
//	private RoleRepository roleRepository;
//
//	@Autowired
//	private UserRepository userRepository;
//
//	@Autowired
//	private GradeRepository gradeRepository;
//
//	@Autowired
//	private StudentRepository studentRepository;
//
//	@Autowired
//	private SubjectRepository subjectRepository;
//
//	@Autowired
//	private TeacherRepository teacherRepository;
//
//	@Autowired
//	private LessonRepository lessonRepository;
//
//	@Autowired
//	private LessonInstanceRepository lessonInstanceRepository;
//
//	@Autowired
//	private LessonTimeRepository lessonTimeRepository;
//
//	@Autowired
//	private LeaveDayRepository leaveDayRepository;
//
//	@Autowired
//	private PersonRepository personRepository;
//
//	@Autowired
//	PasswordEncoder encoder;
//
//	@SuppressWarnings("unused")
//	@Override
//	public void run(ApplicationArguments args) throws Exception {
//
//		// Roles
//		Role adminRole = roleRepository.save(new Role(ERole.ROLE_ADMIN));
//		Role userRole = roleRepository.save(new Role(ERole.ROLE_USER));
//		Role studnentRole = roleRepository.save(new Role(ERole.ROLE_STUDENT));
//		Role teacherRole = roleRepository.save(new Role(ERole.ROLE_TEACHER));
//
//		// Users
//		Person bennie = Person.builder().firstName("Benjamin").lastName("Wiemann").gender(Gender.MALE).build();
//		personRepository.save(bennie);
//		User admin = new User("admin", "admin@admin.com", encoder.encode("adminadmin"));
//		Set<Role> roles = new HashSet<>();
//		roles.add(adminRole);
//		admin.setRoles(roles);
//		admin.setPerson(bennie);
//		log.info("Preload: " + userRepository.save(admin));
//
//		// Grade
//		Grade grade1a = gradeRepository
//				.save(Grade.builder().name("1a").educationalStage(EducationalStage.ELEMENTARY).build());
//		gradeRepository.save(Grade.builder().name("1b").educationalStage(EducationalStage.ELEMENTARY).build());
//		gradeRepository.save(Grade.builder().name("2a").educationalStage(EducationalStage.ELEMENTARY).build());
//		gradeRepository.save(Grade.builder().name("2b").educationalStage(EducationalStage.ELEMENTARY).build());
//		gradeRepository.save(Grade.builder().name("3a").educationalStage(EducationalStage.ELEMENTARY).build());
//		gradeRepository.save(Grade.builder().name("3b").educationalStage(EducationalStage.ELEMENTARY).build());
//		gradeRepository.save(Grade.builder().name("4a").educationalStage(EducationalStage.ELEMENTARY).build());
//		gradeRepository.save(Grade.builder().name("4b").educationalStage(EducationalStage.ELEMENTARY).build());
//
//		gradeRepository.save(Grade.builder().name("5Ga").educationalStage(EducationalStage.MIDDLE).build());
//		gradeRepository.save(Grade.builder().name("5Gb").educationalStage(EducationalStage.MIDDLE).build());
//		gradeRepository.save(Grade.builder().name("5R").educationalStage(EducationalStage.REAL).build());
//		gradeRepository.save(Grade.builder().name("6Ga").educationalStage(EducationalStage.MIDDLE).build());
//		gradeRepository.save(Grade.builder().name("6Gb").educationalStage(EducationalStage.MIDDLE).build());
//		gradeRepository.save(Grade.builder().name("6R").educationalStage(EducationalStage.REAL).build());
//		gradeRepository.save(Grade.builder().name("7Ga").educationalStage(EducationalStage.MIDDLE).build());
//		gradeRepository.save(Grade.builder().name("7Gb").educationalStage(EducationalStage.MIDDLE).build());
//		gradeRepository.save(Grade.builder().name("7R").educationalStage(EducationalStage.REAL).build());
//		gradeRepository.save(Grade.builder().name("8Ga").educationalStage(EducationalStage.MIDDLE).build());
//		gradeRepository.save(Grade.builder().name("8Gb").educationalStage(EducationalStage.MIDDLE).build());
//		gradeRepository.save(Grade.builder().name("8R").educationalStage(EducationalStage.REAL).build());
//		gradeRepository.save(Grade.builder().name("9Ga").educationalStage(EducationalStage.MIDDLE).build());
//		gradeRepository.save(Grade.builder().name("9Gb").educationalStage(EducationalStage.MIDDLE).build());
//		gradeRepository.save(Grade.builder().name("9R").educationalStage(EducationalStage.REAL).build());
//		gradeRepository.save(Grade.builder().name("10Ga").educationalStage(EducationalStage.MIDDLE).build());
//		gradeRepository.save(Grade.builder().name("10Gb").educationalStage(EducationalStage.MIDDLE).build());
//		gradeRepository.save(Grade.builder().name("10R").educationalStage(EducationalStage.REAL).build());
//
//		gradeRepository.save(Grade.builder().name("11a").educationalStage(EducationalStage.HIGH).build());
//		gradeRepository.save(Grade.builder().name("11b").educationalStage(EducationalStage.HIGH).build());
//		gradeRepository.save(Grade.builder().name("12a").educationalStage(EducationalStage.HIGH).build());
//		gradeRepository.save(Grade.builder().name("12b").educationalStage(EducationalStage.HIGH).build());
//		gradeRepository.save(Grade.builder().name("13a").educationalStage(EducationalStage.HIGH).build());
//		gradeRepository.save(Grade.builder().name("13b").educationalStage(EducationalStage.HIGH).build());
//
//		// Students
//		log.info("Preload: " + studentRepository.save(
//				Student.builder().grade(grade1a).firstName("Alice").lastName("Gray").gender(Gender.FEMALE).build()));
//		log.info("Preload: " + studentRepository.save(
//				Student.builder().grade(grade1a).firstName("Simon").lastName("Great").gender(Gender.MALE).build()));
//		log.info("Preload: " + studentRepository.save(
//				Student.builder().grade(grade1a).firstName("Bobby").lastName("Gras").gender(Gender.MALE).build()));
//
//		// Subjects
//		Subject german = subjectRepository.save(Subject.builder().name("German").build());
//		Subject english = subjectRepository.save(Subject.builder().name("Englisch").build());
//		Subject french = subjectRepository.save(Subject.builder().name("French").build());
//		Subject latin = subjectRepository.save(Subject.builder().name("Latin").build());
//
//		Subject math = subjectRepository.save(Subject.builder().name("Math").build());
//		Subject physics = subjectRepository.save(Subject.builder().name("Physics").build());
//		Subject chemistry = subjectRepository.save(Subject.builder().name("Chemistry").build());
//
//		Subject history = subjectRepository.save(Subject.builder().name("History").build());
//		Subject poWi = subjectRepository.save(Subject.builder().name("PoWi").build());
//
//		Subject sport = subjectRepository.save(Subject.builder().name("Sport").build());
//		Subject music = subjectRepository.save(Subject.builder().name("Music").build());
//		Subject art = subjectRepository.save(Subject.builder().name("Art").build());
//
//		Subject computer = subjectRepository.save(Subject.builder().name("Computer").build());
//
//		// Teachers
//		Teacher amy = teacherRepository
//				.save(Teacher.builder().firstName("Amy").lastName("Tod").daysWorking(Arrays.asList(DayOfWeek.values()))
//						.gender(Gender.FEMALE).subjects(Arrays.asList(german, english)).build());
//		User amyUser = new User("amy", "amy@aschollmanagment.com", encoder.encode("amy"));
//		Set<Role> amyRoles = new HashSet<>();
//		amyRoles.add(teacherRole);
//		amyUser.setRoles(amyRoles);
//		amyUser.setPerson(amy);
//		userRepository.save(amyUser);
//		Teacher nick = teacherRepository.save(Teacher.builder().firstName("Nick").lastName("Pattar").gender(Gender.MALE)
//				.subjects(Arrays.asList(german, math)).build());
//
//		// LessonTimes
//		for (DayOfWeek day : DayOfWeek.values()) {
//			if (day != DayOfWeek.SATURDAY && day != DayOfWeek.SUNDAY) {
//				for (int i = 1; i < 11; i++) {
//					switch (i) {
//					case 1:
//						log.info("Preload: " + lessonTimeRepository.save(LessonTime.builder().hour(i)
//								.startTime(LocalTime.of(8, 10)).endTime(LocalTime.of(8, 55)).dayOfWeek(day).build()));
//						break;
//					case 2:
//						log.info("Preload: " + lessonTimeRepository.save(LessonTime.builder().hour(i)
//								.startTime(LocalTime.of(8, 55)).endTime(LocalTime.of(9, 40)).dayOfWeek(day).build()));
//						break;
//					case 3:
//						log.info("Preload: " + lessonTimeRepository.save(LessonTime.builder().hour(i)
//								.startTime(LocalTime.of(10, 00)).endTime(LocalTime.of(10, 45)).dayOfWeek(day).build()));
//						break;
//					case 4:
//						log.info("Preload: " + lessonTimeRepository.save(LessonTime.builder().hour(i)
//								.startTime(LocalTime.of(10, 45)).endTime(LocalTime.of(11, 30)).dayOfWeek(day).build()));
//						break;
//					case 5:
//						log.info("Preload: " + lessonTimeRepository.save(LessonTime.builder().hour(i)
//								.startTime(LocalTime.of(11, 45)).endTime(LocalTime.of(12, 30)).dayOfWeek(day).build()));
//						break;
//					case 6:
//						log.info("Preload: " + lessonTimeRepository.save(LessonTime.builder().hour(i)
//								.startTime(LocalTime.of(12, 30)).endTime(LocalTime.of(13, 15)).dayOfWeek(day).build()));
//						break;
//					case 7:
//						log.info("Preload: " + lessonTimeRepository.save(LessonTime.builder().hour(i)
//								.startTime(LocalTime.of(13, 30)).endTime(LocalTime.of(14, 15)).dayOfWeek(day).build()));
//						break;
//					case 8:
//						log.info("Preload: " + lessonTimeRepository.save(LessonTime.builder().hour(i)
//								.startTime(LocalTime.of(14, 15)).endTime(LocalTime.of(15, 00)).dayOfWeek(day).build()));
//						break;
//					case 9:
//						log.info("Preload: " + lessonTimeRepository.save(LessonTime.builder().hour(i)
//								.startTime(LocalTime.of(15, 15)).endTime(LocalTime.of(16, 00)).dayOfWeek(day).build()));
//						break;
//					case 10:
//						log.info("Preload: " + lessonTimeRepository.save(LessonTime.builder().hour(i)
//								.startTime(LocalTime.of(16, 00)).endTime(LocalTime.of(16, 45)).dayOfWeek(day).build()));
//						break;
//					default:
//						break;
//					}
//
//				}
//			}
//
//		}
//		LessonTime firstHourOnMonday = lessonTimeRepository.findByDayOfWeekAndHour(DayOfWeek.MONDAY, 1).get();
//		LessonTime secondHourOnMonday = lessonTimeRepository.findByDayOfWeekAndHour(DayOfWeek.MONDAY, 2).get();
//		LessonTime firstHourOnTuesday = lessonTimeRepository.findByDayOfWeekAndHour(DayOfWeek.TUESDAY, 1).get();
//		LessonTime secondHourOnTuesday = lessonTimeRepository.findByDayOfWeekAndHour(DayOfWeek.TUESDAY, 2).get();
//
//		Lesson ga1t = Lesson.builder().subject(german).teacher(amy).grade(grade1a).lessonTime(firstHourOnTuesday)
//				.build();
//		lessonRepository.save(ga1t);
//		Lesson ga2t = Lesson.builder().subject(german).teacher(amy).grade(grade1a).lessonTime(secondHourOnTuesday)
//				.build();
//		lessonRepository.save(ga2t);
//
//		Lesson ga1m = Lesson.builder().subject(english).teacher(amy).grade(grade1a).lessonTime(firstHourOnMonday)
//				.build();
//		lessonRepository.save(ga1m);
//		Lesson ga2m = Lesson.builder().subject(english).teacher(amy).grade(grade1a).lessonTime(secondHourOnMonday)
//				.build();
//		lessonRepository.save(ga2m);
//
//		LeaveDay ld = LeaveDay.builder().date(new Date()).description("This is a bad Day").type(LeaveType.SICK)
//				.person(amy).build();
//		leaveDayRepository.save(ld);
//	}
//
//}
