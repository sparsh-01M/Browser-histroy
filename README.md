# Browser-histroy
It shows the data structure implementation of working behind the google and other search engines in ordering the searched tab back and forth so to speak.

4 key features
1- Browser(homepage): Set homepage of the browser

2- Visit(url): Visit the url from the current page. It clears up all the forward history.

3- Back(steps): Move ‘steps’ backward in the browser history

4- Forward(steps): Move ‘steps’ forward in the browser history
If you can’t move steps forward or backward, just return the last website that can be reached.

# Here are five key topics or concepts used in the code:

Trie Data Structure

Used for efficient prefix-based autocomplete functionality.
Doubly Linked List

Utilized in the Browser class for forward and backward navigation.
Depth-First Search (DFS)

Employed in the dfs method of the Trie class to recursively find all words with a given prefix.
Event Handling in JavaScript

Implemented for handling user interactions such as visiting URLs, navigating back and forward, and adding bookmarks.
DOM Manipulation

Used for dynamically updating the UI with bookmarks, autocomplete suggestions, and the current URL.
