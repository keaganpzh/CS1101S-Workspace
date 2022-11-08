////////////////////////////////
//////// BAE as LISTS //////////
////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////
// Evaluate BAE Tree //
///////////////////////

// Evaluates the result of computing a BAE Tree
// For example, the BAE (( 2 + 5 ) * 100)has the following BAE-tree: list(list(2, "+", 5), "*", 100);

function evaluate_BAE_tree(bae_tree) {
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


////////////////////
// Build BAE Tree //
////////////////////

// Given a BAE list (or queue), returns a BAE Tree. 
// For example, the BAE (( 2 + 5 ) * 100) has the following BAE-list: list("(", "(", 2, "+", 5, ")", "*", 100, ")");

function build_BAE_tree(bae_list) {
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


////////////////////////////////
//////// BAE as ARRAYS /////////
////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////
// Make Postfix BAE //
//////////////////////

// Given a BAE in the form of an array, return the same BAE in postfix form.
// i.e. given [[8, "-", 2], "*", [7, "+", 3]], returns [8, 2, "-", 7, 3, "+", "*"]

function make_postfix_exp(bae) {
    const pfe = [];
    let next = 0;

    function convert(sub_bae) {
        if (is_number(sub_bae)) {
            pfe[next] = sub_bae;
            next = next + 1;
        } else {
            convert(sub_bae[0]);
            convert(sub_bae[2]);
            pfe[next] = sub_bae[1];
            next = next + 1;
        }
    }
    convert(bae);
    return pfe;
}


//////////////////////////
// Evaluate Postfix BAE //
//////////////////////////

// Evaluates the given postfix BAE in array form.
// i.e. eval_postfix_bae([8, 2, "-", 7, 3, "+", "*"]); 
// returns (8 - 2) * (7 + 3)

function eval_postfix_exp(pfe) {
    let next = array_length(pfe) - 1;

    function evaluate() {
        const token = pfe[next];
        next = next - 1;
        if (is_number(token)) {
            return token;
        } else {
            const op = token;
            const right = evaluate();
            const left = evaluate();
            if (op === "+") {
                return left + right;
            } else if (op === "-") {
                return left - right;
            } else if (op === "*") {
                return left * right;
            } else {
                return left / right;
            }
        }
    }
    return evaluate();
}