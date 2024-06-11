const searchForm = document.querySelector('.search-form');
const container = document.querySelector('.result');

class Book {
  constructor(object) {
    this.title = object.volumeInfo.title;
    this.description = object.volumeInfo.description;
    this.link = object.volumeInfo.infoLink;
    this.img = object.volumeInfo.imageLinks
      ? object.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150';
  }
}

function render(object) {
  const link = document.createElement('a');
  link.href = object.link;
  link.target = '_blank'; // открываем в новом окне
  link.className = 'card__link';

  const card = document.createElement('div');
  card.className = 'card';

  const title = document.createElement('h2');
  title.textContent = object.title;
  title.className = 'card__title';

  const image = document.createElement('img');
  image.className = 'card__img';
  image.src = object.img;

  const description = document.createElement('p');
  description.className = 'card__paragraph';
  description.textContent = object.description;

  card.append(title, image, description);
  link.append(card);
  container.append(link);
}

searchForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  container.innerHTML = '';

  const searchQuery = document.querySelector('.search-input').value;

  fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`)
    .then((respone) => respone.json())
    .then((resopnse) => {
      resopnse.items.forEach((el) => {
        const book = new Book(el);
        render(book);
      });
    })
    .catch((error) => console.error('Ошибка:', error));
});
