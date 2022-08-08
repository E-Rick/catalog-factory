import type { NextPage } from 'next'
import { APP_NAME } from '@/lib/consts'
import MintForm from '@/components/MintForm'
import { Box, Text } from 'degen'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import getFactoryAddress from '@/utils/getFactoryAddress'
import getZoraModuleManagerAddress from '@/utils/getZoraModuleManagerAddress'
import { useNetwork } from 'wagmi'

const Home: NextPage = () => {
	const { chain } = useNetwork();

	return (
		<>
			<Box display="flex" padding="6" marginBottom="12" alignItems="center" justifyContent="space-between">
				<Text size="large">{APP_NAME}</Text>
				<ConnectButton chainStatus="icon" accountStatus="avatar" />
			</Box>
			<MintForm contractAddress={getFactoryAddress(chain?.id)} moduleManagerContractAddress={getZoraModuleManagerAddress(chain?.id)} />
		</>
	)
}

export default Home
