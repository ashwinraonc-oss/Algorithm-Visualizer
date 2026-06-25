import React from "react";
import "./SortingVisualizer.css";
import {mergeSort, bubbleSort, heapSort, quickSort} from "./sortingAlgos"
export default class SortingVisualizer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            array: [],
            algorithm: 'merge',
            comparing: [],
        };
    }

    componentDidMount(){
        this.resetArray();
    }

    resetArray(){
        const array = []
        for (let i = 0; i < 100; i++){
            array.push(randomIntFromInterval(5, 500));
        }
        this.setState({array});
    }
    runSort(){
        switch (this.state.algorithm){
            case "merge": {
                const sorted = mergeSort(this.state.array); 
                console.log(sorted); 
                break;}
            case "bubble": {
                const sorted = this.animateBubble(bubbleSort(this.state.array)); 
                console.log(sorted); 
                break;}
            case "heap": heapSort(this.state.array); break;
            case "quick": quickSort(this.state.array); break;
        }
    }
    animateBubble(swap_arr){
        const speed = 3
        swap_arr.forEach(([i,j], index) => {
            setTimeout(() => {
                this.setState((prev) => {
                    const array = [...prev.array]; //... copies the array instead of referring to the same array. NEVER mutate the state directly.
                    [array[i], array[j]] = [array[j], array[i]];
                    return { array, comparing: [i,j] };
                });
                
            }, index*speed);
           
        });
        setTimeout(() => this.setState({comparing: []}), swap_arr.length * speed);
    }

    render(){
        const{array, comparing} = this.state;
        return(
            <>
            <div className = "array-container">
                {array.map((value, idx) => (
                    <div 
                        className = "array-bar" 
                        key = {idx} 
                        style = {{
                            height: `${value}px`,
                            backgroundColor: comparing.includes(idx) ? "tan":"turquoise",
                        }}
                    ></div>
                ))}
            </div>

            <button onClick={() => this.resetArray()}>New Array</button>
            <select onChange={(e) => this.setState({algorithm: e.target.value})}>
                <option value = "merge">Merge Sort</option>
                <option value = "bubble">Bubble Sort</option>
                <option value = "heap">Heap Sort</option>
                <option value = "quick">Quick Sort</option>


            </select>

            <button onClick={() => this.runSort()}>Sort</button>
        </>)
    }
}
    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }


