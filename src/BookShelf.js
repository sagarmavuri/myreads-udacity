import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Books from './Books.js'

/**
 * @description Categorizes books as per their shelf value a.k.a Want to Read, Reading, Read
 */
class BookShelf extends Component {

  static propTypes = {
    /**
     * List of books to be categorized.
     */
    books: PropTypes.array.isRequired,
    /**
     * Shelf, where the books will be categorized
     */
    shelf: PropTypes.object.isRequired,
    /**
     * Function passed as props further to Books component.
     * (Inverse data flow)
     */
    updateShelf: PropTypes.func.isRequired
  }

	render () {

		const { books, shelf, updateShelf } = this.props;
		const listBooks = books.filter( (book) => book.shelf===shelf.value );

		return (
			<div className="bookshelf">
        <h2 className="bookshelf-title">{shelf.name}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {
                listBooks.map((book, id) => (
            			<Books
            				book={book}
            				key={id}
            				updateShelf={updateShelf}
            				books={books}
            			/>
                ))
              }
            </ol>
          </div>
      </div>
		)
	}
}

export default BookShelf;