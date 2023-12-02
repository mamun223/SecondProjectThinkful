function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => {
    const lastNameA = accountA.name.last.toLowerCase();
    const lastNameB = accountB.name.last.toLowerCase();
    if (lastNameA < lastNameB) {
      return -1;
    } else if (lastNameA > lastNameB) {
      return 1;
    } else {
      return 0;
    }
  });
}

function getTotalNumberOfBorrows(account, books) {
  const arrayOfBorrows = books.map((book) => book.borrows);
  const userId = account.id;
  let counter = 0;
  for (let i in arrayOfBorrows) {
    for (let j in arrayOfBorrows[i]) {
      arrayOfBorrows[i][j].id === userId ? (counter += 1) : counter;
    }
  }
  return counter;
}

function getBooksPossessedByAccount(account, books, authors) {
  const userId = account.id;
  const booksPossessed = books.filter((book) =>
    book.borrows.some(
      (borrower) => borrower.id === userId && borrower.returned === false
    )
    );
  const result = booksPossessed.map((book) => {
    const author = authors.find((author) => author.id === book.authorId);
    return { ...book, author };
  });
  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
