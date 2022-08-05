import { FC } from 'react'
import { APP_NAME } from '@/lib/consts'
import MintForm from '@/components/MintForm'
import { Box, Text } from 'degen'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const Home: FC = () => {
	return (
		<>
			<Box display="flex" padding="6" marginBottom="40" alignItems="center" justifyContent="space-between">
				<Text size="large">{APP_NAME}</Text>
				<ConnectButton chainStatus="icon" accountStatus="avatar" />
			</Box>
			<MintForm />
		</>
	)
}

export default Home
