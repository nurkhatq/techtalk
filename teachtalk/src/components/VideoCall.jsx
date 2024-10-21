import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Video, MicOff, Mic, Camera, CameraOff } from 'lucide-react'

const VideoCall = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isMuted, setIsMuted] = useState(false)
  const [isCameraOff, setIsCameraOff] = useState(false)
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

  const toggleCamera = () => {
    setIsCameraOff(!isCameraOff)
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold">Video Call with {username}</h1>
        <p className="text-gray-600">{email}</p>
      </div>
      <div className="mb-8 h-64 w-96 bg-gray-300">
        {isCameraOff ? (
          <div className="flex h-full items-center justify-center">
            <CameraOff size={48} className="text-gray-500" />
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <Camera size={48} className="text-gray-500" />
          </div>
        )}
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
          onClick={toggleCamera}
          className={`rounded-full p-4 ${
            isCameraOff ? 'bg-red-500' : 'bg-blue-500'
          } text-white hover:opacity-80`}
        >
          {isCameraOff ? <CameraOff size={24} /> : <Camera size={24} />}
        </button>
        <button
          onClick={handleEndCall}
          className="rounded-full bg-red-500 p-4 text-white hover:bg-red-600"
        >
          <Video size={24} />
        </button>
      </div>
    </div>
  )
}

export default VideoCall