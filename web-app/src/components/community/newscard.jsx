import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function NewsCard(props) {
  const [expanded, setExpanded] = React.useState(false);
  const {newsDetails}=props
  const {news_id,user_id,news_image="",news_title="Newsd title",short_description="",long_description="",time_stamp,user_name=""}=newsDetails
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getformattedDate = (dateStr) => {

    const date = new Date(dateStr);

    // Extract the day, month, and year
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear().toString().slice(-2);

    // Extract the time in HH:MM AM/PM format
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12 || 12).toString();

    const formattedDate = `${day} ${month} ${year} , ${formattedHours}:${minutes}${ampm}`;
    return formattedDate
}

  return (
    // <Card sx={{ maxWidth: 345 }}>
    <Card className="paddingcls">
      <CardHeader 
      className='text-start '
        avatar={
          <Avatar sx={{ bgcolor: '#3fb6d3' }} aria-label="recipe">
            {user_name[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={news_title}
        subheader={getformattedDate(time_stamp)}
      />
      <CardMedia
        component="img"
        // height="194"
        image={"http://localhost:3001/"+news_image}
        alt={news_title}
      />
      <CardContent>
        <Typography variant="body2" className="text-start" color="text.secondary">
         {short_description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      
        <p>Veiw full details</p>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className="text-start">
          <Typography >
          {news_title}
          </Typography>
          <Typography paragraph>
            {long_description}
          </Typography>
       
        </CardContent>
      </Collapse>
    </Card>
  );
}