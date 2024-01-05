
import _ from "lodash";
import { randRange } from "./___.test";

it.each`
    input | output 
    ${[5,4,1,8,7,3,2,9]} | ${[1,2,3,4,5,7,8,9]}

`('test $input', ({input,output}:{input:number[],output:number[]}) => {
    // WHEN
    const actual = algorithm(input);
    // THEN
    expect(actual).toEqual(output);

    const answerAct= answer(input);
    expect(answerAct).toEqual(output);
});

it.each`
    case
    ${1}
    ${2}
    ${3}
    ${4}
    ${5}
`('random test case:$case', () => {
    // GIVEN
    const input = [...Array(10)].map(()=>randRange(1,1000));
    console.log('input',input);
    // WHEN
    const actual = algorithm(input);
    // THEN
    console.log('actual',actual);
});


function mergeSort(leftNumbers:number[],rightNumbers:number[]){
    const maxLen = leftNumbers.length + rightNumbers.length;
    const result:number[] = [];

    let leftIdx=0;
    let rightIdx=0;
    let i=0
    while (i < maxLen) {
        if(rightIdx === rightNumbers.length ||  leftNumbers[leftIdx] < rightNumbers[rightIdx]){
            result.push(leftNumbers[leftIdx]);
            leftIdx++;
        }else{
            result.push(rightNumbers[rightIdx]);
            rightIdx++;
        }
        i++;
    }
    return result;
}


// @ts-ignore
function algorithm(input:number[]):number[]{
    const result = _.cloneDeep(input);

    // リストを分割
    function _split(numbers:number[]){
        const splitIdx = Math.floor(numbers.length/2);

        let leftNumbers = numbers.slice(0,splitIdx);
        let rightNumbers = numbers.slice(splitIdx,numbers.length);

        console.log(leftNumbers,rightNumbers)
        if(leftNumbers.length !==1){
            leftNumbers = _split(leftNumbers);
        }
        if (rightNumbers.length !==1){
            rightNumbers = _split(rightNumbers);
        }
        return mergeSort(leftNumbers,rightNumbers);
    }


    return _split(result);
}
// @ts-ignore
function answer(input:number[]):number[]{
    const result = _.cloneDeep(input);

    function _merge_sort(numbers:number[]){
        if(numbers.length <= 1){
            return numbers;
        }

        const center = Math.floor(numbers.length / 2);
        const left = numbers.slice(0,center);
        const right = numbers.slice(center,numbers.length);

        _merge_sort(left);
        _merge_sort(right);

        let i=0,j=0,k = 0;
        while (i < left.length && j < right.length) {
            if(left[i] <= right[j]){
                numbers[k] = left[i];
                i++;
            }else{
                numbers[k]=right[j];
                j++;
            }
            k++;
        }

        while (i<left.length) {
            numbers[k] = left[i];
            i++;
            k++;
        }

        while (j<right.length) {
            numbers[k] = right[j];
            j++;
            k++;
        }
        return numbers;
    }

    return _merge_sort(result);
}
