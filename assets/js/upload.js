document.getElementById('upload').addEventListener('submit',async function(event){
    event.preventDefault();

    // API endpoint
    const endpoint = 'https://h82pxx95va.execute-api.us-west-1.amazonaws.com/main/uploadresource';
    //grab the auth token from url 
    const id_token = () => {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        console.log(hashParams.get('id_token'));
        return hashParams.get('id_token');
    };
    
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    
    const formData = new FormData();

    const jsonData = {
            title: title,
            description: description
        }
    
    const imgData = document.getElementById('imgFile').files[0];
    let imgDataB64 = "";

    if (imgData) {
        const reader = new FileReader();

        reader.onloadend = () =>{
            imgDataB64 = reader.result.split(',')[1];
            console.log(imgDataB64)

            formData.append('imgData', imgDataB64);
            formData.append('jsonData', JSON.stringify(jsonData));

            sendData(formData);
        }
        reader.readAsDataURL(imgData);
    }
    
    // send a POST request to our API containing our image and description
    async function sendData(formData) { 
        
        try{
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Authorization': id_token(),
                },
                body: formData
            });
    
            const result = await response.json();
            alert(result.message);
        }
        catch(error) {
            console.error('Upload Error',error)
        }
    }
        
    



    
    
})