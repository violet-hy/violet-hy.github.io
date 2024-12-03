document.addEventListener('DOMContentLoaded', async function () {
    // URL of the API Gateway endpoint
    const apiUrl = 'https://h82pxx95va.execute-api.us-west-1.amazonaws.com/main/retrieveresource';

    // Function to fetch and display images + JSON pairs
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();  // Parse the JSON from the response

        // Now parse the 'body' part of the response, which is a stringified JSON array
        const parsedData = JSON.parse(data.body);  // Convert the stringified array into an actual array

        console.log(parsedData);  // Check the structure in the console

        const gallery = document.getElementById('gallery');
        gallery.innerHTML = ''; // Clear content before adding new items

        parsedData.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('col-md-4','mb-4');

            card.innerHTML = `
            <div class="card">
                <img src="${item.image}" class="card-img-top" alt="${item.title}">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">${item.json.description}</p>
                </div>
            </div>`;


            gallery.appendChild(card);
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
});