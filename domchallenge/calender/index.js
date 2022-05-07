const meetingData = [
  {
    startTime: "00:00",
    endTime: "01:30",
    color: "#f6be23",
    title: "#TeamDevkode",
  },
  {
    startTime: "5:50",
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
  },
  {
    startTime: "00:30",
    endTime: "1:00",
    color: "#029be5",
    title: "#TeamDevkode",
  },
];

const calenderContainer = document.getElementById("calender-container");

const getTiming = (time) => {
  let calculatedTiming;
  //checking time is befor 12PM to decide AM/PM
  if (parseInt(time) < 12) {
    //prepend 0 if time is before 10
    if (time.length === 1) {
      calculatedTiming = "0" + time + ":" + "00 " + "AM";
    } else if (time.length === 2) {
      calculatedTiming = time + ":" + "00 " + "AM";
    }
  }
  //if time is 12
  else if (parseInt(time) === 12) {
    calculatedTiming = time + ":" + "00 " + "PM";
  } else {
    //If time is after 12PM

    //Converting the time, example - 13:00 to 1:00PM(as per the requirement)
    let convertedTimeSTamp = parseInt(time) - 12;

    //Prepend 0 till 9 to make dobule digit
    if (convertedTimeSTamp.toString().length === 1) {
      calculatedTiming = "0" + convertedTimeSTamp + ":" + "00 " + "PM";
    } else if (convertedTimeSTamp.toString().length === 2) {
      calculatedTiming = convertedTimeSTamp + ":" + "00 " + "PM";
    }
  }

  return calculatedTiming;
};
const createTimeLine = (id) => {
  //create a div
  const div = document.createElement("div");
  div.id = id;
  div.classList.add("timeline");

  //add time stamp with div
  const label = document.createElement("label");
  let timeStamp = getTiming(id);
  label.style.marginLeft = "-20%";
  label.textContent = timeStamp;

  div.appendChild(label);
  return div;
};
const createTimeArea = () => {
  const fragment = document.createDocumentFragment();
  //As we have 24 hours, create 24 timeliners
  for (let index = 1; index < 24; index++) {
    //make timeline for each hour
    const timelineElement = createTimeLine(index.toString());
    fragment.appendChild(timelineElement);
  }
  calenderContainer.appendChild(fragment);
};

//decide no of overlapping time in the calender
const getNoOfOverlappingSlots = (item, overlappingSlots) => {
  let noOfOverlapItems = 0;
  if (overlappingSlots.length > 0) {
    //format the given start and end time to number, this will help
    // to decide whether current event timing is before existing event
    // or with in existing or later
    let itemStartTime = parseInt(item.startTime.replace(":", ""));
    let itemEndTime = parseInt(item.endTime.replace(":", ""));

    overlappingSlots.forEach((overlappingItem) => {
      let overlappingStartTime = parseInt(
        overlappingItem.startTime.replace(":", "")
      );
      let overlappingEndTime = parseInt(
        overlappingItem.endTime.replace(":", "")
      );

      // validation to decide if current event timing is overlapping with any existing
      // event timing, if so, increse the overlapping event count by 1
      if (
        itemStartTime <= overlappingEndTime &&
        itemEndTime > overlappingStartTime
      ) {
        noOfOverlapItems = noOfOverlapItems + 1;
      }
    });
  }

  return noOfOverlapItems;
};
const createEventSlot = (item, noOfOverlaps, startTime, endTime) => {
  //calculating the position for each time slot based on 
  //total no of overlapping slot.
  let estimatedTimeSlotPosition = 20 + (20 * noOfOverlaps);
  const div = document.createElement("div");
  div.classList.add("timeslot");

  div.style.top = startTime.toString() + "px";
  //if no overlap , place the slot 20% from the left margin
  //In case of having overlap item, place the slot based on the 
  //no of overlapping slots.
  div.style.marginLeft = noOfOverlaps === 0 ? "20%" : `${estimatedTimeSlotPosition}%`;
  div.style.height = (endTime - startTime - 5).toString() + "px";
  div.style.width = `${(100 - estimatedTimeSlotPosition)}%`;
  div.style.backgroundColor = item.color;
  //Puttng the border on ovelap time slots 
  //as per the requirement, thus adding border only when 
  // the is overlapping
  if (noOfOverlaps > 0) {
    div.style.border = "1px solid white";
  }

  return div;
};

const AddEventDetails = (eventSlotElement, item, startTime, endTime) =>{
  const h1Element = document.createElement("h1");
  h1Element.textContent = item.title;
  const h2Element = document.createElement("h2");

  // add time in the event details. 
  //1200 is considerig PM, thus less than 1200 considering as AM
  //otheriwse PM
  if (startTime < 1200) {
    h2Element.textContent = item.startTime + " AM - ";
  } else {
    h2Element.textContent = item.startTime + " PM - ";
  }

  if (endTime < 1200) {
    h2Element.textContent = h2Element.textContent + item.endTime + " AM";
  } else {
    h2Element.textContent = h2Element.textContent + item.endTime + " PM";
  }

  const fragment = document.createDocumentFragment();

  fragment.appendChild(h1Element);
  fragment.appendChild(h2Element);
  eventSlotElement.appendChild(fragment);
}
const createMeetingArea = () => {
  let overlappingMeetingSlots = [];
  meetingData.forEach((item) => {

    // no of overlapping is required to decide the layout 
    // of overlapping time slots
    let noOfOverlaps = getNoOfOverlappingSlots(item, overlappingMeetingSlots);
    overlappingMeetingSlots.push(item);

    // get the evnt time slot 
    let startTime = parseInt(item.startTime.replace(":", ""));
    let endTime = parseInt(item.endTime.replace(":", ""));

    //create the time slot
    let eventSlotElement = createEventSlot(
      item,
      noOfOverlaps,
      startTime,
      endTime
    );

    AddEventDetails(eventSlotElement, item, startTime, endTime);
    calenderContainer.appendChild(eventSlotElement);
  });
};

(() => {
  createTimeArea();
  createMeetingArea();
})();
