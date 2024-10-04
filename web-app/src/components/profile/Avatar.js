import React from 'react'
import { stringAvatar } from '../../helper'
import Avatar from '@mui/material/Avatar';

function AvatarImg({ image, name, size }) {

  let sx = size ? { width: size, height: size } : {  };

  return (
    
        image ? 
        <Avatar
            className="profile-image"
            alt={"profile images"}
            src={"http://localhost:3001/" + image}
            sx={sx}
        />
        :
        <Avatar {...stringAvatar(name)} />
    
  )
}

export default AvatarImg