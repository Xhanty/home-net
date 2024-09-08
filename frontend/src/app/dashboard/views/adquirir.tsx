'use client'

import React, { FormEvent, useState } from 'react'
import '../../css/form.css'
import { useAccount, useWriteContract } from 'wagmi'
import { Oval } from 'react-loader-spinner'
import { toast } from 'react-toastify';

import env from '../../../../enviroment.json'

export default function Adquirir() {

    const wattsXvalue = 5

    const [wattsCount, setWattsCount] = useState(0)
    const [isSaving, setIsSaving] = useState(false)

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

    return (

        <>
            <form onSubmit={SaveCharges}>
                <h2>Recargar energía prepagada</h2>

                <div className="form-group">
                    <div className="field">
                        <label htmlFor="">Proveedor</label>
                        <select name="provider" required>
                            <option selected disabled > Seleccione una opción </option>
                            <option value="0xc6811Fc3AE53AFde1812A372b88F152d062fdef2">Santiago</option>
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
                            }}>#</th>
                            <th>Proveedor</th>
                            <th>Precio Watt</th>
                            <th style={{
                                borderRadius: '0 .5rem 0 0',
                            }}>Calificación</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr >
                            <td>1</td>
                            <td>Proveedora</td>
                            <td>2 AVAX</td>
                            <td>Calificación</td>
                        </tr>
                        {
                            // history.map((row, key) => {
                            //     return (
                            //         <tr key={key} >
                            //             <td>{row.id.toString()}</td>
                            //             <td>{row.Proveedor}</td>
                            //             <td>{row.Watts.toString() + ' W'}</td>
                            //             <td>{formatTimestampToDate(row.FCompra as bigint)}</td>
                            //             <td>{(+row.Valor.toString() / 18).toString().substring(0, 10) + ' AVAX'}</td>
                            //         </tr>
                            //     )
                            // })
                        }
                    </tbody>
                </table>
            </div>

        </>

    )
}
