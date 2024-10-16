import React from 'react'
import { stringAvatar } from '../../helper'
import Avatar from '@mui/material/Avatar';

function AvatarImg({ image, name, size }) {

  let sx = size ? { width: size, height: size, margin: 0 } : {  margin: 0 };
  return (
    
        image ? 
        <Avatar
            className="profile-image"
            alt={"profile images"}
            src={"http://localhost:3001/" + image}
            sx={sx}
        />
        : (name ? <Avatar {...stringAvatar(name)} /> : null)
        
    
  )
}

export default AvatarImg