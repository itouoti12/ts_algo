
import _ from "lodash";

it.each`
    input | array | result 
    ${15} | ${[0,1,5,7,9,11,15,20,24]} | ${[6]}

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
    const result = _.cloneDeep(input);

    return result;
}
// @ts-ignore
function answer(input:number, array:number[]):number{
    const result = _.cloneDeep(input);

    return result;
}

export const randRange = (min:number, max:number) => Math.floor(Math.random() * (max - min + 1) + min);