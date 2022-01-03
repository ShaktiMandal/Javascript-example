window.onload = () => {

    (function(doc) {
        const msgId = doc.getElementById("displayMsg");
        const msgBtn = doc.getElementById("displayMsgBtn");

        msgBtn.addEventListener('click', () => {          
            msgId.innerText = "You have clicked me";
        });

        
    })(document);
}