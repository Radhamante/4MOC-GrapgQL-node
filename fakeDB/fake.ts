export const book1 = {
    id: 1,
    title: 'book1',
    isbn: "book1",
    author: "book1",
    date: "book1",
    imageUrl: "book1",
    genre: "THRILLER",
    library: {},
    borrower:{},
    historys: [{}]
};
export const book2 = {
    id: 1,
    title: 'book2',
    isbn: "book2",
    author: "book2",
    date: "book2",
    imageUrl: "book2",
    genre: "THRILLER",
    library:{},
    borrower:{},
    historys: [{}]
};
export const book3 = {
    id: 1,
    title: 'book3',
    isbn: "book3",
    author: "book3",
    date: "book3",
    imageUrl: "book3",
    genre: "THRILLER",
    library:{},
    borrower:{},
    historys: [{}]
};


export const library1 = {
    id: 1,
    name: "library1",
    books: [{}],
    address: {}
};
export const library2 = {
    id: 2,
    name: "library2",
    books: [{}],
    address: {}
};
export const library3 = {
    id: 3,
    name: "library3",
    books: [{}],
    address: {}
};



export const address1 = {
    long: 123.324234,
    lat: 123.324234,
    name: "address1",
};
export const address2 = {
    long: 123.324234,
    lat: 123.324234,
    name: "address2",
};
export const address3 = {
    long: 123.324234,
    lat: 123.324234,
    name: "address3",
};


export const user1 = {
    id: 1,
    name: "user1",
    email: "user1",
    password: "user1",
    books_borrowed: [book1],
    isAdmin: true,
    gender: "MALE",
    historys: [{}]
};
user1.historys= [{book: book2, user: user1, startDate:"y'a 4 jours", endDate: "y'a 1 jour"}, {book: book2, user: user1, startDate:"y'a 2 jours", endDate: undefined}]
book2.historys= [{book: book2, user: user1, startDate:"y'a 4 jours", endDate: "y'a 1 jour"}, {book: book2, user: user1, startDate:"y'a 2 jours", endDate: undefined}]
export const user2 = {
    id: 2,
    name: "user2",
    email: "user2",
    password: "user2",
    books_borrowed: [book2],
    isAdmin: true,
    gender: "MALE",
    historys: [{}]
};
user2.historys= [{book: book3, user: user2, startDate:"y'a 4 jours", endDate: "y'a 1 jour"}, {book: book3, user: user2, startDate:"y'a 2 jours", endDate: undefined}]
book3.historys= [{book: book3, user: user2, startDate:"y'a 4 jours", endDate: "y'a 1 jour"}, {book: book3, user: user2, startDate:"y'a 2 jours", endDate: undefined}]
export const user3 = {
    id: 3,
    name: "user3",
    email: "user3",
    password: "user3",
    books_borrowed: [],
    isAdmin: true,
    gender: "MALE",
    historys: [{}]
};
user3.historys= [{book: book1, user: user3, startDate:"y'a 4 jours", endDate: "y'a 1 jour"}, {book: book1, user: user3, startDate:"y'a 2 jours", endDate: undefined}]
book1.historys= [{book: book1, user: user3, startDate:"y'a 4 jours", endDate: "y'a 1 jour"}, {book: book1, user: user3, startDate:"y'a 2 jours", endDate: undefined}]

book1.library = library1
book1.borrower = user1
library1.books = [book1]
library1.address = address1

book2.library = library2
book2.borrower = user2
library1.books = [book2]
library2.address = address2

book3.library = library3
library1.books = [book3]
library3.address = address3

