const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const bookmarksContainer = document.getElementById("bookmarks-container");
const websiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");

let bookmarks = [];

// show modal, focus on input
function showModal() {
  modal.classList.add("show-modal");
  websiteNameEl.focus();
}

// modal event listener
modalShow.addEventListener("click", showModal);
modalClose.addEventListener("click", () =>
  modal.classList.remove("show-modal")
);
window.addEventListener("click", (e) =>
  e.target === modal ? modal.classList.remove("show-modal") : false
);

// validate url format using regex
function validateUrl(nameUrl, urlValue) {
  const expression =
    /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  if (!nameUrl || !urlValue) {
    alert("Error: uncompleted fields");
  }
  if (urlValue.match(regex)) {
    alert("match");
  }
  if (!urlValue.match(regex)) {
    alert("Error: not a valid website url");
    return false;
  }
  return true;
}

function fetchBookmarks() {
  if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  } else {
    bookmarks = [
      {
        name: "Willian Negishi",
        url: "https://www.linkedin.com/in/willian-negishi-2829a4172/",
      },
    ];
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
}

const storeBookmark = (e) => {
  e.preventDefault();
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  if (!urlValue.includes("https://") && !urlValue.includes("http://")) {
    urlValue = `https://${urlValue}`;
  }
  //   console.log(nameValue, urlValue);
  if (!validateUrl(nameValue, urlValue)) {
    return false;
  }
  const bookmark = {
    name: nameValue,
    url: urlValue,
  };
  bookmarks.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
  bookmarkForm.reset();
  websiteNameEl.focus();
};

// event listener
bookmarkForm.addEventListener("submit", storeBookmark);

// Onload
fetchBookmarks();
