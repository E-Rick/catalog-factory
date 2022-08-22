import type { NextPage } from 'next'
import { useIsMounted } from '@/hooks'
import { Box, Stack, Text } from 'degen'
import { NextLink } from '@/components/NextLink'
import { Sparkles } from '@/components/Sparkles';
import CTAButton from '@/components/CTAButton/CTAButton';

const Home: NextPage = () => {
	const isMounted = useIsMounted()
	if (!isMounted) return null

	return (
		<Box justifyContent='center' display='flex' alignItems='center'>
			<Stack align='center' direction='vertical' space='12'>
				<Box marginTop='10'>
					<Text size='headingOne' align='center'>
						Bring your <Sparkles>Music NFTs.</Sparkles>
					</Text>
					<Text size='large' align='center'>Our music factory makes it easy to create an Music NFTs™ with metadata that works for the whole ecosystem.</Text>
				</Box>
				<Box>
					<NextLink href='/create'>
						<CTAButton>
							Create a collection
						</CTAButton>
					</NextLink>
				</Box>


			</Stack>


		</Box>
	)
}

export default Home
