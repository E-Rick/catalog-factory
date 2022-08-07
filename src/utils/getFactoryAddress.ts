import { ETHEREUM_FACTORY_ADDRESS, MATIC_FACTORY_ADDRESS, MUMBAI_FACTORY_ADDRESS, RINKEBY_FACTORY_ADDRESS } from "@/utils/consts"

const getFactoryAddress = (chainId: number): string => {
	console.log('getFactoryAddress', chainId)
	if (chainId === 1) return ETHEREUM_FACTORY_ADDRESS
	else if (chainId === 137) return MATIC_FACTORY_ADDRESS
	else if (chainId === 80001) return MUMBAI_FACTORY_ADDRESS
	return RINKEBY_FACTORY_ADDRESS
}

export default getFactoryAddress
