'use strict'

window.onload = () =>{

    (function(window){

        let counter = 1;
        const carouselContainer = document.getElementById("container-carousel");

        const carouselObject = Object.seal({
            isAutomaticSlideRequired: false,
            isNavigationBtnRequired: true,
            automaticSlideInterval: 1000,
            slider: slider
        });

        carouselObject.isAutomaticSlideRequired = true;
        slider()

        const onPrev = (event) => {
            event.preventDefault();
            counter--;
            moveSlide();
        }; 
    
        const onNext = (event) => {
    
            event.preventDefault();            
            moveSlide()
            counter++;
        };

        function moveSlide(){

            let imgElements = document.querySelectorAll('img');
            if( counter >= imgElements.length || counter <= 0) 
            {
                return;
            }

            let width = imgElements[0].clientWidth;
            console.log("Called automatic", width);
            carouselContainer.style.transition = 'transform 0.4s ease-in-out';
            carouselContainer.style.transform = `translateX(${-width * counter}px)`;
        }
    
        

        function slider()
        {
            InitialElement();
            InitializeAction();
            InitializeAutomaticSlide();
        }

        function InitialElement()
        {
            let imgItems = ['..//Image//3.jpg','..//Image//1.jpg', '..//Image//2.jpg', '..//Image//3.jpg', '..//Image//3.jpg','..//Image//1.jpg']
            const imgElements = imgItems.map((item, index) => {
                const childElement = document.createElement('img');
                childElement.src = item;
                childElement.id  = "img" + index.toString();   
                childElement.style.width = "inherit";
                return childElement;
            });
        
            imgElements.forEach(element => carouselContainer.appendChild(element));

            carouselContainer.addEventListener('transitionend', ()=>{
                let width = imgElements[0].clientWidth;
                if(imgElements[counter].id === 'img0')
                {
                    carouselContainer.style.transition = "none";  
                    counter = imgElements.length - 2;        
                    carouselContainer.style.transform = `translateX(${-width * counter}px)`;
                }
                if(imgElements[counter].id === 'img' + (imgElements.length - 1).toString())
                {
                    carouselContainer.style.transition = "none";  
                    counter = imgElements.length - counter;        
                    carouselContainer.style.transform = `translateX(${-width * counter}px)`;
                }
            })
        }

        function InitializeAction()
        {
            const prevButton = document.getElementById("prevButton");
            const nextButton = document.getElementById("nextButton");

            prevButton.style.display = "none";
            nextButton.style.display = "none";

            if(carouselObject.isNavigationBtnRequired)
            {
                prevButton.style.display = "block";
                nextButton.style.display = "block";

                nextButton.addEventListener('click', (event) => {
                    event.preventDefault();
                    moveSlide();
                    counter++;
                });
                prevButton.addEventListener('click', (event) => {
                    event.preventDefault();
                    counter--;
                    moveSlide();
                });
            }
        }

        function InitializeAutomaticSlide()
        {
            let automaticSlideInterval;
        
            if(carouselObject.isAutomaticSlideRequired)
            {
                automaticSlideInterval = setInterval(() => {                   
                   moveSlide();
                   counter++;
                }, carouselObject.automaticSlideInterval);
            }

            carouselContainer.addEventListener('mouseenter', ()=> {
                clearInterval(automaticSlideInterval);
            })
        }

    })(window);
}   