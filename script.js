let booksContainer = document.querySelector(".booksContainer"),
addBookForm = document.getElementById("newBookForm"),
addBookButton = document.querySelector(".addBookButton"),

myLibrary = [],
bookCard, newBook, formDataTitle, formAuthor,formTitle,
formPages,formRead,createCardContainer, createCardTextContainer, createCardUpperText,
createCardLowerText, createCardOptions, createCardRead, createCardDelete,
createButton, trashImg, trashButton

addBookButton.addEventListener("click",submitForm);

function Book(title, author, pages, isRead){
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
};

function submitForm(){
    updateFormData()
    addBookToLibrary()
    addBookForm.reset()
};


function updateFormData(){
    formAuthor = document.getElementById("author")
    formTitle = document.getElementById("title")
    formPages = document.getElementById("pages")
    formRead = document.getElementById("readCheckbox")
}

function addBookToLibrary(){
newBook = new Book (formTitle.value, formAuthor.value, 
    formPages.value, formRead.value)
myLibrary.push(newBook);
updateDOM();
}

function updateDOM(){ 
    createBookCard()
    console.log(myLibrary);
};

function createBookCard(){
    let index = myLibrary.length-1;

    createCardContainer = document.createElement("div")
    createCardContainer.classList.add("cardContainer-" + index)
    booksContainer.appendChild(createCardContainer);   
    
    createCardTextContainer = document.createElement("div")
    createCardTextContainer.classList.add("cardTextContainer")
    createCardContainer.appendChild(createCardTextContainer);

    createCardUpperText = document.createElement("div")
    createCardUpperText.classList.add("cardUpperText")
    createCardUpperText.textContent = "Author"
    createCardTextContainer.appendChild(createCardUpperText);

    createCardLowerText = document.createElement("div")
    createCardLowerText.classList.add("cardLowerText")
    createCardLowerText.textContent = formAuthor.value
    createCardTextContainer.appendChild(createCardLowerText);

    createCardUpperText = document.createElement("div")
    createCardUpperText.classList.add("cardUpperText")
    createCardUpperText.textContent = "Title"
    createCardTextContainer.appendChild(createCardUpperText);

    createCardLowerText = document.createElement("div")
    createCardLowerText.classList.add("cardLowerText")
    createCardLowerText.textContent = formTitle.value
    createCardTextContainer.appendChild(createCardLowerText);

    createCardUpperText = document.createElement("div")
    createCardUpperText.classList.add("cardUpperText")
    createCardUpperText.textContent = "Pages"
    createCardTextContainer.appendChild(createCardUpperText);

    createCardLowerText = document.createElement("div")
    createCardLowerText.classList.add("cardLowerText")
    createCardLowerText.textContent = formPages.value
    createCardTextContainer.appendChild(createCardLowerText);
    
    createCardOptions = document.createElement("div")
    createCardOptions.classList.add("cardOptions")
    createCardContainer.appendChild(createCardOptions);

    createCardRead = document.createElement("div")
    createCardRead.classList.add("cardRead")
    createCardOptions.appendChild(createCardRead)
    createButton = document.createElement("button")
    createButton.textContent="Read"
    createCardRead.appendChild(createButton);

    createCardDelete = document.createElement("div")
    createCardDelete.classList.add("cardDelete")
    createCardOptions.appendChild(createCardDelete)
    trashButton = document.createElement("button")
    createCardDelete.appendChild(trashButton)
    trashImg = document.createElement("IMG")
    trashImg.src = "./images/deleteIcon.png"
    trashButton.appendChild(trashImg);

    trashButton.addEventListener("click", deleteCard);
    
    function deleteCard(){
        let deleteThis = document.querySelector(".cardContainer-" + index)
        deleteThis.remove();
    }
    
}





