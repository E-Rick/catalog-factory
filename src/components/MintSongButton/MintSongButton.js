import { Button, Spinner } from 'degen'

const MintSongButton = ({ loading }) => (
	<>
		<Button width="full" type="submit" disabled={loading}>
			{loading ? <Spinner /> : 'Mint song'}
		</Button>
	</>
)

export default MintSongButton
