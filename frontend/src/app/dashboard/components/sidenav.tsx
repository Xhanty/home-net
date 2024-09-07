/* eslint-disable @next/next/no-img-element */
'use client'

import Link from 'next/link'
import React, { FC, useEffect } from 'react'
import History from '../views/history'
import Dashboard from '../views/dashboard'

interface SidenavProps {
    viewAction: (component: JSX.Element) => void;
}

const Sidenav: FC<SidenavProps> = ({ viewAction }) => {

    useEffect(() => {
        const allA = document.querySelectorAll('aside a')

        allA.forEach((a) => {
            a.addEventListener('click', () => {
                allA.forEach((a) => {
                    a.classList.remove('active')
                })
                a.classList.add('active')
            })
        })
    }, [])

    return (
        <aside>
            <div className="toggle">
                <div className="logo">
                    <img src="https://api.natupuntos.online/api/uploads/users/profile/logo.png" alt="logo" />
                    <Link href={"/dashboard"}>
                        <h2>Home<span className="danger">Net</span></h2>
                    </Link>
                </div>
                <div className="close" id="close-btn">
                    <span className="material-icons-sharp">
                        close
                    </span>
                </div>
            </div>

            <div className="sidebar">
                <a href="#" className="active" onClick={() => viewAction(<Dashboard />)}>
                    <span className="material-icons-sharp">
                        dashboard
                    </span>
                    <h3>Dashboard</h3>
                </a>
                <a href="#" onClick={() => viewAction(<History />)}>
                    <span className="material-icons-sharp">
                        history
                    </span>
                    <h3>Historial</h3>
                </a>

                {/* <a href="#">
                    <span className="material-icons-sharp">
                        person_outline
                    </span>
                    <h3>Users</h3>
                </a>
                <a href="#">
                    <span className="material-icons-sharp">
                        receipt_long
                    </span>
                    <h3>History</h3>
                </a>
                <a href="#">
                    <span className="material-icons-sharp">
                        insights
                    </span>
                    <h3>Analytics</h3>
                </a>
                <a href="#">
                    <span className="material-icons-sharp">
                        mail_outline
                    </span>
                    <h3>Tickets</h3>
                    <span className="message-count">27</span>
                </a>
                <a href="#">
                    <span className="material-icons-sharp">
                        inventory
                    </span>
                    <h3>Sale List</h3>
                </a> */}

                <Link href={"/login"}>
                    <span className="material-icons-sharp">
                        logout
                    </span>
                    <h3>Logout</h3>
                </Link>
            </div>
        </aside>
    )
}

export default Sidenav
