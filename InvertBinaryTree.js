class Node{
    constructor(val){
       this.val = val;
       this.left = null;
       this.right = null;
    };
 };
// class for binary tree
class BinaryTree{
    constructor(){
       // root of the binary tree
       this.root = null;
    };
    insert = (data) => {
       // creating a new node with data
       const newNode = new Node(data);
       // if root is null, then this node will be the root
       if(this.root === null){
          this.root = newNode;
       }else{
          // otherwise we find the correct position to insert this node
          this.insertData(this.root, newNode);
       };
    };
    insertData = (node, newNode) => {
       if(newNode.val < node.val){
          if(node.left === null){
             node.left = newNode;
          }else{
             this.insertData(node.left, newNode);
          }
       }else{
          if(node.right === null){
             node.right = newNode;
          }else{
             this.insertData(node.right, newNode);
          }
       }
    };

    invertBinaryTree = (node) => {

        if(node == null)
        {
            return;
        }
    
        let temp = node.left;
        node.left = node.right;
        node.right = temp;

   
        this.invertBinaryTree(node.left);
        this.invertBinaryTree(node.right);
   
    }

    invert = (node) => {
        if(node === null){
           return;
        };
        [node.left, node.right] = [node.right, node.left];
        this.invert(node.right);
        this.invert(node.left);
     }

    traverse = (node) => {
        if(node === null){
           return;
        };
        this.traverse(node.right);
        console.log(node.val);
        this.traverse(node.left);
     };

     height = (node) => {

        if(node == null)
        {
            return 0;
        }

        return 1 + Math.max(this.height(node.left) + this.height(node.right));
     }

     diameter = (node) => {

        if(node == null)
        {
            return 0;
        }

        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);

        let leftDiameter = this.diameter(node.left);
        let rightDiameter = this.diameter(node.right);

        return Math.max((leftHeight+ rightHeight+ 1), Math.max(leftDiameter, rightDiameter));

     }
}


const Tree = new BinaryTree();
Tree.insert(2);
Tree.insert(7);
Tree.insert(4);
Tree.insert(1);
Tree.insert(9);
Tree.insert(3);
Tree.insert(6);
// original right to left traversal
Tree.traverse(Tree.root);

console.log("heighr of the tree", Tree.height(Tree.root))
Tree.invertBinaryTree(Tree.root);
console.log('after inversion');
// traversal right to left after inversion
Tree.traverse(Tree.root);



