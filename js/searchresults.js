// Get the search query from the URL parameter
const urlParams = new URLSearchParams(window.location.search);
const searchQuery = urlParams.get('query');

// Find the header element
const header = document.querySelector('header h1');

// Function to display disasters for the searched city in div2
function displayDisastersForCity(city, disasters) {
    const div2 = document.getElementById('div2');
    div2.innerHTML = `<p>Disasters Prone to in ${city}:</p>`;
    
    // Create a list to display disasters
    const ul = document.createElement('ul');
    disasters.forEach(disaster => {
        const li = document.createElement('li');
        li.textContent = disaster;
        ul.appendChild(li);
    });
    
    div2.appendChild(ul);
}

// Check if the search query exists and if the header element exists
if (searchQuery && header) {
    // Set the search query in the header text and align it to the left
    header.textContent = `Search Results for: "${searchQuery}"`;
    header.style.textAlign = 'left';

    // Construct the filename based on the search query for div3
    const filename = `data/disasters_in_${searchQuery.toLowerCase()}.csv`;

    // Check if the file exists in the folder for div3
    fetch(filename)
        .then(response => {
            if (!response.ok) {
                throw new Error('File not found');
            }
            return response.text();
        })
        .then(csvData => {
            // Parse the CSV data for div3
            Papa.parse(csvData, {
                header: true,
                skipEmptyLines: true,
                complete: function (results) {
                    // Check if data is empty for div3
                    if (results.data.length === 0) {
                        displayDataNotFoundAboveFirstDiv();
                    } else {
                        // Create and populate a table with the data for div3
                        const tableBody = document.getElementById('disaster-table-body');
                        results.data.forEach(item => {
                            const row = document.createElement('tr');
                            row.innerHTML = `<td>${item.Date}</td><td>${item["Event Type"]}</td><td>${item.Severity}</td><td>${item.Description}</td>`;
                            tableBody.appendChild(row);
                        });

                        // Display the entire table in the third div for div3
                        const resultDiv3 = document.getElementById('result-div3');
                        resultDiv3.innerHTML = ''; // Clear any previous content
                        resultDiv3.appendChild(document.getElementById('disaster-table'));
                    }
                }
            });
        })
        .catch(error => {
            // Handle errors related to the CSV file for div3
            console.error(error);
            // Display a "Data not found" message above the first div for div3
            displayDataNotFoundAboveFirstDiv();
        });

    // Construct the filename based on the search query for div2
    const cityFilename = `data/citiesdiv2.csv`;

    // Check if the file exists in the folder for div2
    fetch(cityFilename)
        .then(response => {
            if (!response.ok) {
                throw new Error('File not found');
            }
            return response.text();
        })
        .then(cityCsvData => {
            // Parse the CSV data for div2
            Papa.parse(cityCsvData, {
                header: true,
                skipEmptyLines: true,
                complete: function (cityResults) {
                    // Find the city in the CSV data for div2
                    const cityData = cityResults.data.find(cityInfo => cityInfo.City.toLowerCase() === searchQuery.toLowerCase());

                    if (cityData) {
                        // Extract disasters for the city in div2
                        const disasters = [];
                        for (let i = 1; i <= 3; i++) {
                            const disaster = cityData[`Disaster${i}`];
                            if (disaster) {
                                disasters.push(disaster);
                            }
                        }

                        // Display the disasters for the city in div2
                        displayDisastersForCity(searchQuery, disasters);
                    } else {
                        // Display a message if the city is not found in the CSV for div2
                        const div2 = document.getElementById('div2');
                        div2.innerHTML = `<p>No data found for ${searchQuery}</p>`;
                    }
                }
            });
        })
        .catch(error => {
            // Handle errors related to the CSV file for div2
            console.error(error);
        });
} else {
    // Display a "Search query not found" message above the first div if searchQuery is null
    displayDataNotFoundAboveFirstDiv();
}

// Function to display "Data not found" message above the first div for div3
function displayDataNotFoundAboveFirstDiv() {
    const dataNotFoundDiv = document.getElementById('data-not-found');
    dataNotFoundDiv.innerHTML = '<p>Data not found</p>';
}
