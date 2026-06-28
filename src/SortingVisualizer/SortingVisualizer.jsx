import React from "react";
import "./SortingVisualizer.css";
import { bubbleSort, heapSort, quickSort, selectionSort} from "./sortingAlgos";
import {mergeSort} from "./mergeSortAlgo";



export default class SortingVisualizer extends React.Component {
    //state variables
    constructor(props){
        super(props);
        this.state = {
            array: [],
            algorithm: 'merge', //default array on bootup
            comparing: [],
            pivot: -1,
            sorted: [],
            isSorted: false,
        };
    }
    //create array on bootup
    componentDidMount(){
        this.resetArray();
    }

    //create new array

    resetArray(){
        this.setState({array: generateRandomArray(), comparing: [], sorted: [], pivot: -1, isSorted: false});
    }
    //calling sorting functions
    runSort(){
        switch (this.state.algorithm){
            case "merge": {
                const newArr = this.state.array
                this.setState({array: newArr, comparing: [], sorted: [], pivot: null, ifSorted: true});

                const startTime = performance.now()
                const sorted_arr = mergeSort(newArr)
                const endTime = performance.now()
                console.log(`Merge Sort took ${endTime - startTime} ms`)

                this.animateMerge(sorted_arr, 5)
                break;
            }

            case "bubble": {
                const newArr = this.state.array
                this.setState({array: newArr, comparing: [], sorted: [], pivot: null});

                const startTime = performance.now()
                const sorted_arr = bubbleSort(newArr)
                const endTime = performance.now()
                console.log(`Bubble Sort took ${endTime - startTime} ms`)

                this.animateBubble(sorted_arr, 5);
                break;
            }

            case "quick":{
                const newArr = this.state.array
                this.setState({array: newArr, comparing: [], sorted: [], pivot: null});

                const startTime = performance.now()
                const sorted_arr = quickSort(newArr)
                const endTime = performance.now()
                console.log(`Quick Sort took ${endTime - startTime} ms`)

                this.animateQuickSort(sorted_arr, 40);
                break;
            }

            case "selection":{
                const newArr = this.state.array
                this.setState({array: newArr, comparing: [], sorted: [], pivot: null});
                
                const startTime = performance.now()
                const sorted_arr = selectionSort(newArr)
                const endTime = performance.now()
                console.log(`Selection Sort took ${endTime - startTime} ms`)

                this.animateSelection(sorted_arr, 30);
                //console.log(`Sorted!`)
                break;
            }

            case "heap": heapSort(this.state.array); break;


        }
    }



    //animation functions

     animateMerge(swap_arr, speed) {
        if (this.state.isSorted){
            this.animateFullySorted(0, speed);
        }
        else{
            for (let i = 0; i < swap_arr.length; i++) {
                const arrayBars = document.getElementsByClassName('array-bar');
                const isColorChange = i % 3 !== 2;
                if (isColorChange) {
                    const [barOneIdx, barTwoIdx] = swap_arr[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    const color = i % 3 === 0 ? "Orange" : "Turquoise";
                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                        }, i * speed);
                } else {
                    setTimeout(() => {
                        const [barOneIdx, newHeight] = swap_arr[i];
                        const barOneStyle = arrayBars[barOneIdx].style;
                        barOneStyle.height = `${newHeight}px`;
                        }, i * speed);
                }

            };
            this.animateFullySorted(swap_arr.length*speed, speed);
            this.setState({isSorted: true});
        }
        
        
    }
    animateBubble(swap_arr, speed){
        if (this.state.isSorted){
            this.animateFullySorted(0, speed);
        }
        else{
            swap_arr.forEach(([i,j], index) => {
            setTimeout(() => {
                this.setState((prev) => {
                    const array = [...prev.array]; //... copies the array instead of referring to the same array. NEVER mutate the state directly.
                    [array[i], array[j]] = [array[j], array[i]];
                    return { array, comparing: [i,j] };
                });
                
            }, index*speed);
           
        });
        //setTimeout(() => this.setState({comparing: []}), swap_arr.length * speed);
        this.animateFullySorted(swap_arr.length*speed, speed);
        this.setState({isSorted: true});
        }
        
    }

    animateSelection(swap_arr, speed){
        if (this.state.isSorted){
            this.animateFullySorted(0, speed);
        }
        else{
            swap_arr.forEach(([i,j], index) => {
            setTimeout(() => {
                this.setState((prev) => {
                    const array = [...prev.array]; //... copies the array instead of referring to the same array. NEVER mutate the state directly.
                    [array[i], array[j]] = [array[j], array[i]];
                    return { array, comparing: [i,j] };
                });
                
            }, index*speed);
           
        });

        this.animateFullySorted(swap_arr.length*speed, speed);
        this.setState({isSorted: true});
        }
        
    }

    animateQuickSort(swap_arr, speed){
        if (this.state.isSorted){
            this.animateFullySorted(0, speed);
        }
        else{
            swap_arr.forEach(([i,j,p], index) => {
            setTimeout(() => {
                this.setState((prev) => {
                    const array = [...prev.array]; //... copies the array instead of referring to the same array. NEVER mutate the state directly.
                    [array[i], array[j]] = [array[j], array[i]];
                    return { array, comparing: [i, j], pivot: p};
                });
                
            }, index*speed);
           
        });

        this.animateFullySorted(swap_arr.length*speed, speed);
        this.setState({isSorted: true});
        }
        

    }
    animateFullySorted(delay, speed){
        const vel = 10
        setTimeout(()=> this.setState({comparing: []}), delay);
        for (let i = 0; i < this.state.array.length; i++){
            setTimeout(()=> {
                this.setState((prev) => ({sorted: [...prev.sorted, i]}));
            }, delay + i * vel);
        }

        
    }

    //render
    
    render(){
        const{array, comparing, pivot, sorted} = this.state;
        return(
            <>
            <div className = "array-container">
                {array.map((value, idx) => (
                    <div 
                        className = "array-bar" 
                        key = {idx} 
                        style = {{
                            height: `${value}px`,
                            backgroundColor:
                                sorted.includes(idx) ? "LawnGreen"
                                : pivot === idx ? "YellowGreen"
                                : comparing.includes(idx) ? "orange"
                                :"turquoise",
                        }}
                    ></div>
                ))}
            </div>

            <div className = "buttons">

            <button onClick={() => this.resetArray()}>New Array</button>
            <select value = {this.state.algorithm} onChange={(e) => this.setState({algorithm: e.target.value, sorted: [], pivot: -1})}>
                <option value = "merge">Merge Sort</option>
                <option value = "bubble">Bubble Sort</option>
                <option value = "heap">Heap Sort</option>
                <option value = "quick">Quick Sort</option>
                <option value = "selection">Selection Sort</option>


            </select>

            <button onClick={() => this.runSort()}>Sort</button>
            
            </div>
        </>)
    }
}

    //Helper Functions:
    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    function generateRandomArray(size = 70, min = 5, max = 500){
        const local_array = [];
        for (let i = 0; i < size; i++){
            local_array.push(randomIntFromInterval(min, max));
        }
        return local_array;

    }


