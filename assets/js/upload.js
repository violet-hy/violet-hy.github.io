document.getElementById('upload').addEventListener('submit',async function(event){
    event.preventDefault();
    const imgID = document.getElementById('imgID').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    // const output = JSON.stringify({imgID, title, description})
    // console.log(output)

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