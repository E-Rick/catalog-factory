import { useState } from 'react'
import { Button, Spinner } from 'degen'
import { useContract, useSigner } from 'wagmi'
import abi from './contract-abi.json'

const MintSongButton = () => {
	const [loading, setLoading] = useState(false)
	const { data: signer } = useSigner()
	const contract = useContract({
		addressOrName: '0x83439E53bfcD6398B9b315f96a5dB689B82bfa0A',
		contractInterface: abi,
		signerOrProvider: signer,
	})

	const handleClick = async () => {
		setLoading(true)
		await contract
			.createCatalog(
				'My Catalog',
				'ipfs://bafkreidfgdtzedh27qpqh2phb2r72ccffxnyoyx4fibls5t4jbcd4iwp6q',
				100,
				'0xcfBf34d385EA2d5Eb947063b67eA226dcDA3DC38',
				100,
				{ value: 500000000000000 }
			)
			.then(async tx => {
				const receipt = await tx.wait()
			})
			.catch(console.error)
		setLoading(false)
	}

	return (
		<>
			<Button width="full" onClick={handleClick} disabled={loading}>
				{loading ? <Spinner /> : 'Mint song'}
			</Button>
		</>
	)
}

export default MintSongButton
