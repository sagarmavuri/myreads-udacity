import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { debounce } from 'lodash'
import { Link } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'

import * as BooksAPI from './BooksAPI'
import Books from './Books.js'


// TODO - any better way?
let filteredBooks = [];

/**
 * @description Lists all the books per search query
 */
class ListBooks extends Component {

	static propTypes = {
		/**
		 * List of books already in state. This will help in keeping book's category
		 * across screen i.e. main page and search page
		 */
    books: PropTypes.array.isRequired,

    /**
     * Function passed as props further to Books component.
     * (Inverse data flow)
     */
    updateShelf: PropTypes.func.isRequired
  }

	state = {
		query: '',
		isLoading: false,
	}

	/**
	 * @description It fetches/searches for the books per input query. 
	 * 		It has debounce, triggers the events 2 seconds after 
	 *		User finisihes typing
	 * @param {string} query - Input string against which the search will be made
	 */
	fetchBooks = debounce ((query) => {

		// Search only if query is a non empty string
		if (query.trim() !== '') {
			// First things first, set the loader.
			this.setState({
				query: query,
				isLoading: true,
			})

			// Turn off the loader and set filteredBooks
			BooksAPI.search(query.trim())
				.then((books) => {
					filteredBooks = books ? (books.error ? [] : books) : [];
						this.setState(() => ({
							isLoading: false,
						}))
					}
				)
		} else {
				filteredBooks = []
				this.setState({
					query,
					isLoading: false,
				})
		}
	}, 2000)

	render() {

		const { isLoading } = this.state
		const { books, updateShelf } = this.props

		return (

			<div className="search-books">
				<div className="search-books-bar">
					<Link
						to="/"
						className="close-search"
					/>
					<div className="search-books-input-wrapper">
						{/*
							NOTES: The search from BooksAPI is limited to a particular set of search terms.
							You can find these search terms here:
							https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

							However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
							you don't find a specific author or title. Every search is limited by search terms.
						*/}
						<input
							type="text"
							placeholder="Search by title or author"
							onChange={(event) => this.fetchBooks(event.target.value)}
						/>

					</div>
				</div>
					{
						isLoading === true
							? <div className="center-div"><ClipLoader size={75} /></div>
							: <div className="search-books-results">
									<ol className="books-grid">
										{
											filteredBooks.map((book, id) => (
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
					}
			</div>
		)
	}
}
export default ListBooks;
