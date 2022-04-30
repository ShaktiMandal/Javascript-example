const chessboardContainer = document.getElementById("chessboard");

const cerateDivElement = () => {
  const div = document.createElement("div");
  return div;
};

const highlightDiagonaCells = (event) => {
  const targetedElementId = event.target.id;
  if (targetedElementId) {
    
    const dataAtrribute = event.target.getAttribute('data-cell-type');
    if(dataAtrribute === 'accessible')
    {
        updateTopRightDiagonalCells(targetedElementId);
        updateTopLeftDiagonalCells(targetedElementId);
        updateBottomLeftDiagonalCells(targetedElementId);
        updateBottomRightDiagonalCells(targetedElementId);
    }
  }
};

const getRowColNumber = (targetedElementId) => {
  let idList = targetedElementId.split(" ");
  let rowNo = parseInt(idList[0]);
  let colNo = parseInt(idList[1]);

  return {
    rowNo,
    colNo,
  };
};

const updateDiagonalCells = (rowNo, colNo) => {
  let expectedElementId = rowNo + " " + colNo;
  let expectedElement = document.getElementById(expectedElementId);
  if (expectedElement) {
    expectedElement.style.background = "red";
  }
};

const updateTopRightDiagonalCells = (elementId) => {
  let { rowNo, colNo } = getRowColNumber(elementId);

  do {
    updateDiagonalCells(rowNo, colNo);
    rowNo = rowNo - 1;
    colNo = colNo + 1;
  } while (rowNo >= 0);
};

const updateTopLeftDiagonalCells = (elementId) => {
  let { rowNo, colNo } = getRowColNumber(elementId);

  do {
    updateDiagonalCells(rowNo, colNo);
    rowNo = rowNo - 1;
    colNo = colNo - 1;
  } while (rowNo >= 0);
};

const updateBottomLeftDiagonalCells = (elementId) => {
  let { rowNo, colNo } = getRowColNumber(elementId);

  do {
    updateDiagonalCells(rowNo, colNo);
    rowNo = rowNo + 1;
    colNo = colNo - 1;
  } while (colNo >= 0);
};

const updateBottomRightDiagonalCells = (elementId) => {
  let { rowNo, colNo } = getRowColNumber(elementId);

  do {
    updateDiagonalCells(rowNo, colNo);
    rowNo = rowNo + 1;
    colNo = colNo + 1;
  } while (colNo < 8);
};

const createChessBoard = (col, row) => {
  for (let rowIndex = 0; rowIndex < row; rowIndex++) {
    let isThisOddRow = rowIndex % 2 !== 0;
    console.log("Print it", isThisOddRow);
    for (let colIndex = 0; colIndex < col; colIndex++) {
      const elementId = rowIndex + " " + colIndex;
      const divElement = cerateDivElement();
      divElement.id = elementId;
      divElement.style.background = "white";
      divElement.setAttribute('data-cell-type', 'accessible');
      if (isThisOddRow === false) {
        if (colIndex % 2 !== 0) {
          divElement.style.background = "black";
          divElement.setAttribute('data-cell-type', 'inaccessible');
        }
      } else {
        if (colIndex % 2 === 0) {
          divElement.style.background = "black";
          divElement.setAttribute('data-cell-type', 'inaccessible');
        }
      }

      divElement.addEventListener("click", highlightDiagonaCells);
      chessboardContainer.appendChild(divElement);
    }
  }
};

createChessBoard(8, 8);
