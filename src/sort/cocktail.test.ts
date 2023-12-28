
import _ from "lodash";

it.each`
    input | output 
    ${[4,5,1,8,7,3,]} | ${[1,3,4,5,7,8,]}

`('test $input', ({input,output}:{input:number[],output:number[]}) => {
    // GIVEN
    console.log(input);
    // WHEN
    const actual = algorithm(input);
    // THEN
    expect(actual).toEqual(output);

    const answerAct= answer(input);
    expect(answerAct).toEqual(output);
});

// @ts-ignore
function algorithm(input:number[]):number[]{
    const result = _.cloneDeep(input);

    let firstLimit = 0;
    let lastLimit = result.length-1; 
    let swap = true;
    let backward = false;
    while (swap) {
        swap = false;

        if(backward){
            console.log('backward cocktail sort')
            for (let j = lastLimit; j > firstLimit; j--) {
                if(result[j] < result[j-1]){
                    [result[j-1],result[j]] = [result[j],result[j-1]];
                    swap = true;
                    backward = false;
                }
            }
            firstLimit++;
        }else{
            console.log('cocktail sort')
            for (let j = firstLimit; j < lastLimit; j++) {
                // console.log(j,result[j],result[j+1])
                if(result[j] > result[j+1]){
                    [result[j],result[j+1]] = [result[j+1],result[j]];
                    swap = true;
                    backward = true;
                }
            }
            lastLimit--;
        }
        console.log(result);
    }
    return result;
}
// @ts-ignore
function answer(input:number[]):number[]{
    const result = _.cloneDeep(input);

    let start = 0;
    let end = result.length; - 1;
    let swapped = true;

    // while,forが2つネストされているので
    // BigO -> n^2
    while (swapped) {
        swapped = false;

        for (let i = start; i < end; i++) {
            if(result[i] > result[i+1]){
                [result[i],result[i+1]] = [result[i+1],result[i]];
                swapped = true
            }
        }

        if(!swapped) break;

        swapped = false;
        end = end - 1;

        for (let i = end-1; i > start -1; i--) {
            if (result[i] > result[i+1]) {
                [result[i],result[i+1]] = [result[i+1],result[i]]; 
                swapped = true
            }
        }

        start = start + 1;
    }

    return result;
}