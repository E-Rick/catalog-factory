import React, { FC } from 'react';
import { Box, Stack } from 'degen';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { NextLink } from '@/components/NextLink';
import { APP_NAME } from '@/utils/consts';
import Marquee from '@/components/Marquee';

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
							<p>{APP_NAME}</p>
						</NextLink>
						<Stack direction='horizontal' align='center'>
							<ConnectButton chainStatus="icon" accountStatus="avatar" />
						</Stack>
					</Stack>
				</Box>
			</Box>
			<Marquee pauseOnHover style={{ fontSize: 24, marginBottom: 24 }} speed={40} gradient={false} gradientColor={[248, 251, 253]}>Artists should own their music.    Metadata should work cross-platform.  </Marquee>
		</>
	);
};
