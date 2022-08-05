import { APP_NAME } from '@/lib/consts'
import { darkTheme, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { AppProps } from 'Next/app'
import 'degen/styles'
import '../styles/index.css'
import '../styles/theme.scss'
import '@rainbow-me/rainbowkit/styles.css'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { ThemeProvider } from 'degen'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

const { chains, provider } = configureChains(
	[chain.mainnet, chain.rinkeby, chain.optimism, chain.polygon, chain.arbitrum],
	[alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
)

const { connectors } = getDefaultWallets({ appName: APP_NAME, chains })
const wagmiClient = createClient({ autoConnect: true, connectors, provider })

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
	return (
		<ThemeProvider defaultMode="dark" defaultAccent="yellow">
			<WagmiConfig client={wagmiClient}>
				<RainbowKitProvider chains={chains} theme={darkTheme()}>
					<Component {...pageProps} />
				</RainbowKitProvider>
			</WagmiConfig>
		</ThemeProvider>
	)
}

export default App
