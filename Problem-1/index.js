// Given a list of transactions as follows:

//     const transactions = [
//       {id: 't_01', customer: "Rose Roberts", amount: 84},
//       {id: 't_02', customer: "Chris Cook", amount: 30},
//       {id: 't_03', customer: "Mary Martin", amount: 42},
//       {id: 't_04', customer: "Susan Smith", amount: 26},
//       {id: 't_05', customer: "Rose Roberts", amount: -84}, 
//       {id: 't_06', customer: "Rose Roberts", amount: 48},
//       {id: 't_07', customer: "Susan Smith", amount: 122},
//       {id: 't_08', customer: "Larry Lewis", amount: 30}, 
//       {id: 't_09', customer: "Mary Martin", amount: 10}, 
//       {id: 't_10', customer: "Chris Cook", amount: 60},
//       {id: 't_11', customer: "Susan Smith", amount: -32},
//       {id: 't_12', customer: "Larry Lewis", amount: 80},
//       {id: 't_13', customer: "Rose Roberts", amount: 26},
//       {id: 't_14', customer: "Ryan Roberts", amount: 44}, 
//     ]

// As you can see, each transaction is represented as an object with a `customer` field, `amount` field, and a unique `id` field. In this example, negative amount values represent refunds where money is being returned to the customer.



// Part 1

// Using the data provided above, display the transactions as an unordered list with the following format:


//  — <customer>: <amount>





// Part 2

// Using the data, write a function to find which `customer` has the highest total amount spent. Refunds are subtracted from the customer’s total.

// Next, we can highlight the top customer’s name in the list. Give each occurrence of the top customer’s name a `yellow` background.

// Note: Inline styles are acceptable for this exercise.





// Part 3

// Now we would like to make it easier for a user to find a specific transaction by adding the ability to filter the list to specific customers.


// 1. Add a text `input` above the list of transactions, and give it the label `Filter`.
// 2. When a customer name (e.g. “Rose Roberts”) is typed in the input, only transactions from that customer should be displayed. In addition, support the following features:
//     1. Case Insensitivity: users should not need exact letter casing for the filter to work.
//     2. Partial Matches: substrings of the customer name should match the full name.
//     3. Empty Input: when the input is empty all list elements should be displayed.
// 3. Update the top customer to reflect the currently filtered transactions


window.onload = () => {

    const transactions = [
        {id: 't_01', customer: "Rose Roberts", amount: 84},
        {id: 't_02', customer: "Chris Cook", amount: 30},
        {id: 't_03', customer: "Mary Martin", amount: 42},
        {id: 't_04', customer: "Susan Smith", amount: 26},
        {id: 't_05', customer: "Rose Roberts", amount: -84}, 
        {id: 't_06', customer: "Rose Roberts", amount: 48},
        {id: 't_07', customer: "Susan Smith", amount: 122},
        {id: 't_08', customer: "Larry Lewis", amount: 30}, 
        {id: 't_09', customer: "Mary Martin", amount: 10}, 
        {id: 't_10', customer: "Chris Cook", amount: 60},
        {id: 't_11', customer: "Susan Smith", amount: -32},
        {id: 't_12', customer: "Larry Lewis", amount: 80},
        {id: 't_13', customer: "Rose Roberts", amount: 26},
        {id: 't_14', customer: "Ryan Roberts", amount: 44}, 
    ];

    const getcustomersWithTotalPaidAmt = () => {
        const map = new Map();
        transactions.forEach( item => {

            if(map.has(item.customer))
            {
                const currentAmt = map.get(item.customer);
                map.set(item.customer, currentAmt + item.amount);
            }
            else{
                if(map.has(item.customer) === false)
                    map.set(item.customer, item.amount)
            }
        });

        return map;
    }

    const getHighesPaidCustomer = (customersWithTotalPaidAmt) => {
        
        const details = {
            name: "",
            amount: -Infinity
        }

        customersWithTotalPaidAmt.forEach( (value, key) => {
            console.log("Print name and amount", key + " : " + value);
            if(details.amount < value)
            {
                details.amount = value;
                details.name = key;
            }
        })

        return details;
    }

    const updateCustomerList = (searchItem = "") => {
        ulElement.innerHTML = null;
       for(let item of transactions){
            
            if(searchItem && item.customer.toLowerCase().includes(searchItem.toLowerCase()) === false) 
            {
                continue;
            }
            const liElement = document.createElement('li');
            const customerDataSpan = document.createElement('span');
            customerDataSpan.textContent = item.customer + ": " + item.amount;
    
            liElement.appendChild(customerDataSpan);
            if(customerWithHighestPaid.name === item.customer)
            {
                liElement.style.backgroundColor = "yellow";
            }
            fragmentElement.appendChild(liElement);
        };

        ulElement.appendChild(fragmentElement);
    }

    const filterCustomerData  = (event) => {
        const typedData = event.target.value;
        if(typedData !== "")
        {
            updateCustomerList(typedData);
        }
    }

    const customersWithTotalPaidAmt = getcustomersWithTotalPaidAmt();
    const customerWithHighestPaid = getHighesPaidCustomer(customersWithTotalPaidAmt);
    const customerData = document.getElementById("customerData");
    const ulElement = document.createElement('ul');
    const fragmentElement = document.createDocumentFragment();
    const searchInputElement = document.getElementById("searchInput");
    searchInputElement.addEventListener('keyup', filterCustomerData);
    customerData.appendChild(ulElement);
    updateCustomerList();
}