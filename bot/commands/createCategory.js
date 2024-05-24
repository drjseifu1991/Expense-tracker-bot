const Blockchain = require('../../blockchain/Blockchain');


module.exports = (bot, msg, match, userGroups) => {
    const chatId = msg.chat.id;
    const categoryName = match[1];

    if (!userGroups[chatId] || !userGroups[chatId].group) {
        bot.sendMessage(chatId, 'You need to join a group first using /joingroup <group name>.');
        return;
    }

    const group = userGroups[chatId].group;

    if (!Blockchain.groups[group].find(block => block.category === categoryName)) {
        userGroups[chatId].category = categoryName;
        bot.sendMessage(chatId, `Category "${categoryName}" created in group "${group}".`);
    } else {
        bot.sendMessage(chatId, `Category "${categoryName}" already exists in group "${group}".`);
    }
};
