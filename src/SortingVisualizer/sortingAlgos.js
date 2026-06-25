
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
        const arr_copy = [...arr]
        let animation_arr = []
        while (flag == true){
            flag = false
            for (let i = 1; i < arr_copy.length; i++){
                if (arr_copy[i] < arr_copy[i-1]){
                    let temp = arr_copy[i]
                    arr_copy[i] = arr_copy[i - 1]
                    arr_copy[i - 1] = temp
                    animation_arr.push([i, i-1])
                    flag = true
                }
            }
        }
        const endTime = performance.now()
        console.log(`Bubble Sort took ${endTime - startTime} ms`)
        return (animation_arr)
        }
    export function quickSort(){
        return

        }
    export function heapSort(){
        return

        }