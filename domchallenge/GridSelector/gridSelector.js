
window.onload = function(){

    const noOfRows = 10;
    const noOfCols = 10;
    let startingPiont;
    let endingPoint;
    let currentPoint;
    const visited = Array(10).fill().map(() => Array(10).fill(false));
    const selectionAreaElement = document.createElement('div');
    selectionAreaElement.style.display = 'none';
    selectionAreaElement.style.position = 'absolute';

    function getRowAndColIndexes(startingPiont, endingPoint) {

        let startingRowIndex = -1;
        let startingColIndex = -1;
        let endingRowIndex = -1;
        let endingColIndex  = -1;

        if(startingPiont && endingPoint){

            startingRowIndex = startingPiont[0];
            startingColIndex = startingPiont[1];
            endingRowIndex = endingPoint[0];
            endingColIndex  = endingPoint[1];
    
            if( startingPiont[0] > endingPoint[0] )
            {
                startingRowIndex = endingPoint[0];
                endingRowIndex   = startingPiont[0]
            }
    
            if( startingPiont[1] > endingPoint[1] )
            {
                startingColIndex = endingPoint[1];
                endingColIndex   = startingPiont[1]
            }
         
        }
        return {
            startingRowIndex,
            endingRowIndex,
            startingColIndex,
            endingColIndex
        }
    }

    function unselectTheArea() {
        const { startingColIndex, startingRowIndex, endingColIndex, endingRowIndex } = getRowAndColIndexes(endingPoint, currentPoint);

        if(startingRowIndex === endingRowIndex &&  startingColIndex !== endingColIndex)
        {
           // debugger;
            for(let col = endingColIndex; col > startingColIndex; col-- )
            {
                for(let row = startingRowIndex; row >= 0; row--){
                    const currentElement = document.getElementById('div_' + row + col);
                    if(currentElement)
                    {
                        currentElement.style.background = 'transparent';
                        visited[row][parseInt(col)] = false;
                    }
                }
                
            }

            endingPoint   = currentPoint;
            currentPoint = null;
            return;
        }
        if(startingColIndex !== endingColIndex && startingColIndex === endingColIndex)
        {
           // debugger;
            for(let row = endingRowIndex; row >= startingRowIndex; row--)
            { 
                const currentElement = document.getElementById('div_' + row + startingColIndex);
                if(currentElement)
                {
                    currentElement.style.background = 'transparent';
                    visited[parseInt(row)][startingColIndex] = false;
                }
            }

            endingPoint   = currentPoint;
            currentPoint = null;
            return;
        }
        // debugger;
        // for(let col = startingRowIndex; col < endingRowIndex; col++ )
        // {
        //     for(let row = startingColIndex; row < visited[0].length; row++)
        //     {
        //         const currentElement = document.getElementById('div_' + row + col);
        //         if(currentElement)
        //         {
        //             currentElement.style.background = 'transparent';
        //             visited[parseInt(row)][parseInt(col)] = false;
        //         }
        //     }
          
        // }

        // for(let col = startingColIndex; col < endingColIndex; col++ )
        // {
        //     for(let row = startingRowIndex; row < visited.length; row++)
        //     {
        //         const currentElement = document.getElementById('div_' + row + col);
        //         if(currentElement)
        //         {
        //             currentElement.style.background = 'transparent';
        //             visited[parseInt(row)][parseInt(col)] = false;
        //         }
        //     }
            
        // }
        for(let row = endingRowIndex; row >= 0; row--)
            {
                for(let col = endingColIndex; col >= 0; col-- )
                {
                    const currentElement = document.getElementById('div_' + row + col);
                    if(currentElement)
                    {
                        currentElement.style.background = 'transparent';
                        visited[parseInt(row)][parseInt(col)] = false;
                    }
                }
            }
          
            endingPoint   = currentPoint;
            currentPoint = null;
    }


    function removeSelectedArea() {
        const { startingColIndex, startingRowIndex, endingColIndex, endingRowIndex } = getRowAndColIndexes(startingPiont, endingPoint);
        for(let row = startingRowIndex; row <= endingRowIndex; row++)
            {
                for(let col = startingColIndex; col <= endingColIndex; col++ )
                {
                    const currentElement = document.getElementById('div_' + row + col);
                    if(currentElement)
                    {
                        currentElement.style.background = 'transparent';
                        visited[parseInt(row)][parseInt(col)] = false;
                    }
                }
            }

            startingPiont = null;
            endingPoint   = null;

    }

    function highlightSelectedArea() {
        if(startingPiont && endingPoint)
        {
            const { startingColIndex, startingRowIndex, endingColIndex, endingRowIndex } = getRowAndColIndexes(startingPiont, endingPoint);
            for(let row = startingRowIndex; row <= endingRowIndex; row++)
            {
                for(let col = startingColIndex; col <= endingColIndex; col++ )
                {
                    const currentElement = document.getElementById('div_' + row + col);
                    if(currentElement)
                    {
                        currentElement.style.background = 'blue';
                        visited[parseInt(row)][parseInt(col)] = true;
                    }
                }
            }
            isSelected = true;
        }
    }
    function getRowColIndex(selectedId) {

        if(selectedId)
        {
            let values = selectedId.split('_')[1].split("");
            return values;
        }

        return [];
    }
    function onClick(event){
        debugger;  
        event.preventDefault();
        if(startingPiont && endingPoint)
        {
            removeSelectedArea();
            return;
        }

        return;
    }
    function onDragStart(event) {

        if(event.target)
        {
            if(startingPiont && endingPoint)
            {
                removeSelectedArea();
            }
            const id = event.target.id;
            const values = getRowColIndex(id);
            startingPiont = values;   
            const mainContainer = document.getElementById('maincontainer');
            mainContainer.appendChild(selectionAreaElement);
            selectionAreaElement.style.display = 'block';
            selectionAreaElement.style.zIndex  = -1;
            selectionAreaElement.style.border  = '3px dashed black';
            selectionAreaElement.style.top =  (parseInt(values[0]) - 1) * 20 + "px"
            selectionAreaElement.style.left = (parseInt(values[1]) - 1) * 20 + "px"
        }
    }
    function onDragEnd(event) {
        event.preventDefault();
    }

    function onDragOver(event)
    {
        event.preventDefault();
        const id = event.target.id;
        if(id === undefined || !id.includes('div')) return;
        const values = getRowColIndex(id);

        if( !startingPiont )
        {
            startingPiont = values;
        }

        if(visited[parseInt(values[0])][parseInt(values[1])] === false )
        {
           debugger;
            endingPoint = values;

            // let currentWidth = selectionAreaElement.style.width.substring(0, 2);
            // let currentHeight = selectionAreaElement.style.height.substring(0, 2);
            // selectionAreaElement.style.width =  (parseInt(currentWidth) + 20) + "px";
            // selectionAreaElement.style.height =  (parseInt(currentHeight) + 20) + "px";

            selectionAreaElement.style.width =  (parseInt(values[1]) + 1) * 20 + "px";
            selectionAreaElement.style.height =  (parseInt(values[0]) + 2) * 20 + "px";


            
            highlightSelectedArea();
            return;
        }

        if((endingPoint[0] !== values[0] || endingPoint[1] !== values[1])) 
        {
            currentPoint = values;
            console.log("unselect",  currentPoint);
            unselectTheArea();
        }

        // if( currentPoint === undefined && (currentPoint[0] !== values[0] || currentPoint[1] !== values[1]))
        // {
        //     currentPoint = values;
        //     console.log("unselect",  currentPoint);
        //     unselectTheArea();
        // }

        //removeSelectedArea();
       
        // console.log("Visited",  endingPoint[0], endingPoint[1]);
        // if(visited[parseInt(endingPoint[0])][parseInt(endingPoint[1])])
        // {
        //     removeSelectedArea();
        // }
        // else
        // {
        //     highlightSelectedArea();
        // }
    }

    function createInsideGridElement(row, col) {
        const id = "div_" + row + col;
        const divElement = document.createElement('div');
        divElement.id = id;
        divElement.style.width = "20px";
        divElement.style.height = "20px";
        divElement.style.border = "1px solid black";
        divElement.draggable = true;

        divElement.addEventListener('dragstart', onDragStart);
        divElement.addEventListener('dragover', onDragOver);
        divElement.addEventListener('dragend', onDragEnd);

        divElement.addEventListener('click', onClick);

        return divElement;
    }
    function initializeBoard() {
        const mainContainer = document.getElementById('maincontainer');
        const fargmentElement = document.createDocumentFragment();

        for(let rowIndex = 0; rowIndex < noOfRows; rowIndex++)
        {
            for(let colIndex = 0; colIndex < noOfCols; colIndex++)
            {
                const element = createInsideGridElement(rowIndex, colIndex);
                if(element)
                {
                    fargmentElement.appendChild(element);
                }
            }

            if(mainContainer)
            {
                mainContainer.appendChild(fargmentElement);
            }
        }
    }

    initializeBoard();
}

