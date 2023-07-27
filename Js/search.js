/*pagination*/
  // Function to handle pagination
  const cardsPerPage = 20;
  let currentVisiblePage = 1;

  // Function to handle pagination
  function paginate(pageNum) {
    const cards = document.querySelectorAll('.card');

    cards.forEach((card, index) => {
      if (index >= (pageNum - 1) * cardsPerPage && index < pageNum * cardsPerPage) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });

    currentVisiblePage = pageNum;
    updatePaginationButtons();
  }

  // Function to create pagination buttons
  function createPaginationButtons(totalPages) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement('button');
      button.textContent = i;
      button.addEventListener('click', () => paginate(i));
      paginationContainer.appendChild(button);
    }

    updatePaginationButtons();
  }

  // Function to update pagination button states (active/inactive)
  function updatePaginationButtons() {
    const buttons = document.querySelectorAll('.pagination button');
    buttons.forEach((button, index) => {
      if (index + 1 === currentVisiblePage) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }

  // On page load, paginate to the first page and create the pagination buttons
  window.onload = () => {
    const cards = document.querySelectorAll('.card');
    const totalPages = Math.ceil(cards.length / cardsPerPage);

    createPaginationButtons(totalPages);
    paginate(1);
  };
  
  



  /*filter*/
  let selectedGenre = "all"; // Global variable to store the currently selected genre
  
  document.addEventListener("DOMContentLoaded", function() {
    const genreOptions = document.querySelectorAll(".genre-option");
    const gameCards = document.querySelectorAll(".card");
  
    genreOptions.forEach(option => {
      option.addEventListener("click", function() {
        selectedGenre = option.getAttribute("data-value");
  
        // Menambahkan class 'selected' ke opsi genre yang dipilih
        genreOptions.forEach(opt => opt.classList.remove("selected"));
        option.classList.add("selected");
  
        // Call the search function whenever a genre option is clicked
        search();
      });
    });
  
    // Call the search function on initial load to display all cards
    search();
  });
  
  function search() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const titleGameElements = document.querySelectorAll(".card-content .title-game");
    const notFoundMessage = document.getElementById("notFoundMessage");
  
    let foundResult = false; // Variable to track if any matching result is found
  
    for (const titleGameElement of titleGameElements) {
      const actualTitleElements = titleGameElement.querySelectorAll(".card-title");
      let displayCard = false;
  
      for (const titleElement of actualTitleElements) {
        const actualTitle = titleElement.textContent.trim().toLowerCase();
        if (actualTitle.includes(searchInput) && (selectedGenre === "all" || titleGameElement.closest('.card').getAttribute("data-genre").includes(selectedGenre))) {
          displayCard = true;
          foundResult = true; // Set to true if any matching result is found
          break;
        }
      }
  
      titleGameElement.closest('.card').style.display = displayCard ? "block" : "none";
    }
  
    // Show/hide "Not Found" message based on foundResult
    notFoundMessage.style.display = foundResult ? "none" : "block";
  }
  
  // Attach the search function to the search button click event
  document.getElementById("searchButton").addEventListener("click", search);
  
  // Attach the search function to the search input change event
  document.getElementById("searchInput").addEventListener("input", search);
    