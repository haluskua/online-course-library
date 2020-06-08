//Global selections and variables


const colorDivs = document.querySelectorAll('.color');
const generateBtn = document.querySelector('.generate');
const sliders = document.querySelectorAll('input[type="range]');
const currentHexes = document.querySelectorAll('.color h2');

let initialColors;



//FUNCTIONS
// [[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]

// function that generate Hex **no-library
// function generateHex(){
//     const letters = '#123456789ABCDEF';
//     let hash = '#';
//     for(let i = 0; i< 6; i++){
//         hash += letters[Math.floor(Math.random() * 16)];
//     }
//     return hash;
// }
// [[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]

// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]

function generateHex(){
    const hexColor = chroma.random();
    return hexColor;
}

// [[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]

// let randomHex = generateHex();
// console.log(randomHex);
//function that generates random colors on divs
function randomColors(){
    colorDivs.forEach((div,index) => {
       const hexText = div.children[0];
       const randomColor = generateHex();

       //Add the color to the bg
       div.style.backgroundColor = randomColor;
       hexText.innerText = randomColor;
       //check for contrast
       checkTextContrast(randomColor, hexText);
    });
}

//function for contrast test

function checkTextContrast(color, text){
    const luminance = chroma(color).luminance();
    if (luminance > 0.5) {
        text.style.color = "black";

    }else {
        text.style.color = "white";
    }
}


randomColors();