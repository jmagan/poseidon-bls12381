const PRIME =
  0x73eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000001n;

export function poseidonPermutation(
  inputs: bigint[],
  rFull: number,
  rPartial: number,
  roundConstants: bigint[],
  mds: bigint[][],
): bigint[] {
  const t = inputs.length + 1;

  const rFullHalf = Math.floor(rFull / 2);

  let state: bigint[] = [0n, ...inputs];

  let roundConstantsCounter = 0;

  for (let i = 0; i < rFullHalf; i++) {
    for (let j = 0; j < t; j++) {
      state[j] = state[j] + roundConstants[roundConstantsCounter];
      roundConstantsCounter++;
    }

    for (let j = 0; j < t; j++) {
      state[j] = state[j] ** 5n % PRIME;
    }

    let matrixOutput: bigint[] = [];
    for (let j = 0; j < t; j++) {
      let result = 0n;
      for (let k = 0; k < t; k++) {
        result += mds[j][k] * state[k];
      }
      matrixOutput.push(result % PRIME);
    }
    state = matrixOutput;
  }

  for (let i = 0; i < rPartial; i++) {
    for (let j = 0; j < t; j++) {
      state[j] = state[j] + roundConstants[roundConstantsCounter];
      roundConstantsCounter++;
    }

    state[0] = state[0] ** 5n;

    let matrixOutput: bigint[] = [];
    for (let j = 0; j < t; j++) {
      let result = 0n;
      for (let k = 0; k < t; k++) {
        result += mds[j][k] * state[k];
      }
      matrixOutput.push(result % PRIME);
    }
    state = matrixOutput;
  }

  for (let i = 0; i < rFullHalf; i++) {
    for (let j = 0; j < t; j++) {
      state[j] = state[j] + roundConstants[roundConstantsCounter];
      roundConstantsCounter++;
    }

    for (let j = 0; j < t; j++) {
      state[j] = state[j] ** 5n;
    }

    let matrixOutput: bigint[] = [];
    for (let j = 0; j < t; j++) {
      let result = 0n;
      for (let k = 0; k < t; k++) {
        result += mds[j][k] * state[k];
      }
      matrixOutput.push(result % PRIME);
    }
    state = matrixOutput;
  }

  return state;
}
