import { FormData } from "@/components/MintForm"

const music_metadata = {
	name: '', // artist name - title
	description: '', // music NFT with data on-chain as Base64 encoded string.
	image: undefined, // ipfs://bafkreibjsjxxys2pl6wijorije7yixjsw7xlho5krqdimwayyobnybewey
	version: '0.1',
	title: '', // title of song
	artist: '', // artist name
	duration: 0, // length of song as a float
	mimeType: '', // audio/wav
	losslessAudio: undefined, // ipfs://bafybeib2hyqehlrkizobojjhl6x7krll27uffx3zqs7pw3bbg6wz2wpc4m
	trackNumber: 0,
	genre: '', // classical / jazz / pop / rock / hiphop / etc.
	tags: [], // ['sagrado', 'cc0', 'el capitan']
	bpm: 0, // 120
	key: '', // C
	license: '', // CC0
	locationCreated: '', // Bueno Aires, Argentina
	external_url: '', // https://www.npmjs.com/package/onchain-music-metadata
	animation_url: undefined, // ipfs://bafybeib2hyqehlrkizobojjhl6x7krll27uffx3zqs7pw3bbg6wz2wpc4m
	project: {
		title: '', // title of project
		artwork: {
			uri: undefined, // ipfs://bafkreibjsjxxys2pl6wijorije7yixjsw7xlho5krqdimwayyobnybewey
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
		uri: undefined, // ipfs://bafkreibjsjxxys2pl6wijorije7yixjsw7xlho5krqdimwayyobnybewey
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
		artist: '', // artist name
		project: '', // Sweets Beats
		bpm: 0, // 120
		key: '', // C
		genre: '', // rock / pop / etc.
		recordLabel: '', // sweetman.eth record label
		license: '', // CC0
	},
}

const createMusicMetadata = ({artist, name, description, song, image}: FormData) => {
	const metadata = {
		name: `${artist} - ${name}`,
		description,
		mimeType: song.type,
		image,
		losslessAudio: song,
		animation_url: song,
		artwork: {
			uri: image,
			mimeType: image.type
		},
		attributes: {
			artist
		},
		project: {
			title: name,
			artwork: {
				uri: image,
				mimeType: image.type
			},
			description
		}
	}
	console.log('CREATING MUSIC METADATA', metadata)

	return metadata
}

export default createMusicMetadata
