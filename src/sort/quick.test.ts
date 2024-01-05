
import _ from "lodash";

it.each`
    input | output 
    ${[1,8,3,9,4,5,7]} | ${[1,3,4,5,7,8,9]}

`('test $input', ({input,output}:{input:number[],output:number[]}) => {
    // WHEN
    const actual = algorithm(input);
    // THEN
    expect(actual).toEqual(output);

    const answerAct= answer(input);
    expect(answerAct).toEqual(output);
});

function partition(numbers:number[], low:number, high:number){
    let pivot = high;
    // variables
    let i = low-1;
    let j = low;

    while (j < pivot) {
        if(numbers[j] <= numbers[pivot]){
            i++;
            [numbers[i],numbers[j]]=[numbers[j],numbers[i]];
        }; 
        j++;
    }
    [numbers[i+1],numbers[pivot]]=[numbers[pivot],numbers[i+1]];

    return i+1;
}

// @ts-ignore
function algorithm(input:number[]):number[]{
    const result = _.cloneDeep(input);

    function _quick_sort(numbers:number[],low:number,high:number){
        if(low < high){
            const partition_index = partition(numbers,low,high);
            // quick sort left
            _quick_sort(numbers,low,partition_index-1);
            // quick sort right 
            _quick_sort(numbers,partition_index+1,high);
        }
    }

    _quick_sort(result,0,result.length-1);
    return result;
}


function answerPartition(numbers:number[], low:number, high:number){
    const pivot = numbers[high];
    let i = low-1;

    for (let j = low; j < high; j++) {
        if(numbers[j] <= pivot){
            i++;
            [numbers[i],numbers[j]] = [numbers[j],numbers[i]];
        }
    }

    [numbers[i+1],numbers[high]] = [numbers[high],numbers[i+1]];
    return i+1;
}


// @ts-ignore
function answer(input:number[]):number[]{
    const result = _.cloneDeep(input);

    function _quick_sort(numbers:number[], low:number, high:number){
        if(low<high){
            const partition_index = answerPartition(numbers,low,high);
            _quick_sort(numbers,low,partition_index-1);
            _quick_sort(numbers,partition_index+1,high);
        }
    }
    _quick_sort(result,0,result.length-1);
    return result;
}
