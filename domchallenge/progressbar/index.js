const progressBar = document.getElementById("progressbar");
const ProgreesbarContainer = document.getElementById("ProgreesbarContainer");
let noOfTimeRun = 0;
const startBtn = document.getElementById('run');

const runProgressBar = () => {
    const progressbarWidth = ProgreesbarContainer.style.width.substring(0, ProgreesbarContainer.style.width.length - 2);
    progressBar.style.width = "0px";
    const toBeIncrementedWidth = Math.ceil(parseInt(progressbarWidth) / 3);
    const intervalHandler  = setInterval(()=> {
        
        let currentwidth = parseInt(progressBar.style.width.substring(0, progressBar.style.width.length - 2)) + toBeIncrementedWidth;
        progressBar.style.width = currentwidth + "px";
        progressBar.style.background = "green";
        if(currentwidth >= progressbarWidth)
        {
            clearInterval(intervalHandler);
            const timedOutHandler = setTimeout(() => {
                progressBar.style.background = "";
                progressBar.style.width = "0px";
                clearTimeout(timedOutHandler);
                while(noOfTimeRun > 1)
                {
                    console.log("call" + noOfTimeRun);
                    noOfTimeRun = noOfTimeRun - 1;
                    runProgressBar();
                }
            },1000)
            
        }
    }, 3)
}

const startProgressBar = (event) => {
        noOfTimeRun = noOfTimeRun + 1;
        if(noOfTimeRun === 1) 
        {
            runProgressBar();
        }
}

const initialize = () =>
{
    startBtn.textContent = "Run";
    startBtn.addEventListener('click', startProgressBar);
    ProgreesbarContainer.style.width = "550px";
    ProgreesbarContainer.style.height = "50px";
}

initialize();