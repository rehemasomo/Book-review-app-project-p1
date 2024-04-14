
document.addEventListener('DOMContentLoaded', function() {
    // book data
    let books = [
        { id: 1, title: "THE ADVENTURES OF AMINA AL-SIRAFI", author: "S.A. CHAKRABORTY", genre: "Fantasy Fiction", review: "Amina Al-Sirafi is a middle-aged single mother with bad knees who lives in a modest country house and minds her own business." },
        { id: 2, title: "HOMECOMING", author: "KATE MORTON", genre: "Mystery", review: "The shocking crime, the effects of which echo across continents and generations, is never solved. The town of Tambilla becomes the setting of one of the most baffling murder investigations in the history of South Australia." },
        { id: 3, title: "VERA WONG’S UNSOLICITED ADVICE FOR MURDERERS", author: "JESSE Q. SUTANTO", genre: "Mystery", review: "As the narrative progresses, we follow Vera as she goes about unraveling the mystery behind Marshall Chen's death. Vera Wong's Unsolicited Advice for Murderers by Jesse Q. Sutanto is an entertaining, cozy mystery. I loved how the author depicts the friendship that develops between Vera and her “suspects”." },
        { id: 4, title: "THE LAST TALE OF THE FLOWER BRIDE", author: "ROSHANI CHOKSHI", genre: "Fairy Tale", review: "The Last Tale of the Flower Bride is a luscious gothic feast, interlaced with fairytales, myth, and the treacherous secrets of a marriage. Wandering the halls of the crumbling House of Dreams, Chokshi spins her tale, interweaving fairy tales into the central narrative amidst broken promises and childhood dreams." },
        { id: 5, title: "THE INVOCATIONS", author: "KRYSTAL SUTHERLAND", genre: "Fantasy Fiction", review: "A thrilling dark YA urban fantasy about three young women and their demons. 'This is another brilliant and layered dark urban fantasy story from Krystal Sutherland" },
        { id: 6, title: "HOW TO SELL A HAUNTED HOUSE", author: "GRADY HENDRIX", genre: "Horror Fiction", review: "It's another batshit crazy story, with a lot of heart, which is quintessential Hendrix. His twist on the haunted house genre is awesome and ripe for the modern age. You will feel spooked – and moved. And it might make you look twice at any childhood toys you have lying around." },
        { id: 7, title: "THE SOULMATE", author: "SALLY HEPWORTH", genre: "Thriller", review: "Hepworth is a master of suspense, teasing out a complicated and deadly tale as well as she teases out the complicated and occasionally deadly individuals behind it. None of the four “soulmates”—Pippa, Gabe, Amanda and Amanda's husband—are all good or bad." },
        { id: 8, title: "SILVER IN THE BONE", author: "ALEXANDRA BRACKEN", genre: "Fantasy Fiction", review: "Silver in the Bone is a YA urban fantasy inspired by Arthurian legend with epic battles, a unique found family, lies, betrayal, curses, romance, and so much more. I love the author's writing style, use of dialogue, and interesting characters, but I struggled a bit with the world building and pacing" },
        { id: 9, title: "GREYMIST FAIR BY FRANCESCA ZAPPIA", author: "FRANCESCA ZAPPIA", genre: "Paranormal Fiction", review: "From acclaimed author Francesca Zappia, Greymist Fair is a suspenseful and inventive murder mystery infused with magic and inspired by the lesser-known fairy tales of the Brothers Grimm. Two roads lead into a dark forest." }
    ];

    // Function to display book details
    function displayBookDetails(bookTitle) {
        const selectedBook = books.find(book => book.title === bookTitle);

        if (selectedBook) {
        
            document.getElementById("book-title").textContent = `Title: ${selectedBook.title}`;
            document.getElementById("book-author").textContent = `Author: ${selectedBook.author}`;
            document.getElementById("book-genre").textContent = `Genre: ${selectedBook.genre}`;
            document.getElementById("book-review").textContent = `Review: ${selectedBook.review}`;
        } else {
            console.error("Book not found with title:", bookTitle);
        }
    }

    const bookListItems = document.querySelectorAll('#available-books li');
    bookListItems.forEach(item => {
        item.addEventListener('click', function() {
            const bookTitle = this.textContent;
            displayBookDetails(bookTitle);
        });
    });
//function for adding book form
    function handleAddBookFormSubmit(event) {
        event.preventDefault(); 

        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const genre = document.getElementById('genre').value;
        const review = document.getElementById('review').value;
        const newBook = { title, author, genre, review };
        addBook(newBook);

        document.getElementById('add-book-form').reset();
    }

    const addBookForm = document.getElementById('add-book-form');
    addBookForm.addEventListener('submit', handleAddBookFormSubmit);

    displayBookDetails("THE ADVENTURES OF AMINA AL-SIRAFI"); // Display details of the first book by default
});


document.addEventListener('DOMContentLoaded', function() {  
    const books = []; 
    // Function to display book details
    function displayBookDetails(bookTitle) {
        // Find the selected book from the books array
        const selectedBook = books.find(book => book.title === bookTitle);

        if (selectedBook) {
            document.getElementById("book-title").textContent = `Title: ${selectedBook.title}`;
            document.getElementById("book-author").textContent = `Author: ${selectedBook.author}`;
            document.getElementById("book-genre").textContent = `Genre: ${selectedBook.genre}`;
            document.getElementById("book-review").textContent = `Review: ${selectedBook.review}`;
            document.getElementById("delete-button").style.display = "block";
            document.getElementById("delete-button").setAttribute("data-id", selectedBook.id);
        } else {
            console.error("Book not found with title:", bookTitle);
        }
    }

    // Function to add a new book
    function addBook(newBook) {
        books.push(newBook); 
        updateAvailableBooksList();
    }

    // Function to update 
    function updateAvailableBooksList() {
        const availableBooksList = document.getElementById('available-books');

books.forEach(book => {
    const listItem = document.createElement('li');
    listItem.textContent = book.title;

            //  delete button 
            const deleteButton = document.createElement('button');
            deleteButton.textContent = "Delete";
            deleteButton.setAttribute("data-id", book.id); 
            deleteButton.addEventListener('click', function(event) {
                event.stopPropagation(); 
                const bookId = parseInt(this.getAttribute('data-id'));
                deleteBook(bookId);
            });

            listItem.appendChild(deleteButton);

            listItem.addEventListener('click', function() {
                displayBookDetails(book.title);
            });
            availableBooksList.appendChild(listItem);
        });

   }
// Function to delete a book
function deleteBook(id) {
    const index = books.findIndex(book => book.id === id);

    if (index !== -1) {
        // Remove the book 
        books.splice(index, 1);
        
        const listItem = document.querySelector(`li[data-id="${id}"]`);
        if (listItem) {
            listItem.remove();
        }
        
        if (books.length > 0) {
            displayBookDetails(books[0].title);
        } else {
    
            document.getElementById("book-details").innerHTML = "";
        }
    } else {
        console.error('Book not found with id:', id);
    }
}

//add book form
    const addBookForm = document.getElementById('add-book-form');
    addBookForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const genre = document.getElementById('genre').value;
        const review = document.getElementById('review').value;

        const newBook = { title, author, genre, review, id: books.length + 1 };

        addBook(newBook);
        addBookForm.reset();
    })
    document.getElementById("delete-button").addEventListener("click", function(event) {
        const bookId = parseInt(this.getAttribute('data-id'));
        deleteBook(bookId);
    });

    displayBookDetails("");

});