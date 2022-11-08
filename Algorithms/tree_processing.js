
/////////////////////////////////
//////// TREE PROCESSING ////////
/////////////////////////////////

// a tree of a certain data type is a list whose elements are of that data type, 
// or trees of that data type.


//////////////////
// Flatten Tree //
//////////////////

// type: tree -> list

// List of lists flatten //
function flatten(tree) {
    return accumulate(append, null, tree);
}

// Tree flatten //
function flatten(tree) {
	return accumulate((x, y) => {
		if (is_list(x)) {
			return append;
		} else {
			return append(list(x), y);
		}
	}, null, tree);
}


//////////////
// Map Tree //
//////////////

function map_tree(f, tree) {
	return map(subtree => {
					   !is_list(subtree)
					   ? f(subtree)
					   : map_tree(f, subtree)
					  }, tree);
}


/////////////////////
// Accumulate Tree //
/////////////////////

// The function accumulate_tree takes four arguments: 
// a unary function f, a binary function op, an initial value, and a tree. 
// The function f takes one argument and is used to map each data item in the tree to a value. 
// The function op takes two arguments and is used to combine the results of two sub-trees.

function accumulate_tree(f, op, initial, tree) { 
	return accumulate((x, y) => { 
	return is_list(x) 
	? op(accumulate_tree(f, op, initial, head(x)), y) 
	: op(f(x), y); }, initial, tree); 
} 

//op(); function must be associative and commutative. 
//initial value must be an identity element.


/////////
// Zip //
/////////

// Given a list of lists, returns a list of combining all elements of the same index.
// e.g. zip(list(list(1,2,3), list(4,5,6))); 
// returns list(list(1,4), list(2,5), list(3,6))

function zip(ls) {
    function check_null(ys) {
        return accumulate((x, y) => 
            is_null(x) || y, false, ys);
    }
    if (check_null(ls)) {
        return null;
    } else {
        return pair(map(head, ls), zip(map(tail, ls)));
    }
}



/////////////////////////////////////
//////// BINARY SEARCH TREES ////////
/////////////////////////////////////

//////////
// Find //
//////////

// Returns true if element is in the BST, false otherwise.

function find(tree, item) {
	if (is_empty_tree(tree)) {
		return false;
	} else if (entry(tree) === item) {
		return true;
	} else if (item < entry(tree)) {
		return find(left_branch(tree), item);
	} else {
		return find(right_branch(tree), item);
	}
}


////////////
// Insert //
////////////

// Insert an item into a BST.

function insert(tree, item) {
	if (is_empty_tree(tree)) {
		return make_tree(item, make_empty_tree(), make_empty_tree());
	} else {
		if (item < entry(tree)) {
			return make_tree(entry(tree),
							 insert(left_branch(tree), item), 
							 right_branch(tree));
		} else if (item > entry(tree)) {
			return make_tree(entry(tree),
							 left_branch(tree),
							 insert(right_branch(tree), item));
		} else {
			return tree;
		}
	}
}