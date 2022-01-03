// Write Javascript code!
const appDiv = document.getElementById('app');
const select = document.createElement('ul');
const options = ['item1', 'item2', 'item3', ['item11', 'item12', ["item31", "item32"]]];
appDiv.appendChild(select);

var getOptionElement = (item) => {
  let option = document.createElement('li');
  option.textContent = item;
  return option;
};

var addElement = (item) => {
  let optionElement = getOptionElement(item);
  select.appendChild(optionElement);  

  return item
};

var formDropDown = (item, isNewDropDown = false) => {
  if (isNewDropDown) {
    let lastChild = select.children;
    let ul = document.createElement('ul');
    item.forEach((item, index) => {
      let li = getOptionElement(item);
      ul.appendChild(li);
    });

    if (lastChild) {
      lastChild[lastChild.length - 1].appendChild(ul);
    }
  } else {
    addElement(item);
  }

  return item;
};

var flatArray = (item) => {

    console.log("print item", item);
  return item.reduce((acc, cur) => {
    return acc.concat(
      Array.isArray(cur) ? formDropDown(cur, true) : addElement(cur)
    );
  }, []);
};

let items = flatArray(options);

console.log('flatten array', items);
