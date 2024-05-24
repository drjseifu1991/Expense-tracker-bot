const Blockchain = require('../../blockchain/Blockchain');
const Block = require('../../blockchain/Block');
const Transaction = require('../../blockchain/Transaction');

module.exports = (bot, msg, match, userGroups) => {
    const chatId = msg.chat.id;
    const [payer, amount] = match[1].split(' ');

    if (!userGroups[chatId] || !userGroups[chatId].group || !userGroups[chatId].category) {
        bot.sendMessage(chatId, 'You need to join a group and create/select a category first.');
        return;
    }

    const group = userGroups[chatId].group;
    const category = userGroups[chatId].category;

    if (!payer || !amount || isNaN(amount)) {
        bot.sendMessage(chatId, 'Invalid format. Use: /addexpense <payer> <amount>');
        return;
    }

    const transaction = new Transaction(payer, parseFloat(amount));
    const newBlock = new Block(Blockchain.chain.length, Date.now(), group, category, transaction);
    Blockchain.addBlock(newBlock);

    bot.sendMessage(chatId, 'Transaction added successfully.');
};
