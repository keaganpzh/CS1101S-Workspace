// QUESTION 1

// SOLUTIONS

//===============================================================
// TASK 1A
//===============================================================
function make_big_int_from_number(num) {
    // WRITE HERE.
    // ---BEGIN TASK---
    function iter(val, result) {
        const r = val % 10;       // remainder
        const q = (val - r) / 10; // quotient
        return (q === 0)
            ? pair(r, result)
            : iter(q, pair(r, result));
    }
    return reverse(iter(num, null));
    // ---END TASK---
}


//===============================================================
// TASK 1B
//===============================================================
function big_int_to_string(bint) {
    // WRITE HERE.
    // ---BEGIN TASK---
    return is_null(bint)
        ? ""
        : big_int_to_string(tail(bint)) + stringify(head(bint));
    // ---END TASK---
}


//===============================================================
// TASK 1C
//===============================================================
function big_int_add(bintX, bintY) {
    // You may modify the given partial implementation,
    // or remove it and write your own.

    function add(x, y, carry) {
        if (is_null(x) && is_null(y)) {
            return (carry === 0) ? null : pair(carry, null);
        } else {
            // WRITE HERE.
            // ---BEGIN TASK---
            const xdigit = (is_null(x)) ? 0 : head(x);
            const ydigit = (is_null(y)) ? 0 : head(y);
            const sum = xdigit + ydigit + carry;
            const new_digit = sum % 10;
            const new_carry = (sum - new_digit) / 10;
            return pair(new_digit,
                        add((is_null(x)) ? x : tail(x),
                            (is_null(y)) ? y : tail(y), new_carry));
            // ---END TASK---
        }
    }
    return add(bintX, bintY, 0);
}


//===============================================================
// TASK 1D
//===============================================================
function big_int_mult_by_digit(bint, digit) {
    // WRITE HERE.
    // ---BEGIN TASK---
    function mult(x, carry) {
        if (is_null(x)) {
            return (carry === 0) ? null : pair(carry, null);
        } else {
            const xd = head(x);
            const prod = xd * digit + carry;
            const new_digit = prod % 10;
            const new_carry = (prod - new_digit) / 10;
            return pair(new_digit, mult(tail(x), new_carry));
        }
    }
    return (digit === 0) ? list(0) : mult(bint, 0);
    // ---END TASK---
}


//===============================================================
// TASK 1E
//===============================================================
function big_int_mult_by_10_pow_n(bint, n) {
    // WRITE HERE.
    // ---BEGIN TASK---
    return (equal(bint, list(0)) || n === 0)
        ? bint
        : pair(0, big_int_mult_by_10_pow_n(bint, n - 1));
    // ---END TASK---
}


//===============================================================
// TASK 1F
//===============================================================
function big_int_mult(bintX, bintY) {
    // WRITE HERE.
    // ---BEGIN TASK---
    function iter(biY, pow, result) {
        if (is_null(biY)) {
            return result;
        } else {
            const d = head(biY);
            const prod = big_int_mult_by_digit(bintX, d);
            const prod10n = big_int_mult_by_10_pow_n(prod, pow);
            return iter(tail(biY), pow + 1, big_int_add(result, prod10n));
        }
    }
    return iter(bintY, 0, list(0));
    // ---END TASK---
}


//===============================================================
