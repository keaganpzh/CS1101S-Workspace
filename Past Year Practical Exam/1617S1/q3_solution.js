////////////////////////////////////////////////////////////
// Question 3A
////////////////////////////////////////////////////////////

function evaluate_BAE_tree(bae_tree) {
    // WRITE HERE.
    if (is_list(bae_tree)) {
        const left = evaluate_BAE_tree(head(bae_tree));
        const right = evaluate_BAE_tree(head(tail(tail(bae_tree))));
        const op = head(tail(bae_tree));
        if (op === "+") {
            return left + right;
        } else if (op === "-") {
            return left - right;
        } else if (op === "*") {
            return left * right;
        } else { // (op === "/")
            return left / right;
        }
    } else { // is a number
        return bae_tree;
    }
}



////////////////////////////////////////////////////////////
// Question 3B
////////////////////////////////////////////////////////////

function build_BAE_tree(bae_list) {
    // WRITE HERE.
    let next_token = bae_list;

    function build_tree() {
        if (equal(head(next_token), "(")) {
            next_token = tail(next_token);
            const left_tree = build_tree();
            const op = head(next_token);
            next_token = tail(next_token);
            const right_tree = build_tree();
            next_token = tail(next_token); // skip over ")"
            return list(left_tree, op, right_tree);
        } else { // token is a number
            const token = head(next_token);
            next_token = tail(next_token);
            return token;
        }
    }

    return build_tree();
}



////////////////////////////////////////////////////////////
// Question 3C
////////////////////////////////////////////////////////////

function evaluate_BAE(bae_list) {
    // WRITE HERE.
    return evaluate_BAE_tree(build_BAE_tree(bae_list));
}



////////////////////////////////////////////////////////////
// Question 3D
////////////////////////////////////////////////////////////

function check_parentheses(paren_list) {
    // WRITE HERE.

    function check(count, xs) {
        if (is_null(xs)) {
            return (count === 0);
        } else if (count < 0) {
            return false;
        } else if (head(xs) === "(") {
            return check(count + 1, tail(xs));
        } else { // (head(xs) === ")")
            return check(count - 1, tail(xs));
        }
    }

    return check(0, paren_list);
}
