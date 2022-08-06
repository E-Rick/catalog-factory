import {
	Box,
	Stack,
	FieldSet,
	Input,
	Textarea,
	Button,
} from 'degen'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import { MediaPicker } from './MediaPicker.tsx'
import { useAccount } from 'wagmi'
interface IFormInput {
	name: string
	description: string
	song: File
	coverImage: File
	price: number
	findersFee: number
	sellerFundRecipient: string
}

const MintForm = () => {
	const {address} = useAccount()
	// todo: form validation
	const methods = useForm()
	const {
		register,
		handleSubmit,
		setValue, reset,
		formState: { errors },
	} = useForm<IFormInput>()
	const [result, setResult] = useState('')
	const onSubmit: SubmitHandler<IFormInput> = data => {
		console.log(data)
	}

	useEffect(()=> {
		register("coverImage");
		register("song")
	},[])

	return (
		<Box display="grid" gap="8" marginX="8" margin="8">
			<FormProvider {...methods} > 
			<form onSubmit={handleSubmit(onSubmit)}>
					<Stack direction="horizontal" space="4">
						<Stack space="10">
							<FieldSet legend="Create a song">
								<Input id='name' label="Song title" required placeholder="Keep it Heady" {...register('name')} />
								<Textarea id='description' label="Description" {...register('description')}></Textarea>
								{/* todo: change out the suffix to matic when network is switched */}
								<Input id='price'
									label="Price"
									step="0.000001"
									placeholder="0.01"
									suffix="ETH"
									type="number"
									{...register('price')}
								/>
								<Input
									id='finders-fee'
									label="Finder's Fee"
									step="1"
									placeholder="5"
									min={0}
									suffix="%"
									type="number"
									{...register('findersFee')}
								/>
								{/* <input type="file" name="song" ref={register} {...register('song')} /> */}
								{/* todo: add media player to start music */}
								<MediaPicker id='song' compact maxSize={20} accept='audio/wav, audio/mp3, audio/wave, audio/mpeg' label='Upload your sound' onError={e => console.log(e)} onChange={e => {
									console.log('Audio:',e)
									setValue('song', e)
								}} name='song' />
								{/* todo: display dropzone/cover image preview for mobile view  */}
								<MediaPicker id='cover-image' compact accept='image/jpeg, image/png, image/webp' label='Cover image' onError={e => console.log(e)} onChange={e => { 
								console.log('Cover Image:',e)
									setValue('coverImage', e)}} />
								
								<Input id='seller-fund-recipient'
									description="The address that will receive any withdrawals and royalties. It can be your personal wallet, a multisignature wallet, or an external splits contract."
									label="Seller fund recipient"
									placeholder={address ?? "0xA0Cf…251e"}
									{...register('sellerFundRecipient')}
								/>
							</FieldSet>
							<Box marginTop="8">
								{/* todo: change button display to connect wallet if no acc and add minting loading animation */}
								<Button width="full" type="submit">
									Mint song
								</Button>
							</Box>
						</Stack>
						
			{/* <Card>
							<MediaPicker accept='image/jpeg, image/png, image/webp' label='Cover image' onChange={e => {
								setValue('coverImage', e)
							}} />
			</Card> */}
					</Stack>
			</form>
			</FormProvider>

		</Box>
	)
}

export default MintForm
