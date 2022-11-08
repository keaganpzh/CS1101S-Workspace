////////////////////////////////////////////////////////////
// Question 1A
////////////////////////////////////////////////////////////

function is_nucleobase(s) {
    // WRITE HERE.
    return s === "A" || s === "C" || s === "G" || s === "T";
}



////////////////////////////////////////////////////////////
// Question 1B
////////////////////////////////////////////////////////////

function is_dna_strand(xs) {
    // WRITE HERE.
    return accumulate((x, acc) => is_nucleobase(x) && acc,
                      true, xs);
}



////////////////////////////////////////////////////////////
// Question 1C
////////////////////////////////////////////////////////////

function combine(xss) {
    // WRITE HERE.
    return accumulate(append, null, xss);
}



////////////////////////////////////////////////////////////
// Question 1D
////////////////////////////////////////////////////////////

function oxoguanine_repair(xs) {
    // WRITE HERE.
    return map(x => (x === "8") ? "G" : x, xs);
}



////////////////////////////////////////////////////////////
// Question 1E
////////////////////////////////////////////////////////////

function find_gene_start(xs) {
    // WRITE HERE.
    function at_least_length(ys, n) {
        if (n === 0) {
            return true;
        } else if (is_null(ys)) {
            return false;
        } else {
            return at_least_length(tail(ys), n - 1);
        }
    }
    if (at_least_length(xs, 3)) {
        if (head(xs) === "A" &&
            head(tail(xs)) === "T" &&
            head(tail(tail(xs))) === "G") {
            return list(tail(tail(tail(xs))));
        } else {
            return find_gene_start(tail(xs));
        }
    } else {
        return null;
    }
}



////////////////////////////////////////////////////////////
// Question 1F
////////////////////////////////////////////////////////////

function find_gene_end(xs) {
    // WRITE HERE.
    function at_least_length(ys, n) {
        if (n === 0) {
            return true;
        } else if (is_null(ys)) {
            return false;
        } else {
            return at_least_length(tail(ys), n - 1);
        }
    }
    function is_prefix(ys, zs) {
        if (is_null(ys)) {
            return true;
        } else if (is_null(zs)) {
            return false;
        } else if (head(ys) === head(zs)) {
            return is_prefix(tail(ys), tail(zs));
        } else {
            return false;
        }
    }
    function find_end(ws, acc) {
        if (at_least_length(ws, 3)) {
            if (is_prefix(list("T", "A", "G"), ws) ||
                is_prefix(list("T", "A", "A"), ws) ||
                is_prefix(list("T", "G", "A"), ws)) {
                return list(reverse(acc));
            } else {
                return find_end(tail(ws), pair(head(ws), acc));
            }
        } else {
             return null;
        }
    }
    return find_end(xs, null);
}



////////////////////////////////////////////////////////////
// Question 1G
////////////////////////////////////////////////////////////

function all_genes(xs) {
    // WRITE HERE.
    const start = find_gene_start(xs);
    if (is_null(start)) {
        return null;
    } else {
        const end = find_gene_end(head(start));
        if (is_null(end)) {
            return null;
        } else {
            return pair(head(end), all_genes(head(start)));
        }
    }
}