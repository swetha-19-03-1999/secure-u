import React from 'react'
import { stringAvatar } from '../../helper'
import Avatar from '@mui/material/Avatar';

function AvatarImg({ image, name }) {
  return (
    
        image ? 
        <Avatar
            className="profile-image"
            alt={"profile images"}
            src={"http://localhost:3001/" + image}
            // sx={{ width: 56, height: 56 }}
        />
        :
        <Avatar {...stringAvatar(name)} />
    
  )
}

export default AvatarImg