package com.backend.libraryapi.service;

import java.util.List;

import com.backend.libraryapi.entity.Book;
import com.backend.libraryapi.exception.custom.FieldErrorException;

public interface BookService {
	List<Book> getAllBooks();
	Book getBookById(Integer id);
	Book addBook(Book book) throws FieldErrorException;
	Book updateBook( Book book) throws FieldErrorException;
	void deleteBook(Integer id);
	
	List<Book> getAllCustomBooks(boolean asc, String field);
	List<Book> getAllSearchBooks(String searchField,  String value);
}
