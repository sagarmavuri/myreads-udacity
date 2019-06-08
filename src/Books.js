import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * @description A common component that will display books
 */
class Books extends Component {

  /**
   * @description PropTypes
   */
  static propTypes = {
    /**
     * List of books present in state. This will help in identifying which shelf a book belongs to.
     */
    books: PropTypes.array.isRequired,
    /**
     * Book to be displayed
     */
    book: PropTypes.object.isRequired,
    /**
     * Function passed as props further to Books component.
     * (Inverse data flow)
     */
    updateShelf: PropTypes.func.isRequired
  }

  /*
   * @description An event listener, triggerd whenever User changes the shelf selection. It ensured the selection updates book's category
   */
	handleChange = (event, book) => {
		this.props.updateShelf(this.props.book, event.target.value);
	}

	render () {

		const { book, books } = this.props
		const thumbnail = book.imageLinks ? (book.imageLinks.smallThumbnail ? book.imageLinks.smallThumbnail : '' ) : '';
		const index = books.findIndex( i => i.id === book.id)
		const defaultShelf = index === -1 ? 'none' : books[index].shelf

		return (
			<li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})` }}></div>
              <div className="book-shelf-changer">
                <select onChange={this.handleChange} defaultValue={defaultShelf}>
                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors ? book.authors.join(', ') : ''}</div>
        </div>
      </li>
		)
	}
}

export default Books;
