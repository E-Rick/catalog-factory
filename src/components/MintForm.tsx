import { Box, Stack, FieldSet, Input, Textarea, Button } from 'degen'
import { useForm, SubmitHandler } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import { MediaPicker } from './MediaPicker.tsx'
import { useAccount } from 'wagmi'
import { NFTStorage } from 'nft.storage'
import getZoraAsksV1_1Address from '@/utils/getZoraAsksV1_1Address'
import createMusicMetadata from '@/utils/createMusicMetadata'

import { parseEther } from 'ethers/lib/utils'
import { useFactory } from '@/hooks/useFactory'

export type FormData = {
	artist: string
	name: string
	description: string
	askPrice: number
	findersFeeBps: number
	image: File
	song: File
	sellerFundsRecipient: string
}

const MintForm = () => {
	const { address } = useAccount()
	const { moduleManagerContract, chain, catalogFactoryContract} = useFactory()

	// disable button while minting
	const [minting, setMinting] = useState(false)
	
	// Form hooks
	const {
		register,
		handleSubmit,
		setValue,setError,clearErrors,
		formState: { errors },
	} = useForm<FormData>()

	// Form submission handler that uploads metadata to NFT.Storage
	const onSubmit: SubmitHandler<FormData> = async (data) => {
		setMinting(true) // disables button while minting
		const metadata = createMusicMetadata(data)

		// Pin the music metadata and return the new metadata with ipfs urls
		const client = new NFTStorage({ token: process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY })
		const ipfs = await client.store(metadata)

		console.log('IPFS URL for the metadata:', ipfs.url)

		const askPrice = parseEther(data.askPrice.toString() || '0').toString()
		console.log('askPrice:', askPrice)
		const isApproved = await checkAskModuleApproved()
		
		if (!isApproved) {
			setMinting(false)
			return
		}
		console.log(askPrice)
		const findersFee = (data.findersFeeBps || 0) * 100
		await deployCatalog(ipfs.url, metadata.name, data.sellerFundsRecipient, askPrice, findersFee)
		setMinting(false)
	}

	const checkAskModuleApproved = async () => {
		let approved = await moduleManagerContract.isModuleApproved(address, getZoraAsksV1_1Address(chain?.id))

		if (!approved) {
			approved = await moduleManagerContract
				.setApprovalForModule(getZoraAsksV1_1Address(chain?.id), true)
				.then(async tx => {
					await tx.wait()
					return true
				})
				.catch(err => {
					console.error(err)
					return false
				})
		}

		return approved
	}

	const deployCatalog = async (metadata, curatorName, sellerFundsRecipient, askPrice, findersFee) => {
		await catalogFactoryContract
			.createCatalog(curatorName, metadata, askPrice, sellerFundsRecipient || address, findersFee, {
				value: 500000000000000,
			})
			.then(async tx => {
				const receipt = await tx.wait()
			})
			.catch(console.error)
	}

	// Manually register two media pickers because its hard to pull input refs
	useEffect(() => {
		register('image', {required: true})
		register('song', {required: true})
	}, [])

	return (
		<Box justifyContent="center" display="grid" gap="8" marginX="12" margin="8">
			<form onSubmit={handleSubmit(onSubmit)}>
					<Stack space="10">
						<FieldSet legend="Create a song">
							<Input
								id="artist"
								label="Artist name"
								placeholder="Ye"
								{...register('artist', {required: true})}
								error={errors.artist?.type === 'required' && 'Artist name is required'}
							/>
							<Input
								name="name"
								label="Song title"
								placeholder="Runaway"
								{...register('name', {required: true})}
								error={errors.name?.type === 'required' && 'Song tile is required'}
							/>
						<Textarea id="description" label="Description" {...register('description', { required: true })} error={errors.description?.type === 'required' && 'Description is required'}></Textarea>
							{/* todo: change out the suffix to matic when network is switched */}
							<Input
								name='askPrice'
								label="Ask Price"
								step="0.000001"
								placeholder="0.01"
							suffix={chain?.nativeCurrency?.symbol}
								type="number"
								{...register('askPrice', {required: true})}
								error={errors.askPrice?.type === 'required' && 'Ask price is required'}
							/>

							<Input
								name='findersFeeBps'
								label="Finder's Fee"
								step="1"
								placeholder="5"
								min={0}
								suffix="%"
								type="number"
								{...register('findersFeeBps', { required: true })}
								error={errors.findersFeeBps?.type === 'required' && 'Ask price is required'}
							/>

							<MediaPicker
								compact
								maxSize={50}
								accept="audio/wav"
								label="Upload your sound"
								error={errors.song?.type === 'custom' && errors.song.message}
								onError={(e) => setError('song', {type: 'custom', message:e})}
								onChange={e => {
									clearErrors('song')
									setValue('song', e)
								}}
								name="song"
							/>
							<MediaPicker
								required
								compact
								accept="image/jpeg, image/png, image/webp, image/gif"
								label="Cover image"
								error={errors.image?.type === 'custom' && errors.image.message}
								onError={(e) => setError('image', { type: 'custom', message: e })}
								onChange={e => {
									clearErrors('image')
									setValue('image', e)
								}}
							/>

							<Input
								description="The  that will receive any withdrawals and royalties. It can be your personal wallet, a multi-signature wallet, or an external splits contract."
								label="Seller fund recipient"
								placeholder={'Enter an address'}
								{...register('sellerFundsRecipient', { required: true })}
								error={errors.sellerFundsRecipient?.type === 'required' && 'Seller fund recipient is required'}
							/>
						</FieldSet>
						<Box marginTop="8">
						<Button width="full" type="submit" disabled={minting} loading={minting}>
							{minting ? 'Minting..' : 'Press your record'}
						</Button>
						</Box>
					</Stack>
			</form>
		</Box>
	)
}

export default MintForm
