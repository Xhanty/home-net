'use client'

import React, { FormEvent, useEffect, useState } from 'react'
import '../../css/form.css'
import { useAccount, useWriteContract } from 'wagmi'
import { Oval } from 'react-loader-spinner'
import { toast } from 'react-toastify';

import env from '../../../../enviroment.json'
import { apiUrl, query } from '@/app/login/services'
import { providerQuery, provider } from '@/app/interfaces/session'

export default function Adquirir() {

    const wattsXvalue = 5

    const [wattsCount, setWattsCount] = useState(0)
    const [isSaving, setIsSaving] = useState(false)

    const [providers, setProviders] = useState<provider[]>([] as provider[])


    useEffect(() => {
        getProvider()
    }, [])

    const currentUser = useAccount()

    const { writeContract } = useWriteContract()

    const onValueChange = async (newValue: FormEvent<HTMLInputElement>) => {
        if (newValue.nativeEvent && newValue.nativeEvent.target) {
            setWattsCount(Number((newValue.nativeEvent.target as HTMLInputElement).value) * wattsXvalue)
        }
    }

    const SaveCharges = async (evt: FormEvent<HTMLFormElement>) => {

        evt.preventDefault()

        setIsSaving(true)

        const formDataObj = Object.fromEntries(new FormData(evt.currentTarget).entries())

        try {



            // useReadContract({
            //     abi: env.homeNet.abi,
            //     address: env.homeNet.address as `0x${string}`,
            //     functionName: 'addServicio',
            //     args: [
            //         formDataObj.provider as `0x${string}`,
            //         currentUser.address,
            //         formDataObj.watts,
            //         formDataObj.value
            //     ],
            // })

            const response = await writeContract({
                abi: env.homeNet.abi,
                address: env.homeNet.address as `0x${string}`,
                functionName: 'addServicio',
                args: [
                    formDataObj.provider as `0x${string}`,
                    currentUser.address,
                    formDataObj.watts,
                    formDataObj.value
                ],
            })

            console.log(response)

            setIsSaving(false)

        } catch (error) {
            setIsSaving(false)
            toast.error("Error al recargar la energía")
            console.log(error);

        }

    }

    const getProvider = async () => {

        try {
            const rsp = await query(apiUrl.providers, {
                method: 'GET',
            }) as providerQuery

            if (rsp.status) {
                setProviders(rsp.data)
            } else {
                toast.error("Error al cargar los proveedor")
            }

        } catch (error) {
            toast.error("Error al cargar los proveedores")
        }

    }

    return (

        <>
            <form onSubmit={SaveCharges}>
                <h2>Recargar energía prepagada</h2>

                <div className="form-group">
                    <div className="field">
                        <label htmlFor="">Proveedor</label>
                        <select name="provider" required>
                            <option selected disabled > Seleccione una opción </option>
                            {
                                providers.map((provider: provider) => {
                                    return (
                                        <option key={provider.id} value={provider.wallet}>{provider.name}</option>
                                    )
                                })
                            }

                        </select>
                    </div>
                </div>

                <div className="form-group two">

                    <div className="field">
                        <label htmlFor="">Valor</label>
                        <input type="number" name='value' placeholder="Valor a recargar" min={1} required onInput={(evt) => onValueChange(evt)} />
                    </div>

                    <div className="field">
                        <label htmlFor="">Watts</label>
                        <input type="text" name='watts' placeholder="Cantidad de watts a recibir" readOnly required value={wattsCount} />
                    </div>

                </div>

                <div className="submit-btn">
                    {
                        isSaving
                            ? <Oval
                                height={30}
                                width={30}
                                color='var(--color-primary)'
                                secondaryColor='var(--color-primary)'
                            />
                            : <button type='submit'>Recargar energía</button>
                    }

                </div>

            </form>

            <br />

            <div className="table-section">
                <h2>Listado de proveedores cercanos</h2>
                <table>
                    <thead>
                        <tr>
                            <th style={{
                                borderRadius: '.5rem 0 0 0',
                            }}>ID</th>
                            <th>Nombre</th>
                            <th>Wallet</th>
                            <th>Ciudad</th>
                            <th style={{
                                borderRadius: '0 .5rem 0 0',
                            }}>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            providers.map((row, key) => {
                                return (
                                    <tr key={key} >
                                        <td>{row.id}</td>
                                        <td>{row.name}</td>
                                        <td>{row.wallet}</td>
                                        <td>{row.city}</td>
                                        <td>{row.valor} AVAX</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

        </>

    )
}
