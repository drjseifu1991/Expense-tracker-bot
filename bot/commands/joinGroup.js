const Blockchain = require('../../blockchain/Blockchain');


module.exports = (bot, msg, match, userGroups) => {
    const chatId = msg.chat.id;
    const groupName = match[1];

    if (Blockchain.groups[groupName]) {
        userGroups[chatId] = { group: groupName, category: null };
        bot.sendMessage(chatId, `Joined group "${groupName}" successfully.`);
    } else {
        bot.sendMessage(chatId, `Group "${groupName}" does not exist.`);
    }
};
