import React, { FC } from 'react';
import { Box, Stack } from 'degen';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { NextLink } from '@/components/NextLink';
import { APP_NAME } from '@/utils/consts';

/**
 * Header component for the Navigation of the application
 * @returns
 */
export const Header: FC = () => {
	return (
		<>
			<Box
				width='full'
				paddingX='6'
				paddingTop='6'
				marginX='auto'
				marginBottom='4'
				backgroundColor='transparent'
				zIndex='50'
				borderBottomWidth='0.375'
			>
				<Box id='nav' marginBottom='6'>
					<Stack direction='horizontal' justify='space-between' align='center'>
						<NextLink href='/'>
							{/* <Image src='/xxx.svg' height={50} width={50} /> */}
							<p>{APP_NAME}</p>
						</NextLink>
						<Stack direction='horizontal' align='center'>
							<NextLink href="/create">
								Create a Music NFT
							</NextLink>
							<ConnectButton chainStatus="icon" accountStatus="avatar" />
						</Stack>
					</Stack>
				</Box>
			</Box>
		</>
	);
};
