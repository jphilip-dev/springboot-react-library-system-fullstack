package com.backend.libraryapi.entity;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Table(name = "books")
@Data
@Valid
public class Book {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(nullable =  false, unique = true)
	@NotEmpty
	private String isbn;
	
	@NotEmpty
	@Size( max = 30,message = "Limited to 30 characters only")
	private String title;
	
	@NotEmpty
	@Size( max = 30,message = "Limited to 30 characters only")
	private String author;
	
	@Column(columnDefinition = "TEXT")
	private String description;
	
	
	private LocalDate publishedDate;
	
	
}
