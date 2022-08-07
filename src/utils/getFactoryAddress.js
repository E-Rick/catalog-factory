const getFactoryAddress = chainId => {
	console.log('getFactoryAddress', chainId)
	if (chainId === 1) {
		return process.env.NEXT_PUBLIC_ETHEREUM_FACTORY_ADDRESS
	}
	if (chainId === 4) {
		return process.env.NEXT_PUBLIC_RINKEBY_FACTORY_ADDRESS
	}
	if (chainId === 137) {
		return process.env.NEXT_PUBLIC_MATIC_FACTORY_ADDRESS
	}
	if (chainId === 80001) {
		return process.env.NEXT_PUBLIC_MUMBAI_FACTORY_ADDRESS
	}

	return process.env.NEXT_PUBLIC_RINKEBY_FACTORY_ADDRESS
}

export default getFactoryAddress
