import {
	Box,
	Card,
	Stack,
	FieldSet,
	Input,
	Textarea,
	MediaPicker,
	Button,
	FileInput,
	IconClose,
	VisuallyHidden,
	Text,
} from 'degen'
import { useForm, SubmitHandler } from 'react-hook-form'
import React, { useState } from 'react'

type Image = 'image/jpg' | 'image/jpeg' | 'image/png' | 'image/webp' | 'image/svg+xml' | 'image/tiff' | 'image/gif'
type Audio = 'audio/wav' | 'audio/wave' | 'audio/x-wav' | 'audio/aiff'

interface IFormInput {
	name: string
	description: string
	image: string
	price: number
	coverImage: string
	song: Audio
	sellerFundRecipient: string
}

const MintForm = () => {
	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>()
	const [result, setResult] = useState('')
	const onSubmit: SubmitHandler<IFormInput> = data => setResult(JSON.stringify(data))
	console.log('errors: ', errors)
	// const onChange = e => {
	// 	const file = e.target.files[0]
	// 	const storageRef = app.storage().ref()
	// 	const fileRef = storageRef.child(file.name)
	// 	fileRef.put(file).then(() => {
	// 		console.log('Uploaded a file')
	// 	})
	// }

	// const onSubmitFile = data => {
	// 	console.log(data)
	// }

	console.log('name: ', watch('name')) // watch input value by passing the name of it
	console.log('price: ', watch('price')) // watch input value by passing the name of it
	return (
		<Box display="grid" gap="8" marginX="8" margin="8">
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack direction="vertical" space="8">
					<Stack direction="horizontal" space="4">
						<Stack space="10">
							<FieldSet legend="Create a song">
								<Input label="Song title" required placeholder="Keep it Heady" {...register('name')} />
								<Textarea label="Description" {...register('description')}></Textarea>
								<Input
									label="Price"
									step="0.000001"
									placeholder="0.01"
									suffix="ETH"
									type="number"
									{...register('price')}
								/>
								<input type="file" name="song" ref={register} {...register('song')} />

								<Input
									description="The address that will receive any withdrawals and royalties. It can be your personal wallet, a multisignature wallet, or an external splits contract."
									label="Seller fund recipient"
									placeholder="0xA0Cf…251e"
									{...register('sellerFundRecipient')}
								/>
							</FieldSet>
							<Box marginTop="8">
								<p>{result}</p>
								<Button width="full" type="submit">
									Mint song
								</Button>
							</Box>
						</Stack>
					</Stack>
				</Stack>
			</form>
		</Box>
	)
}

export default MintForm
