const newBookBtn = document.querySelector(".newBookBtn");
const newBookContainer = document.querySelector(".newBookContainer")
const bookName = document.querySelector(".bookName");
const author = document.querySelector(".author")
const pages = document.querySelector(".pages")
const rating = document.querySelector(".rating")
const tableBody = document.querySelector(".tableBody")
const submitBtn = document.querySelector(".submitBtn")
const bookForm = document.querySelector(".bookForm")
const requiredText = document.querySelector(".requiredText")

newBookBtn.addEventListener("click", (e) => {bookForm.reset();
    newBookContainer.classList.add("showForm")})
submitBtn.addEventListener("click", submit)

let library = [];
let ratingValue;

function submit(e){
    e.preventDefault();
    if (bookName.value == "" || author.value == "" || pages.value == "" || document.querySelector('input[name="read"]:checked') == null){
        requiredText.style.display = "block";
        return
    }
    if ((+rating.value) > 10){return alert("Rating greater than 10!")}
    let read = document.querySelector('input[name="read"]:checked').value;
    rate();
    makeObj(bookName.value, author.value, pages.value, read, ratingValue);
    requiredText.style.display = "none";
    bookForm.reset();
}

function rate(){
    if (rating.value == ""){
        ratingValue = "--";
        return
    }
    let num = +rating.value;
    if ((num % 1) == 0){
        ratingValue = `${num}/10`
        return
    }
    ratingValue = `${num.toFixed(1)}/10`;
}


function makeObj(name,author,pages,read,rating){
    let bookObj = new Book(name,author,pages,read,rating);
    library.push(bookObj)
    displayBooks();
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

function displayBooks(){
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
            else if (array[x] == "read"){
                let readBtn = document.createElement("button");
                setSVG(readBtn, library[i].read);
                readBtn.classList.add("readBtns")
                readBtn.addEventListener("click", (e) => library[i].changeReadStatus(e));
                cell.classList.add("readCells")
                cell.appendChild(readBtn);
            }
            else if (x == array.length){
                let xCell = createDelete(cell);
                newRow.appendChild(xCell);
                break
            }
            else{
                cell.textContent = library[i][array[x]]; 
            }
            if ((i % 2) !== 0){
                cell.classList.add("bg-color")
            }
            newRow.appendChild(cell);
        }
        frag.appendChild(newRow);
    }
    tableBody.appendChild(frag);
}

function createDelete(cell){
    cell.classList.add("x-Cell");
    let removeBtn = document.createElement("button");
    removeBtn.classList.add("x-Btn");
    removeBtn.addEventListener("click", removeBook);
    cell.appendChild(removeBtn);
    return cell;
}

function setSVG(btn, status){
    if (status == "Yes"){
        btn.style.backgroundImage = `url("images/check.svg")`;
        return;
    }
    if (status == "No"){
        btn.style.backgroundImage = `url("images/x.svg")`;
        return;
    }
    if (status == "Unfinished"){
        btn.style.backgroundImage = `url("images/triple_dot.svg")`;
        return;
    }
}

function removeBook(e){
    let bookIndex = e.target.parentElement.parentElement.getAttribute("data-index");
    library.splice(bookIndex,1);
    displayBooks();
}


Book.prototype.changeReadStatus = function(e){
    if (this.read == "Yes"){
        this.read = "No"
    }
    else if (this.read == "No"){
        this.read = "Unfinished"
    }
    else if (this.read == "Unfinished"){
        this.read = "Yes"
    }
    console.log(this.read)
    console.log(library)
    setSVG(e.target, this.read)
    
}