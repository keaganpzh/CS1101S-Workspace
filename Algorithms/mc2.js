function fib(n) {
    return n <= 1
    ? n
    : fib(n - 1) + fib(n - 2);
}

function mfib(n) {
    const mem = []; 
    function fib(k) {
        // test if fib(k) has been computed already
        if (mem[k] !== undefined) {
            return mem[k]; // just access memory
        } else { // compute fib and add result to mem
            const result = k <= 1 ? k : fib(k - 1) + fib(k - 2);
            mem[k] = result;
            return result;
        }
    }
    return fib(n);
}

// Read and Write to/from a global array
const mem = [];
    function read(n, k) {
        return mem[n] === undefined
        ? undefined
        : mem[n][k];
    }
    function write(n, k, value) {
        if (mem[n] === undefined) {
            mem[n] = [];
        }
    mem[n][k] = value;
}

{
const stream123 = pair(1, 
                        () => pair(2,
                                    () => pair(3, null)));
}

                                    
// An infinite stream                                
const ones = pair(1, () => ones);

// Evaluating the tail of a stream
function stream_tail(stream) {
    return tail(stream)();
}

function stream_tail(stream) {
    return tail(stream)();
}

function enum_stream(low, hi) {
    return low > hi
        ? null
        : pair(low, () => enum_stream(low + 1, hi));
}

function stream_ref(s, n) {
    return n === 0
        ? head(s)
        : stream_ref(stream_tail(s), n - 1);
}

function stream_map(f, s) {
    return is_null(s)
        ? null
        : pair(f(head(s)),
               () => stream_map(f, stream_tail(s)));
}

function stream_filter(p, s) {
    return is_null(s)
        ? null
        : p(head(s))
            ? pair(head(s),
                   () => stream_filter(p, stream_tail(s)))
            : stream_filter(p, stream_tail(s));
}

function eval_stream(s, n) {
    return n === 0
        ? null
        : pair(head(s),
               eval_stream(stream_tail(s), n - 1));
}