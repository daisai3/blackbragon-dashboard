/* eslint no-unused-vars: 0 */

import { ethers } from 'ethers';
// import detectEthereumProvider from '@metamask/detect-provider';
import DealArtifact from './abis/Deal.json';
import DealFactoryArtifact from './abis/DealFactory.json';
import ERC20Artifact from './abis/ERC20.json';

const infuraProvider = new ethers.providers.InfuraProvider(
  'rinkeby',
  '9abdf785b30d4d76a29af275ddce0d1e'
);
const injectedProvider = new ethers.providers.Web3Provider(window.ethereum);
const signer = injectedProvider.getSigner();
const dealFactoryInterface = new ethers.utils.Interface(DealFactoryArtifact.abi);

// BDT  0x7767B7b6afFd55e231fDAB42B1E9863cc64066C2
// USDT contract 0x4EB8924c3eaD317C01E7dF3Ef6684A21eE053c20
// DEAL FACTORY BLOCK NUMBER 7633506 address 0x54242Ca3E5904557CA6e6aa4E8C26536760ceAb5

// const bdtAddress = '0x7767B7b6afFd55e231fDAB42B1E9863cc64066C2';
// const usdtAddress = '0x4EB8924c3eaD317C01E7dF3Ef6684A21eE053c20';
// const factoryContractAddress = '0x54242Ca3E5904557CA6e6aa4E8C26536760ceAb5';
// const factoryCreationBlockNumber = 7633506;

// Daiki's test infos
const bdtAddress = '0x3f97Ba16d12a16BD5935ad26c1644D1740DA24dd';
const usdtAddress = '0x81fA8cc9d5e645787334e488E287FBC5511f2d08';
const factoryContractAddress = '0x013Ff3e91C6E6ad7D485635062f1e0f93E089d04';
const factoryCreationBlockNumber = 7836627;

const bdtCirculatingSupply = 1000000;

const getStatus = (statusBN) => {
  switch (statusBN.toString()) {
    case '1':
      return 'opened';
    case '2':
      return 'paused';
    case '3':
      return 'closed';
    case '4':
      return 'canceled';
    case '5':
      return 'distributed';
    default:
      throw new Error(`Invalid status ${statusBN.toString()}`);
  }
};

const getAllocationModel = (allocationModelBN) => {
  switch (allocationModelBN.toString()) {
    case '1':
      return 'ProRata';
    case '2':
      return 'Capped';
    default:
      throw new Error(`Invalid allocation model ${allocationModelBN.toString()}`);
  }
};

const getAllocationModelId = (allocationModel) => {
  switch (allocationModel) {
    case 'ProRata':
      return 1;
    case 'Capped':
      return 2;
    default:
      throw new Error(`Invalid allocation model ${allocationModel}`);
  }
};

const getMinContributionFromAccessLevel = (accessLevel) => {
  accessLevel = parseInt(accessLevel, 10);
  switch (accessLevel) {
    case 0:
      return 250;
    case 1:
      return 1000;
    case 2:
      return 5000;
    case 3:
      return 10000;
    default:
      throw new Error(`Invalid access level ${accessLevel}`);
  }
};

const getAccessLevel = (bdtBalance) => {
  bdtBalance = parseFloat(bdtBalance);

  if (bdtBalance >= 250 && bdtBalance < 1000) return 0;
  if (bdtBalance >= 1000 && bdtBalance < 5000) return 1;
  if (bdtBalance >= 5000 && bdtBalance < 10000) return 2;
  if (bdtBalance >= 10000) return 3;

  return -1;
};

const getMyContributionAmount = async (dealAddress) => {
  const dealContract = new ethers.Contract(dealAddress, DealArtifact.abi, signer);

  const contributionAmountBN = await dealContract.getMyContributionAmount();

  return ethers.utils.formatUnits(contributionAmountBN, 'mwei');
};

const getMyContributionAmountLeft = async (dealAddress) => {
  const dealContract = new ethers.Contract(dealAddress, DealArtifact.abi, signer);

  const contributionAmountBN = await dealContract.getMaxContributionAmount();

  return ethers.utils.formatUnits(contributionAmountBN, 'mwei');
};

export async function contributeDeal(address, amount) {
  let result = false;
  try {
    const weiAmount = ethers.utils.parseUnits(amount, 'mwei');
    const dealContract = new ethers.Contract(address, DealArtifact.abi, signer);
    const tx = await dealContract.contribute(weiAmount);
    await tx.wait();
    result = true;
  } catch (error) {
    console.error(error);
  }

  return result;
}

export async function approveDeal(address, amount) {
  let result = false;
  try {
    const weiAmount = ethers.utils.parseUnits(amount, 'mwei');
    const usdtContract = new ethers.Contract(usdtAddress, ERC20Artifact.abi, signer);
    const tx = await usdtContract.approve(address, weiAmount);
    await tx.wait();
    result = true;
  } catch (error) {
    console.error(error);
  }

  return result;
}

const getDealClaimAmount = async (tokenAddress, dealAddress) => {
  const dealContract = new ethers.Contract(dealAddress, DealArtifact.abi, signer);
  const tokenContract = new ethers.Contract(tokenAddress, ERC20Artifact.abi, infuraProvider);

  try {
    const [claimAmountBN, claimedAmountBN, name, symbol, decimals] = await Promise.all([
      dealContract.getClaimAmount(tokenAddress),
      dealContract.getMyClaimedAmount(tokenAddress),
      tokenContract.name(),
      tokenContract.symbol(),
      tokenContract.decimals(),
    ]);

    const claimAmount = ethers.utils.formatUnits(claimAmountBN, decimals);
    const claimedAmount = ethers.utils.formatUnits(claimedAmountBN, decimals);

    return {
      name,
      symbol,
      tokenAddress,
      claimAmount,
      claimedAmount,
    };
  } catch (error) {
    console.error(
      `error during getDealClaimAmount for token: ${tokenAddress}, deal: ${dealAddress}`,
      error
    );
    return {};
  }
};

const getClaimAmounts = async (dealAddress, blockNumber) => {
  const filter = {
    fromBlock: blockNumber,
    toBlock: 'latest',
    topics: [
      ethers.utils.id('Transfer(address,address,uint256)'),
      null,
      ethers.utils.hexZeroPad(dealAddress, 32),
    ],
  };
  const logs = await infuraProvider.getLogs(filter);

  const allTokenAddresses = logs.map((l) => l.address);
  const uniqueTokenAddresses = [...new Set(allTokenAddresses)];

  const promises = [];
  Array.from(uniqueTokenAddresses).map((ta) => promises.push(getDealClaimAmount(ta, dealAddress)));

  const claimAmounts = await Promise.all(promises);

  return claimAmounts;
};

const parseDealInfo = (dealInfo, dealAddress) => {
  const name = dealInfo['0'];
  const dealSize = ethers.utils.formatUnits(dealInfo['1'], 'mwei');
  const circulatingSupply = ethers.utils.formatEther(dealInfo['2']);
  const minContribution = ethers.utils.formatUnits(dealInfo['3'], 'mwei');
  const minContributorBDTBalance = ethers.utils.formatEther(dealInfo['4']);
  const raisedAmount = ethers.utils.formatUnits(dealInfo['5'], 'mwei');
  const status = getStatus(dealInfo['6']);
  const allocationModel = getAllocationModel(dealInfo['7']);
  const userCap = ethers.utils.formatUnits(dealInfo['8'], 'mwei');
  const imageUrl = dealInfo['9'];
  const unlimitedTimestamp = dealInfo['10'].toNumber();
  const minViewLevel = dealInfo['11'];

  const minAccessLevel = getAccessLevel(minContributorBDTBalance);

  return {
    name,
    dealSize,
    address: dealAddress,
    circulatingSupply,
    minContribution,
    minContributorBDTBalance,
    raisedAmount,
    status,
    allocationModel,
    imageUrl,
    userCap,
    unlimitedTimestamp,
    minViewLevel,
    minAccessLevel,
  };
};

// TODO: step4:
const getDealMetadata = async (log, userAccessLevel) => {
  const { blockNumber } = log;
  const parsedLog = dealFactoryInterface.parseLog(log);
  const { dealAddress } = parsedLog.args;

  const dealContract = new ethers.Contract(dealAddress, DealArtifact.abi, infuraProvider);

  const dealInfo = await dealContract.getDealInfo();
  const deal = parseDealInfo(dealInfo, dealAddress);
  if (userAccessLevel && userAccessLevel < deal.minViewLevel) return;

  deal.contributedAmount = await getMyContributionAmount(dealAddress);

  if (['opened', 'paused'].includes(deal.status)) {
    const personalCap = await getMyContributionAmountLeft(dealAddress);
    deal.personalCap = personalCap;
  }

  if (['closed', 'canceled'].includes(deal.status)) {
    const claimAmounts = await getClaimAmounts(dealAddress, blockNumber);
    const availableClaimAmounts = claimAmounts.filter(
      (ca) => Object.getOwnPropertyNames(ca).length > 0 && parseFloat(ca.claimAmount) > 0
    );
    deal.claimAmounts = availableClaimAmounts;

    const claimedAmounts = claimAmounts
      .filter((ca) => parseFloat(ca.claimedAmount) > 0)
      .map((ca) => `${ca.claimedAmount} ${ca.symbol}`);
    deal.tokensClaimed = claimedAmounts.join(', ');
  }

  return deal;
};

// TODO: step3:
const getDealCreatedLogs = () => {
  const dealCreatedTopic = dealFactoryInterface.getEventTopic(
    'DealCreated(address,string,uint256,uint256,address,address,uint256,uint256,uint256,uint256,string,uint256,uint8)'
  );
  return infuraProvider.getLogs({
    address: factoryContractAddress,
    fromBlock: factoryCreationBlockNumber,
    toBlock: 'latest',
    topics: [dealCreatedTopic],
  });
};

// TODO: step2 : get deals of the connected account
export async function getDealModels(userAccessLevel) {
  const dealCreatedLogs = await getDealCreatedLogs();

  const promises = [];
  dealCreatedLogs.map((x) => promises.push(getDealMetadata(x, userAccessLevel)));

  const deals = await Promise.all(promises);

  return deals.filter((d) => !!d);
}

// step 1 after clicking 'connect account' btn on login screen
export async function getUserModel(address) {
  //   const accounts = await window.ethereum.request({ method: 'eth_accounts' });
  //   const address = accounts[0];
  const bdtContract = new ethers.Contract(bdtAddress, ERC20Artifact.abi, infuraProvider);
  // newly added 10*8
  const usdtContract = new ethers.Contract(usdtAddress, ERC20Artifact.abi, infuraProvider);

  const bdtBalanceBN = await bdtContract.balanceOf(address);
  // usdt balance 10*6
  const usdtBalanceBN = await usdtContract.balanceOf(address);

  const bdtBalance = ethers.utils.formatEther(bdtBalanceBN);
  // const bdtBalance = ethers.utils.formatUnits(bdtBalanceBN, 8);
  const usdtBalance = ethers.utils.formatUnits(usdtBalanceBN, 6);

  const proRataShare = Math.floor((parseFloat(bdtBalance) / bdtCirculatingSupply) * 100);

  return {
    address,
    bdtBalance,
    usdtBalance,
    userAccessLevel: getAccessLevel(bdtBalance),
    proRataShare,
  };
}

export async function claim(dealAddress, tokenAddress) {
  let result = false;
  try {
    const dealContract = new ethers.Contract(dealAddress, DealArtifact.abi, signer);
    const tx = await dealContract.claim(tokenAddress);
    await tx.wait();
    result = true;
  } catch (error) {
    console.error(error);
  }

  return result;
}

export async function createDeal(deal) {
  const {
    name,
    dealSize,
    minContribution,
    allocationModel,
    minViewLevel,
    userCap,
    minAccessLevel,
    imageUrl,
    unlimitedTimestamp,
  } = deal;

  const minContributorBDTBalance = getMinContributionFromAccessLevel(minAccessLevel);
  const minContributorBDTBalanceWei = ethers.utils.parseUnits(minContributorBDTBalance.toString());
  const circulatingSupply = ethers.utils.parseUnits(bdtCirculatingSupply.toString());
  const allocationModelId = getAllocationModelId(allocationModel);
  const dealSizeWei = ethers.utils.parseUnits(dealSize, 'mwei');
  const userCapWei = ethers.utils.parseUnits(userCap, 'mwei');
  const minContributionWei = ethers.utils.parseUnits(minContribution, 'mwei');

  let result = false;
  try {
    const factoryContract = new ethers.Contract(
      factoryContractAddress,
      DealFactoryArtifact.abi,
      signer
    );
    const tx = await factoryContract.createDeal(
      name,
      dealSizeWei,
      circulatingSupply,
      bdtAddress,
      usdtAddress,
      minContributionWei,
      minContributorBDTBalanceWei,
      allocationModelId,
      userCapWei,
      imageUrl,
      unlimitedTimestamp || 0,
      minViewLevel
    );
    await tx.wait();
    result = true;
  } catch (error) {
    console.error(error);
  }

  return result;
}

export async function updateDeal(deal) {
  const {
    address,
    dealSize,
    minContribution,
    allocationModel,
    minViewLevel,
    userCap,
    minAccessLevel,
    unlimitedTimestamp,
  } = deal;

  const minContributorBDTBalance = getMinContributionFromAccessLevel(minAccessLevel);
  const minContributorBDTBalanceWei = ethers.utils.parseUnits(minContributorBDTBalance.toString());
  const allocationModelId = getAllocationModelId(allocationModel);
  const dealSizeWei = ethers.utils.parseUnits(dealSize.toString(), 'mwei');
  const userCapWei = ethers.utils.parseUnits(userCap.toString(), 'mwei');
  const minContributionWei = ethers.utils.parseUnits(minContribution.toString(), 'mwei');

  let result = false;
  try {
    const dealContract = new ethers.Contract(address, DealArtifact.abi, signer);
    const tx = await dealContract.updateDeal(
      dealSizeWei,
      minContributorBDTBalanceWei,
      minContributionWei,
      allocationModelId,
      userCapWei,
      unlimitedTimestamp || 0,
      minViewLevel
    );
    await tx.wait();
    result = true;
  } catch (error) {
    console.error(error);
  }

  return result;
}

export async function cancelDeal(dealAddress) {
  let result = false;
  try {
    const dealContract = new ethers.Contract(dealAddress, DealArtifact.abi, signer);
    const tx = await dealContract.cancel();
    await tx.wait();
    result = true;
  } catch (error) {
    console.error(error);
  }

  return result;
}

export async function closeDeal(dealAddress, amount, wallet) {
  let result = false;
  try {
    const amountWei = ethers.utils.parseUnits(amount, 'mwei');
    const dealContract = new ethers.Contract(dealAddress, DealArtifact.abi, signer);
    const tx = await dealContract.close(amountWei, wallet);
    await tx.wait();
    result = true;
  } catch (error) {
    console.error(error);
  }

  return result;
}

export async function pauseDeal(dealAddress) {
  let result = false;
  try {
    const dealContract = new ethers.Contract(dealAddress, DealArtifact.abi, signer);
    const tx = await dealContract.pause();
    await tx.wait();
    result = true;
  } catch (error) {
    console.error(error);
  }

  return result;
}

export async function unpauseDeal(dealAddress) {
  let result = false;
  try {
    const dealContract = new ethers.Contract(dealAddress, DealArtifact.abi, signer);
    const tx = await dealContract.unpause();
    await tx.wait();
    result = true;
  } catch (error) {
    console.error(error);
  }

  return result;
}
