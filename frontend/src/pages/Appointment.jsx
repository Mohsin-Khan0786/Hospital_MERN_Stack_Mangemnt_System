import React from 'react'
import Hero from '../Components/Hero'
import AppointmentForm from '../Components/AppointmentForm'
const Appointment = () => {
  return (
    <>
    <Hero title={'Book an appointment with our expert doctors '} imageurl={'/Hero-img.png'} />
    <AppointmentForm />
    </>
  )
}

export default Appointment