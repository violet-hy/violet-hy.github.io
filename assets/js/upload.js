document.getElementById('upload').addEventListener('submit',async function(event){
    event.preventDefault();

    // API endpoint
    const endpoint = 'https://h82pxx95va.execute-api.us-west-1.amazonaws.com/main/uploadresource';
    //grab the auth token 
    const id_token = sessionStorage.getItem('id_token')
    
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
                    'Authorization': id_token,
                },
                body: formData
            });
    
            const result = await response.json();
            if (result.message == "Unauthorized"){
                alert('Only users are allowed to upload images. Please sign in')
                window.location.href = 'https://us-west-1pu3kj4r7c.auth.us-west-1.amazoncognito.com/login/continue?client_id=463rvuhbiefinjch1atqikd49c&redirect_uri=https%3A%2F%2Fviolet-hy.github.io%2Fupload.html&response_type=token&scope=email+openid+phone'
            }
            else{
            alert(result.message);
            window.location.href= 'display.html'
            }
        }
        catch(error) {
            console.error('Upload Error',error)
        }
    }
        
    



    
    
})