////////////////////////////////////////////////////////////
// Question 2A
////////////////////////////////////////////////////////////

function all_different(nums) {
    // WRITE HERE.
    if (is_null(nums)) {
        return true;
    } else {
        const head_is_unique = is_null(member(head(nums), tail(nums)));
        return head_is_unique && all_different(tail(nums));
    }
}



////////////////////////////////////////////////////////////
// Question 2B
////////////////////////////////////////////////////////////

function is_valid_toto_set(nums, n, min, max) {
    // WRITE HERE.
    if (length(nums) !== n) {
        return false;
    } else {
        // check that all numbers are within [min, max].
        const within_min_max = accumulate(
                                 (a, b) => (a >= min && a <= max) && b,
                                 true, nums);
        return (within_min_max && all_different(nums));
    }
}



////////////////////////////////////////////////////////////
// Question 2C
////////////////////////////////////////////////////////////

function num_of_matches(numsA, numsB) {
    // WRITE HERE.
    return accumulate(
               (a, b) => b + (is_null(member(a, numsB)) ? 0 : 1),
               0, numsA);
}



////////////////////////////////////////////////////////////
// Question 2D
////////////////////////////////////////////////////////////

function check_winning_group(bet_nums, draw_nums, extra_num) {
    // WRITE HERE.
    const num_matches = num_of_matches(bet_nums, draw_nums);
    const match_extra_num = !is_null(member(extra_num, bet_nums));
    const n = length(draw_nums);
    if (num_matches === n) {
        return 1;
    } else if (num_matches === (n - 1) && match_extra_num) {
        return 2;
    } else if (num_matches === n - 1) {
        return 3;
    } else if (num_matches === (n - 2) && match_extra_num) {
        return 4;
    } else if (num_matches === n - 2) {
        return 5;
    } else {
        return 0;
    }
}