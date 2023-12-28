import _ from "lodash";
import { randRange } from "./___.test";

it.each`
  input                 | output
  ${[2, 5, 1, 8, 7, 3]} | ${[1, 2, 3, 5, 7, 8]}
`("test $input", ({ input, output }: { input: number[]; output: number[] }) => {
  // WHEN
  const actual = algorithm(input,true);
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
    const actual = algorithm(input,false);
    // THEN
    console.log('actual',actual);
});

// @ts-ignore
function algorithm(input: number[],showLog:boolean): number[] {
  const result = _.cloneDeep(input);

  if(showLog)console.log(result);

  for (let i = 0; i < result.length - 1; i++) {
    if (result[i] > result[i + 1]) {
      [result[i], result[i + 1]] = [result[i + 1], result[i]];
      if(showLog)console.log(result);

      // reverse
      for (let j = i; j > 0; j--) {
        if (result[j - 1] > result[j]) {
          [result[j - 1], result[j]] = [result[j], result[j - 1]];
          if(showLog)console.log(result);
        }else{
            break;
        }
      }
    }
  }
  return result;
}
// @ts-ignore
function answer(input: number[]): number[] {
  const result = _.cloneDeep(input);

  let index = 1;
  // whileは一つしかないが、順と逆順による回転が同時に生じる可能性があるため、
  // BigO -> n^2
  while (index < result.length) {

    if(index === 0 || result[index] >= result[index-1]){
        index++;
    }else{
        [result[index],result[index-1]] = [result[index-1],result[index]];
        index--;
    }
  }

  return result;
}
