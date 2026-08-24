import React from "react";
import "./SortingVisualizer.css";
import {bubbleSort, heapSort, quickSort, selectionSort} from "./sortingAlgos";
import {mergeSort} from "./mergeSortAlgo";

const array_size = 3000;

export default class SortingVisualizer extends React.Component {
    //state variables
    constructor(props){
        super(props);
        this.state = {
            array: [],
            algorithm: 'bubble', //default array on bootup
            comparing: [],
            pivot: -1,
            sorted: [],
            isSorted: false,
            avg_run: { //tracking average of all runs per algorithm
                'bubble' : [],
                'merge' : [],
                'selection' : [],
                'quick' : [],
                'heap' : [],
            },
            runtime: 0,
            runs_arr:{ //tracking numbers of runs
                'bubble' : 0,
                'merge' : 0,
                'selection' : 0,
                'quick' : 0,
                'heap' : 0,
            }
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
    runSort(algo){
        switch (algo){
            case "merge": {
                const newArr = this.state.array

                this.setState({array: newArr, comparing: [], sorted: [], pivot: null});

                if (this.state.isSorted === false){
                    this.setState(prev => ({
                    runs_arr: {
                        ...prev.runs_arr,
                        [this.state.algorithm]: prev.runs_arr[this.state.algorithm] + 1
                    }
                }))

                let bigArr = generateRandomArray(array_size, 10, 500)
                const startTime = performance.now()
                mergeSort(bigArr)
                const endTime = performance.now()
                let ranIn = endTime - startTime;
                let temp_arr = [...this.state.avg_run['merge'] ,ranIn];
                this.setState({runtime: average(temp_arr)});
                this.setState({avg_run: {...this.state.avg_run, 'merge': temp_arr}});
                }

                

                const sorted_arr = mergeSort(newArr)

                //console.log(`Merge Sort took ${endTime - startTime} ms`)

                
                this.animateMerge(sorted_arr, 25)
                break;
            }

            case "bubble": {
                const newArr = this.state.array
                this.setState({array: newArr, comparing: [], sorted: [], pivot: null});


                if (this.state.isSorted === false){
                    this.setState(prev => ({
                    runs_arr: {
                        ...prev.runs_arr,
                        [this.state.algorithm]: prev.runs_arr[this.state.algorithm] + 1
                    }
                }))
                let bigArr = generateRandomArray(array_size, 10, 500)
                const startTime = performance.now()
                bubbleSort(bigArr)
                const endTime = performance.now()
                let ranIn = endTime - startTime;
                let temp_arr = [...this.state.avg_run['bubble'] ,ranIn];
                this.setState({runtime: average(temp_arr)});
                this.setState({avg_run: {...this.state.avg_run, 'bubble': temp_arr}});

                }


                const sorted_arr = bubbleSort(newArr)


                //console.log(`Bubble Sort took ${endTime - startTime} ms`)


                this.animateBubble(sorted_arr, 30);
                break;
            }

            case "quick":{
                const newArr = this.state.array
                this.setState({array: newArr, comparing: [], sorted: [], pivot: null});

                if (this.state.isSorted === false){
                    this.setState(prev => ({
                    runs_arr: {
                        ...prev.runs_arr,
                        [this.state.algorithm]: prev.runs_arr[this.state.algorithm] + 1
                    }
                }))
                const startTime = performance.now()
                let bigArr = generateRandomArray(array_size, 10, 500)
                quickSort(bigArr)
                const endTime = performance.now()
                let ranIn = endTime - startTime;
                let temp_arr = [...this.state.avg_run['quick'] ,ranIn];
                this.setState({runtime: average(temp_arr)});
                this.setState({avg_run: {...this.state.avg_run, 'quick': temp_arr}});

                }


                const sorted_arr = quickSort(newArr)


                //console.log(`Quick Sort took ${endTime - startTime} ms`)


                this.animateQuickSort(sorted_arr, 100);
                break;
            }

            case "selection":{
                const newArr = this.state.array
                this.setState({array: newArr, comparing: [], sorted: [], pivot: null});
                

                if (this.state.isSorted === false){
                    this.setState(prev => ({
                    runs_arr: {
                        ...prev.runs_arr,
                        [this.state.algorithm]: prev.runs_arr[this.state.algorithm] + 1
                    }
                }))

                let bigArr = generateRandomArray(array_size, 10, 500)
                const startTime = performance.now()
                selectionSort(bigArr)
                const endTime = performance.now()
                let ranIn = endTime - startTime;
                let temp_arr = [...this.state.avg_run['selection'] ,ranIn];
                this.setState({runtime: average(temp_arr)});
                this.setState({avg_run: {...this.state.avg_run, 'selection': temp_arr}});
                

                }
                const sorted_arr = selectionSort(newArr)


                //console.log(`Selection Sort took ${endTime - startTime} ms`)

                this.animateSelection(sorted_arr, 100);
                break;
            }

            case "heap":{ 
                const newArr = this.state.array
                this.setState({array: newArr, comparing: [], sorted: [], pivot: null});
                

                
                if (this.state.isSorted === false){
                    this.setState(prev => ({
                    runs_arr: {
                        ...prev.runs_arr,
                        [this.state.algorithm]: prev.runs_arr[this.state.algorithm] + 1
                    }
                }))
                const startTime = performance.now()
                let bigArr = generateRandomArray(array_size, 10, 500)
                heapSort(bigArr)
                const endTime = performance.now()
                let ranIn = endTime - startTime;
                let temp_arr = [...this.state.avg_run['heap'] ,ranIn];
                this.setState({runtime: average(temp_arr)});
                this.setState({avg_run: {...this.state.avg_run, 'heap': temp_arr}});
                
                }
                const sorted_arr = heapSort(newArr)
                //console.log(`Heap Sort took ${endTime - startTime} ms`)

                this.animateHeap(sorted_arr, 50);
                break;
            }

            default:
                break;
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
                    const color = i % 3 === 0 ? "Crimson" : "White";
                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                        }, i * speed);
                } else {
                    setTimeout(() => {
                        const [barOneIdx, newHeight] = swap_arr[i];
                        const barOneStyle = arrayBars[barOneIdx].style;
                        barOneStyle.height = `${newHeight/1}px`;
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
    animateHeap(swap_arr, speed){
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
    animateFullySorted(delay, speed){
        const vel = 20
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
        let button_map = [
            { id: 'bubble', label: 'Bubble Sort', time: "O(n²)", space: "O(1)"},
            { id: 'selection', label: 'Selection Sort', time: "O(n²)", space: "O(1)"}, 
            { id: 'heap', label: 'Heap Sort', time: "O(n log n)", space: "O(1)"},
            { id: 'quick', label: 'Quick Sort', time: "O(n log n)", space: "O(n)"},
            { id: 'merge', label: 'Merge Sort', time: "O(n log n)", space: "O(n)"}, 
            
        ]
        let infoVar = button_map.find(({id, time, space}) => id === this.state.algorithm);
        return(
            <>
            <div className = "array-container">
                {array.map((value, idx) => (
                    <div 
                        className = "array-bar" 
                        key = {idx} 
                        style = {{
                            height: `${value/1}px`,
                            backgroundColor:
                                sorted.includes(idx) ? "LawnGreen"
                                : pivot === idx ? "#4790bb"
                                : comparing.includes(idx) ? "Crimson"
                                :"white",
                        }}
                    ></div>
                ))}
            </div>
            <div className = "buttons">
                <div className = "sort_buttons">
                    {
                    button_map.map((item) => 
                    <button 
                        className = {this.state.algorithm === item.id ? "active":""}
                        key = {item.id} 
                        onClick={() =>  {this.setState({algorithm: item.id, sorted: [], pivot: -1, runtime: average(this.state.avg_run[item.id])})} }>{item.label}
                    </button>)
                    }
                </div>
                <div className = "run_buttons">
                    <button onClick={() => this.resetArray()}>New Array</button>
                    <button onClick={() => this.runSort(this.state.algorithm)}>Sort</button>
                    <button onClick={() => this.setState({avg_run: {'bubble' : [],'merge' : [],'selection' : [],'quick' : [],'heap' : [],}, runtime: 0, runs_arr:{'bubble' : 0,'merge' : 0,'selection' : 0,'quick' : 0,'heap' : 0,}})}>Reset Stats</button>
                </div>
            </div>
            <div className = "info_panel">
                <div className = "time_complexity">Time Complexity: {infoVar.time}</div>
                <div className = "space_complexity">Space Complexity: {infoVar.space}</div>
            </div>
            <div className = "run_time">
                <div>Average Run Time (n = 3000): {this.state.runtime} ms</div>
                <div>Runs: {this.state.runs_arr[this.state.algorithm]}</div>
            </div>
            <div className = "title">Sorting Algorithm Visualizer</div>

        </>)
    }
}

    //Helper Functions:
    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    function generateRandomArray(size = 25, min = 10, max = 500){
        const local_array = [];
        for (let i = 0; i < size; i++){
            local_array.push(randomIntFromInterval(min, max));
        }
        return local_array;

    }
    function average(arr){
        if (arr.length === 0){
            return 0

        }
        let sum = 0;
        for (let i = 0; i < arr.length; i++){
            sum += arr[i]
        }
        return sum/arr.length;
    }

