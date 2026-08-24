
    export function mergeSort(arr){
        //base case
        if (arr.length <= 1) return arr;
        let mid = Math.floor(arr.length/2);
        let left = mergeSort(arr.slice(0, mid))
        let right = mergeSort(arr.slice(mid))

        return merge(left, right);


    }

    function merge(left, right){
        let sortedArr =  []
        while (left.length && right.length){
            if(left[0] < right[0]){
                sortedArr.push(left.shift())
            } else {
                sortedArr.push(right.shift())
            }
        }
        return [...sortedArr, ...left, ...right];

    }

    export function bubbleSort(arr){
        let flag = true
        let arr_copy = [...arr]
        let animation_arr = []
        while (flag === true){
            flag = false
            for (let i = 1; i < arr_copy.length; i++){
                if (arr_copy[i] < arr_copy[i-1]){
                    let temp = arr_copy[i]
                    arr_copy[i] = arr_copy[i - 1]
                    arr_copy[i - 1] = temp
                    animation_arr.push([i, i-1]);
                    flag = true
                }
            }
        }
        return (animation_arr)
        }
    export function quickSort(arr, low = 0, high = arr.length - 1, animation = []){
        let arr_copy = [...arr]
        if (low < high){
            let pivot = partition(arr_copy, low, high, animation)
            quickSort(arr_copy, low, pivot - 1, animation)
            quickSort(arr_copy, pivot + 1, high, animation)

        }
        //return arr
        return animation
    }
    function partition(arr, low, high, animation){
        let left = low
        let right = high - 1
        let pivot = arr[high]
        while (left < right){
            while (arr[left] < pivot && left < high){
                left += 1
            }
            while (arr[right] >= pivot && right > low){
                right -= 1
            }
            if (left < right){
                [arr[left], arr[right]] = [arr[right], arr[left]];
                animation.push([left, right, high]);
            }
        }
        if (arr[left] > pivot){
            [arr[left], arr[high]] = [arr[high], arr[left]];
            animation.push([left, high, high]);
        }
        return left

    }
    export function selectionSort(arr){
        let anime_arr = [];
        let arr_copy = [...arr]
        
        for (let i = 0; i < arr_copy.length - 1; i++){
            let min_idx = i;
            for (let j = i + 1; j < arr_copy.length; j++){
                if (arr_copy[j] < arr_copy[min_idx]){
                    min_idx = j
                }
            }
            [arr_copy[i], arr_copy[min_idx]] = [arr_copy[min_idx], arr_copy[i]];
            anime_arr.push([i, min_idx]);
        }
        return anime_arr

    }


    export function heapSort(arr, animation_arr = []){
        let arr_copy = [...arr]
        build_heap(arr_copy, animation_arr)
        for (let i = arr_copy.length - 1; i > 0; i-- ){
            [arr_copy[0], arr_copy[i]] = [arr_copy[i], arr_copy[0]]
            animation_arr.push([0,i])
            max_heapify(arr_copy, 0, i, animation_arr)
        }
        return animation_arr


    }
    
    function build_heap(arr_copy, animation_arr){
        let n = arr_copy.length
        for (let i = Math.trunc(n/2) - 1; i >= 0; i--){
            max_heapify(arr_copy, i, n, animation_arr)
        }
        return arr_copy

    }
    function max_heapify(arr_copy, index, n, animation_arr){
        let largest = index
        let left = 2*index + 1
        let right = 2*index + 2

        if(left < n && arr_copy[left] > arr_copy[index]){
            largest = left
        }
        if (right < n && arr_copy[right] > arr_copy[largest]){
            largest = right
        }
        if (largest !== index){
            [arr_copy[index], arr_copy[largest]] = [arr_copy[largest], arr_copy[index]];
            animation_arr.push([index, largest])
            max_heapify(arr_copy, largest, n, animation_arr)
        }



    }