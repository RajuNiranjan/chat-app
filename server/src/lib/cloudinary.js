import { v2 as cloudinary } from 'cloudinary'
import { ENV_VAR } from './env.js'

cloudinary.config({
    cloud_name: ENV_VAR.CLOUDINARY_CLOUD_NAME,
    api_key: ENV_VAR.CLOUDINARY_API_KEY,
    api_secret: ENV_VAR.CLOUDINARY_API_SECRET
})

export default cloudinary