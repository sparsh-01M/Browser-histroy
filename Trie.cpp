// // Trie Node Class for Autocomplete
class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }

    searchNode(prefix) {
        let node = this.root;
        for (let char of prefix) {
            if (!node.children[char]) return null;
            node = node.children[char];
        }
        return node;
    }

    getAllWordsWithPrefix(prefix) {
        let node = this.searchNode(prefix);
        if (!node) return [];
        let results = [];
        this.dfs(node, prefix, results);
        return results;
    }

    dfs(node, prefix, results) {
        if (node.isEndOfWord) results.push(prefix);
        for (let char in node.children) {
            this.dfs(node.children[char], prefix + char, results);
        }
    }
}
