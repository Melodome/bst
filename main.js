import { Tree } from './bst.js';

const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const bst = new Tree();

bst.buildTree(testArray);
bst.insert(13);
bst.prettyPrint(bst.root);
console.log(bst.includes(324));

console.log("--- Level Order Traversal ---");
bst.postOrderForEach(console.log);
console.log("Height of Root 8:", bst.height(8));
console.log("Depth of Root 13:", bst.depth(13));
console.log(bst.isBalanced());

console.log("--- REBUILD ---");
bst.rebalance();
bst.prettyPrint(bst.root);