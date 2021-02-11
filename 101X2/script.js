const dogButton = document.querySelector('#dogButton')

const changeButtonText = (isGenerating) => {
    let buttonText = isGenerating ? 'Generating Doggos' : 'Generate Doggos';
    dogButton.innerText = buttonText
}

dogButton.addEventListener("click", () => {
    changeButtonText(true);
    fetch("https://dog.ceo/api/breeds/image/random")
        .then(res => res.json())
        .then(data => {
            const newImage = `<img src="${data.message}" style="width: 300px; height: auto;">`
            document.querySelector('#dogPics').innerHTML += newImage;
            changeButtonText(false)
        })
        .catch(e => {
            console.log(e)
        })
})