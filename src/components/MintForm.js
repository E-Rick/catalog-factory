import { Box, Stack, FieldSet, Input, Textarea } from 'degen'
import { useForm, FormProvider } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import { MediaPicker } from './MediaPicker.tsx'
import { useAccount, useContract, useNetwork, useSigner } from 'wagmi'
import MintSongButton from '@/components/MintSongButton'
import { NFTStorage } from 'nft.storage'
import contractInterface from '@/abi/catalog-factory-abi.json'
import moduleManagerContractInterface from '@/abi/module-manager-abi.json'
import createMusicMetadata from '@/utils/createMusicMetadata'
import getZoraAsksV1_1Address from '@/utils/getZoraAsksV1_1Address'
import { utils } from 'ethers'

const MintForm = ({ contractAddress, moduleManagerContractAddress }) => {
	const { address } = useAccount()
	const [loading, setLoading] = useState(false)
	const { data: signer } = useSigner()
	const { chain } = useNetwork()
	const catalogFactoryContract = useContract({
		addressOrName: contractAddress,
		contractInterface: contractInterface,
		signerOrProvider: signer,
	})
	const moduleManagerContract = useContract({
		addressOrName: moduleManagerContractAddress,
		contractInterface: moduleManagerContractInterface,
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
		data.address = address
		const metadata = createMusicMetadata(data, address)
		const client = new NFTStorage({ token: process.env.NEXT_PUBLIC_API_KEY })
		const ipfs = await client.store(metadata)

		const askPrice = utils.parseEther(data.askPrice || '0').toString()
		const findersFee = parseInt(data.findersFeeBps || 0) * 100
		const isApproved = await checkAskModuleApproved()
		if (!isApproved) {
			setLoading(false)
			return
		}

		await deployCatalog(ipfs.url, metadata.name, data.sellerFundsRecipient, askPrice, findersFee)
		setLoading(false)
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
									accept="audio/wav"
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
									accept="image/jpeg, image/png, image/webp, image/gif"
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
