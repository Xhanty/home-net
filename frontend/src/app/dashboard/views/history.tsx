'use client'

import React, { useEffect, useState } from 'react'

import env from '../../../../enviroment.json'

import { useReadContract, useAccount } from 'wagmi'
import { Oval } from 'react-loader-spinner'


interface HistoryInterface {
    FCompra: bigint,   // Tipo BigInt
    Proveedor: string,
    Valor: bigint,     // Tipo BigInt
    Watts: bigint,     // Tipo BigInt
    id: bigint
}

export default function History() {

    const [history, setHistory] = useState<HistoryInterface[]>([])

    const [isLoading, setIsLoading] = useState(true)

    const currentUser = useAccount()

    const result = useReadContract({
        abi: env.homeNet.abi,
        address: env.homeNet.address as `0x${string}`,
        functionName: 'getServicios',
        args: [currentUser.address],
    })

    useEffect(() => {
        if (result.data) {
            setHistory(result.data as HistoryInterface[])
        }
        setIsLoading(false)
    }, [result])

    function formatTimestampToDate(timestamp: bigint): string {
        const date = new Date(Number(timestamp) * 1000); // Convertir BigInt a number y luego a Date
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses en JS son 0 indexados
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        // Retornar la fecha con el formato YYYY/MM/DD HH:mm:ss
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }

    return (
        <div className="table-section">
            <h2>Historial de transacciones</h2>

            {
                !isLoading ? (
                    <table>
                        <thead>
                            <tr>
                                <th style={{
                                    borderRadius: '.5rem 0 0 0',
                                }}>ID</th>
                                <th>Proveedor</th>
                                <th>Watts</th>
                                <th>Fecha de compra</th>
                                <th style={{
                                    borderRadius: '0 .5rem 0 0',
                                }}>Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                history.map((row, key) => {
                                    return (
                                        <tr key={key} >
                                            <td>{row.id.toString()}</td>
                                            <td>{row.Proveedor}</td>
                                            <td>{row.Watts.toString() + ' W'}</td>
                                            <td>{formatTimestampToDate(row.FCompra as bigint)}</td>
                                            <td>{(+row.Valor.toString() / 18).toString().substring(0, 10) + ' AVAX'}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                ) : (
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '20px',
                    }}>
                        <Oval
                            height={100}
                            width={100}
                            color='var(--color-primary)'
                            secondaryColor='var(--color-primary)'
                        />
                    </div>
                )
            }

        </div>
    )
}
