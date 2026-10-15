class Node {
    constructor(data)  {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

export class Tree {
    constructor() {
        this.root = null;
    }

    mergeSort(arr) {
        let treeArr = arr;
        if(treeArr.length <= 1) {
            return arr;
        }

        const mid = Math.floor(treeArr.length / 2);
        let left = treeArr.slice(0, mid);
        let right = treeArr.slice(mid);

        let sorted_left = this.mergeSort(left);
        let sorted_right = this.mergeSort(right);

        return this.merge(sorted_left, sorted_right);
    }

    merge(left, right){
        let sorted_arr = [];
        let i = 0;
        let j = 0;

        while (i < left.length && j < right.length) {
            if(left[i] < right[j]) {
                sorted_arr.push(left[i]);
                i++;
            } else {
                sorted_arr.push(right[j]);
                j++
            }
        }

        return sorted_arr.concat(left.slice(i)).concat(right.slice(j));
    }

    removeDuplicates(arr) {
        let raw_arr = arr;

        let cleaned_arr = [...new Set(raw_arr)];

        return cleaned_arr;
    }

    buildTreeHelp(arr) {
        if(arr.length <= 0) {
            return null;
        }

        let mid = Math.floor(arr.length / 2);

        let node = new Node(arr[mid]);
        node.left = this.buildTreeHelp(arr.slice(0, mid));
        node.right = this.buildTreeHelp(arr.slice(mid + 1));

        return node;

    }

    buildTree(arr) {
       let raw_sorted_arr = this.mergeSort(arr);
       let cleaned_arr = this.removeDuplicates(raw_sorted_arr)
       let root_node = this.buildTreeHelp(cleaned_arr);

       this.root = root_node;
       return root_node;
    }

    includes(value) {
        if(this.isEmpty()) {
            return false;
        }

        let current = this.root;
        while(current !== null) {
            if(value == current.data) {
                return true;
            }

            if(value < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        return false;
    }

    insert(value) {
        if(this.isEmpty()){
            this.root = new Node(value);
            return;
        }
        let current = this.root;
        while(current !== null) {
            if(value < current.data) {
                if(current.left == null) {
                    current.left = new Node(value);
                    return;
                }
                current = current.left;
            } else if (value > current.data) {
                if(current.right == null) {
                    current.right = new Node(value);
                    return;
                }
                current = current.right;
            } else {
                return;
            }
        }

    }

    deleteItem(value, node = this.root) {
        if(node === null) {
            return node;
        }

        if(value < node.data) {
            node.left = this.deleteItem(value, node.left);
        } else if (value > node.data) {
            node.right = this.deleteItem(value, node.right);
        }

        if(value === node.data) {
            if(node.left === null) {
                return node.right;
            }

            if(node.right === null) {
                return node.left;
            }

            if(node.left !== null && node.right !== null) {
                let minNode = this.findMin(node.right);
                node.data = minNode.data;
                node.right = this.deleteItem(minNode.data, node.right);
            }
        }

        return node;
    }

    levelOrderForEach(callback) {
        if(typeof callback !== "function") {
            throw new Error('Not a Function');
        }

        if(this.root === null) {
            return;
        }

        let arr = [this.root];
        
        while(arr.length > 0) {
            let current = arr.shift();
            callback(current.data);
            if(current.left !== null) {
                arr.push(current.left);
            }
            
            if (current.right !== null) {
                arr.push(current.right);
            }
        }

        return arr;
    }

    inOrderForEach(callback, node = this.root) {
        if(typeof callback !== "function") {
            throw new Error('Not a Function');
        }

        if(node === null) {
            return;
        }

        this.inOrderForEach(callback, node.left);
        callback(node.data);
        this.inOrderForEach(callback, node.right);
    }

    preOrderForEach(callback, node = this.root) {
        if(typeof callback !== "function") {
            throw new Error('Not a Function');
        }

        if(node === null) {
            return;
        }

        callback(node.data);
        this.preOrderForEach(callback, node.left);
        this.preOrderForEach(callback, node.right);
    }

    postOrderForEach(callback, node = this.root) {
        if(typeof callback !== "function") {
            throw new Error('Not a Function');
        }

        if(node === null) {
            return;
        }

        this.postOrderForEach(callback, node.left);
        this.postOrderForEach(callback, node.right);
        callback(node.data);
    }

    height(value) {
        if(this.isEmpty()) {
            return;
        }

        let current = this.root;
        while(current !== null) {
            if(value === current.data) {
                break;
            }

            if(value < current.data) {
                current = current.left;
            } else if(value > current.data) {
                current = current.right;
            }

           
        }

        if(current === null) {
                return undefined;
         }

        return this.calculateHeight(current);
    }

    calculateHeight(node) {
        if (node === null) {
            return -1;
        }

        let leftHeight = this.calculateHeight(node.left);
        let rightHeight = this.calculateHeight(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(value) {
        if(this.isEmpty()) {
            return null;
        }

        let current = this.root;
        let i = 0;
        while(current !== null) {
            if(value === current.data) {
                break;
            }

            if(value < current.data) {
                current = current.left;
                i++
            } else if (value > current.data) {
                current = current.right;
                i++
            }
        }

        if(current === null) {
            return undefined;
        }

        return i;
    }

    isBalanced(node = this.root) {
        if(node === null) {
            return true;
        }

        let leftHeight = this.calculateHeight(node.left);
        let rightHeight = this.calculateHeight(node.right);
        let diff = Math.abs(leftHeight - rightHeight);

        if(diff > 1) {
            return false;
        }

        return this.isBalanced(node.left) && this.isBalanced(node.right);
    }

    rebalance(node = this.root) {
        if(node === null) {
            return;
        }

        let currentArray = [];
        this.inOrderForEach((data) => currentArray.push(data));

        this.root = this.buildTree(currentArray);
    }

    findMin(node) {
        let current = node;
        while(current.left !== null) {
            current = current.left;
        }
        return current;
    }

    isEmpty() {
        return this.root === null;
    }

    prettyPrint(node, prefix = '', isLeft = true) {
        if (node === null || node === undefined) {
            return;
        }

        this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}