import { useNetwork, useSigner, useContract, useAccount } from 'wagmi'
import contractInterface from '@/abi/catalog-factory-abi.json'
import moduleManagerContractInterface from '@/abi/module-manager-abi.json'
import getFactoryAddress from '@/utils/getFactoryAddress'
import getZoraModuleManagerAddress from '@/utils/getZoraModuleManagerAddress'

/**
 * Hook to handle the logic to retrieve the correct factory contracts
 * @returns chain, catalogFactoryContract, moduleManagerContract
 */
export function useFactory() {
  const { chain } = useNetwork()
  const { data: signer } = useSigner()

  const catalogFactoryContract = useContract({
    addressOrName: getFactoryAddress(chain.id),
    contractInterface: contractInterface,
    signerOrProvider: signer,
  })
  const moduleManagerContract = useContract({
    addressOrName: getZoraModuleManagerAddress(chain.id),
    contractInterface: moduleManagerContractInterface,
    signerOrProvider: signer,
  })

  return {
    catalogFactoryContract,
    moduleManagerContract,
    chain,
  }
}