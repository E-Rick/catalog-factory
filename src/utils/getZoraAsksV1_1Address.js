const getZoraAsksV1_1Address = chainId => {
	if (chainId === 1) {
		return '0x6170B3C3A54C3d8c854934cBC314eD479b2B29A3'
	}
	if (chainId === 4) {
		return '0xA98D3729265C88c5b3f861a0c501622750fF4806'
	}
	if (chainId === 137) {
		return '0x3634e984Ba0373Cfa178986FD19F03ba4dD8E469'
	}
	if (chainId === 80001) {
		return '0xCe6cEf2A9028e1C3B21647ae3B4251038109f42a'
	}

	return '0x6170B3C3A54C3d8c854934cBC314eD479b2B29A3'
}

export default getZoraAsksV1_1Address
