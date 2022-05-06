let booksContainer = document.querySelector(".booksContainer"),
addBookForm = document.getElementById("newBookForm"),
addBookButton = document.querySelector(".addBookButton"),
totalBooks = document.querySelector(".totalBooks"),
totalPages = document.querySelector(".totalPages"),
totalRead = document.querySelector(".totalRead"),
totalUnread = document.querySelector(".totalUnread"),
bookFormContainer = document.querySelector(".addBookForm"),

myLibrary = [],
bookCard, newBook, formDataTitle, formAuthor,formTitle,
formPages,formRead, invalidMessage = 0,
totalBooksValue = 0, 
totalReadValue = 0, 
totalUnreadValue = 0,
totalPageValue
updateTotalBooks()
updateTotalPages()
updateRead()


addBookButton.addEventListener("click",submitForm);

function Book(title, author, pages, isRead){
    this.title = title
    this.author = author

    if (!pages)
    {this.pages = 0} 
    else 
    {this.pages = pages}
    
    this.isRead = isRead
    this.active = true
};

function submitForm(){
    updateFormData()

    if(checkValidity()){
        addBookToLibrary()
        invalidFormToggle(1)
        addBookForm.reset()
    } else {
        invalidFormToggle(0)
    }
};

function invalidFormToggle(isValid){
if (isValid == 0 && invalidMessage == 0){
    invalidMessage = document.createElement("p")
    invalidMessage.textContent = "Please fill out the form"
    invalidMessage.style.color = "red"
    bookFormContainer.appendChild(invalidMessage)
    } else if (isValid == 1 && invalidMessage !== 0){
        invalidMessage.remove()
        invalidMessage = 0
    }
}


function checkValidity(){
    if(formAuthor.value == "" || formTitle.value == "" 
    || formPages.value <1 )
    {
        return false
    } else 
    {
        return true
    }
}


function updateFormData(){
    formAuthor = document.getElementById("author")
    formTitle = document.getElementById("title")
    formPages = document.getElementById("pages")
    formRead = document.getElementById("readCheckbox")
};
function addBookToLibrary(){
newBook = new Book (formTitle.value, formAuthor.value, 
    formPages.value, formRead.checked)
myLibrary.push(newBook);
createBookCard()
updateTotalBooks()
updateTotalPages()
updateRead()
};

function createBookCard(){
    let index = myLibrary.length-1, createCardContainer, createCardTextContainer, createCardUpperText,
    createCardLowerText, createCardOptions, createCardRead, createCardDelete,
    readButton, trashImg, trashButton
    
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
    readButton = document.createElement("button")
    readButton.classList.add("readDisplay-" + index)
    createCardRead.appendChild(readButton)
    readStatus()

    createCardDelete = document.createElement("div")
    createCardDelete.classList.add("cardDelete")
    createCardOptions.appendChild(createCardDelete)
    trashButton = document.createElement("button")
    createCardDelete.appendChild(trashButton)
    trashImg = document.createElement("IMG")
    trashImg.src = "./images/deleteIcon.png"
    trashButton.appendChild(trashImg);

    trashButton.addEventListener("click", deleteCard);
    readButton.addEventListener("click", toggleReadStatus);
    
    function readStatus(){
        if (myLibrary[index].isRead){
            readButton.textContent="Read"
            readButton.style.backgroundColor = "rgb(15, 179, 0)";
        } else {
            readButton.textContent="Unread"
            readButton.style.backgroundColor = "red";
        }
        updateRead()
    }

    function toggleReadStatus(){

        if (myLibrary[index].isRead){
            myLibrary[index].isRead = false;
        } else{
            myLibrary[index].isRead = true;
        }

        readStatus()
    }

    function deleteCard(){
        let deleteThis = document.querySelector(".cardContainer-" + index)
        deleteThis.remove();
        myLibrary[index].active = false; 
        updateTotalBooks();
        updateTotalPages();
        updateRead();
    }
};

function updateTotalBooks(){
    totalBooksValue = 0
    for(let i = 0; i < myLibrary.length; i++){
        if (myLibrary[i].active){
            totalBooksValue++
        }
    }



    totalBooks.textContent = "Total Books: " + totalBooksValue;
}

function updateTotalPages(){
    totalPageValue = 0
        for(let i = 0; i < myLibrary.length; i++){
            if (myLibrary[i].active){
            totalPageValue += parseInt(myLibrary[i].pages)
            } 
        }
        totalPages.textContent = "Total Pages: " + totalPageValue;
    }

function updateRead(){
    totalReadValue = 0
    for(let i = 0; i < myLibrary.length; i++){
        if (myLibrary[i].active && myLibrary[i].isRead){
            totalReadValue++
        }
    }

    totalUnreadValue = totalBooksValue - totalReadValue;

    totalRead.textContent = "Total Read: " + totalReadValue;
    totalUnread.textContent = "Total Unread: " + totalUnreadValue;
}
