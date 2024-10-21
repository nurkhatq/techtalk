import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Phone, MicOff, Mic } from 'lucide-react'

const AudioCall = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isMuted, setIsMuted] = useState(false)
  const { username, email } = location.state || {}

  useEffect(() => {
    if (!username || !email) {
      navigate('/profile')
    }
  }, [username, email, navigate])

  const handleEndCall = () => {
    navigate('/profile')
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold">Audio Call with {username}</h1>
        <p className="text-gray-600">{email}</p>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={toggleMute}
          className={`rounded-full p-4 ${
            isMuted ? 'bg-red-500' : 'bg-blue-500'
          } text-white hover:opacity-80`}
        >
          {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
        </button>
        <button
          onClick={handleEndCall}
          className="rounded-full bg-red-500 p-4 text-white hover:bg-red-600"
        >
          <Phone size={24} />
        </button>
      </div>
    </div>
  )
}

export default AudioCall