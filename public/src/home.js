function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let counter = 0;
  books.forEach((book) => {
    const arrayOfBorrows = book.borrows;
    // for (let i in arrayOfBorrows) {
    //   if (arrayOfBorrows[i].returned === false) counter += 1
    // }
    arrayOfBorrows.forEach((obj) => {
      if (obj.returned === false) counter += 1;
    });
  });
  return counter;
}

function getMostCommonGenres(books) {
  const final = [];
  const arrayOfgenre = [];
  // books.forEach((book) => {
  //   if (!arrayOfgenre.includes(book.genre)) arrayOfgenre.push(book.genre)
  // })

  //try using destructuring
  books.forEach(({ genre }) => {
    if (!arrayOfgenre.includes(genre)) arrayOfgenre.push(genre);
  });

  arrayOfgenre.forEach((genre) => {
    let counter = 0;
    books.forEach((book) => {
      if (book.genre === genre) counter += 1;
    });
    final.push({ name: genre, count: counter });
  });
  return sortingFunction(final);
}

function getMostPopularBooks(books) {
  const final = [];
  const arrayOfBookTitle = [];
  books.forEach((book) => {
    if (!arrayOfBookTitle.includes(book.title))
      arrayOfBookTitle.push(book.title);
  });

  arrayOfBookTitle.forEach((title) => {
    books.forEach((book) => {
      const popularity = book.borrows.length;
      if (title === book.title) final.push({ name: title, count: popularity });
    });
  });

  return sortingFunction(final);
}

function getMostPopularAuthors(books, authors) {
  const final = [];
  const arrayOfAuthorNames = [];
  authors.forEach((author) => {
    arrayOfAuthorNames.push(`${author.name.first} ${author.name.last}`);
  });

  for (let i in arrayOfAuthorNames) {
    const authorName = arrayOfAuthorNames[i];
    for (let i in authors) {
      const author = authors[i];
      if (
        authorName.includes(author.name.first) &&
        authorName.includes(author.name.last)
      ) {
        const res = books.reduce((counter, book) => {
          if (book.authorId === author.id) {
            counter += book.borrows.length;
          }
          return counter;
        }, 0);
        final.push({ name: authorName, count: res });
      }
    }
  }

  // arrayOfAuthorNames.forEach((str) => {
  //   let counter = 0;
  //   authors.forEach((author) => {
  //     if (str.includes(author.name.first) && str.includes(author.name.last)) {
  //       books.forEach((book) => {
  //         if (book.authorId === author.id){
  //           counter += book.borrows.length
  //         }
  //       })
  //     }
  //   })
  //   final.push({name: str, count: counter})
  // })
  return sortingFunction(final);
}

const sortingFunction = (arr) =>
  arr.sort((objectA, objectB) => objectB.count - objectA.count).slice(0, 5);

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
