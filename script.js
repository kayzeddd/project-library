const newBookBtn = document.querySelector(".newBookBtn");
const newBookContainer = document.querySelector(".newBookContainer")
const bookName = document.querySelector(".bookName");
const author = document.querySelector(".author")
const pages = document.querySelector(".pages")
const rating = document.querySelector(".rating")
const tableBody = document.querySelector(".tableBody")
const submitBtn = document.querySelector(".submitBtn")
const bookForm = document.querySelector(".bookForm")

newBookBtn.addEventListener("click", (e) => {newBookContainer.classList.add("showForm")})
submitBtn.addEventListener("click", submit)

let library = [];
let ratingValue;

function submit(e){
    e.preventDefault();
    let read = document.querySelector('input[name="read"]:checked').value
    rate();
    makeObj(bookName.value, author.value, pages.value, read, ratingValue);
    bookForm.reset();
}

function rate(){
    if (rating.value == ""){
        ratingValue = "--";
        return
    }
    ratingValue = rating.value;
}


function makeObj(name,author,pages,read,rating){
    let bookObj = new Book(name,author,pages,read,rating);
    library.push(bookObj)
    displayBooks(library);
}

function Book(name,author,pages,read,rating){
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.rating = rating;
}

function clearBooks(){
    let storedBooks = document.querySelectorAll("tbody tr");
    storedBooks.forEach.call(storedBooks, (book) => {
        tableBody.removeChild(book)
    })
}

function displayBooks(library){
    clearBooks();
    let frag = document.createDocumentFragment();
    let array = ["#", "name", "author", "pages", "read", "rating"]
    for (let i=0; i < library.length; i++){
        let newRow = document.createElement("tr");
        newRow.setAttribute("data-index", i);
        for (let x=0; x <= array.length; x++){
            let cell = document.createElement("td");
            if (x == 0){
                cell.textContent = i + 1;
            }
            else if (x == array.length){
                //cell.classList.add("xCell");
                let removeBtn = document.createElement("button");
                removeBtn.classList.add("xBtn")
                newRow.appendChild(removeBtn);
                break
            }
            else{
                cell.textContent = library[i][array[x]]; 
            }
            newRow.appendChild(cell);
        }
        frag.appendChild(newRow);
    }
    tableBody.appendChild(frag);
}

function displayBooks2(library){
    clearBooks();
    let frag = document.createDocumentFragment();
    for (let i=0; i < library.length; i++){
        let newRow = document.createElement("tr");
        let num = document.createElement("td");
        num.textContent = i + 1;
        let name = document.createElement("td");
        name.textContent = library[i].name;
        let author = document.createElement("td");
        author.textContent = library[i].author;
        let pages = document.createElement("td");
        pages.textContent = library[i].pages;
        let read = document.createElement("td");
        read.textContent = library[i].read;
        let rating = document.createElement("td");
        rating.textContent = library[i].rating;
        newRow.appendChild(num);
        newRow.appendChild(name);
        newRow.appendChild(author);
        newRow.appendChild(pages);
        newRow.appendChild(read);
        newRow.appendChild(rating);
        frag.appendChild(newRow);
    }
    tableBody.appendChild(frag);
}