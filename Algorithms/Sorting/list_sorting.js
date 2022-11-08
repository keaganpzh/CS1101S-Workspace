////////////////////
// Insertion Sort //
////////////////////

function insert(x, xs) {
    return is_null(xs)
           ? list(x)
           : x <= head(xs)
           ? pair(x, xs)
           : pair(head(xs), insert(x, tail(xs)));
}

function insertion_sort(xs) {
    return is_null(xs) 
           ? xs
           : insert(head(xs), insertion_sort(tail(xs)));
}

///////////////////
// Selection Sort//
///////////////////

function smallest(xs) {
    return accumulate((x, y) => x < y ? x : y, 
                      head(xs), tail(xs));
}

function selection_sort(xs) {
    if (is_null(xs)) {
        return xs;
    } else {
        const x = smallest(xs);
        return pair(x, selection_sort(remove(x, xs)));
    }
}

//////////////
//Merge Sort//
//////////////

// half, rounded downwards
function middle(n) {
    return math_floor(n / 2);
}

// put the first n elements of xs into a list
function take(xs, n) {
    function take_helper(xs, n, lst) {
        return length(lst) === n
        ? reverse(lst)
        : take_helper(tail(xs), n, pair(head(xs), lst));
    }
    return take_helper(xs, n, null);       
}

// drop the first n elements from the list and return the rest
function drop(xs, n) {
	function drop_helper(xs, n, c) {
        return c === n
        ? xs
        : drop_helper(tail(xs), n, c+1);
    }
    return drop_helper(xs, n, 0);
	}

// merge two sorted lists into one sorted list
function merge(xs, ys) {
    if (is_null(xs)) {
        return ys;
    } else if (is_null(ys)) {
        return xs;
    } else {
        const x = head(xs);
        const y = head(ys);
        return x < y
               ? pair(x, merge(tail(xs), ys))
               : pair(y, merge(xs, tail(ys)));
    }
}

// a list with more than one element is sorted
// by splitting it into two lists of (almost) equal
// length, sorting the halves and then merging them
// together
function merge_sort(xs) {
    if (is_null(xs) || is_null(tail(xs))) {
        return xs;
    } else {
        const mid = middle(length(xs));
        return merge(merge_sort(take(xs, mid)),
                     merge_sort(drop(xs, mid)));
    }
}

/////////////
//Quicksort//
/////////////

function partition(xs, p) {
    function partition_helper(xs, p, lst1, lst2) {
        return is_null(xs)
        ? pair(lst1, lst2)
        : head(xs) <= p
        ? partition_helper(tail(xs), p, append(list(head(xs)),   lst1), lst2)
        : partition_helper(tail(xs), p, lst1, append(list(head(xs)), lst2));
    }
    return partition_helper(xs, p, null, null);
}

function quicksort(xs) {
    return is_null(xs)
    ? xs
    : append(quicksort(head(partition(tail(xs), head(xs)))),
      pair(head(xs), quicksort(tail(partition(tail(xs), head(xs))))));
}



