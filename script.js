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
  