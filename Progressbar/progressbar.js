window.onload = (function() {

    var currentWidth = 0;
    const progressbarWidth = 100;
    const progressbar = document.getElementById("progressbar");
    const completion = document.getElementById("completion");

    const updateProgress = () => {

        if(currentWidth >= progressbarWidth)
        {
            clearInterval(timeInterval);
        }
        else
        {
            currentWidth++;
            progressbar.style.width = currentWidth + "%"
           
        }

        completion.innerText = currentWidth + "%"
        completion.style.color = "black";
        progressbar.style.background = "red";
       
    }

    var timeInterval = setInterval(updateProgress, 10)

})();