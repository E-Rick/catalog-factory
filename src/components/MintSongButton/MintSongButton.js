import { useState } from 'react'
import { Button, Spinner } from 'degen'
import { useContract, useSigner } from 'wagmi'
import abi from './contract-abi.json'

const MintSongButton = () => {
	const [loading, setLoading] = useState(false)
	const { data: signer } = useSigner()
	const contract = useContract({
		addressOrName: '0xc1bD7001E54e8854c0Cd48178a06D70A245Bd73a',
		contractInterface: abi,
		signerOrProvider: signer,
	})

	const handleClick = async () => {
		setLoading(true)
		await contract
			.createCatalog('My Catalog', 'MUSIC')
			.then(async tx => {
				const receipt = await tx.wait()
			})
			.catch(console.error)
		setLoading(false)
	}

	return (
		<>
			{loading ? (
				<Spinner />
			) : (
				<Button width="full" onClick={handleClick}>
					Mint song
				</Button>
			)}
		</>
	)
}

export default MintSongButton
