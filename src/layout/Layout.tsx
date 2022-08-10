import Head from 'next/head';
import { FC, ReactNode } from 'react';
import { Header } from './Header';
import { APP_NAME } from '../utils/consts';

type Props = {
	children?: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
	return (
		<>
			<Head>
				<title>{APP_NAME}</title>
				<link rel='shortcut icon' href='/favicon.ico' />
			</Head>

			<Header />
			<main>{children}</main>
		</>
	);
};
