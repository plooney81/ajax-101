function changePic(address){
    const pic = document.querySelector('#doggoPic');
    pic.setAttribute('src', `${address}`);
    changeButtonText(2);
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