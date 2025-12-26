document.addEventListener('DOMContentLoaded', function() {
    // 1. Load both the totals and the history from LocalStorage
    let expenseData = JSON.parse(localStorage.getItem('totals')) || { Food: 0, Rent: 0, Transport: 0, Entertainment: 0 };
    let transactionHistory = JSON.parse(localStorage.getItem('history')) || [];

    const listDisplay = document.getElementById('transaction-list');

    // Function to show history on the screen
    function updateHistoryUI() {
        listDisplay.innerHTML = ""; // Clear list
        // Show last 5 transactions
        transactionHistory.slice(-5).reverse().forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${item.name}</strong>: $${item.price} <span>(${item.cat})</span>`;
            listDisplay.appendChild(li);
        });
    }

    // Initial load
    updateHistoryUI();

    // 2. Setup the Chart (same as before)
    const ctx = document.getElementById('expenseChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(expenseData),
            datasets: [{
                data: Object.values(expenseData),
                backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0']
            }]
        }
    });

    // 3. Handle Form Submission
    const form = document.getElementById('expense-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('description').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const category = document.getElementById('category').value;

        if (amount > 0) {
            // Update Totals
            expenseData[category] += amount;
            
            // Add to History Array
            transactionHistory.push({ name: name, price: amount, cat: category });

            // SAVE both to LocalStorage
            localStorage.setItem('totals', JSON.stringify(expenseData));
            localStorage.setItem('history', JSON.stringify(transactionHistory));

            // Update UI
            myChart.data.datasets[0].data = Object.values(expenseData);
            myChart.update();
            updateHistoryUI();

            form.reset();
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const activeUser = localStorage.getItem('activeUser');
    const allUsers = JSON.parse(localStorage.getItem('spendWise_users'));

    if (activeUser && allUsers[activeUser]) {
        // Display the Username
        document.getElementById('user-display-name').innerText = activeUser;
        
        // Display the Join Date
        const joinedDate = allUsers[activeUser].joined || "Today";
        document.getElementById('user-joined-date').innerText = joinedDate;
    }
});

// Change this in your login.html script
if (allUsers[user] && allUsers[user].password === pass) {
    // sessionStorage expires when the tab is closed!
    sessionStorage.setItem('activeUser', user); 
    window.location.href = 'index.html'; 
}