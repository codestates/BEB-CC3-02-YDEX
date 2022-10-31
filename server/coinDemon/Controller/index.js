/**
 * @Desc : Blockchain에서 데이터 수집
 */

const Caver = require("caver-js");
const caver = new Caver("https://api.baobab.klaytn.net:8651/");
const {singlePoolAbi}  = require('../Abi/SinglePoolABI')
const {farmingPoolAbi} = require('../Abi/FarmingABI')
const {YDEXNFT_abi}  = require('../Abi/YDEXNFT')
const Marketplace_abi = require('../Abi/Marketplace')

// model
const PairPool = require("../Model/PairPool");
const SinglePool = require("../Model/StakedToken");
const PriceOracle = require("../Model/PriceOracle");
const NFT_Model = require("../Model/Nft");
const { Error } = require("mongoose");
const axios = require("axios");

// addresss
const yktokenAddr = "0xaa80658f5a86562f07BdF7caD649299BA3997036";
const yjtokenAddr = "0xd7877710190E492561F692a08117c63e32cf8ac1";
const ystokenAddr = "0x2B16C6587267B66E275392Ac5176C766C6Aa9319";
const platfTokenAddr = "0xf2d5a9b9E7eC682aF9f353c6715DDf6b6393EE34";
const farmingAddress = "0x7f0AF6ae4B64014025b56086293515250bC8D007";
const YDEX_NFT_Addr = "0xdbBB949d14576B506DE819FC04CE57FfaFb7f506";
const NFT_MarketplaceAddr = "0x925d14aCF19014869b577Ae45DF9b483dB7809dD";
const bank_addr = "0x91ee8a1860408fFBA594Cab5a5c34619ABb59640"

// contract

const farmingContract = new caver.klay.Contract(farmingPoolAbi, farmingAddress);
const marketplaceContract = new caver.klay.Contract(
  Marketplace_abi,
  NFT_MarketplaceAddr
);
const YDEXNFT_Contract = new caver.klay.Contract(YDEXNFT_abi, YDEX_NFT_Addr);
// KIP7 토큰 컨트랙트 생성
const singlePoolContract = new caver.klay.Contract(
  singlePoolAbi,
  bank_addr
);

/**
 * @Dev Single Pool totalStakedToken
 */

const singlePoolTotalStaked = async () => {
  try {
    // Single Pool Search (from Blockchain)
    const SinglePoolInfo = await singlePoolContract.methods.pool().call();
    console.log(SinglePoolInfo)
    // // Single Pool search (from DB)
    // const SinglePoolFound = await SinglePool.findOne({
    //   token_address: platfTokenAddr,
    // });

    // if (SinglePoolFound) {
    //   await SinglePoolFound.updateOne({
    //     totalStaked: await caver.utils.fromPeb(
    //       SinglePoolInfo.totalStaked,
    //       "KLAY"
    //     ),
    //   });
    // } else {
    //   const newSinglePool = new SinglePool({
    //     token_address: platfTokenAddr,
    //     token_name: "PTN Pool",
    //     token_symbol: "PTN",
    //     totalStaked: await caver.utils.fromPeb(
    //       SinglePoolInfo.totalStaked,
    //       "KLAY"
    //     ),
    //   });
    //   await newSinglePool.save();
    // }
  } catch (error) {
    console.error(error);
  }
};

/**
 * @Dev PairStakedTokenAmount
 */

const PairPoolTotalStatked = async () => {
  try {
    const poolLength = await farmingContract.methods.poolLength().call();

    for (let i = 0; i < poolLength; i++) {
      const value = await farmingContract.methods.poolInfo(i).call();
      
      const PoolFound = await PairPool.findOne({ pair_address: value.lpToken });

      if (PoolFound) {
        await PoolFound.updateOne({ totalStaked: value.totalStaked });
      }
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * @dev NFT Marketplace
 */

const NFT_Marketplace = async () => {
  try {
    const itemCount = await marketplaceContract.methods.itemCount().call();
    for (let i = 0; i < itemCount; i++) {
      const tokenURI = await YDEXNFT_Contract.methods.tokenURI(i).call();
      const ownerOf = await YDEXNFT_Contract.methods.ownerOf(i).call();

      const nftFound = await NFT_Model.findOne({ tokenURI: tokenURI });
      if (!nftFound) {
        const newNFT = new NFT_Model({
          address: ownerOf,
          tokenId: i,
          tokenURI: tokenURI,
        });
        await newNFT.save();
      }
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  PairPoolTotalStatked,
  singlePoolTotalStaked,
  NFT_Marketplace,
};
