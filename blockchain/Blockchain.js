const Block = require('./Block');

class Blockchain {
    constructor() {
        this.chain = [];
        this.currentTransactions = [];
        this.groups = {}; // Initialize groups property
    }

    createGenesisBlock() {
        return new Block(0, '01/01/2021', 'Genesis Group', 'Genesis Category', 'Genesis Block', '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);

        if (!this.groups[newBlock.group]) {
            this.groups[newBlock.group] = [];
        }
        this.groups[newBlock.group].push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }

    getGroupBlocks(group) {
        return this.groups[group] || [];
    }

    getCategoryBlocks(group, category) {
        return this.getGroupBlocks(group).filter(block => block.category === category);
    }
}

module.exports = Blockchain;
