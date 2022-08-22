import createMusicMetadata from '@/utils/createMusicMetadata'
import { Box, Button, FieldSet, Text, Input, Stack, Textarea } from 'degen'
import { NFTStorage } from 'nft.storage'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAccount } from 'wagmi'
import { MediaPicker } from './MediaPicker.tsx'

import { useFactory } from '@/hooks/useFactory'
import { parseEther } from 'ethers/lib/utils'
import { getZoraAsksV1_1Address } from '@/utils/helpers'

export type FormData = {
	artist: string
	name: string
	description: string
	askPrice: number
	findersFeeBps: number
	image: File
	song: File
	sellerFundsRecipient: string
	creatorsShare: number
	trackNumber: number
	lyrics: string
	projectTitle: string
	projectDescription: string
	projectArtwork: File
	songDuration: number
	projectType: string
	upc: string
	recordLabel: string
	bpm: number
	externalUrl: string
	publisher: string
	key: string
	license: string
}

const MintForm = () => {
	const { address } = useAccount()
	const { moduleManagerContract, chain, catalogFactoryContract } = useFactory()

	// disable button while minting
	const [minting, setMinting] = useState(false)

	// Form hooks
	const {
		register,
		handleSubmit,
		setValue, setError, clearErrors,
		formState: { errors },
	} = useForm<FormData>()

	// Form submission handler that uploads metadata to NFT.Storage
	const onSubmit: SubmitHandler<FormData> = async (data) => {
		try {

			setMinting(true) // disables button while minting
			const metadata = createMusicMetadata(data)

			// Pin the music metadata and return the new metadata with ipfs urls
			const client = new NFTStorage({ token: process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY })
			const ipfs = await client.store(metadata)
			console.log("🚀 ~ file: MintForm.tsx ~ line 47 ~ constonSubmit:SubmitHandler<FormData>= ~ ipfs", ipfs)

			console.log('IPFS URL for the metadata:', ipfs.url)

			// askPrice is a number from input type
			const askPrice = parseEther(data.askPrice.toString() || '0').toString()
			const isApproved = await checkAskModuleApproved()
			console.log("🚀 ~ file: MintForm.tsx ~ line 64 ~ constonSubmit:SubmitHandler<FormData>= ~ isApproved", isApproved)


			if (!isApproved) {
				setMinting(false)
				return
			}
			console.log('here')
			const findersFee = (data.findersFeeBps || 0) * 100
			await deployCatalog(ipfs.url, metadata.name, data.sellerFundsRecipient, askPrice, findersFee)
			setMinting(false)
		} catch (error) {
			setMinting(false)
			console.error(error)
		}

	}
	const checkAskModuleApproved = async () => {
		console.log(chain.id)
		let approved = await moduleManagerContract.isModuleApproved(address, getZoraAsksV1_1Address(chain?.id))
		console.log("🚀 ~ file: MintForm.tsx ~ line 67 ~ checkAskModuleApproved ~ approved", approved)

		if (approved === false) {
			approved = await moduleManagerContract
				.setApprovalForModule(getZoraAsksV1_1Address(chain?.id), true)
				.then(async tx => {
					const x = await tx.wait()
					console.log('xx: ', x)
					return true
				})
				.catch(err => {
					console.log("🚀 ~ file: MintForm.tsx ~ line 77 ~ checkAskModuleApproved ~ err", err)
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
				console.log("🚀 ~ file: MintForm.tsx ~ line 93 ~ deployCatalog ~ receipt", receipt)
			})
			.catch(console.error)
	}

	// Manually register two media pickers
	useEffect(() => {
		register('image', { required: true })
		register('song', { required: true })
		register('projectArtwork', { required: true })
	}, [])

	return (
		<Box justifyContent="center" display="grid" gap="8" marginX="12" margin="8">
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack space="10">
					<FieldSet legend="Create a song">
						<Input
							id="artist"
							label="Artist name"
							placeholder="Kanye West"
							{...register('artist', { required: true })}
							error={errors.artist?.type === 'required' && 'Artist name is required'}
						/>
						<Input
							name="name"
							label="Song title"
							placeholder="Title of song"
							{...register('name', { required: true })}
							error={errors.name?.type === 'required' && 'Song tile is required'}
						/>
						<Textarea id="description" label="Description" {...register('description', { required: true })} error={errors.description?.type === 'required' && 'Description is required'}></Textarea>
						{/* todo: change out the suffix to matic when network is switched */}

						<MediaPicker
							compact
							maxSize={50}
							accept="audio/wav"
							label="Upload your sound"
							error={errors.song?.type === 'custom' && errors.song.message}
							onError={(e) => setError('song', { type: 'custom', message: e })}
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
						{/*  */}
						<Input
							description="The wallet address that will receive any withdrawals and royalties. It can be your personal wallet, a multi-signature wallet, or an external splits contract."
							label="Seller fund recipient"
							placeholder={'Enter an address'}
							{...register('sellerFundsRecipient', { required: true })}
							error={errors.sellerFundsRecipient?.type === 'required' && 'Seller fund recipient is required'}
						/>
						<Input
							name='askPrice'
							label="Ask Price"
							step="0.000001"
							description="The price of your NFT"
							placeholder="0.01"
							suffix={chain?.nativeCurrency?.symbol}
							type="number"
							{...register('askPrice', { required: true })}
							error={errors.askPrice?.type === 'required' && 'Ask price is required'}
						/>
						<Input
							name='findersFeeBps'
							label="Finder's Fee"
							description={`Finder's fee incentives the market to find buyers of your NFT. https://zine.zora.co/zora-v3 to Learn more.`}
							step="1"
							placeholder="5"
							min={0}
							suffix="%"
							type="number"
							{...register('findersFeeBps', { required: true })}
							error={errors.findersFeeBps?.type === 'required' && 'Ask price is required'}
						/>
						<Input
							name='creatorsShare'
							label="Creator's Royalties"
							description={`The royalties you earn on each sale`}
							step="1"
							placeholder="10"
							min={0}
							suffix="%"
							type="number"
							{...register('creatorsShare', { required: true })}
							error={errors.creatorsShare?.type === 'required' && 'Creator`s Share is required'}
						/>
						<Input
							name='trackNumber'
							label="Track Number"
							description={`The place which the track appears in its project (e.g. track 4 off an album)`}
							{...register('trackNumber')}
						/>
						<Input
							name='songDuration'
							label="Song Duration"
							suffix='seconds'
							description={`Length of the audio file in seconds (must be > 1ms)`}
							{...register('songDuration')}
						/>
						{/* The external url of the track */}
						<Input
							name='externalUrl'
							label="External Url"
							placeholder='wrecs.studio'
							description={`The external url of the track. Shows as a link on Opensea. Could be your own website.`}
							{...register('externalUrl', { required: true })}
							error={errors.externalUrl?.type === 'required' && 'External URL is required'}
						/>
						<Input
							name='key'
							label="Key"
							placeholder='C'
							description={`The key of the track`}
							{...register('key')}
						/>
						<Input
							name='recordLabel'
							label="Record Label"
							placeholder='WRECS LLC'
							description={`The record label of the track`}
							{...register('recordLabel')}
						/>
						<Input
							name='license'
							label="License"
							placeholder='CC0'
							description={`The license of the track.
                Examples: CC-BY-NC-ND,
                CC-BY-NC
                CC-BY-SA,
                CC-BY-ND,
                CC-BY,
                CC0,
                PD,
                Other`}
							{...register('license')}
						/>
						<Input
							name='bpm'
							label="Beats per minute"
							description={`The BPM of the track`}
							step="1"
							placeholder="5"
							min={0}
							suffix="BPM"
							type="number"
							{...register('bpm')}
						/>
						<FieldSet legend='Project Metadata'>
							<Input
								name='project'
								label="Project Title"
								description={`Describes the body of work the record is a part of (e.g. an album, EP, or compilation). The name of the project this record is on.`}

								{...register('projectTitle')}
								error={errors.projectTitle?.type === 'required' && 'Project`s Title is required'}
							/>
							<Input
								name='projectType'
								label="Project Type"
								placeholder='Genesis'
								description={`The type of project. Ex. EP, LP, Compilation, Single, Other, Mixtape`}
								{...register('projectType')}
							/>
							<Input
								name='recordLabel'
								label="Record Label"
								description={`Describes the body of work the record is a part of (e.g. an album, EP, or compilation). The name of the project this record is on.`}
								{...register('recordLabel')}
							/>
							<Input
								name='upc'
								label="UPC"
								description={`The UPC of the project`}

								{...register('upc')}
							/>
							<Input
								name='publisher'
								label="Publisher"
								description={`The publisher of the project.`}
								{...register('publisher')}
							/>
							<Textarea id="projectDescription" label="Project description" {...register('projectDescription')}></Textarea>
							<Stack space='2'>
								<MediaPicker
									required
									compact
									accept="image/jpeg, image/png, image/webp, image/gif"
									label="Project Artwork"
									error={errors.image?.type === 'custom' && errors.image.message}
									onError={(e) => setError('projectArtwork', { type: 'custom', message: e })}
									onChange={e => {
										clearErrors('projectArtwork')
										setValue('projectArtwork', e)
									}}

								/>
								<Box paddingLeft='4'>

									<Text color='textTertiary'>Artwork for the project (e.g. an album cover)</Text>
								</Box>
							</Stack>
						</FieldSet>

					</FieldSet>
					<Box marginTop="8">
						<Button tone='accent' width="full" type="submit" disabled={minting} loading={minting}>
							{minting ? 'Minting..' : 'Mint your Music NFT™'}
						</Button>
					</Box>
				</Stack>
			</form>
		</Box>
	)
}

export default MintForm
