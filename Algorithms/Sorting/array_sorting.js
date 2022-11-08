///////////////////////////////////
///// Binary Search on Arrays /////
///////////////////////////////////

// The function binary_search takes (array, item) and returns true if item is in array, and false otherwise.


// Recursion
function binary_search(A, v) {

    function search(low, high) {
        if (low > high) {
            return false;
        } else {
            const mid = math_floor((low + high) / 2);
            return (v === A[mid]) ||
                   (v < A[mid] 
                    ? search(low, mid - 1)
                    : search(mid + 1, high));
        }
    }
    return search(0, array_length(A) - 1);
}


// Loops
function binary_search(A, v) {
    let low = 0;
    let high = array_length(A) - 1;

    while (low <= high) {
        const mid = math_floor((low + high) / 2 );
        if (v === A[mid]) {
            break;
        } else if (v < A[mid]) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return (low <= high);
}

////////////////////////////
///////// Sorting //////////
////////////////////////////

////////////////////
// Selection Sort //
////////////////////

function find_min_pos(A, low, high) {
    let min_pos = low;
    for (let j = low + 1; j <= high; j = j + 1) {
        if (A[j] < A[min_pos]) {
            min_pos = j;
        }
    }
    return min_pos;
}

function swap(A, x, y) {
    const temp = A[x];
    A[x] = A[y];
    A[y] = temp;
}

function selection_sort(A) {
    const len = array_length(A);

    for (let i = 0; i < len - 1; i = i + 1) {
        let min_pos = find_min_pos(A, i, len - 1);
        swap(A, i, min_pos);
    }
}


////////////////////
// Insertion Sort //
////////////////////

function swap(A, x, y) {
    const temp = A[x];
    A[x] = A[y];
    A[y] = temp;
}

function insertion_sort(A) {
    const len = array_length(A);
    
    for (let i = 1; i < len; i = i + 1) {
        let j = i - 1;
        while (j >= 0 && A[j] > A[j + 1]) {
            swap(A, j, j + 1);
            j = j - 1;
        }
    }
}

// Path version
// 1. Figure out where to insert
// 2. Inserting in the correct location.

function search_cond(A, cond) {
    const len = array_length(A);
    let i = 0;
    while (i < len && !cond(A[i])) {
        i = i + 1;
    }
    return (i < len) ? i : -1;
}

function insert(A, pos, x) {
    let j = array_length(A) - 1;
    while (j >= 0 && j >= pos) {
        A[j + 1] = A[j]; // shift right
        j = j - 1;
    }
    A[pos] = x;
}

function insertion_sort(A) {
    let sorted = [];
    sorted[0] = A[0];
    for (let i = 0; i < array_length(A); i = i + 1) {
        let pos = search_cond(sorted, x => x > A[i]);
        if (pos !== -1) {
            insert(sorted, pos, A[i]);
        } else {
            sorted[i] = A[i];
        }
    }
    return sorted;
}



////////////////
// Merge Sort //
////////////////

function merge_sort(A) {
    merge_sort_helper(A, 0, array_length(A) - 1);
}

function merge_sort_helper(A, low, high) {
    if (low < high) {
        const mid = math_floor((low + high) / 2);
        merge_sort_helper(A, low, mid);
        merge_sort_helper(A, mid + 1, high);
        merge(A, low, mid, high);
    }
}

function merge(A, low, mid, high) {
    const B = [];
    let left = low;
    let right = mid + 1;
    let Bidx = 0;
    
    while (left <= mid && right <= high) {
        if (A[left] <= A[right]) {
            B[Bidx] = A[left];
            left = left + 1;
        } else {
            B[Bidx] = A[right];
            right = right + 1;
        }
        Bidx = Bidx + 1;
    }
    
    while (left <= mid) {
        B[Bidx] = A[left];
        Bidx = Bidx + 1;
        left = left + 1;
    }   
    while (right <= high) {
        B[Bidx] = A[right];
        Bidx = Bidx + 1;
        right = right + 1;
    }
    
    for (let k = 0; k < high - low + 1; k = k + 1) {
        A[low + k] = B[k];
    }
}