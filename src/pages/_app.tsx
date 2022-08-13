import { APP_NAME } from '@/utils/consts'
import { darkTheme, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { AppProps } from 'next/app'
import 'degen/styles'
import '../styles/index.css'
import '../styles/theme.scss'
import '../styles/progress.css';
import '@rainbow-me/rainbowkit/styles.css'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { ThemeProvider, vars } from 'degen'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { Layout } from '@/layouts'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import NProgress from 'nprogress';

const { chains, provider } = configureChains(
	[chain.polygonMumbai, chain.polygon, chain.mainnet, chain.rinkeby],
	[alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_MUMBAI }), publicProvider()]
)

const { connectors } = getDefaultWallets({ appName: APP_NAME, chains })
const wagmiClient = createClient({ autoConnect: true, connectors, provider })


const App = ({ Component, pageProps }: AppProps): JSX.Element => {
	const router = useRouter();

	useEffect(() => {
		router.events.on('routeChangeStart', () => NProgress.start());
		router.events.on('routeChangeComplete', () => NProgress.done());
		router.events.on('routeChangeError', () => NProgress.done());
	}, []);

	return (
		<ThemeProvider defaultMode="dark" defaultAccent="yellow">
			<WagmiConfig client={wagmiClient}>
				<RainbowKitProvider chains={chains} theme={darkTheme({
					accentColor: vars.colors.yellow,
					accentColorForeground: vars.colors.white,
					borderRadius: 'small',
					fontStack: 'system',
					overlayBlur: 'small',
				})}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</RainbowKitProvider>
			</WagmiConfig>
		</ThemeProvider>
	)
}

export default App
