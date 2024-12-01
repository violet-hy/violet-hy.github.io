document.getElementById('upload').addEventListener('submit',async function(event){
    event.preventDefault();

    const imgID = document.getElementById('imgID').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    const id_token = () => {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        console.log(hashParams.get('id_token'));
        return hashParams.get('id_token');
    };


    const formData = {
        [imgID]: {
            title: title,
            description: description
        }
    };

    const endpoint = 'https://h82pxx95va.execute-api.us-west-1.amazonaws.com/main/uploadresource';

    try{
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': id_token()
            },
            body: JSON.stringify(formData)
        })

        const result = await response.JSON();
        alert(result.message);
    }
    catch(error) {
        console.error('Upload Error',error)
    }
    
})