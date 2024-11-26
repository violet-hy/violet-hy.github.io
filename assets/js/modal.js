const imgModal = document.getElementById('imgModal');
if (imgModal) {
  imgModal.addEventListener('show.bs.modal', event => {

    const button = event.relatedTarget;
    var imgId = button.getAttribute('data-img-id');
    //console.log(imageId)


    fetch('assets/json/descriptions.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Response was not ok');
            }
            return response.json();
        })
        .then(data=> {
            var imgData = data[imgId];

            if(imgData)
            {
                var modalImg=document.getElementById('modal-img');
                var modalTitle=document.getElementById('modal-title');
                var modalDesc=document.getElementById('modal-desc');

                modalImg.src = 'assets/img/arcane/' + imgId + '.png';
                modalDesc.textContent = imgData.description;
                modalTitle.textContent = imgData.title
            }
            else{
                console.error("Cant find data for image ID " + imgId)
            }
        })
        .catch(error=> {console.error("Error loading description data:", error)})



    

   
 

  })
}