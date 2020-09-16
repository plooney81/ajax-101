
// Traditional AJAX request
// const request = new XMLHttpRequest();
// request.onreadystatechange = function () {
//     if(this.readyState === 4 && this.status === 200){
//         console.log(this.responseText);
//     }
// };
// request.open("GET", "./sample.txt");
// request.send();

// Fetch API method
fetch("./sample.txt")
    .then((response)=>{
        return response.text();
    })
    .then((text)=>{
        console.log(text);
    });
    