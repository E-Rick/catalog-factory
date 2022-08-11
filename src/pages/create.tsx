import { useNetwork } from "wagmi";
import MintForm from "@/components/MintForm";
import { useIsMounted } from "@/hooks";


export default function CreatePage() {
  const isMounted = useIsMounted()
  const { chain } = useNetwork();

  if (!isMounted) return null
  return (
    <div>
      {chain && <MintForm />}
    </div>
  );
}