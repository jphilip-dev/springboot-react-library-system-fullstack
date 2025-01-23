package com.backend.libraryapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.libraryapi.entity.Book;
import com.backend.libraryapi.exception.custom.FieldErrorException;
import com.backend.libraryapi.service.BookService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:5173")
public class LibraryController {

	@Autowired
	BookService bookService;

	@GetMapping("/books")
	public List<Book> getAllBooks(@RequestParam(required = false) Boolean asc,
			@RequestParam(required = false) String field) {
		if (asc != null && field != null) {
			return bookService.getAllCustomBooks(asc, field); // Custom sorting
		}
		return bookService.getAllBooks(); // Default method
	}

	@GetMapping("/books/search")
	public List<Book> getSearchBooks(@RequestParam String field, @RequestParam String value) {

		return bookService.getAllSearchBooks(field, value); // Custom sorting

	}

	@GetMapping("/books/{id}")
	public Book getBookById(@PathVariable int id) {
		return bookService.getBookById(id);
	}

	@PostMapping("/books")
	public Book addBook(@Valid @RequestBody Book book, BindingResult bindingResult) throws FieldErrorException {

		if (bindingResult.hasErrors()) {
			System.out.println("error");
			throw new FieldErrorException(bindingResult);

		}
		return bookService.addBook(book);
	}

	@PutMapping("/books/{bookId}")
	public Book addBook(@PathVariable Integer bookId, @Valid @RequestBody Book book, BindingResult bindingResult)
			throws FieldErrorException {

		if (bindingResult.hasErrors()) {
			System.out.println("error");

			throw new FieldErrorException(bindingResult);

		}

		book.setId(bookId);
		return bookService.updateBook(book);
	}

	@DeleteMapping("/books/{bookId}")
	public ResponseEntity<Object> deleteBook(@PathVariable Integer bookId) {
		bookService.deleteBook(bookId);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
