import type { NextPage } from 'next'
import { APP_NAME } from '@/utils/consts'
import { Box, Text } from 'degen'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useNetwork } from 'wagmi'
import { useIsMounted } from '@/hooks'
import MintForm from '@/components/MintForm'

const Home: NextPage = () => {
	const isMounted = useIsMounted()
	const { chain } = useNetwork();
	if (!isMounted) return null
	
	return (
		<>
			<Box display="flex" padding="6" marginBottom="12" alignItems="center" justifyContent="space-between">
				<Text size="large">{APP_NAME}</Text>
				<ConnectButton chainStatus="icon" accountStatus="avatar" />
			</Box>
			{chain && <MintForm/>}
		</>
	)
}

export default Home
