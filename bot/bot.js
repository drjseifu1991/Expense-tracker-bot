require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const Blockchain = require('../blockchain/Blockchain');
const addExpense = require('./commands/addExpense');
const createCategory = require('./commands/createCategory');
const createGroup = require('./commands/createGroup');
const joinGroup = require('./commands/joinGroup');
const viewExpenses = require('./commands/viewExpenses');
const calculateSplit = require('./commands/calculateSplit');

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.on('polling_error', (error) => {
    console.error('Polling error:', error);
});

const expenseBlockchain = new Blockchain(); // Create an instance of Blockchain
const userGroups = {};

// Command handlers with enhanced error logging
bot.onText(/\/creategroup (.+)/, (msg, match) => {
    try {
        createGroup(bot, msg, match, expenseBlockchain); // Pass the instance
    } catch (error) {
        console.error('Error in /creategroup command:', error);
        bot.sendMessage(msg.chat.id, 'An error occurred while creating the group. Please try again.');
    }
});

bot.onText(/\/joingroup (.+)/, (msg, match) => {
    try {
        joinGroup(bot, msg, match, userGroups);
    } catch (error) {
        console.error('Error in /joingroup command:', error);
        bot.sendMessage(msg.chat.id, 'An error occurred while joining the group. Please try again.');
    }
});

bot.onText(/\/createcategory (.+)/, (msg, match) => {
    try {
        createCategory(bot, msg, match, userGroups);
    } catch (error) {
        console.error('Error in /createcategory command:', error);
        bot.sendMessage(msg.chat.id, 'An error occurred while creating the category. Please try again.');
    }
});

bot.onText(/\/addexpense (.+)/, (msg, match) => {
    try {
        addExpense(bot, msg, match, userGroups);
    } catch (error) {
        console.error('Error in /addexpense command:', error);
        bot.sendMessage(msg.chat.id, 'An error occurred while adding the expense. Please try again.');
    }
});

bot.onText(/\/viewexpenses/, (msg) => {
    try {
        viewExpenses(bot, msg, userGroups);
    } catch (error) {
        console.error('Error in /viewexpenses command:', error);
        bot.sendMessage(msg.chat.id, 'An error occurred while viewing the expenses. Please try again.');
    }
});

bot.onText(/\/calculatesplit/, (msg) => {
    try {
        calculateSplit(bot, msg, userGroups);
    } catch (error) {
        console.error('Error in /calculatesplit command:', error);
        bot.sendMessage(msg.chat.id, 'An error occurred while calculating the split. Please try again.');
    }
});

console.log('Telegram bot is running...');
