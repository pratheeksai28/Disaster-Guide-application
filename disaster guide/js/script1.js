// Get references to HTML elements
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

// Function to handle search
function handleSearch() {
    const searchTerm = searchInput.value.trim();

    if (searchTerm === '') {
        alert('Please enter a search term.');
        return;
    }

    // Redirect to another page with the search term as a URL parameter
    window.location.href = `searchresults.html?query=${encodeURIComponent(searchTerm)}`;
}

// Add event listeners
searchButton.addEventListener('click', handleSearch);
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleSearch();
    }
});
