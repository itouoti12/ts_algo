
import _ from "lodash";

it.each`
    input | output 
    ${[]} | ${[]}

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

    return result;
}
// @ts-ignore
function answer(input:number[]):number[]{
    const result = _.cloneDeep(input);

    return result;
}

export const randRange = (min:number, max:number) => Math.floor(Math.random() * (max - min + 1) + min);