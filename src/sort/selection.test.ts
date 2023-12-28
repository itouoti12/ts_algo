
import _ from "lodash";

it.each`
    input | output 
    ${[2,5,1,8,7,3]} | ${[1,2,3,5,7,8]}

`('test $input', ({input,output}:{input:number[],output:number[]}) => {
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

    let start = 0;
    let tmpIdx = 0;

    while (start < result.length) {

        for (let i = start+1; i < result.length; i++) {
            if(result[i] < result[tmpIdx]){
                tmpIdx = i; 
            }
        }
        console.log('tmpIdx',tmpIdx);
        [result[start], result[tmpIdx]] = [result[tmpIdx], result[start]];
        console.log(result);
        start++;
        tmpIdx=start;
    }

    return result;
}
// @ts-ignore
function answer(input:number[]):number[]{
    const result = _.cloneDeep(input);

    // while,forが2つネストされているので
    // BigO -> n^2
    let tmpIdx=0;
    for (let i = 0; i < result.length; i++) {
        tmpIdx = i;

        for (let j = i+1; j < result.length; j++) {
            if(result[tmpIdx] > result[j]){
                tmpIdx = j;
            }
        }
        [result[i], result[tmpIdx]] = [result[tmpIdx], result[i]];
    }

    return result;
}