import React, { useState } from 'react'
import { signInSvg } from '../assets/Svg'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { provider , auth  } from '../config/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { signInBtn } from '../utlite/loginSlice'
import toast from 'react-hot-toast'
import { activeBtn } from '../utlite/ActiveSlice'
function SingIn() {


    const dispatch = useDispatch()
   const navigate = useNavigate()
    const handleSingInData = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            const user = result.user
            const userData = {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
            };
            dispatch(signInBtn({
                type: "login/signInBtn",
                payload: userData,
            }))
            toast.success("login succes 👍")
          navigate("/")
            dispatch(activeBtn("Home"))
        } catch (error) {
            console.error("Error during sign-in:", error);
            toast.error("try agin")
        }
    }

    return (
        <div onClick={handleSingInData}>
            <Link className='px-[15px] flex items-center border-[1px] hover:bg-[#DEF1FF]  dark:hover:bg-[#3D3D3D] dark:border-gray-700 hover:border-[#DEF1FF] border-[#ccc] rounded-full h-[34px]'>
                <div>
                    <div className='mr-[6px] -ml-[6px]'>
                        <span className='fill-[#065fd4] dark:fill-white'>
                            {signInSvg}
                        </span>
                    </div>
                </div>
                <div>
                    <span className='text-[#065fd4] text-sm font-roboto font-medium dark:text-white'>Sign in</span>
                </div>
            </Link>
        </div>
    )
}

export default SingIn