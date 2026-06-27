
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
        const startTime = performance.now()
        let flag = true
        let arr_copy = [...arr]
        let animation_arr = []
        while (flag == true){
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
        const endTime = performance.now()
        console.log(`Bubble Sort took ${endTime - startTime} ms`)
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
    export function heapSort(){
        return

        }