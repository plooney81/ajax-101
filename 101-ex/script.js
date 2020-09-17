function updateProgressBar(progress){
    const progBar = document.querySelector('.progress-bar');

    progBar.setAttribute('style', `width: ${progress}%;`);
}

function addDropDownItems(someArray){
    const dropMenu = document.querySelector('#breedSelect');
    let newDrop = '';
    for (let index = 0; index < someArray.length; index++){
        newDrop += `<option>${someArray[index]}</option>`
    }
    dropMenu.innerHTML = newDrop;
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

function breedSelectFetch(breed){
    fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            console.log(data.message);
            changePic(data.message);
        })
}
let numb = 0;
function changePic(address){
    const pic = document.querySelector('.carousel-inner');
    let text = '';
    if (numb === 0){
        text = `
        <div class="carousel-item active">
            <img src="${address}" class="d-block w-100" id="doggoPic">
        </div>`
    }else{
        text = `
        <div class="carousel-item">
            <img src="${address}" class="d-block w-100" id="doggoPic">
        </div>`
    }
    pic.innerHTML += text;
    changeButtonText(2);
    numb ++;
}

function doggoFetch(){
    // fetch("https://dog.ceo/api/breeds/image/random")
    // .then((response)=>{
    //     return response.json();
    // })
    // .then((data)=>{
    //     changePic(data.message);
    // });

    // progress bar logic attempt, unfortunately our if(e.lengthComputable) is evaluating to false
    // this probably means that the server never sent a content-length header in the response...so we don't have a way of getting
    // the total length for our progress bar logic.
    // https://developer.mozilla.org/en-US/docs/Web/API/ProgressEvent/total
    let client = new XMLHttpRequest()
    client.addEventListener('progress', (e)=>{
        if(e.lengthComputable){
            console.log(e.type, e.loaded, e.total);
            let percentComplete = (e.loaded / e.total)*100;
            updateProgressBar(percentComplete);
        }
    })
    client.open("GET", "https://dog.ceo/api/breeds/image/random")

    client.onreadystatechange = function () {
        if(this.readyState === 4 && this.status === 200){
           changePic(JSON.parse(this.responseText).message);
        }
    }

    client.send()
    
    
}

function changeButtonText(param){
    let dogButton = document.querySelector('#doggoBut');

    if(param === 1){
        dogButton.innerHTML = "Generating Doggos............";
        console.log("Changed");
    }else{
        dogButton.innerHTML = "Generate Doggos";

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

// about me isn't required, its a textarea that has a max length of 250 characters
document.querySelector('#breedSelect').addEventListener('change', (e)=>{
    const breed = e.target.value;
    breedSelectFetch(breed);
})