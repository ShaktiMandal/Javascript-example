window.onload = function () {
  function getTotalScrolledPosition(totalScrolled, elementType) {
    totalScrolled =
      totalScrolled +
      (elementType === "first" ? topScrollingSpeed : bottomScrollingSpeed);

    if (totalScrolled + 400 >= 1300) {
      totalScrolled = 0;
    }
    return totalScrolled;
  }
  function resetElementPosition(
    currentElement,
    totalScrolled,
    intervalHandler
  ) {
    if (totalScrolled === 0) {
      clearInterval(intervalHandler);
      moveToStart(currentElement);
    }
  }
  function updatedElementPosition(currentElement, isStartedAgain, elementType) {
    const childs = currentElement.children;
    if (childs && childs.length) {
      for (let eachElement of childs) {
        const leftMargin = eachElement.style.marginLeft;
        let marginValue = leftMargin.substring(0, leftMargin.length - 2);
        marginValue = marginValue.length > 0 ? parseInt(marginValue) : 0;
        if (isStartedAgain === false) {
            //updating position eachtime scroll
            //for both first and second row
          if (elementType === "first") {
            eachElement.style.marginLeft =
              marginValue - topScrollingSpeed + "px";
          } else {
            eachElement.style.marginLeft =
              marginValue - bottomScrollingSpeed + "px";
          }
        }
      }
    }
  }
  function moveToStart(targetElement) {
    const childs = targetElement.children;
    if (childs && childs.length) {
      // Once scrill reach to the end
      //moving the scroll back to starting position by 
      //making marginleft as 0px;
      for (let eachElement of childs) {
        const leftMargin = eachElement.style.marginLeft;
        let marginValue = leftMargin.substring(0, leftMargin.length - 2);
        marginValue = marginValue.length > 0 ? parseInt(marginValue) : 0;
        eachElement.style.marginLeft = "0px";
      }
    }

    if (targetElement.id === "first__row") {
      topScrollingSpeed = 20;
      autoScrollTopRow(true);
      return;
    }

    bottomScrollingSpeed = 10;
    autoScrollBottomRow(true);
  }
  function autoScrollTopRow(isStartedAgain = false) {
    let totalScroll = 0;
    let isStarted = isStartedAgain;
    if (timeIntervalHandler) {
      clearInterval(timeIntervalHandler);
    }
    const timeIntervalHandler = setInterval(() => {
      const first_row = document.getElementById("first__row");
      updatedElementPosition(first_row, isStarted, "first");
      isStarted = false;
      // totalScroll = getTotalScrolledPosition(totalScroll, 'first');
      // console.log("After logging", totalScroll);
      // resetElementPosition(first_row, totalScroll, "first", timeIntervalHandler);

      totalScroll = totalScroll + topScrollingSpeed;
      if (totalScroll + 400 >= 1300) {
        totalScroll = 0;
        clearInterval(timeIntervalHandler);
        moveToStart(first_row);
      }
    }, 1000);

    return timeIntervalHandler;
  }

  function autoScrollBottomRow(isStartedAgain = false) {
    let totalScroll = 0;
    let isStarted = isStartedAgain;
    const timeIntervalHandler = setInterval(() => {
      const second_row = document.getElementById("second__row");
      updatedElementPosition(second_row, isStarted, "bottom");

      // this flag is introduced to avoid add scroll width for 
      //the first time when scroll start agasin.
      //this will keep the image at the right position 
      isStarted = false;
      //increasing to the scroll width eachtime card slides
      totalScroll = totalScroll + bottomScrollingSpeed;
      //if total scrolled width is greater than entire row width
      //scroll back to the first element
      if (totalScroll + 400 >= 1300) {
        totalScroll = 0;
        clearInterval(timeIntervalHandler);
        moveToStart(second_row);
      }
    }, 1000);

    return timeIntervalHandler;
  }

  function getParentElement(currentNode) {
    //get the parent element frimn the current node
    if (currentNode.id === "first__row" || currentNode.id === "second__row") {
      return currentNode;
    }

    return getParentElement(currentNode.parentElement);
  }

  function getCardElement(index, imgSrc) {
    const element = document.createElement("div");
    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = "puppy / kitten image";
    img.style.width = "100px";
    img.style.objectFit = "contain";
    img.style.borderRadius = "5px";
    img.loading = "lazy";
    //reduce the the speed of the scrolling 
    //by half on ouse hover. In addition, 
    //change the opacity of the img
    img.addEventListener("mouseover", () => {
      const nodeElement = getParentElement(img);
      if (nodeElement.id === "first__row")
        topScrollingSpeed = topScrollingSpeed / 2;
      if (nodeElement.id === "second__row")
        bottomScrollingSpeed = bottomScrollingSpeed / 2;
      img.classList.add("img__area");
      img.style.cursor = "pointer";
      console.log("top scrolling speed", topScrollingSpeed);
    });

    // reset the speed on mouse leave
    img.addEventListener("mouseleave", () => {
      if (img.classList.contains("img__area")) {
        const nodeElement = getParentElement(img);
        if (nodeElement.id === "first__row")
          topScrollingSpeed = topScrollingSpeed * 2;
        if (nodeElement.id === "second__row")
          bottomScrollingSpeed = bottomScrollingSpeed * 2;
        img.classList.remove("img__area");
        console.log("Bottom scrolling speed", topScrollingSpeed);
      }
    });
    element.appendChild(img);

    element.id = "id_" + index;
    element.style.width = "100px";
    const expectedMarginLeft = element.style.width.substring(
      element.style.width.length - 2,
      element.style.width.length
    );
    element.style.marginLeft = parseInt(expectedMarginLeft) * index + "px";
    element.addEventListener("click", (event) => {
      const element = document.getElementById("imgdisplay__area");
      element.innerHTML = null;
      const img = document.createElement("img");
      if (event.target) {
        // const childNodes = event.target.childrens;
        const imagPath = event.target.src;
        img.src = imagPath;
        element.appendChild(img);
      }
    });
    return element;
  }

  function fetchData() {
    const puppy = [
      "https://frontendeval.com/images/puppy-1.jpeg",
      "https://frontendeval.com/images/puppy-2.jpeg",
      "https://frontendeval.com/images/puppy-3.jpeg",
      "https://frontendeval.com/images/puppy-4.jpeg",
      "https://frontendeval.com/images/puppy-5.jpeg",
      "https://frontendeval.com/images/puppy-6.jpeg",
      "https://frontendeval.com/images/puppy-7.jpeg",
      "https://frontendeval.com/images/puppy-8.jpeg",
      "https://frontendeval.com/images/puppy-9.jpeg",
      "https://frontendeval.com/images/puppy-10.jpeg",
      "https://frontendeval.com/images/puppy-11.jpeg",
      "https://frontendeval.com/images/puppy-12.jpeg",
    ];

    const kitten = [
      "https://frontendeval.com/images/kitten-1.jpeg",
      "https://frontendeval.com/images/kitten-2.jpeg",
      "https://frontendeval.com/images/kitten-3.jpeg",
      "https://frontendeval.com/images/kitten-4.jpeg",
      "https://frontendeval.com/images/kitten-5.jpeg",
      "https://frontendeval.com/images/kitten-6.jpeg",
      "https://frontendeval.com/images/kitten-7.jpeg",
      "https://frontendeval.com/images/kitten-8.jpeg",
      "https://frontendeval.com/images/kitten-9.jpeg",
      "https://frontendeval.com/images/kitten-10.jpeg",
      "https://frontendeval.com/images/kitten-11.jpeg",
      "https://frontendeval.com/images/kitten-12.jpeg",
    ];

    return [...puppy, ...kitten];
  }

  function onPauseAndPlay(event) {
    //this is to pause and play option
    if (event.target.textContent === "Paws") {
      if (handler) clearInterval(handler);
      if (bottomHandler) clearInterval(bottomHandler);

      event.target.textContent = "Play";
    } else {
      autoScrollTopRow();
      autoScrollBottomRow();
      event.target.textContent = "Paws";
    }
  }

  function initialize() {
    const first__row = document.getElementById("first__row");
    const second__row = document.getElementById("second__row");
    const pausePlayBtn = document.getElementById("pauseAndPlayBtn");
    pausePlayBtn.textContent = "Paws";
    pausePlayBtn.addEventListener("click", onPauseAndPlay);

    //get the list of images
    const response = fetchData();

    //add all those images in top and bottom row.
    for (let index = 0; index < response.length; index++) {
    // creating card element for each img
      const cardElement = getCardElement(index, response[index]);
      if (index < 13) {
        first__row.appendChild(cardElement);
      } else {
        second__row.appendChild(cardElement);
      }
    }

    handler = autoScrollTopRow();
    bottomHandler = autoScrollBottomRow();
  }


  let handler;
  let bottomHandler;

  //Allocating intial speed
  let topScrollingSpeed = 20;
  let bottomScrollingSpeed = 10;

  initialize();
};
