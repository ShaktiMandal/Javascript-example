

  window.onload = (function() {
    var data = [
        {"x": "Mandarin chinese", "value": 1090000000, category: "Sino-Tibetan"},
        {"x": "English", "value": 983000000, category: "Indo-European"},
        {"x": "Hindustani", "value": 544000000, category: "Indo-European"},
        {"x": "Spanish", "value": 527000000, category: "Indo-European"},
        {"x": "Arabic", "value": 422000000, category: "Afro-Asiatic"},
        {"x": "Malay", "value": 281000000, category: "Austronesian"},
        {"x": "Russian", "value": 267000000, category: "Indo-European"},
        {"x": "Bengali", "value": 261000000, category: "Indo-European"},
        {"x": "Portuguese", "value": 229000000, category: "Indo-European"},
        {"x": "French", "value": 229000000, category: "Indo-European"},
        {"x": "Hausa", "value": 150000000, category: "Afro-Asiatic"},
        {"x": "unjabi", "value": 148000000, category: "Indo-European"},
        {"x": "Japanese", "value": 129000000, category: "Japonic"},
        {"x": "German", "value": 129000000, category: "Indo-European"},
        {"x": "Persian", "value": 121000000, category: "Indo-European"}
      ];

      const banner = document.getElementById("banner");

      if(banner)
      {

            var banerLeft = banner.style.left;

            console.log("banner", banner.style);
            var colorMap = new Map();
            colorMap.set("Sino-Tibetan", "red");
            colorMap.set("Indo-European", "green");
            colorMap.set("Afro-Asiatic", "white");
            colorMap.set("Austronesian", "grey");
            colorMap.set("Japonic", "lightgrey");

            var fontArray = [];


            data.map( (item) => {
                fontArray.push(item.value);
            });


          data.map( (item, index) => {

             let lang = item.x;
             let color = colorMap.get(item.category);

            let max = Math.max(...fontArray);
            let min = Math.min(...fontArray);

            let normalizedFont = (item.value - min)/(max - min);

            normalizedFont = Math.ceil(normalizedFont * 100);
            normalizedFont = normalizedFont > 10 ? normalizedFont : 15;

            let posX = Math.random().toFixed(2)*100;
            let posY = Math.random().toFixed(2)*100;

            console.log(posX, posY);

             let text = document.createElement("p");
             text.innerText = lang;
             text.style.color =  color;
             text.style.fontSize = normalizedFont.toString() + "px";
             text.style.marginTop = posY.toString() + "px";
             text.style.marginLeft = posX.toString() + "px";

             banner.appendChild(text);

          });
      }

  })();