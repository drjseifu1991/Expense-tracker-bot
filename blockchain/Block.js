const crypto = require('crypto');

class Block {
    constructor(index, timestamp, group, category, transactions, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.group = group;
        this.category = category;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return crypto.createHash('sha256').update(this.index + this.previousHash + this.timestamp + this.group + this.category + JSON.stringify(this.transactions)).digest('hex');
    }
}

module.exports = Block;
