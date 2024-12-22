// Constants for months
const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// Initialize budgets for all months
const budgets = Array(12).fill(null).map(() => ({
    budget: 0,
    remaining: 0,
    expenses: []
}));

// Set Monthly Budget
document.getElementById("set-budget").addEventListener("click", () => {
    const month = document.getElementById("month").value;
    const budget = parseFloat(document.getElementById("budget").value);

    if (budget <= 0) {
        alert("Enter a valid budget!");
        return;
    }

    budgets[month].budget = budget;
    budgets[month].remaining = budget;

    alert(`Budget of Rs. ${budget} set for ${MONTHS[month]}!`);
});

// Add Expense
document.getElementById("add-expense").addEventListener("click", () => {
    const month = document.getElementById("month").value;
    const date = document.getElementById("expense-date").value;
    const amount = parseFloat(document.getElementById("expense-amount").value);
    const category = document.getElementById("expense-category").value;

    if (!date || amount <= 0) {
        alert("Fill in all fields with valid values!");
        return;
    }

    budgets[month].expenses.push({ date, amount, category });
    budgets[month].remaining -= amount;

    alert(`Expense added for ${MONTHS[month]}!`);
});

// Display Monthly Summary
document.getElementById("view-month-summary").addEventListener("click", () => {
    const month = document.getElementById("view-month").value;
    displayMonthlySummary(month);
});

// Display Yearly Summary
document.getElementById("view-yearly-summary").addEventListener("click", displayYearlySummary);

function displayMonthlySummary(month) {
    const summaryText = document.getElementById("monthly-summary-text");
    const expensesTable = document.getElementById("monthly-expenses").querySelector("tbody");

    const { budget, remaining, expenses } = budgets[month];
    summaryText.textContent = `Budget: Rs. ${budget}, Saved: Rs. ${remaining}`;

    expensesTable.innerHTML = "";
    expenses.forEach(exp => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${exp.date}</td><td>Rs. ${exp.amount}</td><td>${exp.category}</td>`;
        expensesTable.appendChild(row);
    });
}

function displayYearlySummary() {
    const yearlySummaryBody = document.getElementById("yearly-summary-body");
    yearlySummaryBody.innerHTML = "";

    budgets.forEach((budget, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${MONTHS[index]}</td>
            <td>Rs. ${budget.expenses.reduce((sum, exp) => sum + exp.amount, 0)}</td>
            <td>Rs. ${budget.remaining}</td>
        `;
        yearlySummaryBody.appendChild(row);
    });
}
