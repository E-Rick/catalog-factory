import { Box, Text } from 'degen'
import React from 'react'

const Footer = () => {
  return (
    <Box as='footer' position='relative' left='0' bottom='0' marginY='16' width='full' textAlign='center' >
      <Text size='large' >
        Built with ❤ by <a href='https://twitter.com/0xerick'>Wrecs.eth</a> and <a href='https://twitter.com/sweetman_eth'>Sweetman.eth</a></Text>
    </Box >
  )
}

export default Footer
