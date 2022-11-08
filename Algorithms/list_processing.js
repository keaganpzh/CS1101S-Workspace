
////////////////////////////////
/////// List Processing ////////
////////////////////////////////


////////////////////////////
// Pre-declared Functions //
////////////////////////////


/////////
// Map //
/////////

// Map takes a unary function f and a list xs and applies f to every element in xs.

function map(f, xs) {
    return is_null(xs) 
    ? null
    : pair(f(head(xs)), map(f, tail(xs)));
}


////////////////
// Accumulate //
////////////////

// Applies binary function f to the elements of xs from right-to-left order, 
// first applying f to the last element and the value initial, resulting in r1, then to the second-last element and r1, 
// resulting in r2, etc, and finally to the first element and rn-1, where n is the length of the list.

function accumulate(f, initial, xs) {
    return is_null(xs) 
    ? initial
    : f(head(xs), accumulate(f, initial, tail(xs)));
}


////////////
// Filter //
////////////

// Filter takes a predicate pred and a list xs, and returns all elements of the list if pred(x) is true.

function filter(pred, xs) {
    return is_null(xs)
    ? null
    : pred(head(xs))
    ? pair(head(xs), filter(pred, tail(xs)))
    : filter(pred, tail(xs));
}


////////////
// Append //
////////////

// Takes 2 lists, xs and ys and produces the result of adding ys to the end of xs.

function append(xs, ys) {
    return is_null(xs)
    ? ys
    : pair(head(xs), append(tail(xs), ys));
}


//////////////////
// Permutations //
//////////////////

// type: list -> tree
// Given a list, returns a list of all possible permuations of the list.
// If list is sorted, (e.g. ascending), then the resulting tree will contain its permutations in ascending order.
// e.g. display_list(permuatations(list(1, 2, 3, 4))); returns 
	//	list(list(1, 2, 3, 4),
    //  list(1, 2, 4, 3),
    //  list(1, 3, 2, 4),
    //  list(1, 3, 4, 2),
    //  list(1, 4, 2, 3),
    //  list(1, 4, 3, 2),
    //  list(2, 1, 3, 4),
    //  list(2, 1, 4, 3),
    //  list(2, 3, 1, 4),
    //  list(2, 3, 4, 1),
    //  list(2, 4, 1, 3),
    //  list(2, 4, 3, 1),
    //  list(3, 1, 2, 4),
    //  list(3, 1, 4, 2),
    //  list(3, 2, 1, 4),
    //  list(3, 2, 4, 1),
    //  list(3, 4, 1, 2),
    //  list(3, 4, 2, 1),
    //  list(4, 1, 2, 3),
    //  list(4, 1, 3, 2),
    //  list(4, 2, 1, 3),
    //  list(4, 2, 3, 1),
    //  list(4, 3, 1, 2),
    //  list(4, 3, 2, 1))

    function permutations(ys) {
        return is_null(ys)
            ? list(null)
            : accumulate(append, null,
                map(x => map(p => pair(x, p),
                                permutations(remove(x, ys))),
                    ys));
    
    }


//////////////////////////////////
// Largest and Smallest in List //
//////////////////////////////////

function smallest(xs) {
    return accumulate((x, y) => x < y ? x : y, 
                      head(xs), tail(xs));
}
function largest(xs) {
    return accumulate((x, y) => x > y ? x : y, 
                      head(xs), tail(xs));
}

