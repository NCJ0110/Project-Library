const libraryEl = document.querySelector('.library');
const newBookBtn = document.querySelector('.new-book-btn');
const addBookBtn = document.querySelector('.add-book-btn');
let deleteBtn;
const openFormModal = document.querySelector('.open-form-modal');
const formModal = document.querySelector('.form-modal');
const closeModal = document.querySelector('.close-modal');
const titleEl = document.querySelector('#title');
const authorEl = document.querySelector('#author');
const readEl = document.querySelector('#read');
const addBook = document.querySelector('#add-book');

let myLibrary = [];

function Book(title, author, hasRead) {
  (this.title = title), (this.author = author), (this.hasRead = hasRead);
}

function addBookToLibrary(e) {
  if (!(titleEl.value === '' || authorEl.value === '')) {
    e.preventDefault();
    const newBook = new Book(titleEl.value, authorEl.value, readEl.checked);
    myLibrary.push(newBook);
    refreshLibrary(libraryEl);
    displayBooks(myLibrary, libraryEl);
    closeNewBookModal();
    titleEl.value = '';
    authorEl.value = '';
    readEl.checked = 'false';
  }
  return;
}

function createCard(currentBook, i) {
  let newDiv = document.createElement('div');
  let newHeader = document.createElement('h1');
  let newPara = document.createElement('p');
  let deleteCard = document.createElement('button');
  let toggleRead = document.createElement('button');
  newDiv.className = 'card';
  newDiv.dataset.position = i;
  newHeader.innerText = currentBook.title;
  newPara.innerText = currentBook.author;
  deleteCard.innerText = 'Delete Book';
  deleteCard.className = 'delete-btn';
  toggleRead.innerText = currentBook.hasRead ? 'Read' : 'Not Read';
  toggleRead.className = currentBook.hasRead ? 'has-read' : 'has-not-read';

  libraryEl.appendChild(newDiv);
  newDiv.appendChild(newHeader);
  newDiv.appendChild(newPara);
  newDiv.appendChild(deleteCard);
  newDiv.appendChild(toggleRead);

  deleteCard.addEventListener('click', (e) => {
    myLibrary.splice(newDiv.dataset.position, 1);
    refreshLibrary(libraryEl);
    displayBooks(myLibrary, libraryEl);
  });

  toggleRead.addEventListener('click', (e) => {
    myLibrary[i].hasRead = !myLibrary[i].hasRead;
    refreshLibrary(libraryEl);
    displayBooks(myLibrary, libraryEl);
  });
}

function displayBooks(library, libraryElement) {
  library.forEach((book, i) => {
    createCard(book, i);
  });

  if (libraryElement.children.item.length === 1) {
    console.log('test');
    libraryElement.style.justifyContent = 'center';
  }
}

function refreshLibrary(libraryElement) {
  while (libraryElement.children.item(1)) {
    libraryElement.removeChild(libraryElement.children.item(1));
  }
}

function newBookModal() {
  formModal.style.display = 'flex';
}

function closeNewBookModal() {
  formModal.style.display = 'none';
  titleEl.value = '';
  authorEl.value = '';
  readEl.checked = 'false';
}

openFormModal.addEventListener('click', newBookModal);
closeModal.addEventListener('click', closeNewBookModal);
addBookBtn.addEventListener('click', addBookToLibrary);

displayBooks(myLibrary, libraryEl);
