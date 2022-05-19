let timeIntervalHandler;
let noOfTimeToRun = 0;
let currentWidth = 0; //current width set to 0 of the progress bar
let progressbarWidth = 100; //considering 100% width with respect to its container
const progressBar = document.getElementById("progressbar");
const ProgreesbarContainer = document.getElementById("Progreesbarcontainer");
const startBtn = document.getElementById("startbtn");

const runProgressBar = () => {
    //keeping check whether current width is 
    //crosssing the progressbar width, if so 
    //we have already covered the width
    // thus reset the progress bar current 
    //width to 0
  if (currentWidth >= progressbarWidth) {
    clearInterval(timeIntervalHandler);

    // if noOfTimeToRun become 0,
    // we have reached to
    // the last progress bar process
    // thus keeping current width as is
    //this will keep the progressbar filled.
    if (noOfTimeToRun - 1 > 0) {
      currentWidth = 0;
    }
    //reducing the noOfTimeToRun 
    //each time it completes one process
    noOfTimeToRun = noOfTimeToRun - 1;
    startBtn.textContent = noOfTimeToRun <= 0 ? "Run" : `Run ${noOfTimeToRun}`;
  } else {
    currentWidth = currentWidth + 1;
    progressBar.style.width = currentWidth + "%";
    progressBar.style.background = "blue";
  }
};

const startProgressBar = (event) => {
  noOfTimeToRun = noOfTimeToRun + 1;
  startBtn.textContent = "Run" + ` ${noOfTimeToRun}`;
  timeIntervalHandler = setInterval(runProgressBar, 50);
};

(() => {
  startBtn.textContent = "Run";
  startBtn.addEventListener("click", startProgressBar);
  ProgreesbarContainer.style.width = "550px";
  ProgreesbarContainer.style.height = "50px";
})();
