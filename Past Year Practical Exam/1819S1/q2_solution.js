// QUESTION 2

// SOLUTIONS

//===============================================================
// DO NOT REMOVE OR MODIFY THE FOLLOWING FUNCTIONS.
// You may call them in your functions.
//===============================================================
function swap(A, i, j) {
    const temp = A[i];
    A[i] = A[j];
    A[j] = temp;
}
//---------------------------------------------------------------
function copy_array(A) {
    const len = array_length(A);
    const B = [];
    for (let i = 0; i < len; i = i + 1) {
        B[i] = A[i];
    }
    return B;
}
//---------------------------------------------------------------
function reverse_array(A) {
    const len = array_length(A);
    const half_len = math_floor(len / 2);
    for (let i = 0; i < half_len; i = i + 1) {
        swap(A, i, len - 1 - i);
    }
}
//---------------------------------------------------------------
function array_to_list(A) {
    const len = array_length(A);
    let L = null;
    for (let i = len - 1; i >= 0; i = i - 1) {
        L = pair(A[i], L);
    }
    return L;
}
//---------------------------------------------------------------
function list_to_array(L) {
    const A = [];
    let i = 0;
    for (let p = L; !is_null(p); p = tail(p)) {
        A[i] = head(p);
        i = i + 1;
    }
    return A;
}
//---------------------------------------------------------------
// Sorts the array of numbers in ascending order.
function sort_ascending(A) {
    const len = array_length(A);
    for (let i = 1; i < len; i = i + 1) {
        const x = A[i];
        let j = i - 1;
        while (j >= 0 && A[j] > x) {
            A[j + 1] = A[j];
            j = j - 1;
        }
        A[j + 1] = x;
    }
}
//---------------------------------------------------------------
function digits_to_string(digits) {
    const len = array_length(digits);
    let str = "";
    for (let i = 0; i < len; i = i + 1) {
        str = str + stringify(digits[i]);
    }
    return str;
}
// const D = [8, 3, 9, 2, 8, 1];
// digits_to_string(D);  // returns "839281"
//===============================================================
// DO NOT REMOVE OR MODIFY THE ABOVE FUNCTIONS.
//===============================================================



//===============================================================
// TASK 2A
//===============================================================
function build_largest_int(digits) {
    // WRITE HERE.
    // ---BEGIN TASK---
    const S = copy_array(digits);
    sort_ascending(S);
    reverse_array(S);
    return digits_to_string(S);
    // ---END TASK---
}


//===============================================================
// TASK 2B
//===============================================================
function build_2nd_largest_int(digits) {
    // WRITE HERE.
    // ---BEGIN TASK---
    const S = copy_array(digits);
    const len = array_length(S);
    sort_ascending(S);
    reverse_array(S);
    let swapped = false;
    for (let i = len - 1; !swapped && i >= 1; i = i - 1) {
        if (S[i-1] > S[i]) {
            swap(S, i - 1, i);
            swapped = true;
        } else {}
    }
    return digits_to_string(S);
    // ---END TASK---
}


//===============================================================
// TASK 2C
//===============================================================
function build_nth_largest_int(digits, n) {
    // WRITE HERE.
    // ---BEGIN TASK---
    function permutations(ys) {
        return is_null(ys)
            ? list(null)
            : accumulate(append, null,
                map(x => map(p => pair(x, p),
                             permutations(remove(x, ys))),
                    ys));
    }

    const S = copy_array(digits);
    const len = array_length(S);
    sort_ascending(S);
    reverse_array(S);
    const digit_lst = array_to_list(S);
    const perms = permutations(digit_lst);
    const nth_lst = list_ref(perms, math_min(length(perms), n) - 1);
    const nth = list_to_array(nth_lst);
    return digits_to_string(nth);
    // ---END TASK---
}

/*
    // --- ALTERNATIVE SOLUTION ---

    const S = copy_array(digits);
    const len = array_length(S);
    sort_ascending(S);
    reverse_array(S);

    // count keeps track of the rank of the integer currently constructed.
    // count === n when the nth largest integer is contructed.
    let count = 0;

    // count_th array contains the digits of the count-th largest integer.
    const count_th = [];

    // digit_used[i] is true iff digit S[i] is currently used
    // in the count-th largest integer.
    const digit_used = [];

    // Initialize digit_used array.
    for (let i = 0; i < len; i = i + 1) { digit_used[i] = false; }

    // Construct the k-th digit of the count-th largest integer.
    function iter(k) {
        if (k === len) {
            // Have just finished constructing a new len-digit integer,
            // which is the count-th largest integer.
            count = count + 1;
        } else {
            // Construct the k-th digit of the count-th largest integer.
            for (let i = 0; count < n && i < len; i = i + 1) {
                if (!digit_used[i]) {
                    digit_used[i] = true;
                    count_th[k] = S[i];
                    iter(k + 1);  // Contruct the next digit.
                    digit_used[i] = false;
                } else { }
            }
        }
    }
    iter(0);
    return digits_to_string(count_th);
*/



//===============================================================
