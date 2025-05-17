/**
 * Массив транзакций
 * @type {Array<Object>}
 */
const transactions = [
    {
        transaction_id: "101",
        transaction_date: "2024-03-15",
        transaction_amount: 300.50,
        transaction_type: "debit",
        transaction_description: "Hotel booking",
        merchant_name: "Grand Hotel",
        card_type: "credit"
    },
    {
        transaction_id: "102",
        transaction_date: "2024-04-20",
        transaction_amount: 45.00,
        transaction_type: "debit",
        transaction_description: "Coffee shop",
        merchant_name: "Coffee Corner",
        card_type: "debit"
    },
    {
        transaction_id: "103",
        transaction_date: "2024-05-05",
        transaction_amount: 1200.00,
        transaction_type: "credit",
        transaction_description: "Salary deposit",
        merchant_name: "Employer Inc.",
        card_type: "credit"
    },
    {
        transaction_id: "104",
        transaction_date: "2024-06-10",
        transaction_amount: 75.30,
        transaction_type: "debit",
        transaction_description: "Grocery shopping",
        merchant_name: "Local Market",
        card_type: "debit"
    },
    {
        transaction_id: "105",
        transaction_date: "2025-01-15",
        transaction_amount: 250.00,
        transaction_type: "credit",
        transaction_description: "Freelance payment",
        merchant_name: "Client XYZ",
        card_type: "credit"
    }
];

// Экспорт для использования в других файлах (если используется Node.js)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = transactions;
}