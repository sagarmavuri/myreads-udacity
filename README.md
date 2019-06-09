# MyReads: A Book Lending App

A bookshelf app that allow users to _select_ and _categorize_ books they have **read**, are **currently reading**, or **want to read**. Here are the specifics.

## What it does!

It has two screens - 

### Main Screen or Bookshelf

* It displays all the books under their respective shelves namely, **Currently Reading**, **Want to Read** and **Read**.
* User is allowed to change a book's shelf by clickin on the `arrow` button on bottom right part of every book.

### Search Screen

* User searches for books per query/input entered. This search is limited to specific terms, details of which are avialable in SEARCH_TERMS.md
* Similar to Bookshelf screen, user can chagne and categorize a book into any of the available shelves mentoned above. Default is **None**.

## Getting Started

* Install all project dependencies with `npm install`
* Start the development server with `npm start`
    * The app. will be rendered at `http://localhost:3000`

## Sneak peek

### Welcome page

![Welcome page](https://github.com/sagarmavuri/myreads-udacity/blob/master/images/Bookshelf.gif)

### Categorize books

![Categorize books](https://github.com/sagarmavuri/myreads-udacity/blob/master/images/Categorize.gif)

### Search

![Search](https://github.com/sagarmavuri/myreads-udacity/blob/master/images/Search.gif)

## What You're Getting
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of your app.
    ├── BookShelf.js # Displays all the available shelves and books under each shelf.
    ├── ListBooks.js # Lets the user search for books per input queries
    ├── Books.js # Displays each book.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```

Remember that good React design practice is to create new JS files for each component and use import/require statements to include them where they are needed.

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* For connection failures, returns an error message
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
