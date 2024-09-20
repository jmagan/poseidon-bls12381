# Poseidon for BLS12-381

Implementation of the ZK-friendly Poseidon hash in TypeScript. The hash is prepared for the elliptic curve BLS12-381.

> This implementation is based on the original [Poseidon paper](https://eprint.iacr.org/2019/458.pdf) and the [official Poseidon implementation](https://extgit.iaik.tugraz.at/krypto/hadeshash). The updated paper recommends that the parameters are calculated with the script `code/generate_params_poseidon.sage`. The parameters are prepared for the curve BLS12-381 and a security level of 128 bits using the recommended script.

## ✏️ Use

Add to your javascript project through npm

```bash
$ npm install poseidon-bls12381
```

Poseidon hash is designed for ZK circuits and its parameters are a group of field elements of its elliptic curve. That's why, you'll need to know beforehand how many parameters you want to use in your hash function.

This repository provides function from 1 to 16 parameters. This is an example of call with 2 parameters:

```typescript
import { poseidon2 } from "poseidon-bls12381";

const hash = poseidon2([BigInt("0x01"), BigInt("0x02")]);
```

## 🛠️ Build

This project provides the scripts for building and testing:

```bash
# Build

$ npm install
$ npm run build

# Test

$ npm run test
```

## 📃 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
