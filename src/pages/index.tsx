import type { NextPage } from 'next'
import { useIsMounted } from '@/hooks'
import { Box, Text } from 'degen'

const Home: NextPage = () => {
	const isMounted = useIsMounted()
	if (!isMounted) return null

	return (
		<Box justifyContent='center' display='flex'>
			<Box id='hero' marginBottom='6' justifyContent='center'>
				<h1>
					Mint Music NFTs
				</h1>
			</Box>


		</Box>
	)
}

export default Home
