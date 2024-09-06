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

// Node Class for Navigation
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.back = null;
    }
}

// Browser Class for Forward/Backward Navigation
class Browser {
    constructor(homepage) {
        this.current = new Node(homepage);
    }

    visit(url) {
        const newNode = new Node(url);
        newNode.back = this.current;
        this.current.next = newNode;
        this.current = newNode;
    }

    back(steps) {
        while (steps > 0 && this.current.back) {
            this.current = this.current.back;
            steps--;
        }
        return this.current.data;
    }

    forward(steps) {
        while (steps > 0 && this.current.next) {
            this.current = this.current.next;
            steps--;
        }
        return this.current.data;
    }

    getCurrentUrl() {
        return this.current.data;
    }
}

// Bookmark Manager Class
class BookmarkManager {
    constructor() {
        this.bookmarks = [];
    }

    addBookmark(url) {
        if (!this.bookmarks.includes(url)) {
            this.bookmarks.push(url);
            this.displayBookmarks();
        } else {
            alert("Bookmark already exists.");
        }
    }

    displayBookmarks() {
        const bookmarkList = document.getElementById('bookmark-list');
        bookmarkList.innerHTML = '';
        this.bookmarks.forEach(bookmark => {
            const listItem = document.createElement('li');
            listItem.textContent = bookmark;
            bookmarkList.appendChild(listItem);
        });
    }
}

// Initialize Trie, Browser, and Bookmark Manager
const trie = new Trie();
const browser = new Browser('https://www.google.com');
const bookmarkManager = new BookmarkManager();
document.getElementById('url-display').innerText = `Current URL: https://www.google.com`;

// Example URLs for autocomplete
const urls = ["youtube.com","facebook.com","wikipedia.org","reddit.com","tiktok.com","instagram.com","pinterest.com","quora.com",'linkedin.com','twitter.com','amazon.com','google.com','apple.com','ando.com','ebaycom','wordpress.com','etsy.com','yahoo.com','yelp.com','medium.com','walmart.com','imdb.com','indeed.com','tripadvisor.com','nih.gov','nytimes.com','britannica.com','shutterstock.com','forbes.com','mapquest.com','aliexpress.com','microsoft.com',
'cambridge.org', 'spotify.com', 'stackexchange.com', 'theguardian.com', 'wiktionary.org', 'sciencedirect.com', 'alamy.com', 'bbc.com', 'scribd.com', 'foursquare.com', 'reverso.net', 'wikihow.com', 'dailymotion.com', 'businessinsider.com', 'x.com', 'collinsdictionary.com', 'healthline.com'];
urls.forEach(url => trie.insert(url));

// Event Handler for Visit Button
function visit() {
    let url = document.getElementById('url').value;
    if (url) {
        browser.visit(url);
        document.getElementById('url-display').innerText = `Current URL: ${url}`;
        document.getElementById('url').value = '';
    }
}

// Event Handler for Back Button
function goBack() {
    let currentUrl = browser.back(1);
    document.getElementById('url-display').innerText = `Current URL: ${currentUrl}`;
}

// Event Handler for Forward Button
function goForward() {
    let currentUrl = browser.forward(1);
    document.getElementById('url-display').innerText = `Current URL: ${currentUrl}`;
}

// Event Handler for Bookmark Button
function addBookmark() {
    let currentUrl = browser.getCurrentUrl();
    bookmarkManager.addBookmark(currentUrl);
}

// Event Handler for Autocomplete Suggestions
document.getElementById('url').addEventListener('input', function () {
    const query = document.getElementById('url').value;
    const suggestions = trie.getAllWordsWithPrefix(query);
    displaySuggestions(suggestions);
});

function displaySuggestions(suggestions) {
    const suggestionList = document.getElementById('suggestion-list');
    suggestionList.innerHTML = '';
    
    // Limit to 6 suggestions (or change this number as needed)
    const maxSuggestions = 6;
    
    // Only display up to maxSuggestions
    const limitedSuggestions = suggestions.slice(0, maxSuggestions);

    limitedSuggestions.forEach(suggestion => {
        const suggestionItem = document.createElement('li');
        suggestionItem.textContent = suggestion;
        suggestionItem.classList.add('suggestion-item');
        suggestionItem.addEventListener('click', function () {
            document.getElementById('url').value = suggestion;
            suggestionList.innerHTML = '';
        });
        suggestionList.appendChild(suggestionItem);
    });
}
