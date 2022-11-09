
///////////////////////////////////////
////////// STREAM PROCESSING //////////
///////////////////////////////////////


//==========================
// Infinite Ones Stream 
//==========================

function ones_stream() {
    return pair(1, ones_stream);
}



//==========================
// Add Streams
//==========================

function add_streams(s1, s2) {
    if (is_null(s1)) {
        return s2;
    } else if (is_null(s2)) {
        return s1;
    } else {
        return pair(head(s1) + head(s2),
                    () => add_streams(stream_tail(s1), stream_tail(s2)));
    }
}



//==========================
// Replace
//==========================

// Replace creates a new stream by replacing in a given stream a particular value by another value.

function replace(s, a, b) {
    return is_null(s) 
        ? null
        : pair((head(s) === a) ? b : head(s),
            () => replace(stream_tail(s), a, b));
}



//==========================
// More
//==========================

function more(a, b) {
    return (a > b)
        ? more(1, 1 + b)
        : pair(a, () => more(a + 1, b));
}

const more_and_more = more(1, 1);

eval_stream(more_and_more, 15);
// returns
// [1, [1, [2, [1, [2, [3, [1, [2, [3, [4,
// [1, [2, [3, [4, [5, null]]]]]]]]]]]]]]]



//==========================
// Memoizing Streams
//==========================

function memo_fun(fun) {
    let already_run = false;
    let result = undefined;

    function mfun() {
        if (!already_run) {
            result = fun();
            already_run = true;
            return result;
        } else {
            return result;
        }
    }
    return mfun;
}
//used to wrap the nullary function and returns the result of calling that nullary
//function from memory if it has been evaluated before



//==========================
// List to Infinite Stream
//==========================

function list_to_inf_stream(xs) {
    function helper(ys) {
        if (is_null(ys)) {
            return helper(xs);
        } else {
            return pair(head(ys),
                        () => helper(tail(ys)));
        }
    }
    return is_null(xs) ? null : helper(xs);
}



//==========================
// Shorten Stream
//==========================

// Given a stream s and an integer k, return the stream of the first k elements of the stream.

function shorten_stream(s, k) {
    if (k === 0) {
        return null;
    } else {
        return is_null(s)
        ? null 
        : pair(head(s), () => shorten_stream(stream_tail(s), k-1));
    }
}


