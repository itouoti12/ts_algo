import _ from "lodash";

it.each`
    input | output 
    ${[2,1,5,7,3,8,]} | ${[1,2,3,5,7,8,]}
    ${[5,2,4,9,7,3,8,0,1,4]} | ${[0,1,2,3,4,4,5,7,8,9,]}

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

    for (let limit = result.length ; limit > 1; limit--) {
        for (let i = 0; i < limit-1; i++) {
            if(result[i] > result[i+1]){
                [result[i],result[i+1]] = [result[i+1],result[i]]; 
            }
        }
    }
    return result;
}

// @ts-ignore
function answer(input:number[]):number[]{
    const result = _.cloneDeep(input);

    // forが2つネストされているので
    // BigO -> n^2
    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result.length - 1 - i; j++) {
            if(result[j] > result[j+1]){
                [result[j],result[j+1]] = [result[j+1],result[j]]; 
            }
        }
    }
    return result;
}