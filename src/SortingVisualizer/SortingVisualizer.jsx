import React from "react";
import "./SortingVisualizer.css";
import {mergeSort, bubbleSort, heapSort, quickSort, selectionSort} from "./sortingAlgos"
export default class SortingVisualizer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            array: [],
            algorithm: 'bubble',
            comparing: [],
            pivot: -1,
            sorted: [],
        };
    }

    componentDidMount(){
        this.resetArray();
    }

    resetArray(){
        // const array = []
        // for (let i = 0; i < 50; i++){
        //     array.push(randomIntFromInterval(5, 500));
        // }
        // this.setState({array});
        this.setState({array: generateRandomArray(), comparing: [], sorted: [], pivot: -1});
    }
    runSort(){
        switch (this.state.algorithm){
            case "merge": {
                const sorted = mergeSort(this.state.array); 
                console.log(sorted); 
                break;}
            case "bubble": {
                // const sorted = this.animateBubble(bubbleSort(this.state.array)); 
                // console.log(sorted);
                const newArr = generateRandomArray();
                this.setState({array: newArr, comparing: [], sorted: [], pivot: null});
                this.animateBubble(bubbleSort(newArr));
                break;}
            case "heap": heapSort(this.state.array); break;
            case "quick":{
                const newArr = generateRandomArray();
                this.setState({array: newArr, comparing: [], sorted: [], pivot: null});
                this.animateQuickSort(quickSort(newArr));
                break;
            }
            case "selection":{
                const newArr = generateRandomArray();
                this.setState({array: newArr, comparing: [], sorted: [], pivot: null});
                this.animateBubble(selectionSort(newArr));
                break;
            } 
        }
    }
    animateBubble(swap_arr){
        const speed = 10
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
        this.animateFullySorted(swap_arr.length*speed);
    }

    animateQuickSort(swap_arr){
        const speed = 15
        swap_arr.forEach(([i,j,p], index) => {
            setTimeout(() => {
                this.setState((prev) => {
                    const array = [...prev.array]; //... copies the array instead of referring to the same array. NEVER mutate the state directly.
                    [array[i], array[j]] = [array[j], array[i]];
                    return { array, comparing: [i, j], pivot: p};
                });
                
            }, index*speed);
           
        });
        //setTimeout(() => this.setState({comparing: [], pivot: -1}), swap_arr.length * speed);
        this.animateFullySorted(swap_arr.length*speed);

    }
    animateFullySorted(delay){
        const speed = 10
        setTimeout(()=> this.setState({comparing: []}), delay);
        for (let i = 0; i < this.state.array.length; i++){
            setTimeout(()=> {
                this.setState((prev) => ({sorted: [...prev.sorted, i]}));
            }, delay + i * speed);
        }
    }
    
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


