const pixelArtGrid = document.getElementById('grid');
let selectedColor = "";


const generateRandomColor = () => {
    return "#" + Math.floor(Math.random()*16777215).toString(16);
}

const createCellElement = () => {
    const divElement = document.createElement('div');
    divElement.classList.add('cell');
    return divElement;
}

const choseYourColor = (event) => {

     selectedColor = event.target.style.backgroundColor;
}

const setBackgroundColor = (element) => {
    const color = generateRandomColor();
    element.style.backgroundColor = color;
    element.addEventListener("click", choseYourColor)
}

const updateCellColor = (event) => {
    const targetEelement = event.target
    if(targetEelement &&  parseInt(targetEelement.id) < 91)
    {
        targetEelement.style.backgroundColor = selectedColor;
    }
}

const onDragStart = (event) => {
    
}

const onDragOver = (event) => {
    event.preventDefault();
}

const onDragEnter = (event) => {
    const currentElement = event.target;
    if(currentElement &&  parseInt(currentElement.id) < 91)
    {
        currentElement.style.backgroundColor = selectedColor;
    }
}

const createCell = (cols, rows) => {
    for(let index = 0; index < cols * rows; index++)
    {
        const element  = createCellElement();
        element.id = index + 1;
        if(index >= (cols * rows) - cols && index < cols * rows)
        {
            setBackgroundColor(element)
        }
        else
        {
            element.draggable = true;
            element.addEventListener('click', updateCellColor);
            element.addEventListener('dragstart', onDragStart);
            element.addEventListener('dragover', onDragOver);
            element.addEventListener('dragenter', onDragEnter);
        }
        pixelArtGrid.appendChild(element);
    }
}

createCell(10, 10);