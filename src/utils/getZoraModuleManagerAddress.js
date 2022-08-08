const getZoraModuleManagerAddress = chainId => {
	if (chainId === 1) {
		return '0x850A7c6fE2CF48eea1393554C8A3bA23f20CC401'
	}
	if (chainId === 4) {
		return '0xa248736d3b73A231D95A5F99965857ebbBD42D85'
	}
	if (chainId === 137) {
		return '0xCCA379FDF4Beda63c4bB0e2A3179Ae62c8716794'
	}
	if (chainId === 80001) {
		return '0x850A7c6fE2CF48eea1393554C8A3bA23f20CC401'
	}

	return '0x850A7c6fE2CF48eea1393554C8A3bA23f20CC401'
}

export default getZoraModuleManagerAddress
