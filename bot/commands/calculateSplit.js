const Blockchain = require('../../blockchain/Blockchain');

module.exports = (bot, msg, userGroups) => {
    const chatId = msg.chat.id;

    if (!userGroups[chatId] || !userGroups[chatId].group || !userGroups[chatId].category) {
        bot.sendMessage(chatId, 'You need to join a group and create/select a category first.');
        return;
    }

    const group = userGroups[chatId].group;
    const category = userGroups[chatId].category;
    const expenses = {};
    let total = 0;

    Blockchain.getCategoryBlocks(group, category).forEach(block => {
        const { payer, amount } = block.transactions;
        if (!expenses[payer]) {
            expenses[payer] = 0;
        }
        expenses[payer] += amount;
        total += amount;
    });

    const numUsers = Object.keys(expenses).length;
    const splitAmount = total / numUsers;
    let response = `Total expenses in category "${category}": ${total}\nEach person should pay: ${splitAmount}\n`;

    for (const [payer, amount] of Object.entries(expenses)) {
        const difference = amount - splitAmount;
        if (difference > 0) {
            response += `${payer} should be reimbursed ${difference}\n`;
        } else if (difference < 0) {
            response += `${payer} should pay ${Math.abs(difference)}\n`;
        } else {
            response += `${payer} is settled\n`;
        }
    }

    bot.sendMessage(chatId, response);
};
