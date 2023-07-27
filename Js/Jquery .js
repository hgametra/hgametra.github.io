//pagination//

document.addEventListener("DOMContentLoaded", function() {
  var cards = document.querySelectorAll(".card");
  var cardContent = document.querySelector(".card-content");
  var itemsPerPage = 8;
  var currentPage = 1;

  function showPage(page) {
    var startIndex = (page - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;

    for (var i = 0; i < cards.length; i++) {
      if (i >= startIndex && i < endIndex) {
        cards[i].style.display = "block";
      } else {
        cards[i].style.display = "none";
      }
    }
  }

  function createPagination() {
    var pageCount = Math.ceil(cards.length / itemsPerPage);
    var pagination = document.createElement("div");
    pagination.className = "pagination";

    var firstLink = document.createElement("a");
    firstLink.href = "#";
    firstLink.textContent = "<<";
    firstLink.addEventListener("click", function() {
      currentPage = 1;
      showPage(currentPage);
      updatePaginationLinks();
    });
    pagination.appendChild(firstLink);

    var prevLink = document.createElement("a");
    prevLink.href = "#";
    prevLink.textContent = "<Prev";
    prevLink.addEventListener("click", function() {
      if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
        updatePaginationLinks();
      }
    });
    pagination.appendChild(prevLink);

    for (var i = 1; i <= pageCount; i++) {
      var link = document.createElement("a");
      link.href = "#";
      link.textContent = i;

      if (i === currentPage) {
        link.className = "active";
      }

      link.addEventListener("click", function() {
        currentPage = parseInt(this.textContent);
        showPage(currentPage);
        updatePaginationLinks();
      });

      pagination.appendChild(link);
    }

    var nextLink = document.createElement("a");
    nextLink.href = "#";
    nextLink.textContent = "Next>";
    nextLink.addEventListener("click", function() {
      if (currentPage < pageCount) {
        currentPage++;
        showPage(currentPage);
        updatePaginationLinks();
      }
    });
    pagination.appendChild(nextLink);

    var lastLink = document.createElement("a");
    lastLink.href = "#";
    lastLink.textContent = ">>";
    lastLink.addEventListener("click", function() {
      currentPage = pageCount;
      showPage(currentPage);
      updatePaginationLinks();
    });
    pagination.appendChild(lastLink);

    cardContent.parentNode.insertBefore(pagination, cardContent.nextSibling);
  }

  function updatePaginationLinks() {
    var paginationLinks = document.querySelectorAll(".pagination a");
    for (var i = 0; i < paginationLinks.length; i++) {
      paginationLinks[i].classList.remove("active");
      if (parseInt(paginationLinks[i].textContent) === currentPage) {
        paginationLinks[i].classList.add("active");
      }
    }
  }

  showPage(currentPage);
  createPagination();
});



//serch code//

function performSearch() {
  var query = document.getElementById("search-input").value;
  var elements = document.getElementsByTagName("body")[0].getElementsByTagName("*");
  var matchingElements = [];

  for (var i = 0; i < elements.length; i++) {
      if (elements[i].textContent.includes(query)) {
          matchingElements.push(elements[i]);
      }
  }

  displayResults(matchingElements);
}

function displayResults(elements) {
  var resultsContainer = document.getElementById("search-results");
  resultsContainer.innerHTML = "";

  if (elements.length === 0) {
      resultsContainer.innerHTML = "<p>Tidak ada hasil yang ditemukan.</p>";
  } else {
      for (var i = 0; i < elements.length; i++) {
          var element = elements[i];
          var resultItem = document.createElement("div");
          resultItem.innerHTML = "<p><strong>" + element.nodeName + "</strong>: " + element.textContent + "</p>";
          resultsContainer.appendChild(resultItem);
      }
  }
}

