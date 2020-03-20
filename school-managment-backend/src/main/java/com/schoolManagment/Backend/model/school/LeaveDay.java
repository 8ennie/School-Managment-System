package com.schoolManagment.Backend.model.school;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.schoolManagment.Backend.model.school.help.LeaveType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeaveDay {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Enumerated(EnumType.STRING)
	private LeaveType type;

	private String description;

	@Temporal(TemporalType.DATE)
	private Date date;

	@ManyToOne
	@JsonBackReference
	private Person person;
	
	@OneToMany(mappedBy = "leaveDay", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<SubstituteLesson> substituteLessons;

}
