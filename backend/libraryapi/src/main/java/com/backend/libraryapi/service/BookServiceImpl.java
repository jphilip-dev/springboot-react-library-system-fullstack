package com.backend.libraryapi.service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.backend.libraryapi.entity.Book;
import com.backend.libraryapi.exception.custom.FieldErrorException;
import com.backend.libraryapi.repository.BookRepository;

@Service
public class BookServiceImpl implements BookService {

	@Autowired
	private BookRepository bookRepository;

	@Override
	public List<Book> getAllCustomBooks(boolean asc, String field) {

		// Split the comma-separated list of fields into individual field names
		String[] fields = field.split(",");

		// Create a Sort object with multiple fields
		Sort sort = Sort.by(Arrays.stream(fields).map(f -> asc ? Sort.Order.asc(f) : Sort.Order.desc(f))
				.collect(Collectors.toList()));

		// Return the sorted list based on the fields
		return bookRepository.findAll(sort);
	}

	@Override
	public List<Book> getAllSearchBooks(String searchField, String value) {

		value = "%" + value + "%";
		searchField = searchField.toLowerCase();
		// Return the sorted list based on the fields
		if (searchField.equals("isbn")) {
			System.out.println("in isbn");
			return bookRepository.findByIsbnLike(value);
		} else if (searchField.equals("title")) {
			return bookRepository.findByTitleLike(value);
		} else if (searchField.equals("author")) {
			return bookRepository.findByAuthorLike(value);
		}

		return this.getAllCustomBooks(true, "title");
	}

	@Override
	public List<Book> getAllBooks() {
		return this.getAllCustomBooks(true, "title");
	}

	@Override
	public Book getBookById(Integer id) {
		return bookRepository.findById(id).get();
	}

	@Override
	public Book addBook(Book book) throws FieldErrorException {

		Book oldBook = bookRepository.findByIsbn(book.getIsbn());

		if (oldBook != null) {

			throw new FieldErrorException("isbn", "ISBN already taken");

		}

		return bookRepository.save(book);
	}

	@Override
	public Book updateBook(Book book) throws FieldErrorException {

		Book oldBook = bookRepository.findById(book.getId()).orElse(null);

		if (oldBook == null) {

			throw new IllegalArgumentException("Book not found");

		}

		Book oldBookIsbn = bookRepository.findByIsbn(book.getIsbn());

		if (oldBookIsbn != null && oldBook.getId() != oldBookIsbn.getId()) {

			throw new FieldErrorException("isbn", "ISBN already taken");

		}

		return bookRepository.save(book);

	}

	@Override
	public void deleteBook(Integer id) {

		Book oldBook = bookRepository.findById(id).orElse(null);

		if (oldBook == null) {

			throw new IllegalArgumentException("Book not found");

		}

		bookRepository.delete(oldBook);

	}

}
