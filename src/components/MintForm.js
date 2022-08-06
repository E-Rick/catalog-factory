import { Box, Stack, FieldSet, Input, Textarea, Button } from 'degen'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import { MediaPicker } from './MediaPicker.tsx'
import {
	useAccount,
	useContract,
	useContractWrite,
	usePrepareContractWrite,
	useSigner,
	useWaitForTransaction,
} from 'wagmi'
import MintSongButton from '@/components/MintSongButton'
import { NFTStorage } from 'nft.storage'
import contractInterface from './MintSongButton/contract-abi.json'
import createMusicMetadata from '@/utils/createMusicMetadata'
import { ethers, utils } from 'ethers'
const contractConfig = {
	addressOrName: '0xc1bD7001E54e8854c0Cd48178a06D70A245Bd73a',
	contractInterface: contractInterface,
}

const MintForm = () => {
	const { address } = useAccount()
	const [loading, setLoading] = useState(false)
	const { data: signer } = useSigner()
	const contract = useContract({
		addressOrName: '0x83439E53bfcD6398B9b315f96a5dB689B82bfa0A',
		contractInterface: contractInterface,
		signerOrProvider: signer,
	})
	// todo: form validation
	const methods = useForm()
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm()

	const onSubmit = async data => {
		setLoading(true)
		const metadata = createMusicMetadata(data)
		// Validate fields
		// Store the metadata and get updated metadata
		const client = new NFTStorage({ token: process.env.NEXT_PUBLIC_API_KEY })
		const ipfs = await client.store(metadata)

		console.log('IPFS URL for the metadata:', ipfs.url)

		const askPrice = utils.parseEther(data.askPrice).toString()
		const findersFee = parseInt(data.findersFeeBps || 0) * 100
		await deployCatalog(ipfs.url, metadata.name, data.sellerFundsRecipient, askPrice, findersFee)
		setLoading(false)
	}

	const deployCatalog = async (metadata, curatorName, sellerFundsRecipient, askPrice, findersFee) => {
		await contract
			.createCatalog(curatorName, metadata, askPrice, sellerFundsRecipient || address, findersFee, {
				value: 500000000000000,
			})
			.then(async tx => {
				const receipt = await tx.wait()
			})
			.catch(console.error)
	}

	useEffect(() => {
		register('image')
		register('song')
	}, [])

	return (
		<Box display="grid" gap="8" marginX="12" margin="8">
			<FormProvider {...methods}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Stack direction="horizontal" space="4">
						<Stack space="10">
							<FieldSet legend="Create a song">
								<Input
									id="name"
									label="Song title"
									required
									placeholder="Keep it Heady"
									{...register('name')}
								/>
								<Input
									id="token"
									prefix="$"
									maxLength={5}
									label="Token"
									textTransform="uppercase"
									required
									placeholder="MUSIC"
									{...register('token')}
								/>
								<Textarea id="description" label="Description" {...register('description')}></Textarea>
								{/* todo: change out the suffix to matic when network is switched */}
								<Input
									id="ask-price"
									label="Ask Price"
									step="0.000001"
									placeholder="0.01"
									suffix="MATIC"
									type="number"
									{...register('askPrice')}
								/>

								<Input
									id="finders-fee"
									label="Finder's Fee"
									step="1"
									placeholder="5"
									min={0}
									suffix="%"
									type="number"
									{...register('findersFeeBps')}
								/>
								{/* todo: add media player to start music */}
								<MediaPicker
									id="song"
									compact
									maxSize={20}
									accept="audio/wav, audio/mp3, audio/wave, audio/mpeg"
									label="Upload your sound"
									onError={e => console.log(e)}
									onChange={e => {
										console.log('Audio:', e)
										setValue('song', e)
									}}
									name="song"
								/>
								<MediaPicker
									id="image"
									compact
									accept="image/jpeg, image/png, image/webp"
									label="Cover image"
									onError={e => console.log(e)}
									onChange={e => {
										console.log('Image:', e)
										setValue('image', e)
									}}
								/>

								<Input
									id="seller-fund-recipient"
									description="The address that will receive any withdrawals and royalties. It can be your personal wallet, a multisignature wallet, or an external splits contract."
									label="Seller fund recipient"
									placeholder={address ?? '0xA0Cf…251e'}
									{...register('sellerFundsRecipient')}
								/>
							</FieldSet>
							<Box marginTop="8">
								{/* <Button width="full" type="submit">
									Mint song
								</Button> */}
								<MintSongButton loading={loading} />
							</Box>
						</Stack>
					</Stack>
				</form>
			</FormProvider>
		</Box>
	)
}

export default MintForm
