
////////////////////////////////////////
//////// Random Functions Dump /////////
////////////////////////////////////////


/////////////////////////////////
// Greatest Common Denominator //
/////////////////////////////////

function gcd(a, b) {
    return b === 0
    ? a
    : gcd(b, a % b);
}


///////////////////////
// Pascal's Triangle //
///////////////////////

function pascal(row, position) {
    return position === 0 || position === row || row === 0
    ? 1
    : pascal(row-1, position-1) + pascal(row-1, position);
}


///////////////////////
// The Coins Problem //
///////////////////////

// Given an amount and a number of kinds of coins, how many ways are there to make up the amount using the coins?

function first_demonination(kinds_of_coins) {
    return kinds_of_coins === 1 ? 5 :
           kinds_of_coins === 2 ? 10 :
           kinds_of_coins === 3 ? 20 :
           kinds_of_coins === 4 ? 50 :
           kinds_of_coins === 5 ? 100 : 0;
}

function cc(amount, kinds_of_coins) {
    if (amount === 0) {
        return 1;
    } else if (amount < 0 || kinds_of_coins === 0) {
        return 0;
    } else {
        return cc(amount - first_demonination(kinds_of_coins)) 
                + cc(amount, coins - 1);
    }
}

// LIST VERSION //
// Given an amount and a list of coins, how many permutations of coins can be used to makeup the amount?

function makeup_amount(x, coins) {
    if (x === 0) {
        return list(null);
    } else if (x < 0 || is_null(coins)) {
        return null;
    } else {
        const combi_A = makeup_amount(x, tail(coins)); // combis that do not use the head coin
        const combi_B = makeup_amount(x - head(coins), coins); // combis that do not use the head coin for the remaining amount
        const combi_C = map(x => pair(head(coins), x), combi_B); // combis that use the head coin
        return append(combi_A, combi_C);
    }
}


/////////////
// Subsets //
/////////////

// Returns a list of all subsets of a given set(list with non repeating elements).

function subsets(set) {
    if (is_null(set)) {
        return list(null);
    } else {
        const add_sets = map(x => pair(head(set), x), subsets(tail(set)));
        const no_first = subsets(tail(set));
        return append(add_sets, no_first);
    }
}


//////////////////
// Combinations //
//////////////////

// nCr

function choose(n, r) {
    if (n < 0 || r < 0) {
        return 0;
    } else if (r === 0) {
        return 1;
    } else {
        return choose(n-1, r-1) + choose(n-1, r);
    }
}


///////////////////
// Prime Numbers //
///////////////////

function is_prime(n) {
    if (n < 2) {
        return false;
    } else if (n === 2) {
        return true;
    } else {
        let prime = true;
        for (let d = 2; d * d <= n && prime; d = d + 1) {
            if (n % d === 0) {
                prime = false;
            } else {}
        }
        return prime;
    }
}
