export const getIncidentDetails = (mode) => {
    let incident = {};

    if(mode == 0){
      incident = {
        label: "Reported Incident",
        color: "rgb(194, 214, 142)"
      }  
    } else if(mode == 1){
        incident = {
            label: "SOS Emergency",
            color: "rgb(226, 143, 155)"
          }  
    } else if(mode == 2){
        incident = {
            label: "Medical Emergency",
            color: "rgb(159, 227, 191);"
          } 
    }

    return incident;
};

function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
export function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: name.split(' ') ? `${name.split(' ')[0]?.[0]}${name.split(' ')[1]?.[0]}` : "",
    };
  }

// export const getStatusDetails = (status = "") => {
//     let statusCOde = status.toUpperCase();
//     let statusDetails = {}
//     if(mode == "ASSIGNED"){
//         statusDetails = {
//           label: "OPEN",
//           color: "rgb(194, 214, 142)"
//         }  
//       } else if(mode == ""){
//           statusDetails = {
//               label: "SOS Emergency",
//               color: "rgb(226, 143, 155)"
//             }  
//       }
// }