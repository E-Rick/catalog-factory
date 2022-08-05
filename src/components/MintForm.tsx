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

interface IFormInput {
	name: string
	description: string
	image: string
	price: number
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
	console.log('name: ', watch('name')) // watch input value by passing the name of it
	console.log('price: ', watch('price')) // watch input value by passing the name of it
	return (
		<Box display="grid" gap="8" marginX="8" margin="8">
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack direction="vertical" space="8">
					<Stack direction="horizontal" space="4">
						<Stack space="10">
							<FieldSet legend="Create a song">
								<Textarea id="bio" label="Description"></Textarea>
								<MediaPicker
									accept="image/jpeg, image/png, image/webp"
									compact
									label="Choose or drag and drop a song"
								/>
								<FileInput
									onChange={file => alert(file)}
									accept="audio/mpeg,audio/mp3,audio/vnd.wav,audio/vnd.wave,audio/wav,audio/wave,audio/x-wav,audio/aiff"
								>
									{context =>
										context.name ? (
											<Stack align="center" direction="horizontal">
												{context.name}
												{context.previewUrl}
												<Button
													shape="circle"
													size="small"
													variant="transparent"
													onClick={context.reset}
												>
													<VisuallyHidden>Remove</VisuallyHidden>
													<IconClose />
												</Button>
											</Stack>
										) : (
											<Box>{context.droppable ? 'Drop file' : 'Attach file'}</Box>
										)
									}
								</FileInput>

								<Input
									name="name"
									label="Song title"
									required
									placeholder="Keep it Heady"
									{...register('name')}
								/>

								<Input
									name="price"
									label="Price"
									step="0.000001"
									placeholder="10"
									suffix="ETH"
									type="number"
									{...register('price')}
								/>

								<Input
									name="sellerFundRecipient"
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
