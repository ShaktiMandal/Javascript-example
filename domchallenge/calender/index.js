
const meetingData = [
    {
      startTime: "00:00",
      endTime: "01:30",
      color: "#f6be23",
      title: "#TeamDevkode",
    },
    {
      startTime: "4:30",
      endTime: "7:30",
      color: "#f6501e",
      title: "#TeamDevkode",
    },
    {
      startTime: "12:00",
      endTime: "13:30",
      color: "#029be5",
      title: "#TeamDevkode",
    },
    {
      startTime: "9:00",
      endTime: "10:00",
      color: "#029be5",
      title: "#TeamDevkode",
    },
    {
      startTime: "16:00",
      endTime: "19:00",
      color: "#029be5",
      title: "#TeamDevkode",
    },
    {
      startTime: "20:30",
      endTime: "22:30",
      color: "#029be5",
      title: "#TeamDevkode",
    },
    {
      startTime: "3:30",
      endTime: "7:30",
      color: "#f6501e",
      title: "#TeamDevkode",
    },
    {
      startTime: "4:30",
      endTime: "8:30",
      color: "#f6501e",
      title: "#TeamDevkode",
    },
    {
      startTime: "6:30",
      endTime: "9:00",
      color: "#f6501e",
      title: "Demo",
    },
    {
      startTime: "11:00",
      endTime: "13:30",
      color: "#029be5",
      title: "#TeamDevkode",
    },
    {
      startTime: "12:00",
      endTime: "13:30",
      color: "#029be5",
      title: "#TeamDevkode",
    },
    {
      startTime: "9:30",
      endTime: "10:30",
      color: "#029be5",
      title: "#TeamDevkode",
    },
    {
      startTime: "16:00",
      endTime: "17:00",
      color: "#029be5",
      title: "#TeamDevkode",
    },
    {
      startTime: "15:00",
      endTime: "17:00",
      color: "#029be5",
      title: "#TeamDevkode",
    },
    {
      startTime: "18:00",
      endTime: "19:00",
      color: "#f6501e",
      title: "#TeamDevkode",
    },
    {
      startTime: "20:30",
      endTime: "22:30",
      color: "#029be5",
      title: "#TeamDevkode",
    }
  ];


const calenderContainer = document.getElementById('calender-container');

const createTimeLine = (id) => {

    const div = document.createElement('div');
    const label = document.createElement('label');
    
    div.id = id;
    div.classList.add("timeline");
    

    if(parseInt(id) < 12 )
    {
        if(id.length === 1)
        {
            label.textContent = "0"+ id + ":" + "00 " + "AM";
        }
        else if(id.length === 2)
        {
            label.textContent =  id + ":" + "00 " + "AM";
        }
    }
    else if(parseInt(id) === 12)
    {
        label.textContent =  id + ":" + "00 " + "PM";
    }
    else
    {
        let convertedTimeSTamp = parseInt(id) - 12;
        if(convertedTimeSTamp.toString().length === 1)
        {
            label.textContent = "0"+ convertedTimeSTamp + ":" + "00 " + "PM";
        }
        else if(convertedTimeSTamp.toString().length === 2)
        {
            label.textContent =  convertedTimeSTamp + ":" + "00 " + "PM";
        }
    }
    
    label.style.marginLeft = "-20%";
    div.appendChild(label)
    return div;
}
const createTimeArea = () => {
    const fragment = document.createDocumentFragment();
    for(let index = 1; index < 24; index++ )
    {
        const timelineElement = createTimeLine(index.toString());
        fragment.appendChild(timelineElement);
    }
    calenderContainer.appendChild(fragment);
}
const getNoOfOverlappingSlots = (item, overlappingSlots) => {
    let noOfOverlapItems = 0;
    if(overlappingSlots.length > 0)
    {
        let itemStartTime = parseInt(item.startTime.replace(":", ""));
        let itemEndTime = parseInt(item.endTime.replace(":", ""));

        overlappingSlots.forEach(overlappingItem => {
            let overlappingStartTime = parseInt(overlappingItem.startTime.replace(":", ""));
            let overlappingEndTime = parseInt(overlappingItem.endTime.replace(":", ""));

            debugger;

            if(itemStartTime <= overlappingEndTime && itemEndTime > overlappingStartTime)
            {
                noOfOverlapItems = noOfOverlapItems + 1;
            }
        });
    }
  
    return noOfOverlapItems;
}
const createMeetingArea = () => {
    let overlappingMeetingSlots = [];
    meetingData.forEach(item=> {
        
        let noOfOverlaps = getNoOfOverlappingSlots(item, overlappingMeetingSlots);
        console.log(`overlappingTime ${item.startTime} - ${item.endTime} ==> ${noOfOverlaps}`);
        overlappingMeetingSlots.push(item);
        let startTime = parseInt(item.startTime.replace(":", ""));
        let endTime = parseInt(item.endTime.replace(":", ""));
        let temp = 20 +  (10 * noOfOverlaps);
        const div = document.createElement('div');
        div.style.top = startTime.toString() + "px";
        div.style.position = "absolute";
        div.style.margin="5px";
        console.log("No of overlap", noOfOverlaps);
        div.style.marginLeft = noOfOverlaps === 0 ? "20%" : `${temp}%`;
        div.style.width = "100%";
        div.style.borderRadius="7px";
        div.style.padding = "5px";
        div.style.height = (endTime - startTime).toString() + "px";
        div.style.backgroundColor = item.color;
        if(noOfOverlaps > 0)
        {
            div.style.border = "1px solid white";
        }
        const h1Element = document.createElement('h1');
        h1Element.textContent = item.title;
        const h2Element = document.createElement('h2');

        if(startTime < 1200)
        {
            h2Element.textContent = item.startTime + " AM - ";
        }
        else
        {
            h2Element.textContent = item.startTime + " PM - ";
        }

        if(endTime < 1200)
        {
            h2Element.textContent = h2Element.textContent + item.endTime + " AM";
        }
        else
        {
            h2Element.textContent = h2Element.textContent + item.endTime + " PM";
        }
       
        div.appendChild(h1Element);
        div.appendChild(h2Element);

        calenderContainer.appendChild(div);
    });
}



(() => {
    createTimeArea();
    createMeetingArea();
})();


