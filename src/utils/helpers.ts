import { ETHEREUM_FACTORY_ADDRESS, MATIC_FACTORY_ADDRESS, MUMBAI_FACTORY_ADDRESS, RINKEBY_FACTORY_ADDRESS } from "@/utils/consts"

export const getFactoryAddress = (chainId: number): string => {
  console.log('getFactoryAddress', chainId)
  if (chainId === 1) return ETHEREUM_FACTORY_ADDRESS
  else if (chainId === 137) return MATIC_FACTORY_ADDRESS
  else if (chainId === 80001) return MUMBAI_FACTORY_ADDRESS
  return RINKEBY_FACTORY_ADDRESS
}

export const getZoraModuleManagerAddress = (chainId: number): string => {
  if (chainId === 1) return '0x850A7c6fE2CF48eea1393554C8A3bA23f20CC401'
  if (chainId === 4) return '0xa248736d3b73A231D95A5F99965857ebbBD42D85'
  if (chainId === 137) return '0xCCA379FDF4Beda63c4bB0e2A3179Ae62c8716794'
  if (chainId === 80001) return '0x850A7c6fE2CF48eea1393554C8A3bA23f20CC401'
  return '0x850A7c6fE2CF48eea1393554C8A3bA23f20CC401' // eth
}

export const getZoraAsksV1_1Address = (chainId: number): string => {
  if (chainId === 1) return '0x6170B3C3A54C3d8c854934cBC314eD479b2B29A3'
  if (chainId === 4) return '0xA98D3729265C88c5b3f861a0c501622750fF4806'
  if (chainId === 137) return '0x3634e984Ba0373Cfa178986FD19F03ba4dD8E469'
  if (chainId === 80001) return '0xCe6cEf2A9028e1C3B21647ae3B4251038109f42a'
  return '0x6170B3C3A54C3d8c854934cBC314eD479b2B29A3' // eth
}