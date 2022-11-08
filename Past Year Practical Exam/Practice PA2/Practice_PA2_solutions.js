//===============================================================
// Task 1A: Delta Encoding
//===============================================================

function delta_encode(L) {

    function encode(xs, prev) {
        return is_null(xs)
            ? null
            : pair(head(xs) - prev, encode(tail(xs), head(xs)));
    }
    return encode(L, 0);
}



//===============================================================
// Task 1B: Delta Decoding
//===============================================================

function delta_decode(D) {

    function decode(xs, prev) {
        return is_null(xs)
            ? null
            : pair(prev + head(xs), decode(tail(xs), prev + head(xs)));
    }
    return decode(D, 0);
}



//===============================================================
// Task 2A: Run-Length Encoding
//===============================================================

function runlength_encode(L) {

    function encode(val, count, next) {
        return is_null(next)
               ? list(count === 1 ? val : pair(val, count))
               : head(next) === val
               ? encode(val, count + 1, tail(next))
               : pair(count === 1 ? val : pair(val, count),
                      encode(head(next), 1, tail(next)));
    }
    return is_null(L)
           ? null
           : encode(head(L), 1, tail(L));
}



//===============================================================
// Task 2B: Run-Length Decoding
//===============================================================

function runlength_decode(R) {

    function decode(xs, val, count) {
        return count > 0
            ? pair(val, decode(xs, val, count - 1))
            : is_null(xs)
            ? null
            : !is_pair(head(xs))
            ? pair(head(xs), decode(tail(xs), 0, 0))
            : decode(tail(xs), head(head(xs)), tail(head(xs)));
    }
    return decode(R, 0, 0);
}



//===============================================================
// Task 3A: Smallest Bounding Rectangle
//===============================================================

const get_x = (aar) => list_ref(aar, 0);
const get_y = (aar) => list_ref(aar, 1);
const get_width = (aar) => list_ref(aar, 2);
const get_height = (aar) => list_ref(aar, 3);

function smallest_bounding_AAR_area(rs) {
    let min_x = Infinity;
    let min_y = Infinity;
    let max_x = -Infinity;
    let max_y = -Infinity;

    for (let p = rs; !is_null(p); p = tail(p)) {
        const aar = head(p);
        const x1 = get_x(aar);
        const x2 = x1 + get_width(aar);
        const y1 = get_y(aar);
        const y2 = y1 + get_height(aar);

        if (x1 < min_x) { min_x = x1; } else { }
        if (x2 > max_x) { max_x = x2; } else { }
        if (y1 < min_y) { min_y = y1; } else { }
        if (y2 > max_y) { max_y = y2; } else { }
    }
    return (max_x - min_x) * (max_y - min_y);
}



//===============================================================
// Task 3B: Optimized Smallest Bounding Rectangle
//===============================================================

// const get_x = (aar) => list_ref(aar, 0);
// const get_y = (aar) => list_ref(aar, 1);
// const get_width = (aar) => list_ref(aar, 2);
// const get_height = (aar) => list_ref(aar, 3);

function optimized_smallest_bounding_AAR_area(rs) {
    let max_longer = 0;
    let max_shorter = 0;

    for (let p = rs; !is_null(p); p = tail(p)) {
        const aar = head(p);
        const width = get_width(aar);
        const height = get_height(aar);
        const longer = math_max(width, height);
        const shorter = math_min(width, height);

        if (longer > max_longer) { max_longer = longer; } else { }
        if (shorter > max_shorter) { max_shorter = shorter; } else { }
    }
    return max_longer * max_shorter;
}



//===============================================================
// Task 3C: Overlapping Rectangles
//===============================================================

// const get_x = (aar) => list_ref(aar, 0);
// const get_y = (aar) => list_ref(aar, 1);
// const get_width = (aar) => list_ref(aar, 2);
// const get_height = (aar) => list_ref(aar, 3);


// SOLUTION 1
function overlap_area(aar1, aar2) {

    // [a, b] and [c, d] are the input intervals.
    function overlap_length(a, b, c, d) {
        return math_max(0, math_min(b, d) - math_max(a, c));
    }

    const x_overlap = overlap_length(
                        get_x(aar1), get_x(aar1) + get_width(aar1),
                        get_x(aar2), get_x(aar2) + get_width(aar2));

    const y_overlap = overlap_length(
                        get_y(aar1), get_y(aar1) + get_height(aar1),
                        get_y(aar2), get_y(aar2) + get_height(aar2));

    return x_overlap * y_overlap;
}


// SOLUTION 2
function overlap_area(aar1, aar2) {

    // [a, b] and [c, d] are the input intervals.
    function overlap_length(a, b, c, d) {
        if (c < a) {
            return overlap_length(c, d, a, b); // to make sure a <= c
        } else if (b <= c) {
            return 0;     // when a < b <= c < d
        } else if (b <= d) {
            return b - c; // when a <= c < b <= d
        } else {
            return d - c; // when a <= c < d <= b
        }
    }
    const x_overlap = overlap_length(
                        get_x(aar1), get_x(aar1) + get_width(aar1),
                        get_x(aar2), get_x(aar2) + get_width(aar2));

    const y_overlap = overlap_length(
                        get_y(aar1), get_y(aar1) + get_height(aar1),
                        get_y(aar2), get_y(aar2) + get_height(aar2));

    return x_overlap * y_overlap;
}
