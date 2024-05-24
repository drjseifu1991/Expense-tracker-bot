const Blockchain = require('../../blockchain/Blockchain');

module.exports = (bot, msg, match, expenseBlockchain) => {
    const chatId = msg.chat.id;
    if (!match || match.length < 2) {
        bot.sendMessage(chatId, 'Please provide a valid group name.');
        return;
    }

    const groupName = match[1].trim();

    console.log('Received /creategroup command');
    console.log('Group Name:', groupName);

    if (!groupName) {
        bot.sendMessage(chatId, 'Please provide a valid group name.');
        return;
    }

    if (!expenseBlockchain.groups[groupName]) {
        expenseBlockchain.groups[groupName] = [];
        bot.sendMessage(chatId, `Group "${groupName}" created successfully.`);
    } else {
        bot.sendMessage(chatId, `Group "${groupName}" already exists.`);
    }
};
