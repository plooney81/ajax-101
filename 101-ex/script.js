function changePic(address){
    const pic = document.querySelector('.carousel-inner');

    
    pic.innerHTML += `
        <div class="carousel-item">
            <img src="${address}" class="d-block w-100" id="doggoPic">
        </div>`
    changeButtonText(2);
}

function addDropDownItems(someArray){
    const dropMenu = document.querySelector('#breedSelect');
    let newDrop = '';
    for (let index = 0; index < someArray.length; index++){
        newDrop += `<option>${someArray[index]}</option>`
    }
    dropMenu.innerHTML += newDrop;
}


function doggoFetch(){
    fetch("https://dog.ceo/api/breeds/image/random")
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        changePic(data.message);
    });
    
}

function breedFetch(){
    fetch("https://dog.ceo/api/breeds/list")
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            addDropDownItems(data.message);
        })
}

function changeButtonText(param){
    let dogButton = document.querySelector('#doggoBut');

    if(param === 1){
        dogButton.innerHTML = "Generating Doggo............";
        console.log("Changed");
    }else{
        dogButton.innerHTML = "Generate Doggo";

    }
}

document.addEventListener('click', function(e){
    if(e.target.id === 'doggoBut'){
        changeButtonText(1);
        doggoFetch();
    }
});

window.addEventListener('DOMContentLoaded', function() {
    breedFetch();
});