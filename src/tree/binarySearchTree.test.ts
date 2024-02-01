class TreeNode {
  value: number;
  left?: TreeNode;
  right?: TreeNode;

  constructor(value: number) {
    this.value = value;
  }
}

function insert(node: TreeNode | undefined, value: number): TreeNode {
  if (!node) return new TreeNode(value);

  if (value < node.value) {
    node.left = insert(node.left, value);
  } else {
    node.right = insert(node.right, value);
  }
  return node;
}

function inorder(node: TreeNode) {
  if (!node.left) {
    console.log(node.value);
  } else {
    inorder(node.left);
    console.log(node.value);
  }

  if (node.right) {
    inorder(node.right);
  }
}

function inorder_answer(node?: TreeNode) {
  // Inorder Left -> Root -> Right
  // Preorder Root -> Left -> Right
  // Postorder Left -> Right -> Root
  if (node) {
    inorder_answer(node.left);
    console.log(node.value);
    inorder_answer(node.right);
  }
}

function search(node: TreeNode | undefined, value: number): boolean {
  if (!node) return false;

  if (node.value === value) return true;

  if (value < node.value) {
    return search(node.left, value);
  } else {
    return search(node.right, value);
  }
}

function min_val(node: TreeNode) {
  let current = node;
  while (current?.left) {
    current = current.left;
  }
  return current;
}

function remove(
  node: TreeNode | undefined,
  value: number
): TreeNode | undefined {
  if (!node) return node;

  if (node.value === value) {
    // delete
    const leftNode = node.left;
    const rightNode = node.right;

    if (!leftNode) {
      return rightNode;
    } else if (!rightNode) {
      return leftNode;
    }

    const temp = min_val(rightNode);
    node.value = temp?.value;
    node.right = remove(node.right, temp?.value);
  } else {
    if (value < node.value) {
      node.left = remove(node.left, value);
    } else {
      node.right = remove(node.right, value);
    }
  }

  return node;
}

class BinarySearchTree {
  root?: TreeNode;

  insert(value: number) {
    function _insert(node: TreeNode | undefined, value: number): TreeNode {
      if (!node) return new TreeNode(value);

      if (value < node.value) {
        node.left = _insert(node.left, value);
      } else {
        node.right = _insert(node.right, value);
      }
      return node;
    }

    this.root = _insert(this.root, value);
  }

  inorder() {
    function _inorder_answer(node?: TreeNode) {
      // Inorder Left -> Root -> Right
      // Preorder Root -> Left -> Right
      // Postorder Left -> Right -> Root
      if (node) {
        _inorder_answer(node.left);
        console.log(node.value);
        _inorder_answer(node.right);
      }
    }

    _inorder_answer(this.root);
  }

  search(value: number): boolean {
    function _search(node: TreeNode | undefined, value: number): boolean {
      if (!node) return false;

      if (node.value === value) return true;

      if (value < node.value) {
        return _search(node.left, value);
      } else {
        return _search(node.right, value);
      }
    }

    return _search(this.root, value);
  }

  min_val(node: TreeNode) {
    let current = node;
    while (current?.left) {
      current = current.left;
    }
    return current;
  }

  remove(value: number) {
    const _min_val = this.min_val;
    function _remove(
      node: TreeNode | undefined,
      value: number
    ): TreeNode | undefined {
      if (!node) return node;

      if (node.value === value) {
        // delete
        const leftNode = node.left;
        const rightNode = node.right;

        if (!leftNode) {
          return rightNode;
        } else if (!rightNode) {
          return leftNode;
        }

        const temp = _min_val(rightNode);
        node.value = temp?.value;
        node.right = _remove(node.right, temp?.value);
      } else {
        if (value < node.value) {
          node.left = _remove(node.left, value);
        } else {
          node.right = _remove(node.right, value);
        }
      }

      return node;
    }

    _remove(this.root, value);
  }
}

it("tree test ", () => {
  let root: TreeNode | undefined = undefined;
  root = insert(root, 3);
  root = insert(root, 6);
  root = insert(root, 5);
  root = insert(root, 7);
  root = insert(root, 1);
  root = insert(root, 10);
  root = insert(root, 2);

  inorder(root);
  console.log("#######");
  inorder_answer(root);

  expect(search(root, 10)).toBeTruthy();
  expect(search(root, 9)).toBeFalsy();

  console.log("#######");
  root = remove(root, 6);
  inorder_answer(root);
});


it('tree test for Class ', () => {

    const binary_tree = new BinarySearchTree();
    binary_tree.insert(3);
    binary_tree.insert(6);
    binary_tree.insert(5);
    binary_tree.insert(7);
    binary_tree.insert(1);
    binary_tree.insert(10);
    binary_tree.insert(2);

    binary_tree.inorder();

    console.log(binary_tree.search(4));

    console.log("#######");
    binary_tree.remove(6);
    binary_tree.inorder();
    
});