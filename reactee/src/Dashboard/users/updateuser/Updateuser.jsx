
// import { useState, useEffect } from "react"
// import axios from "axios"
// import "./updateuser.css"

// import Form from "../components/form/Form";


// export default function updateuser() {




//     const [inputform, setinputform] = useState({
//         name: "",
//         email: "",
//         password: "",
//         repetpassword: ""
//     })






//     const id = window.location.pathname.split("/").slice(-1)[0]

//     useEffect(() => {

//         axios.get(`https://tarmeezacademy.com/api/v1/users/${id}`)
//             .then(function (response) {
//                 console.log(response.data.data)
//                 setinputform({
//                     ...inputform,
//                     name: response.data.data.name,
//                     email: response.data.data.email
//                 });
//             })
//             .catch(function (error) {
//                 console.log(error)
//             })



//     }, [])




//     return (


//         <div className="update" >
//             <h1>Update User</h1>
//             <Form 
//             button= "Update"
//              name= {inputform.name} 
//              email={inputform.email}
//              localStorage={false}
//              endpoint="/dashboard/user"
//              />
//         </div>









//     )

// }

import "./updateuser.css"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import Swal from "sweetalert2";
const LoadingIcon = () => (
    <svg className="svgg" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><circle cx="12" cy="2" r="0" fill="white"><animate attributeName="r" begin="0" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="white" transform="rotate(45 12 12)"><animate attributeName="r" begin="0.125s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="white" transform="rotate(90 12 12)"><animate attributeName="r" begin="0.25s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="white" transform="rotate(135 12 12)"><animate attributeName="r" begin="0.375s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="white" transform="rotate(180 12 12)"><animate attributeName="r" begin="0.5s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="white" transform="rotate(225 12 12)"><animate attributeName="r" begin="0.625s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="white" transform="rotate(270 12 12)"><animate attributeName="r" begin="0.75s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="white" transform="rotate(315 12 12)"><animate attributeName="r" begin="0.875s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle></svg>

);
export default function updateuser() {

    const [buttonLoading, setButtonLoading] = useState(false);
    const [buttonhiden, setbuttonhiden] = useState(false)
    const [accept, setaccept] = useState(false)
    const [inputform, setinputform] = useState({
        name: "",
        email: "",
        password: "",
        repetpassword: ""
    })

    const id = window.location.pathname.split("/").slice(-1)[0]

    useEffect(() => {

        axios.get(`https://tarmeezacademy.com/api/v1/users/${id}`)
            .then(function (response) {
                console.log(response.data.data)
                setinputform({
                    ...inputform,
                    name: response.data.data.name,
                    email: response.data.data.email
                });
            })
            .catch(function (error) {
                console.log(error)
            })



    }, [])


    let flag = true

    function handelsubmit(e) {
        e.preventDefault()
        setaccept(true)
        if (inputform.name === "" || !isValidEmail(inputform.email) || inputform.password.length < 8 || inputform.password !== inputform.repetpassword) {

            flag = false

        }
        else {
            flag = true
        }
        if (flag) {

            setbuttonhiden(true)
            setButtonLoading(true)
            axios.post('https://tarmeezacademy.com/api/v1/register', {
                username: inputform.name,
                name: inputform.name,
                email: inputform.email,
                password: inputform.password,

            })
                .then(function (response) {

                    console.log(response);
                    window.location = "/dashboard/user"
                })
                .catch(function (error) {
                    console.log(error);
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        title: `<svg class="ico" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><path fill="#f70202" fill-rule="evenodd" d="M8.6 1c1.6.1 3.1.9 4.2 2c1.3 1.4 2 3.1 2 5.1c0 1.6-.6 3.1-1.6 4.4c-1 1.2-2.4 2.1-4 2.4s-3.2.1-4.6-.7s-2.5-2-3.1-3.5S.8 7.5 1.3 6c.5-1.6 1.4-2.9 2.8-3.8C5.4 1.3 7 .9 8.6 1m.5 12.9c1.3-.3 2.5-1 3.4-2.1c.8-1.1 1.3-2.4 1.2-3.8c0-1.6-.6-3.2-1.7-4.3c-1-1-2.2-1.6-3.6-1.7c-1.3-.1-2.7.2-3.8 1S2.7 4.9 2.3 6.3c-.4 1.3-.4 2.7.2 4q.9 1.95 2.7 3c1.2.7 2.6.9 3.9.6M7.9 7.5L10.3 5l.7.7l-2.4 2.5l2.4 2.5l-.7.7l-2.4-2.5l-2.4 2.5l-.7-.7l2.4-2.5l-2.4-2.5l.7-.7z" clip-rule="evenodd"/></svg> ${error.response.data.message}   `,
                    });


                })
                .finally(function () {
                    console.log(inputform)

                    setbuttonhiden(false)
                    setButtonLoading(false)

                });

        }


    }
    function handelhidden() {
        setaccept(false)

    }

    function isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }
    return (


        <div className="update">
            <h1>Update User</h1>
            <div className="container"
                onClick={handelhidden}
            >

                <form onSubmit={handelsubmit}>

                    <label htmlFor="name" >Name :</label>
                    <input
                        onClick={(e) => {
                            e.stopPropagation()
                        }}
                        onChange={(e) => {
                            setinputform({ ...inputform, name: e.target.value })
                        }}
                        value={inputform.name}
                        id="name" type="text" placeholder="Name ..." />
                    <p className={`acceptname ${inputform.name === "" && accept ? "show-message" : ""}`}> please fill out this field name!</p>


                    <label htmlFor="email" >Email :</label>
                    <input
                        onClick={(e) => {
                            e.stopPropagation()
                        }}
                        onChange={(e) => {
                            setinputform({ ...inputform, email: e.target.value })
                        }}
                        value={inputform.email}


                        id="email" type="text" placeholder="Email ..." />
                    <p className={`acceptemail ${!isValidEmail(inputform.email) && accept ? "show-message" : ""}`}> Please enter a valid email address!</p>


                    <label htmlFor="password" >password :</label>
                    <input
                        onClick={(e) => {
                            e.stopPropagation()
                        }}

                        onChange={(e) => {
                            setinputform({ ...inputform, password: e.target.value })

                        }}
                        value={inputform.password}


                        id="password" type="password" placeholder="password ..." />
                    <p className={`password ${inputform.password.length < 8 && accept ? "show-message" : ""}`}> Password must be more than 8 characters! </p>



                    <label htmlFor="repeatpassword" >Repeat password :</label>
                    <input
                        onClick={(e) => {
                            e.stopPropagation()
                        }}
                        onChange={(e) => {
                            setinputform({ ...inputform, repetpassword: e.target.value })

                        }}
                        value={inputform.repetpassword}

                        id="repeatpassword" type="password" placeholder="Repeat password ..." />
                    <p className={`acceptpassword ${(inputform.password !== inputform.repetpassword) && accept ? "show-message" : ""}`}>Passwords do not match!</p>
                    <button disabled={buttonhiden} >{buttonLoading ? <LoadingIcon /> : "Update"}</button>

                </form>





            </div>
        </div>











    )

}


