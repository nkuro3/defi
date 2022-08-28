immutable
- 不変変数。
- `msg.sender`や計算式のように、コンパイル時には値が定まってない状態で、constructorや関数によってデプロイ時に１度だけ値を渡すようなことができる。
- msg.senderをconstantで渡す時よりもimmutableでconstructorから渡した方がgas代を節約できる。
- [blog](https://y-nakajo.hatenablog.com/entry/2020/05/28/111801)
- [official](https://docs.soliditylang.org/en/v0.6.5/contracts.html#constant-and-immutable-state-variables)
- [youtube](https://www.youtube.com/watch?v=nQi8lVi4xT4)

ISwapRouter
- swapに関連する関数やそれらの関数に渡すパラメータの型を定義したクラス。
- [official](https://docs.uniswap.org/protocol/reference/periphery/interfaces/ISwapRouter)

abicoder
- コントラクトとプログラムの間でやりとりを翻訳するために必要なもの。
- solidity v0.8からは標準機能となり宣言不要。
- [official](https://docs.soliditylang.org/en/v0.8.0/080-breaking-changes.html#solidity-v0-8-0-breaking-changes)

hardhat forking
- mainnetをlocalnet(hardhat network)にforkできる。
- ❓テストする時はmainnetのwalletを使う？？
- [official](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks)