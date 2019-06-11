import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

import BookShelf from './BookShelf.js'
import ListBooks from './ListBooks.js'

import LoadingOverlay from 'react-loading-overlay'
import { ClipLoader } from 'react-spinners'

import { Link } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'

/**
 * const shelf - This doesn't change.
 * This constant should suffice to display shelf types.
 */
const shelf = [
  { value: 'currentlyReading', name: 'Currently Reading' },
  { value: 'wantToRead', name: 'Want to Read' },
  { value: 'read', name: 'Read' }
];

/**
 * @description Parent component, to have books per categories
 */
class BooksApp extends Component {

  state = {
    books: [], // All the book items should be in here.
    loading: false,
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
      }))
    })
  }

  /**
   * @description Updates the Bookshelf, below are the two rules -
   *              <br>- Updates a book's category if the book is present in the bookshelf
   *              <br>- Adds a book to the shelf if the book was not there in the first place.
   * @param {object} book - Book, whose category is to be updated
   * @param {string} shelf - Category i.e. wantToRead, read, reading or none
   */
  updateShelf = (book, shelf) => {

    // Set the loader if an update is triggerd.
    this.setState ({
      isLoading: true,
    })

    // bookToBeAdded and index are required to identify if a book to
    // be updated in present in app's state and add to it if the answer is a no
    let bookToBeAdded = {};
    const index = this.state.books.findIndex(i => i.id === book.id)

    if (index === -1) {
      bookToBeAdded = {...book, shelf: shelf};
    }

    BooksAPI.update(book, shelf)
      .then((book) => {
        index === -1
          ? this.addBookToShefl(bookToBeAdded, false)
          : this.updateBookShelf(index, shelf, false)
      })
  }

  /**
   * @description Updates a book's category (state)
   * @param {number} index - index of the book to be updated
   * @param {string} shelf - category to be updated
   * @param {boolean} isLoading - loader to be set
   */
  updateBookShelf = (index, shelf, isLoading) => {
    this.setState((currState) => ({
      books: [
        ...currState.books.slice(0, index),
        {...currState.books[index], shelf: shelf},
        ...currState.books.slice(index+1)
      ],
      isLoading: isLoading,
    }))
  }

  /**
   * @description Adds book to the shelf (state).
   * @param {object} book - Book to be updated
   * @param {boolean} isLoading - status of loader to be set
   */
  addBookToShefl = (book, isLoading) => {
    this.setState((currState) => ({
      books: [
          ...currState.books, book
        ],
      isLoading: isLoading,
    }))
  }

  render() {

    const { books, isLoading } = this.state
    const error = books.error ? books.error : ''
    return (
      <div className="app">
        <Switch>
          <Route
            exact
            path='/'
            render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <LoadingOverlay
                  active={isLoading}
                  spinner={
                    <ClipLoader
                      size={75}
                      color={"FFFFFF"}
                    />
                  }
                >
                <div className="list-books-content">
                {
                  error.trim() !== ''
                    ? <div>{error}</div>
                    : books.length > 0
                        ? <div>
                            {
                              shelf.map((s, index) => (
                                <BookShelf
                                  shelf={s}
                                  key={index}
                                  books={books}
                                  updateShelf={this.updateShelf}
                                />
                              ))
                            }
                          </div>
                        : <div className="center-div"><ClipLoader size={75} /></div>

                }
                </div>
                <Link
                  to="/search"
                  className="open-search"
                />
                </LoadingOverlay>
              </div>
            )}
          />
          <Route
            path="/search"
            render={() => (
              <ListBooks
                books={books}
                updateShelf={(book, shelf) => {
                  this.updateShelf(book, shelf)
                }}
              />
            )}
          />
        </Switch>
      </div>
    )
  }
}

export default BooksApp;
