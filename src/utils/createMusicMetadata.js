const music_metadata = {
	name: '', // music nft
	description: '', // music NFT with data on-chain as Base64 encoded string.
	image: '', // ipfs://bafkreibjsjxxys2pl6wijorije7yixjsw7xlho5krqdimwayyobnybewey
	version: '0.1',
	title: '', // music nft
	artist: '', // sweetman.eth
	duration: 0, // 420
	mimeType: '', // audio/wav
	losslessAudio: '', // ipfs://bafybeib2hyqehlrkizobojjhl6x7krll27uffx3zqs7pw3bbg6wz2wpc4m
	trackNumber: 0,
	genre: '', // classical / jazz / pop / rock / hiphop / etc.
	tags: [], // ['sagrado', 'cc0', 'el capitan']
	bpm: 0, // 120
	key: '', // C
	license: '', // CC0
	locationCreated: '', // Bueno Aires, Argentina
	external_url: '', // https://www.npmjs.com/package/onchain-music-metadata
	animation_url: '', // ipfs://bafybeib2hyqehlrkizobojjhl6x7krll27uffx3zqs7pw3bbg6wz2wpc4m
	project: {
		title: '', // music nft
		artwork: {
			uri: '', // ipfs://bafkreibjsjxxys2pl6wijorije7yixjsw7xlho5krqdimwayyobnybewey
			mimeType: '', // image/png
			nft: '', // music nfts
		},
		description: '', // music NFT with data on-chain as Base64 encoded string.
		type: '', // Single / Album / EP / etc.
		originalReleaseDate: '', // 04-20-2022
		recordLabel: '', // sweetman.eth record label
		publisher: '', // sweetman.eth publishing
		upc: '', // 03600029145
	},
	isrc: '', // CC-XXX-YY-NNNNN
	artwork: {
		uri: '', // ipfs://bafkreibjsjxxys2pl6wijorije7yixjsw7xlho5krqdimwayyobnybewey
		mimeType: '', // image/png
		nft: '', // music nfts
	},
	lyrics: {
		text: '', // my lyrics
		nft: '', // my lyrics nft location
	},
	visualizer: {
		uri: '', // ipfs://bafkreibjsjxxys2pl6wijorije7yixjsw7xlho5krqdimwayyobnybewey
		mimeType: '', // image/png
		nft: '', // music nfts
	},
	originalReleaseDate: '', // 04-20-2022e
	recordLabel: '', // sweetman.eth record label
	publisher: '', // sweetman.eth publishing
	credits: [], // [{ name: 'sweetman.eth', collaboratorType: 'creator'}]
	attributes: {
		artist: '', // sweetman.eth
		project: '', // Sweets Beats
		bpm: 0, // 120
		key: '', // C
		genre: '', // rock / pop / etc.
		recordLabel: '', // sweetman.eth record label
		license: '', // CC0
	},
}

const createMusicMetadata = data => {
	music_metadata.name = data.name
	music_metadata.title = data.name
	music_metadata.attributes.project = data.name
	music_metadata.tags = [data.name, data.address]
	music_metadata.artist = data.address
	music_metadata.credits = [{ name: data.address, collaboratorType: 'creator' }]
	music_metadata.image = data.image
	music_metadata.artwork.uri = data.image
	music_metadata.animation_url = data.song
	music_metadata.losslessAudio = data.song
	music_metadata.description = data.description
	const project = {
		title: data.name, // music nft
		artwork: {
			uri: data.image, // ipfs://bafkreibjsjxxys2pl6wijorije7yixjsw7xlho5krqdimwayyobnybewey
			mimeType: '', // image/png
			nft: '', // music nfts
		},
		description: data.description, // music NFT with data on-chain as Base64 encoded string.
		type: '', // Single / Album / EP / etc.
		originalReleaseDate: '', // 04-20-2022
		recordLabel: '', // sweetman.eth record label
		publisher: '', // sweetman.eth publishing
		upc: '', // 03600029145
	}
	music_metadata.project = project

	return music_metadata
}

export default createMusicMetadata
