let allTransactions = [
    {
        'transaction-account-id': 'A001',
        'transaction-amount': 100,
        'current-account-balance': 100
    },
    {
        'transaction-account-id': 'A002',
        'transaction-amount': 200,
        'current-account-balance': 800
    },
    {
        'transaction-account-id': 'A003',
        'transaction-amount': 50,
        'current-account-balance': 300
    }
];




//Following is a function to send data to the API
function sendData(event) {
    // Prevent form submission
    event.preventDefault();

    // Get form data
    const accountInput = document.getElementById('account-id');
    const amountInput = document.getElementById('amount');

    let accountId = accountInput.value.trim();
    let amount = amountInput.value.trim();

    // Validate form inputs
    if (accountId === '') {
        alert('Please enter the account.');
        accountInput.focus();
        return;
    }

    if (amount === '') {
        alert('Please enter Amount.');
        amountInput.focus();
        return;
    }

    if (isNaN(amount)) {
        alert('Amount should be a number.');
        amountInput.focus();
        return;
    }

    const formData = {
        accountId: accountId,
        amount: amount
    };
    // Send the transaction
    fetch('https://infra.devskills.app/transaction-management/api/3.1.0/transactions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (response.ok) {
                alert('Form submitted successfully.');
                generateDivs(amount, accountId); // Generating the divs with amount and account ID
            } else {
                alert('Form submission failed.');
            }
        })
        .catch(error => {
            console.error('An error occurred:', error);
            alert('An error occurred during form submission due to API endpoint not working from the task provider.');
            generateDivs(amount, accountId); // Generating the divs with amount and account ID
        });
}

//Following is the function to recieve data from the API
function fetchTransactions(amount, accountId) {
    const newTransaction = {
        'transaction-account-id': accountId,
        'transaction-amount': amount,
        'current-account-balance': 0
    };

  

    // Add the new transaction to the top of the existing array
    allTransactions.unshift(newTransaction);
    return allTransactions;

    //Following is the api call to fetch the transactions but is not getting used at the moment
    fetch('https://infra.devskills.app/transaction-management/api/3.1.0/transactions', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',

        }
    })
        .then(response => response.json())
        .then(data => {
            // Process the received data
            console.log("It is working");
            return data;
        })
        .catch(error => {
            // Handle any errors that occur during the request
            console.error('Error:', error);
        });
}

//Following is the async function to generate divs
async function generateDivs(amount, accountId) {

    try {
        const data = await fetchTransactions(amount, accountId);
        const container = document.getElementById('transactions');

        // Clear existing content in the container
        container.innerHTML = '';

        let balance = 0;
        // Generate Divs
        data.forEach(transaction => {
            balance += transaction['current-account-balance']; // Convert the balance to a number
            
            balance += parseFloat(transaction['transaction-amount']); // Add the transaction amount to the current balance
            const div = document.createElement('div');

            const transferredParagraph = document.createElement('p');
            transferredParagraph.textContent = `Transferred ${transaction['transaction-amount']}$ from Account ID: ${transaction['transaction-account-id']}`;

            const amountParagraph = document.createElement('p');
            amountParagraph.textContent = `Amount: ${transaction['transaction-amount']}`;

            const balanceParagraph = document.createElement('p');
            balanceParagraph.textContent = `Balance: ${balance}`;

            const hr = document.createElement('hr');

            div.appendChild(transferredParagraph);
            div.appendChild(amountParagraph);
            div.appendChild(balanceParagraph);
            div.appendChild(hr);

            // Append the generated div to the container
            container.appendChild(div);
        });
    } catch (error) {
        // Handle any errors that occurred
        console.error('Error:', error);
    }
}

