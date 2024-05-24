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

    Blockchain.getCategoryBlocks(group, category).forEach(block => {
        const { payer, amount } = block.transactions;
        if (!expenses[payer]) {
            expenses[payer] = 0;
        }
        expenses[payer] += amount;
    });

    let response = `Expenses in category "${category}" of group "${group}":\n`;
    for (const [payer, amount] of Object.entries(expenses)) {
        response += `${payer}: ${amount}\n`;
    }

    bot.sendMessage(chatId, response);
};
