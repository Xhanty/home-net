import './globals.css'
import type { Metadata } from 'next'
import { headers } from 'next/headers'

import { cookieToInitialState } from 'wagmi'

import { config } from '../../config'
import Web3ModalProvider from '../../context'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'HomeNet',
  description: '',
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))
  return (
    <html lang="es-CO">
      <body>
        <ToastContainer />
        <Web3ModalProvider initialState={initialState}>{children}</Web3ModalProvider>
      </body>
    </html>
  )
}