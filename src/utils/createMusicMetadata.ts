import { FormData } from '@/components/MintForm';

const music_metadata = {
	name: '', // artist name - title
	description: '', // music NFT with data on-chain as Base64 encoded string.
	image: '', // ipfs://bafkreibjsjxxys2pl6wijorije7yixjsw7xlho5krqdimwayyobnybewey
	version: 'catalog-20220222',
	artist: '', // artist name
	duration: 0, // length of song as a float
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
		artist: '', // artist name
		project: '', // Sweets Beats
		bpm: 0, // 120
		key: '', // C
		genre: '', // rock / pop / etc.
		recordLabel: '', // sweetman.eth record label
		license: '', // CC0
	},
};

const createMusicMetadata = ({ artist, name, description, song, image, license, trackNumber, projectArtwork, upc, projectDescription, projectTitle, bpm, key, externalUrl, recordLabel, songDuration, publisher, projectType }: FormData) => {
	const musicMetadata = {
		name: `${artist} - ${name}`, // artist - song title
		description,
		title: name, // title of song
		mimeType: song.type,
		image,
		losslessAudio: song,
		animation_url: song,
		version: 'catalog-20220222',
		duration: songDuration ?? 0,
		trackNumber,
		genre: '', // classical / jazz / pop / rock / hiphop / etc.
		tags: [], // ['sagrado', 'cc0', 'el capitan']
		bpm: bpm ?? 120, // 120
		key: key ?? '', // C
		license: license ?? '', // CC0
		locationCreated: '', // Bueno Aires, Argentina
		external_url: externalUrl ?? '', // https://www.npmjs.com/package/onchain-music-metadata
		artwork: {
			uri: image,
			mimeType: image.type,
		},
		project: {
			title: projectTitle ?? '',
			artwork: {
				uri: projectArtwork,
				mimeType: projectArtwork.type,
			},
			description: projectDescription ?? '',
			type: projectType ?? '',
			originalReleaseDate: '', // 04-20-2022
			recordLabel: recordLabel ?? '', // sweetman.eth record label
			publisher: publisher ?? '', // sweetman.eth publishing
			upc: upc ?? '', // 03600029145
		},
		attributes: {
			artist,
			project: projectTitle, // Sweets Beats
			bpm: bpm ?? 0, // 120
			key: key ?? '', // C
			genre: '', // rock / pop / etc.
			recordLabel: '', // sweetman.eth record label
			license: '', // CC0
		},
		originalReleaseDate: '', // 04-20-2022e
		recordLabel: recordLabel ?? '', // sweetman.eth record label
		publisher: publisher ?? '', // sweetman.eth publishing
		credits: [], // [{ name: 'sweetman.eth', collaboratorType: 'creator'}]
	};
	console.log('CREATING MUSIC METADATA', musicMetadata);

	return musicMetadata;
};

export default createMusicMetadata;
