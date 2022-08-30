import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { IERC20, IWETH, SwapExamples } from "../typechain-types";
import { PromiseOrValue } from "../typechain-types/common";

const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F"
const WETH9 = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"

// const createFixtureLoader = waffle.createFixtureLoader

describe("SwapExamples", () => {
  let swapExamples: SwapExamples
  let accounts: SignerWithAddress[]
  let weth: IWETH
  let dai: IERC20

  before(async () => {
    // @ts-ignorets-ignore
    accounts = await ethers.getSigners(1)

    const SwapExamples = await ethers.getContractFactory("SwapExamples")
    swapExamples = await SwapExamples.deploy()
    await swapExamples.deployed()

    weth = await ethers.getContractAt("IWETH", WETH9)
    dai = await ethers.getContractAt("IERC20", DAI)
  })

  // async function deployFixture() {
  //   // @ts-ignorets-ignore
  //   const accounts = await ethers.getSigners(1)

  //   const SwapExamples = await ethers.getContractFactory("SwapExamples")
  //   const swapExamples = await SwapExamples.deploy()
  //   await swapExamples.deployed()

  //   const weth = await ethers.getContractAt("IWETH", WETH9)
  //   const dai = await ethers.getContractAt("IERC20", DAI)

  //   return { accounts, swapExamples, weth, dai };
  // }

  // before(async () => {
  //   const fixture = await loadFixture(deployFixture);
  //   swapExamples = fixture.swapExamples;
  //   accounts = fixture.accounts;
  //   weth = fixture.weth;
  //   dai = fixture.dai;
  // })

  it("swapExactInputSingle", async () => {
    const amountIn = 10n ** 18n

    // Deposit WETH
    await weth.deposit({ value: amountIn })
    await weth.approve(swapExamples.address, amountIn)

    // Swap
    await swapExamples.swapExactInputSingle(amountIn)

    console.log("DAI balance", await dai.balanceOf(accounts[0].address))
  })

  it("swapExactOutputSingle", async () => {
    // const { accounts, swapExamples, weth, dai } = await loadFixture(deployFixture);
    const wethAmountInMax = 10n ** 18n
    const daiAmountOut = 100n * 10n ** 18n

    // Deposit WETH
    await weth.deposit({ value: wethAmountInMax })
    await weth.approve(swapExamples.address, wethAmountInMax)

    // Swap
    await swapExamples.swapExactOutputSingle(daiAmountOut, wethAmountInMax)

    console.log("DAI balance", await dai.balanceOf(accounts[0].address))
  })
})