
import _ from "lodash";

it.each`
    input | array | result 
    ${15} | ${[0,1,5,7,9,11,15,20,24]} | ${6}
    ${2} | ${[0,1,5,7,9,11,15,20,24]} | ${-1}

`('test $input', ({input,array,result}:{input:number,array:number[],result:number}) => {
    // WHEN
    const actual = algorithm(input,array);
    // THEN
    expect(actual).toEqual(result);

    const answerAct= answer(input,array);
    expect(answerAct).toEqual(result);
});

// @ts-ignore
function algorithm(input:number, array:number[]):number{

    let left = 0;
    let right = array.length - 1;
    let middle = Math.floor( right - left / 2);

    while (left < right) {
        if(array[middle] === input){
            return middle;
        }else if(array[middle] < input){
            left = middle + 1;
            middle = Math.floor( right - left / 2);
        }else{
            right = middle - 1;
            middle = Math.floor( right - left / 2);
        }
    }
    return -1;
}
// @ts-ignore
function answer(input:number, array:number[]):number{

    function _binary_search(numbers:number[],val:number,left:number, right:number){
        if(left > right){
            return -1;
        }

        let middle = Math.floor( right - left / 2);
        if(array[middle] === input){
            return middle;
        }else if(array[middle] < input){
            return _binary_search(numbers,val,left + 1, right);
        }else{
            right = middle - 1;
            return _binary_search(numbers,val,left, right-1);
        }
    }
    return _binary_search(array,input,0, array.length -1);

}
