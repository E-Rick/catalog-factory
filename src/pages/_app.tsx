import { APP_NAME } from '@/lib/consts'
import { darkTheme, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { AppProps } from 'next/app'
import 'degen/styles'
import '../styles/index.css'
import '../styles/theme.scss'
import '@rainbow-me/rainbowkit/styles.css'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { ThemeProvider } from 'degen'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

const { chains, provider } = configureChains(
	[chain.polygon, chain.mainnet, chain.polygonMumbai, chain.rinkeby],
	[alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
)

const { connectors } = getDefaultWallets({ appName: APP_NAME, chains })
const wagmiClient = createClient({ autoConnect: true, connectors, provider })

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
	return (
		<ThemeProvider defaultMode="dark" defaultAccent="yellow">
			<WagmiConfig client={wagmiClient}>
				<RainbowKitProvider chains={chains} theme={darkTheme({
					accentColor: '#FFC061',
					accentColorForeground: 'white',
					borderRadius: 'small',
					fontStack: 'system',
					overlayBlur: 'small',
				})}>
					<Component {...pageProps} />
				</RainbowKitProvider>
			</WagmiConfig>
		</ThemeProvider>
	)
}

export default App
