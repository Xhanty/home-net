'use client'

import React, { useState, useEffect } from 'react'
import Sidenav from './components/sidenav'
import Upbar from './components/upbar'
import 'material-icons/iconfont/material-icons.css'
import Dashboard from './views/dashboard'

import { useRouter } from 'next/navigation'

import { toast } from 'react-toastify';

export default function Index() {

    const [view, setView] = useState(<Dashboard />)

    const router = useRouter()

    const handleViewChange = (newView: JSX.Element) => {
        setView(newView);
    };

    useEffect(() => {
        if (!localStorage.getItem('AuthToken') || !localStorage.getItem('userData')) {
            localStorage.clear()
            toast.error('Sesión expirada')
            router.push('/login')
        }
    })

    return (
        <>
            <Upbar />
            <section className="main_container">
                <Sidenav viewAction={handleViewChange} />
                <section className='content_app'>
                    {view}
                </section>
            </section>
        </>
    )
}