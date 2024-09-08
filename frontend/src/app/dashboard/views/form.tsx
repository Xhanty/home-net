import React from 'react'
import '../../css/form.css'

export default function Form() {
    return (
        <form action="">
            <h2>Formulario DEMO</h2>
            <div className="form-group">

                <div className="field">
                    <label htmlFor="">Course Name</label>
                    <input type="text" placeholder="Course Name" />
                </div>

            </div>

            <div className="form-group two">

                <div className="field">
                    <label htmlFor="">Nombre</label>
                    <input type="text" placeholder="Nombre" />
                </div>

                <div className="field">
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder="Email" />
                </div>

            </div>

            <div className="form-group three">

                <div className="field">
                    <label htmlFor="">Contraseña</label>
                    <input type="password" placeholder="Contraseña" />
                </div>

                <div className="field">
                    <label htmlFor="">Confirmar contraseña</label>
                    <input type="password" placeholder="Confirmar contraseña" />
                </div>

                <div className="field">
                    <label htmlFor="">Rol</label>
                    <select name="" id="">
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </div>

            </div>

            <div className="submit-btn">
                <button>Submit</button>
                <button className="secondary">Reset</button>
            </div>

        </form>
    )
}
