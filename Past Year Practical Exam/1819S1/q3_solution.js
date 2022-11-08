// QUESTION 3

// SOLUTIONS

//===============================================================
// TASK 3A(I)
//===============================================================
function count_lower_neighbors(emap, r, c) {
    // WRITE HERE.
    // ---BEGIN TASK---
    const mRow = array_length(emap); // emap size is mRow x mCol.
    const mCol = array_length(emap[0]);

    if (r <= 0 || (mRow - 1) <= r || c <= 0 || (mCol - 1) <= c) {
        return 0;
    } else {
        let count = 0;
        for (let dr = -1; dr <= 1; dr = dr + 1) {
            for (let dc = -1; dc <= 1; dc = dc + 1) {
                if (emap[r + dr][c + dc] < emap[r][c]) {
                    count = count + 1;
                } else {}
            }
        }
        return count;
    }
    // ---END TASK---
}


//===============================================================
// TASK 3A(II)
//===============================================================
function count_peaks(emap) {
    // WRITE HERE.
    // ---BEGIN TASK---
    const mRow = array_length(emap); // emap size is mRow x mCol.
    const mCol = array_length(emap[0]);

    let count = 0;
    for (let r = 0; r < mRow; r = r + 1) {
        for (let c = 0; c < mCol; c = c + 1) {
            if (count_lower_neighbors(emap, r, c) === 8) {
                count = count + 1;
            } else {}
        }
    }
    return count;
    // ---END TASK---
}


//===============================================================
// TASK 3B
//===============================================================
function count_islands(emap) {
    // WRITE HERE.
    // ---BEGIN TASK---
    const R = array_length(emap);    // emap size is R x C.
    const C = array_length(emap[0]); // emap size is R x C.
    const label = [];                // 2D array for labelling islands.
    let island_count = 0;

    // The function island "floods" an entire island with
    // the label island_id, starting from the position (row, col).
    function label_island(row, col, island_id) {
        if ( row >= 0 && row < R && col >= 0 && col < C ) {
            if ( emap[row][col] !== 0 && label[row][col] === 0 ) {
                label[row][col] = island_id;
                label_island(row, col - 1, island_id);
                label_island(row, col + 1, island_id);
                label_island(row - 1, col, island_id);
                label_island(row + 1, col, island_id);
            } else {}
        } else {}
    }

    // The labels are initialized to 0.
    // The islands are going to be labelled from 1 onwards.
    for (let row = 0; row < R; row = row + 1) {
        label[row] = [];
        for (let col = 0; col < C; col = col + 1) {
            label[row][col] = 0;
        }
    }

    for (let row = 0; row < R; row = row + 1) {
        for (let col = 0; col < C; col = col + 1) {
            if (emap[row][col] !== 0 && label[row][col] === 0) {
                island_count = island_count + 1;
                label_island(row, col, island_count);
            } else {}
        }
    }
    return island_count;
    // ---END TASK---
}


//===============================================================
