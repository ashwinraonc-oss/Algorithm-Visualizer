import { mergeSort, bubbleSort } from "./sortingAlgos";

//File to make sure sorting algorithm logic is correct before implementing animations

describe("mergeSort", () => {
    test("empty array", () => {
        expect(mergeSort([])).toEqual([]);
    });

    test("single element", () => {
        expect(mergeSort([42])).toEqual([42]);
    });

    test("two elements out of order", () => {
        expect(mergeSort([2, 1])).toEqual([1, 2]);
    });

    test("already sorted array", () => {
        expect(mergeSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
    });

    test("reverse sorted array", () => {
        expect(mergeSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
    });

    test("array with duplicates", () => {
        expect(mergeSort([3, 1, 2, 3, 1, 2])).toEqual([1, 1, 2, 2, 3, 3]);
    });

    test("array with negative numbers", () => {
        expect(mergeSort([-3, 5, -1, 0, 2, -8])).toEqual([-8, -3, -1, 0, 2, 5]);
    });

    test("all identical elements", () => {
        expect(mergeSort([7, 7, 7, 7])).toEqual([7, 7, 7, 7]);
    });

    test("does not mutate the original array", () => {
        const original = [4, 2, 5, 1, 3];
        const copy = [...original];
        mergeSort(original);
        expect(original).toEqual(copy);
    });

    test("matches native sort on a large random array", () => {
        const arr = Array.from({ length: 1000 }, () =>
            Math.floor(Math.random() * 2000) - 1000
        );
        const expected = [...arr].sort((a, b) => a - b);
        expect(mergeSort(arr)).toEqual(expected);
    });
});

describe("bubbleSort", () => {
    // Edge case: empty array
    test("empty array", () => {
        expect(bubbleSort([])).toEqual([]);
    });

    // Edge case: single value
    test("single element", () => {
        expect(bubbleSort([42])).toEqual([42]);
    });

    test("two elements out of order", () => {
        expect(bubbleSort([2, 1])).toEqual([1, 2]);
    });

    // Normal array
    test("unsorted array", () => {
        expect(bubbleSort([5, 2, 8, 1, 9, 3])).toEqual([1, 2, 3, 5, 8, 9]);
    });

    test("already sorted array", () => {
        expect(bubbleSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
    });

    test("reverse sorted array", () => {
        expect(bubbleSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
    });

    // Edge case: duplicate values
    test("array with duplicates", () => {
        expect(bubbleSort([3, 1, 2, 3, 1, 2])).toEqual([1, 1, 2, 2, 3, 3]);
    });

    // Edge case: all identical values
    test("all identical elements", () => {
        expect(bubbleSort([7, 7, 7, 7])).toEqual([7, 7, 7, 7]);
    });

    test("array with negative numbers", () => {
        expect(bubbleSort([-3, 5, -1, 0, 2, -8])).toEqual([-8, -3, -1, 0, 2, 5]);
    });

    test("matches native sort on a large random array", () => {
        const arr = Array.from({ length: 1000 }, () =>
            Math.floor(Math.random() * 2000) - 1000
        );
        const expected = [...arr].sort((a, b) => a - b);
        expect(bubbleSort(arr)).toEqual(expected);
    });
});
