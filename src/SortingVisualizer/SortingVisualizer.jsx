import React from "react";
import "./SortingVisualizer.css";
export default class SortingVisualizer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            array: [],
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
            case "merge": this.mergeSort(); break;
            case "bubble": this.bubbleSort(); break;
            case "heap": this.heapSort(); break;
            case "quick": this.quickSort(); break;
        }
    }

    mergeSort(){


    }
    quickSort(){

    }
    heapSort(){

    }
    bubbleSort(){

    }

    render(){
        const{array} = this.state;
        return(
            <>
            <div className = "array-container">
                {array.map((value, idx) => (
                    <div 
                        className = "array-bar" 
                        key = {idx} 
                        style = {{height: `${value}px`}}
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

