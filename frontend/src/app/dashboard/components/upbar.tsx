/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'

export default function Upbar() {
    const darkModeFnt = () => {
        const darkMode = document.querySelector('.dark-mode');
        if (darkMode) {
            document.body.classList.toggle('dark-mode-variables');
            darkMode.querySelector('span:nth-child(1)')?.classList.toggle('active');
            darkMode.querySelector('span:nth-child(2)')?.classList.toggle('active');
        }
    }

    return (
        <div className="nav" style={
            {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 999,
                padding: '1rem 2%',
                display: 'flex',
                alignItems: 'center',
            }
        }>
            <button id="menu-btn">
                <span className="material-icons-sharp">
                    menu
                </span>
            </button>
            <div className="dark-mode" onClick={darkModeFnt}>
                <span className="material-icons-sharp active">
                    light_mode
                </span>
                <span className="material-icons-sharp">
                    dark_mode
                </span>
            </div>

            <w3m-button size='sm' label='Conectar mi wallet' />

            <div className="profile">
                <div className="info">
                    <p>User Name</p>
                    <small className="text-muted">Admin</small>
                </div>
                <div className="profile-photo" style={{
                    objectFit: 'cover'
                }}>
                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt='Profile' />
                </div>
            </div>

        </div>
    )
}
