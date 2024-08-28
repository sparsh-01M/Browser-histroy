class Node{
public:
    string data;
    Node *next;
    Node *back;
    Node() : data(0), next(nullptr), back(nullptr){};
    Node(string x) : data(x), next(nullptr), back(nullptr){};
    Node(string x, Node *next, Node *random) : data(x), next(next), back(random){};
};
class Browser
{
    Node* current;
    public:
    
    Browser(string &homepage)
    {
        current = new Node(homepage);
    }

    void visit(string &url)
    {
       Node *newNode = new Node(url);
       current->next = newNode;
       newNode->back = current;
       current = newNode;
    }

    string back(int steps)
    {
        while(steps){
            if(current -> back){
            current = current -> back;
            }
            else
            break;
            steps--;
        }
        return current->data;
    }

    string forward(int steps)
    {
        while(steps){
            if(current -> next){
                current = current->next;
            }
            else
            break;
            steps--;
        }
        return current->data;
    }
};
