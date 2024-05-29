var BookmarkName = document.getElementById('bookName');
var bookUrl = document.getElementById('bookUrl');
var bookmarkContainer = [];

// localStorage
if (localStorage.getItem('bookmarks') == null) {
  bookmarkContainer = [];
} else {
  bookmarkContainer = JSON.parse(localStorage.getItem('bookmarks'));
  loadBookmarks();
}

// add bookmark
function Bookmark() {
  var nameValid = validation(BookmarkName);
  var urlValid = validation(bookUrl);
  if (!nameValid || !urlValid) {
    showModal(true);
  }

  var bookmarks = {
    name: BookmarkName.value,
    url: bookUrl.value,
  };
  clearForm();
  bookmarkContainer.push(bookmarks);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarkContainer));
  loadBookmarks();
  console.log(bookmarkContainer);
}

// clear form
function clearForm() {
  BookmarkName.value = null;
  bookUrl.value = null;
}

function loadBookmarks() {
  var cartona = '';
  for (var i = 0; i < bookmarkContainer.length; i++) {
    cartona += `
    <tr>
    <td>${i + 1}</td>
    <td>${bookmarkContainer[i].name}</td>
    <td><a href="${
      bookmarkContainer[i].url
    }" target="_blank" class="btn btn-visit"><i class="fa-solid fa-eye"></i> Visit</a></td>
    <td><button class="btn btn-danger" onClick="deleteBookmark(${i})"> <i class="fa-solid fa-trash-can"></i> Delete</button></td>
  </tr>
    `;
  }
  document.getElementById('bookmarksTableBody').innerHTML = cartona;
}

function deleteBookmark(index) {
  bookmarkContainer.splice(index, 1);
  loadBookmarks();
  localStorage.setItem('bookmarks', JSON.stringify(bookmarkContainer));
}

function validation(elem) {
  var regex = {
    bookName: /^\w{3,}(\s+\w+)*$/,
    bookUrl:
      /https?:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]+(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;%=]*)?/,
  };
  var isValid = regex[elem.id].test(elem.value);
  if (isValid) {
    elem.classList.add('is-valid');
    elem.classList.remove('is-invalid');
    showModal(false); // Hide the modal if the form is valid
  } else {
    elem.classList.remove('is-valid');
    elem.classList.add('is-invalid');
  }
  return isValid;
}

function showModal(show) {
  var modal = document.getElementById('validationModal');
  if (show) {
    modal.style.display = 'block';
  } else {
    modal.style.display = 'none';
  }
}

function closeModal() {
  var modal = document.getElementById('validationModal');
  modal.style.display = 'none';
}
