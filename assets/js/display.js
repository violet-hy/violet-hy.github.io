let lastEvaluatedKey = null;
let loading = false;
const API_URL = 'https://h82pxx95va.execute-api.us-west-1.amazonaws.com/main/retrieveresource';

const loadingSpinner = document.getElementById('loadingSpinner');
    
const gallery = document.getElementById('gallery');

async function fetchImages() {
    if (loading) return;
    loading = true;
    
    try {
        const params = new URLSearchParams(); //If we have a last Key value, we encode it into our API request
        if (lastEvaluatedKey) { //Then, lambda can parse that and give us new pictures that we havent seen
            encodedKey = encodeURIComponent(JSON.stringify(lastEvaluatedKey))
            params.append('lastEvaluatedKey', encodedKey );
        }
        
        console.log('Calling Url..: ', `${API_URL}?${params.toString()}`);
        const response = await fetch(`${API_URL}?${params.toString()}`);
        const data = await response.json();
        console.log('data: ', data);
        const responseBody = JSON.parse(data.body);
        console.log('data body: ', responseBody);
        if (response.ok) {
            const files = responseBody.files;
            if (Array.isArray(files) && files.length > 0) {
                console.log('Files: ', files);
            }
            else {
                throw new Error('Files is not an Array');
            }
            
            lastEvaluatedKey = responseBody.lastEvaluatedKey ? JSON.parse(responseBody.lastEvaluatedKey) : null;
            console.log('Last Key: ', lastEvaluatedKey);

            const gallery = document.getElementById('gallery');
            files.forEach(file => {
                const card = document.createElement('div');
                card.classList.add('col-md-4', 'mb-4');
    
                // Construct an image card based on the data we receive
                // Button contains data used in summoning modal
                card.innerHTML = `
                <div class="card">
                    <img src="${file.cdn_url}" class="card-img-top" alt="${file.title}">
                    <div class="card-body d-flex justify-content-between align-items-center">
                        <h5 class="card-title">${file.title}</h5>
                         <div class="btn-group"> 
                            <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#imgModal" data-img-id="${file.cdn_url}" data-description="${file.description}"}>View</button>
                        </div>
                    </div>
                </div>`;
                gallery.appendChild(card);
            });

            

            if (!lastEvaluatedKey) {
                loadMoreButton.style.display = 'none';
            }
            else {
                loadMoreButton.style.display = 'block';
            }

        }  
        else {
            console.error('Error loading images: ', data.error);
        }      

        loadingSpinner.style.display = 'none';
        console.log('Finished Loading');
        loading = false;

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
}

const loadMoreButton = document.getElementById('loadMoreButton');
loadMoreButton.addEventListener('click', () => {fetchImages()});



