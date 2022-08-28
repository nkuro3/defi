# defi
this repogitory is memo for defi.

## steps
- [x] project ( hardhat + typescript + react )
- [ ] swap
  - [ ] uniswap v3 single hop
  - [ ] introduce uniswap wedget
- [ ] lending
- [ ] starking
- [ ] borrow
- [ ] liquidation
- [ ] 

### project
```
node -v
> v16.16.0
npm init -y

npm install --save-dev hardhat
npx hardhat
> Create a TypeScript project

npm install dotenv --save
touch .env

npx create-react-app frontend --template redux-typescript --use-npm
```

### swap
#### refs
- [(youtube) Uniswap V3 - Single Hop Swap | DeFi](https://www.youtube.com/watch?v=f5Fuhm_8FjE)
- [Set Up Your Local Environment](https://docs.uniswap.org/protocol/guides/local-environment)
- [Single Swaps](https://docs.uniswap.org/protocol/guides/swaps/single-swaps)

#### setup
```
npm add @uniswap/v3-periphery
```
fix solidity version to uniswap
```ts
solidity: '0.7.6',
```

#### prepare contruct
copy sigle swap contract from [here](https://docs.uniswap.org/protocol/guides/swaps/single-swaps#a-complete-single-swap-contract).

```sol
ISwapRouter.ExactInputSingleParams memory params =
  ISwapRouter.ExactInputSingleParams({
      ...
      sqrtPriceLimitX96: 0
  });

📝`sqrtPriceLimitX96`はスワップした時にトークンの価格が上がるのを制限する項目。
デフォルトは`0`となっていて、スワップによってトークンの価格が変動しないように制限されている。
```

change swapRouter to constant from immutable.
```sol
<!-- commentout -->
// ISwapRouter public immutable swapRouter;
<!-- add -->
ISwapRouter public constant swapRouter = ISwapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);

...

<!-- commentout -->
// constructor(ISwapRouter _swapRouter) {
//     swapRouter = _swapRouter;
// }
```

compile
```
npx hardhat compile
```

#### test
prerpare mainnet fork network.
```ts
const config: HardhatUserConfig = {
  // solidity: "0.8.9",
  solidity: '0.7.6',
  networks: {
    hardhat: {
      forking: {
        url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_MAIN_API_KEY}`,
      }
    }
  }
};
```

copy test code from [here](https://github.com/t4sk/defi-by-example/blob/main/uni-v3/test/swap.test.js).

I use typescript, so you add type to variables.
```ts
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { IERC20, IWETH, SwapExamples } from "../typechain-types";

...

let swapExamples: SwapExamples
let accounts: SignerWithAddress[]
let weth: IWETH
let dai: IERC20

📝 command + . で型を自動設定してくれる。
```

```
npx hardhat test

testするとエラーになる。。
...
1) SwapExamples
      swapExactInputSingle:
    Error: VM Exception while processing transaction: reverted with reason string 'STF'
  at SwapExamples.safeTransferFrom (@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol:21)
  at SwapExamples.swapExactInputSingle (contracts/SwapExamples.sol:41)
  ...
  ```

`STF`errorについて[解説](https://www.youtube.com/watch?v=vgQx01XbkDA)が理解できずに、解決できてません。。
