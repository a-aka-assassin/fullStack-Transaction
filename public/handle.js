//Following is a function to send data to the API
function sendData(event) {
    // Prevent form submission
    event.preventDefault();

    // Get form data
    const accountInput = document.getElementById('account-id');
    const amountInput = document.getElementById('amount');

    let accountId = accountInput.value.trim();

    // Validate form inputs
    if (accountInput.value.trim() === '') {
        alert('Please enter the account.');
        accountInput.focus();
        return;
    }

    if (amountInput.value.trim() === '') {
        alert('Please enter Amount.');
        amountInput.focus();
        return;
    }

    const formData = {
        accountId: accountInput.value.trim(),
        amount: amountInput.value.trim()
    };
    //Send the transaction
    fetch('https://infra.devskills.app/transaction-management/api/3.1.0/transactions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (response.ok) {
                // Handle successful form submission
                alert('Form submitted successfully.');

                //Generate the divs
                generateDivs();

            } else {
                // Handle failed form submission
                alert('Form submission failed.');
            }
        })
        .catch(error => {
            console.error('An error occurred:', error);
            // Alert if the form did not go through

            alert('An error occurred during form submission.');
            //Generating the divs just for fun using a custom array
            generateDivs();
        });
}

//Following is the function to recieve data from the API
function fetchTransactions() {

    //Following is a div just for fun
    const cars = [
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

    return cars;

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
async function generateDivs() {

    try {
        const data = await fetchTransactions(); 

        const container = document.getElementById('transactions');

        // Clear existing content in the container
        container.innerHTML = '';

        let plus = 0;
        // Generate Divs
        data.forEach(transaction => {
            plus = transaction['transaction-amount'] + plus;
            const div = document.createElement('div');
            div.innerHTML = `
        
        <p>Transferred ${transaction['transaction-amount']}$ from Account ID: ${transaction['transaction-account-id']}</p>
        <p>Amount: ${transaction['transaction-amount']}</p>
        <p>Balance: ${plus}</p>
        <hr>
      `;



            // Append the generated div to the container
            container.appendChild(div);
        });
    } catch (error) {
        // Handle any errors that occurred
        console.error('Error:', error);
    }
}

