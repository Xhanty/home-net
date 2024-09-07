import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { cookieStorage, createStorage } from 'wagmi'
import { avalancheFuji } from 'wagmi/chains'

export const projectId = '9673cfa8fe7290151061d3e0294ef1fd'

const metadata = {
    name: 'home-net',
    description: 'AppKit Example',
    url: 'https://web3modal.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [avalancheFuji] as const
export const config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
    ssr: true,
    storage: createStorage({
        storage: cookieStorage
    }),
    //...wagmiOptions
})