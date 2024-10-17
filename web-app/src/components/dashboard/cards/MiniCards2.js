import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { getIncidentDetails } from "../../../helper";
import AvatarImg from "../../profile/Avatar";

function MiniCards({ alertDetails, onViewClick }) {

  let {
    user_profile_pic,
    alert_id,
    user_name,
    user_mobile_number = "Not Available",
    user_emergency_contact_name = "Not available",
    user_emergency_contact_number = "Not Available",
    user_blood_group = "N/A",
    user_medical_condition = "N/A",
    special_requirements = "N/A",
    assigned_contact,
    assigned_name = "N/A",
    assigned_first_name = "N/A",
    assigned_last_name = "",
    assigned_to = 0,
    status = "open",
    location,
    latitude,
    longitude,
    alert_type = "theft",
    timestamp,
    incident_mode,
} = alertDetails;

const incident = getIncidentDetails(incident_mode);




    return (
        <Card sx={{ maxWidth: 300, margin: "10px", padding: 0, background: incident.color, position: 'relative !important' }}>
            <CardActionArea>
                <Typography gutterBottom variant="h5" component="center" style={{textDecoration: 'underline', marginTop: 10}}>
                    {incident.label}
                </Typography>
              <div style={{ display: "flex", alignItems: 'center', justifyContent: 'space-evenly' }}>
                <div style={{ marginLeft: 30 }}>
                  <AvatarImg image={user_profile_pic} name={user_name} size={80} />
                </div>
                <div>
                  <CardContent style={{ cursor: "default" }}>
                      <Typography
                          variant="body1"
                          sx={{ color: "text.primary" }}
                          style={{ textTransform: "capitalize" }}
                      >
                          Name: {user_name}
                      </Typography>
                      <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                          style={{ textTransform: "capitalize" }}
                      >
                          Phone: {user_mobile_number}
                      </Typography>
                      <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                          style={{ textTransform: "capitalize" }}
                      >
                          Security Assigned: {assigned_first_name +
                                        " " +
                                        assigned_last_name}
                      </Typography>
                      <Typography
                          variant="body1"
                          sx={{ color: "text.secondary" }}
                          style={{ textTransform: "capitalize" }}
                      >
                          Status: {status}
                      </Typography>
                      {/* <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                          style={{ textTransform: "capitalize" }}
                      >
                          Status: {status}
                      </Typography> */}
                  </CardContent>
                </div>
              </div>
            </CardActionArea>
            <CardActions>
                <Button style={{position: "absolute", bottom: 0, right: 10}} size="medium" color="primary" onClick={() => onViewClick(alertDetails)}>
                    View
                </Button>
            </CardActions>
        </Card>
    );
}

export default MiniCards;
