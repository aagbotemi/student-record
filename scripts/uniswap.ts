const helpers = require("@nomicfoundation/hardhat-network-helpers");
require("dotenv").config({ path: ".env" });
import { ethers } from "hardhat";

async function main() {
  // interact with uniswap swapTokenForExactToken function
  // swap usdt to dai
  // TO-DO
  // erc20 token interface
  // Approve the uniswap contract
  // check balance of the signer before swap
  // swap token calling the function
  // check balance after swap

  const USDTAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
  const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  const UNISWAPRouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  const amountOut = 200e8;
  //   const _value = ethers.utils.parseEther("1");

  
  const USDTHolder = "0xB9711550ec6Dc977f26B73809A2D6791c0F0E9C8";
  await helpers.impersonateAccount(USDTHolder);
  const impersonatedSigner = await ethers.getSigner(USDTHolder);
  
  //   const MULTISIG = await ethers.getContractAt("IMultiSig", CONTRACTADDRESS);
  
  const USDT = await ethers.getContractAt(
    "IERC20",
    USDTAddress,
    impersonatedSigner
    );
    const DAI = await ethers.getContractAt("IERC20", DAIAddress);
    const ROUTER = await ethers.getContractAt(
      "IUniswap",
      UNISWAPRouter,
      impersonatedSigner
      );

    await USDT.approve(UNISWAPRouter, ethers.utils.parseUnits("2000", "18"), );
      
  const liquidity = await ROUTER.addLiquidity(
    USDTAddress,
    DAIAddress,
    ethers.utils.parseUnits("2000", "18"),
    ethers.utils.parseUnits("2000", "18"),
    ethers.utils.parseUnits("1800", "18"),
    ethers.utils.parseUnits("1800", "18"),
    USDTHolder,
    Math.floor(Date.now() /1000) *(60 * 10), 


  //   address tokenA,
  // address tokenB,
  // uint amountADesired,
  // uint amountBDesired,
  // uint amountAMin,
  // uint amountBMin,
  // address to,
  // uint deadline
  );

  console.log("ADD LIQUIDITY: ", liquidity);
  

  // amountAMin	uint	Bounds the extent to which the B/A price can go up before the transaction reverts. Must be <= amountADesired.
  // amountBMin	uint	Bounds the extent to which the A/B price can go up before the transaction reverts. Must be <= amountBDesired.

  // amountADesired	uint	The amount of tokenA to add as liquidity if the B/A price is <= amountBDesired/amountADesired (A depreciates).
  // amountBDesired	uint	The amount of tokenB to add as liquidity if the A/B price is <= amountADesired/amountBDesired (B depreciates).

  // to	address	Recipient of the liquidity tokens.
  // deadline	uint	Unix timestamp after which the transaction will revert.

//   tokenA	address	A pool token.
// tokenB	address	A pool token.
// amountA	uint	The amount of tokenA sent to the pool.
// amountB	uint	The amount of tokenB sent to the pool.
// liquidity	uint	The amount of liquidity tokens minted.

  // function addLiquidityETH(
  //   address token,
  //   uint amountTokenDesired,
  //   uint amountTokenMin,
  //   uint amountETHMin,
  //   address to,
  //   uint deadline
  // ) external payable returns (uint amountToken, uint amountETH, uint liquidity);

  // const liquidity = await ROUTER.addLiquidity(
  //   USDTAddress,
  //   DAIAddress,
  //   4000,
  //   3000,
  //   1000, 
  //   1000,
  //   impersonatedSigner.address,
  //   Math.floor(Date.now() /1000) *(60 * 10), 
  // )

  // console.log("LIQUIDITY: ", liquidity);
  



  // token	address	A pool token.
  // amountTokenDesired	uint	The amount of token to add as liquidity if the WETH/token price is <= msg.value/amountTokenDesired (token depreciates).
  // msg.value (amountETHDesired)	uint	The amount of ETH to add as liquidity if the token/WETH price is <= amountTokenDesired/msg.value (WETH depreciates).
  // amountTokenMin	uint	Bounds the extent to which the WETH/token price can go up before the transaction reverts. Must be <= amountTokenDesired.
  // amountETHMin	uint	Bounds the extent to which the token/WETH price can go up before the transaction reverts. Must be <= msg.value.
  // to	address	Recipient of the liquidity tokens.
  // deadline	uint	Unix timestamp after which the transaction will revert.
  // amountToken	uint	The amount of token sent to the pool.
  // amountETH	uint	The amount of ETH converted to WETH and sent to the pool.
  // liquidity	uint	The amount of liquidity tokens minted.



  // const usdtBalAfter = await USDT.balanceOf(impersonatedSigner.address);
  // const daiBalAfter = await DAI.balanceOf(impersonatedSigner.address);

  // console.log("BALANCE AFTER SWAP: ", usdtBalAfter, daiBalAfter);

  // https://mainnet.infura.io/v3/72415572d8584004ac1cb90b5589e2f1
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
