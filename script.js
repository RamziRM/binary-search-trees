// factory function to create new nodes and construct a BST
function Node(data) {
    this.data = data;
    this.left = null;
    this.right = null;
}

// factory function to create a new tree from an array, initializing the root
function Tree(arr) {
    this.root = buildTree(arr);
}

// buildTree function to build a tree from an array
// 1. remove duplicates from the array
// 2. sort the array in ascending order
function buildTree(arr) {
    arr = Array.from(new Set(arr)).sort(function(a, b){ return a - b });
    return constructBST(arr, 0, arr.length - 1);
}
  
function constructBST(arr, start, end) {
    if (start > end) {
      return null;
    }
  
    const mid = Math.floor((start + end) / 2);
    const node = new Node(arr[mid]);
  
    node.left = constructBST(arr, start, mid - 1);
    node.right = constructBST(arr, mid + 1, end);
  
    return node;
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
       return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

Tree.prototype.insert = function(value) {
    const node = new Node(value);
  
    if (this.root === null) {
      this.root = node;
      return;
    }
  
    let current = this.root;
    while (true) {
      if (value < current.data) {
        if (current.left === null) {
          current.left = node;
          break;
        } else {
          current = current.left;
        }
      } else if (value > current.data) {
        if (current.right === null) {
          current.right = node;
          break;
        } else {
          current = current.right;
        }
      } else {
        // Value already exists in tree
        return;
      }
    }
  }
  
Tree.prototype.delete = function(value) {
this.root = deleteNode(this.root, value);
}

function deleteNode(root, value) {
if (root === null) {
    return null;
}

if (value < root.data) {
    root.left = deleteNode(root.left, value);
} else if (value > root.data) {
    root.right = deleteNode(root.right, value);
} else {
    // Found the node to delete
    if (root.left === null && root.right === null) {
    // Case 1: Node has no children
    return null;
    } else if (root.left === null || root.right === null) {
    // Case 2: Node has one child
    return root.left || root.right;
    } else {
    // Case 3: Node has two children
    let successor = root.right;
    while (successor.left !== null) {
        successor = successor.left;
    }
    root.data = successor.data;
    root.right = deleteNode(root.right, successor.data);
    }
}

return root;
}

