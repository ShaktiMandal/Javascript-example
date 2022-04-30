const colorSpotter = document.getElementsByClassName('colorspotter');
let defaultRow = 4;
let defaultCol = 4;

const createDivElement = (row, col, color) => {

    const divElement = document.createElement('div');
    divElement.id = row + "" + col;
    divElement.style.border = "1px solid white";
    divElement.style.background = color;
    divElement.style.width = "50px";
    divElement.style.height = "50px";
    return divElement;
}

const getRandomColors = function(){
    var ratio = 0.618033988749895;
    
    var hue = (Math.random() + ratio) % 1;
    var saturation = Math.round(Math.random() * 100) % 85;
    var lightness = Math.round(Math.random() * 100) % 85;

    var color = 'hsl(' + Math.round(360 * hue) + ',' + saturation + '%,' + lightness + '%)';
    var oddColor = 'hsl(' + Math.round(360 * hue) + ',' + saturation + '%,' + (lightness + 5) + '%)';

    return {
        color,
        oddColor
    }
}

const onClick = (event) =>
{
    colorSpotter[0].style.animation = 'none';
    const dataAtrribute = event.target.getAttribute('data-odd-color');
    if(dataAtrribute && dataAtrribute === "odd")
    {
        defaultCol = defaultCol + 1;
        defaultRow = defaultRow + 1;
        makeColorSpotterBoard();
    }
    else
    {
        window.requestAnimationFrame(() => {
            colorSpotter[0].style.animation = 'shake 0.6s ease-in-out';
        })
  
        colorSpotter[0].classList.add('animatedchess');
    }
}

const makeColorSpotterBoard = () =>
{
    let isOddColorUpdated = false;
    const colors = getRandomColors();
    const randomColIndex = Math.floor(Math.random() * defaultRow);
    updateColorSpotterContainer();

    for(let rowIndex = 0; rowIndex < defaultRow; rowIndex++)
    {
        for(let colIndex = 0; colIndex < defaultCol; colIndex++)
        {
            const divElement = createDivElement(rowIndex, colIndex, colors.color);
            if(colIndex === randomColIndex && isOddColorUpdated === false)
            {
                divElement.style.background = colors.oddColor;
                divElement.setAttribute('data-odd-color', "odd");
                isOddColorUpdated = true;
            }
            
            divElement.addEventListener('click', onClick)
            colorSpotter[0].appendChild(divElement);
        }
    }

   
}

const updateColorSpotterContainer = () =>
{
    colorSpotter[0].innerHTML = "";
    colorSpotter[0].style.gridTemplateColumns = `repeat(${defaultCol}, 50px)`;
    colorSpotter[0].style.height = "100%";
    colorSpotter[0].style.width = `${defaultCol * 50}px`;
}

const initialize = () => 
{   
    makeColorSpotterBoard();
}

initialize();