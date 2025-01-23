package com.backend.libraryapi.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend.libraryapi.entity.Book;

public interface BookRepository extends JpaRepository<Book, Integer>{

	Book findByIsbn(String isbn);
	
	@Query("Select b from Book b where title like :title ")
	List<Book> findByTitleLike(@Param("title") String title);
	
	@Query("Select b from Book b where author like :author ")
	List<Book> findByAuthorLike(@Param("author") String author);
	
	@Query("Select b from Book b where isbn like :isbn ")
	List<Book> findByIsbnLike(@Param("isbn") String isbn);
	

}
