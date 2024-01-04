import _ from "lodash";
import { randRange } from "./___.test";

it.each`
  input                                      | output
  ${[1, 5, 28, 25, 100, 52, 27, 91, 22, 99]} | ${[1, 5, 22, 25, 27, 28, 52, 91, 99, 100]}
`("test $input", ({ input, output }: { input: number[]; output: number[] }) => {
  // WHEN
  const actual = algorithm(input, true);
  // THEN
  expect(actual).toEqual(output);

  const answerAct = answer(input);
  expect(answerAct).toEqual(output);
});

it.each`
  case
  ${1}
  ${2}
  ${3}
  ${4}
  ${5}
`("random test case:$case", () => {
  // GIVEN
  const input = [...Array(10)].map(() => randRange(1, 1000));
  console.log("input", input);
  // WHEN
  const actual = algorithm(input, false);
  // THEN
  console.log("actual", actual);
});

// @ts-ignore
function algorithm(input: number[], showLog: boolean): number[] {
  const result = _.cloneDeep(input);
  const bucketNum = 10;
  const bucket: number[][] = [...Array(bucketNum)].map(() => []);

  // bucketに振り分ける
  result.forEach((num) => {
    const bucketIdx = Math.floor(num / bucketNum);
    if (bucketIdx < bucketNum) {
      bucket[bucketIdx].push(num);
    } else {
      bucket[9].push(num);
    }
  });
  // それぞれでInsertionSort
  bucket.forEach((childs) => {
    if (showLog) console.log("target:", childs);
    for (let i = 1; i < childs.length; i++) {
      let tmp = childs[i];
      let index = i - 1;
      while (0 <= index && childs[index] > tmp) {
        childs[index + 1] = childs[index];
        index--;
      }
      childs[index + 1] = tmp;
      if (showLog) console.log("middle:", childs);
    }
    if (showLog) console.log("result:", childs);
  });

  // すべてをflatにする
  return bucket.flat();
}
// @ts-ignore
function answer(input: number[]): number[] {
  const result = _.cloneDeep(input);

  const max = Math.max(...result);
  const size = Math.floor(max / result.length);
  const buckets: number[][] = [...Array(size)].map(() => []);

  //   最遅の場合は一つのbucketの中にそのまま配列が格納されることなので、BigOはn^2
  //   最速,平均の場合はそれぞれのbucketの中に配列の各要素が一つずつ入ることで、BigOはn(+k) +kは最初のBucketへの配置時間分
  result.forEach((num) => {
    const i = Math.floor(num / size);
    if (i !== size) {
      buckets[i].push(num);
    } else {
      buckets[size - 1].push(num);
    }
  });

  buckets.forEach((childs) => {
    for (let i = 1; i < childs.length; i++) {
      let tmp = childs[i];
      let index = i - 1;
      while (0 <= index && childs[index] > tmp) {
        childs[index + 1] = childs[index];
        index--;
      }
      childs[index + 1] = tmp;
    }
  });

  return buckets.flat();
}
