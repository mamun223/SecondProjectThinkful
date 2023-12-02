function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id)
}

function findBookById(books, id) {
  return books.find((book) => book.id === id)
}

function partitionBooksByBorrowedStatus(books) {
  const i = 0;
  const arr1 = books.filter((book) =>
    book.borrows[i].returned === false)

  const arr2 = books.filter((book) =>
    book.borrows[i].returned === true)

  return [arr1, arr2]
}

function getBorrowersForBook(book, accounts) {
  const arr = []
  accounts.forEach((account) => 
  {
    const borrowsArray = book.borrows
    borrowsArray.some((obj) => {
      const returned = obj.returned
      if (obj.id === account.id && arr.length < 10) arr.push({...account, returned})
    })
  })
  return arr
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
