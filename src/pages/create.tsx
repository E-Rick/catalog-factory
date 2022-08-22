import { useNetwork } from "wagmi";
import MintForm from "@/components/MintForm";
import { useIsMounted } from "@/hooks";
import { Box, Text, Stack } from 'degen';

export default function CreatePage() {
  const isMounted = useIsMounted()
  const { chain } = useNetwork();

  if (!isMounted) return null
  return (
    <Box paddingX='4'>
      <Stack justify='center' align='center'>
        <Text size='headingOne' align='left'>Share your Sound</Text>
        <Text size='large' align='left'>Follow these steps to create your own Music NFT smart contract and deploy your sound to the blockchain. </Text>
        <MintForm />
      </Stack>
    </Box>
  );
}