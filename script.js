const newBookBtn = document.querySelector(".newBookBtn");
const newBookContainer = document.querySelector(".newBookContainer")
const bookName = document.querySelector(".bookName");
const author = document.querySelector(".author")
const submitBookBtn = document.querySelector(".submitBookBtn");
const tableBody = document.querySelector(".tableBody")

newBookBtn.addEventListener("click", (e) => {newBookContainer.classList.add("showForm")})
submitBookBtn.addEventListener("click", (e) => makeObj(bookName.value, author.value))

let library = [];

function makeObj(name,author){
    let bookObj = new Book(name,author);
    console.log(bookObj)
    storeInLibrary(bookObj)
}

function Book(name,author){
    this.name = name;
    this.author = author;
}

function storeInLibrary(bookObj){
    library.push(bookObj)
}



function displayBooks(library){
    let frag = document.createDocumentFragment();
    for (let i=0; i < library.length; i++){
        let newRow = document.createElement("tr");
        let name = document.createElement("td");
        name.textContent = library[i].name;
        let author = document.createElement("td");
        author.textContent = library[i].author;
        newRow.appendChild(name);
        newRow.appendChild(author);
        frag.appendChild(newRow);
    }
    tableBody.appendChild(frag);
}
