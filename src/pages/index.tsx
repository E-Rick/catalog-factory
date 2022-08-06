import type { NextPage } from 'next'
import { APP_NAME } from '@/lib/consts'
import MintForm from '@/components/MintForm'
import { Box, Text } from 'degen'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import contractInterface from '@/utils/contract-abi.json'
import getFactoryAddress from '@/utils/getFactoryAddress'
import { usePrepareContractWrite, useContractWrite, useContractRead, useWaitForTransaction, useNetwork } from 'wagmi'

const contractConfig = {
	addressOrName: '0x86fbbb1254c39602a7b067d5ae7e5c2bdfd61a30',
	contractInterface: contractInterface,
}

const Home: NextPage = () => {
	const { config: contractWriteConfig } = usePrepareContractWrite({
		...contractConfig,
		functionName: 'mint',
	})
	const { chain } = useNetwork();

	const {
		data: mintData,
		write: mint,
		isLoading: isMintLoading,
		isSuccess: isMintStarted,
		error: mintError,
	} = useContractWrite(contractWriteConfig)

	const {
		data: txData,
		isSuccess: txSuccess,
		error: txError,
	} = useWaitForTransaction({
		hash: mintData?.hash,
	})
	console.log('USE CONTRACT ADDRESS FOR CHAIN: ', getFactoryAddress(chain?.id))


	return (
		<>
			<Box display="flex" padding="6" marginBottom="12" alignItems="center" justifyContent="space-between">
				<Text size="large">{APP_NAME}</Text>
				<ConnectButton chainStatus="icon" accountStatus="avatar" />
			</Box>
			<MintForm contractAddress={getFactoryAddress(chain?.id)} />
		</>
	)
}

export default Home
