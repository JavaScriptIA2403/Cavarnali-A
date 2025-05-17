/**
 * Возвращает массив уникальных типов транзакций.
 * @param {Array<Object>} transactions - Массив транзакций.
 * @returns {Array<string>} Массив уникальных типов транзакций.
 */
const getUniqueTransactionTypes = (transactions) => {
    return [...new Set(transactions.map(t => t.transaction_type))];
};

/**
 * Вычисляет сумму всех транзакций.
 * @param {Array<Object>} transactions - Массив транзакций.
 * @returns {number} Сумма всех транзакций.
 */
const calculateTotalAmount = (transactions) => {
    return transactions.reduce((sum, t) => sum + t.transaction_amount, 0);
};

/**
 * Вычисляет общую сумму транзакций за указанный год, месяц и день.
 * @param {Array<Object>} transactions - Массив транзакций.
 * @param {number} [year] - Год.
 * @param {number} [month] - Месяц.
 * @param {number} [day] - День.
 * @returns {number} Сумма транзакций за указанный период.
 */
const calculateTotalAmountByDate = (transactions, year, month, day) => {
    return transactions
        .filter(t => {
            const date = new Date(t.transaction_date);
            return (!year || date.getFullYear() === year) &&
                   (!month || date.getMonth() + 1 === month) &&
                   (!day || date.getDate() === day);
        })
        .reduce((sum, t) => sum + t.transaction_amount, 0);
};

/**
 * Возвращает транзакции указанного типа.
 * @param {Array<Object>} transactions - Массив транзакций.
 * @param {string} type - Тип транзакции (debit или credit).
 * @returns {Array<Object>} Массив транзакций указанного типа.
 */
const getTransactionByType = (transactions, type) => {
    return transactions.filter(t => t.transaction_type === type);
};

/**
 * Возвращает массив транзакций, проведенных в указанном диапазоне дат.
 * @param {Array<Object>} transactions - Массив транзакций.
 * @param {string} startDate - Начальная дата (в формате YYYY-MM-DD).
 * @param {string} endDate - Конечная дата (в формате YYYY-MM-DD).
 * @returns {Array<Object>} Массив транзакций в указанном диапазоне дат.
 */
const getTransactionsInDateRange = (transactions, startDate, endDate) => {
    return transactions.filter(t => {
        const date = new Date(t.transaction_date);
        return date >= new Date(startDate) && date <= new Date(endDate);
    });
};

/**
 * Возвращает массив транзакций, совершенных с указанным merchantName.
 * @param {Array<Object>} transactions - Массив транзакций.
 * @param {string} merchantName - Название магазина или сервиса.
 * @returns {Array<Object>} Массив транзакций, совершенных с указанным merchantName.
 */
const getTransactionsByMerchant = (transactions, merchantName) => {
    return transactions.filter(t => t.merchant_name === merchantName);
};

/**
 * Возвращает среднее значение транзакций.
 * @param {Array<Object>} transactions - Массив транзакций.
 * @returns {number} Среднее значение транзакций.
 */
const calculateAverageTransactionAmount = (transactions) => {
    return transactions.length === 0 ? 0 : calculateTotalAmount(transactions) / transactions.length;
};

/**
 * Возвращает массив транзакций с суммой в заданном диапазоне.
 * @param {Array<Object>} transactions - Массив транзакций.
 * @param {number} minAmount - Минимальная сумма.
 * @param {number} maxAmount - Максимальная сумма.
 * @returns {Array<Object>} Массив транзакций с суммой в заданном диапазоне.
 */
const getTransactionsByAmountRange = (transactions, minAmount, maxAmount) => {
    return transactions.filter(t => t.transaction_amount >= minAmount && t.transaction_amount <= maxAmount);
};

/**
 * Вычисляет общую сумму дебетовых транзакций.
 * @param {Array<Object>} transactions - Массив транзакций.
 * @returns {number} Сумма дебетовых транзакций.
 */
const calculateTotalDebitAmount = (transactions) => {
    return calculateTotalAmount(getTransactionByType(transactions, "debit"));
};

/**
 * Возвращает месяц, в котором было больше всего транзакций.
 * @param {Array<Object>} transactions - Массив транзакций.
 * @returns {string} Месяц с наибольшим количеством транзакций.
 */
const findMostTransactionsMonth = (transactions) => {
    if (transactions.length === 0) return null;
    const counts = transactions.reduce((acc, t) => {
        const month = new Date(t.transaction_date).toLocaleString('default', { month: 'long' });
        acc[month] = (acc[month] || 0) + 1;
        return acc;
    }, {});
    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
};

/**
 * Возвращает месяц, в котором было больше дебетовых транзакций.
 * @param {Array<Object>} transactions - Массив транзакций.
 * @returns {string} Месяц с наибольшим количеством дебетовых транзакций.
 */
const findMostDebitTransactionMonth = (transactions) => {
    return findMostTransactionsMonth(getTransactionByType(transactions, "debit"));
};

/**
 * Возвращает, каких транзакций больше всего.
 * @param {Array<Object>} transactions - Массив транзакций.
 * @returns {string} 'debit', 'credit' или 'equal'.
 */
const mostTransactionTypes = (transactions) => {
    if (transactions.length === 0) return 'equal';
    const debitCount = getTransactionByType(transactions, "debit").length;
    const creditCount = getTransactionByType(transactions, "credit").length;
    return debitCount > creditCount ? "debit" : creditCount > debitCount ? "credit" : "equal";
};

/**
 * Возвращает массив транзакций, совершенных до указанной даты.
 * @param {Array<Object>} transactions - Массив транзакций.
 * @param {string} date - Дата (в формате YYYY-MM-DD).
 * @returns {Array<Object>} Массив транзакций, совершенных до указанной даты.
 */
const getTransactionsBeforeDate = (transactions, date) => {
    return transactions.filter(t => new Date(t.transaction_date) < new Date(date));
};

/**
 * Возвращает транзакцию по ее уникальному идентификатору.
 * @param {Array<Object>} transactions - Массив транзакций.
 * @param {string} id - Уникальный идентификатор транзакции.
 * @returns {Object|null} Транзакция или null, если не найдена.
 */
const findTransactionById = (transactions, id) => {
    return transactions.find(t => t.transaction_id === id) || null;
};

/**
 * Возвращает новый массив, содержащий только описания транзакций.
 * @param {Array<Object>} transactions - Массив транзакций.
 * @returns {Array<string>} Массив описаний транзакций.
 */
const mapTransactionDescriptions = (transactions) => {
    return transactions.map(t => t.transaction_description);
};

// Экспорт функций для использования в других файлах (если используется Node.js)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getUniqueTransactionTypes,
        calculateTotalAmount,
        calculateTotalAmountByDate,
        getTransactionByType,
        getTransactionsInDateRange,
        getTransactionsByMerchant,
        calculateAverageTransactionAmount,
        getTransactionsByAmountRange,
        calculateTotalDebitAmount,
        findMostTransactionsMonth,
        findMostDebitTransactionMonth,
        mostTransactionTypes,
        getTransactionsBeforeDate,
        findTransactionById,
        mapTransactionDescriptions
    };
}