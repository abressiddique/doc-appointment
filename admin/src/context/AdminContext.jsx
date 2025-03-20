import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')
    const [doctors, setDoctors] = useState([])
    const [apointments, setApointments] = useState([])
    const [dashData, setDashData] = useState(false)

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllDoctors = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/admin/all-doctors', { headers: { aToken } })
            if (response.data.succes) {
                setDoctors(response.data.doctor)
                console.log(response.data);
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const changeAvailability = async (docId) => {

        try {
            const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { docId }, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                getAllDoctors()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getAllApointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/apointments', { headers: { aToken } })
            if (data.succes) {
                setApointments(data.apointments)
                console.log(data.apointments)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    const cancelApointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment', { appointmentId }, { headers: { aToken } })
            console.log(data);

            if (data.succes) {
                toast.success(data.message)
                getAllApointments()
            } else {
                toast.error(data.message)
                console.log(data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getDashData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { aToken } })
            if (data.succes) {
                setDashData(data.dashData)
                console.log(data.dashData)
            } else {
                toast.error(data.message)
                console.log(data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const value = {
        aToken, setAToken, backendUrl, doctors, getAllDoctors, changeAvailability, apointments, setApointments, getAllApointments, cancelApointment,getDashData,dashData
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )

}

export default AdminContextProvider