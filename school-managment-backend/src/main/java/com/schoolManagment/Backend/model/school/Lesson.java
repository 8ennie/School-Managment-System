package com.schoolManagment.Backend.model.school;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
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
public class Lesson {

	@Id
	@GeneratedValue
	private Long id;

	@ManyToOne
	private Teacher teacher;

	@ManyToOne
	private Grade grade;

	@ManyToOne
	private LessonTime lessonTime;

	@ManyToOne
	private Subject subject;

}
