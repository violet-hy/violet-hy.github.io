document.addEventListener('DOMContentLoaded', async function () {
    // URL of the API Gateway endpoint
    const apiUrl = 'https://h82pxx95va.execute-api.us-west-1.amazonaws.com/main/retrieveresource';

    const loadingSpinner = document.getElementById('loadingSpinner');
    
    const gallery = document.getElementById('gallery');

    // Function to fetch and display images + JSON pairs
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();  // Parse the JSON from the response

        // Now parse the 'body' part of the response, which is a stringified JSON array
        const parsedData = JSON.parse(data.body);  // Convert the stringified array into an actual array

        const gallery = document.getElementById('gallery');
        gallery.innerHTML = ''; // Clear content before adding new items

        parsedData.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('col-md-4', 'mb-4');

            // Construct an image card based on the data we receive
            // Button contains data used in summoning modal
            card.innerHTML = `
            <div class="card">
                <img src="${item.image}" class="card-img-top" alt="${item.title}">
                <div class="card-body d-flex justify-content-between align-items-center">
                    <h5 class="card-title">${item.title}</h5>
                     <div class="btn-group"> 
                        <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#imgModal" data-img-id="${item.image}" data-description="${item.json.description}"}>View</button>
                    </div>
                </div>
            </div>`;


            gallery.appendChild(card);

        });


        loadingSpinner.style.display = 'none';
        console.log('Finished Loading');

        const modal = document.getElementById('imgModal');
        modal.addEventListener('show.bs.modal', function(event) {
            console.log('Modal Triggered');
            const button = event.relatedTarget; // Button that triggered the modal
            const image = button.getAttribute('data-img-id'); 
            const description = button.getAttribute('data-description'); 

            // Update modal content
            const modalImage = document.getElementById('modal-img');
            const modalDescription = document.getElementById('modal-desc');

            modalImage.src = image;
            modalDescription.textContent = description;
        });


    } catch (error) {
        loadingSpinner.style.display = 'none';
        gallery.innerHTML = '<h1 class="text-danger">Error loading gallery</h1>'
        console.error('Error fetching data:', error);
    }
});