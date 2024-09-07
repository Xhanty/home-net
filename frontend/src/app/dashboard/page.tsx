'use client'

import React, { useState } from 'react'
import Sidenav from './components/sidenav'
import Upbar from './components/upbar'
import 'material-icons/iconfont/material-icons.css'
import Dashboard from './views/dashboard'

export default function Index() {

    const [view, setView] = useState(<Dashboard />)

    const handleViewChange = (newView: JSX.Element) => {
        setView(newView);
    };

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