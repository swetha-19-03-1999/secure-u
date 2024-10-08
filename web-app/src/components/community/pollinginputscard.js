import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Grid from '@mui/material/Grid';
import Sheet from '@mui/joy/Sheet';
import BasicPie from './pollcard';
import axios from 'axios';
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

export default function ControlledRadioButtonsGroup(props) {
    const { newsDetails } = props;
    const [expanded, setExpanded] = React.useState(false);
    const loggedUser = localStorage.getItem("userid")
    const { news_id,poll_data, users_engaged, user_id, user_name, news_image, news_title, short_description, long_description, time_stamp } = newsDetails
    let parsedPollData = JSON.parse(poll_data)
    let parsedUsersEngaed = JSON.parse(users_engaged)
    const [value, setValue] = React.useState('female');
    const [usersEngaged, setusersEngaged] = React.useState(parsedUsersEngaed);
    const [parsedPollDataState, setParsedPollDataState] = React.useState(parsedPollData);
    const pollData = [
        { "id": 0, "value": 0, "label": "series A" },
        { "id": 1, "value": 0, "label": "series B" },
        { "id": 2, "value": 0, "label": "series C" },
        { "id": 3, "value": 0, "label": "series C" },
    ]
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
    // let usersEngaged = [{ "user_id": 2, "selected_value": 2 }]
    let user_reacted = false
    // const pollData = [{value:"female",label:"Female"},{value:"male",label:"male"},{value:"child",label:"Child"}]
    const handleChange = (event) => {
        // const selectedOptionId = int(event.target.value) 
        setValue(event.target.value);
        setusersEngaged(pres => ([...pres, { "user_id": loggedUser, "selected_value": event.target.value }]))
        const postingUserEngaed = [...usersEngaged, { "user_id": loggedUser, "selected_value": event.target.value }]

        const selectedOptionIndex = parsedPollData.findIndex(option => option.id == event.target.value); // Find the index of the selected option

        if (selectedOptionIndex !== -1) { // Check if a valid option is selected
            parsedPollData[selectedOptionIndex].value++; // Increment the value for the selected option
            setParsedPollDataState(parsedPollData)
        }

        const postingPollData = []
        let jsonObj = {
            "news_type": "POLE",
            "poll_data": JSON.stringify(parsedPollData),
            "users_engaged": JSON.stringify(postingUserEngaed)
        }
        axios.put(`http://localhost:3001/news-poll/${news_id}`, jsonObj).then(
            res => {
                console.log("resoponse posted")
            }
        ).catch(e => { console.log(e) })
    };

    return (
        //         <Grid container xs={12} className="d-flex justify-content-center" >
        //             <Grid item className="text-start " style={{fontWeight:'800'}} xs={10}>
        //                {news_title}
        //             </Grid>
        //             <Grid item xs={8}>
        //             {usersEngaged.filter(each => each.user_id == 1).length > 0 ? <BasicPie  pollData={parsedPollDataState}/> :
        //                 <FormControl className="text-start">
        //                     <FormLabel>Show Your response </FormLabel>
        //                     <RadioGroup
        //                         defaultValue="female"
        //                         name="controlled-radio-buttons-group"
        //                         value={value}
        //                         onChange={handleChange}
        //                         sx={{ my: 1 }}

        //                     >{
        //                         parsedPollDataState.map((each) =>

        //                                 <Radio
        //                                     slotProps={{
        //                                         label: ({ checked }) => ({
        //                                             sx: {
        //                                                 fontWeight: 'lg',
        //                                                 fontSize: 'md',
        //                                                 color: checked ? 'text.primary' : 'text.secondary',
        //                                             },
        //                                         }),
        //                                         action: ({ checked }) => ({
        //                                             sx: (theme) => ({
        //                                                 ...(checked && {
        //                                                     '--variant-borderWidth': '2px',
        //                                                     '&&': {
        //                                                         // && to increase the specificity to win the base :hover styles
        //                                                         borderColor: theme.vars.palette.primary[500],
        //                                                     },
        //                                                 }),
        //                                             }),
        //                                         }),
        //                                     }}
        //                                     value={each.id} label={each.label} />

        //                             )
        //                         }


        //                     </RadioGroup>
        //                 </FormControl>

        //             }
        // </Grid>

        //         </Grid>
        <Card className="paddingcls">
            <CardHeader
                className='text-start '
                avatar={
                    <Avatar sx={{ bgcolor: '#3fb6d3 '}} aria-label="recipe">
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
            {/* <CardMedia
                component="img"
                // height="194"
                image={news_image}
                alt={news_title}
            /> */}
            <CardContent>
            <Typography variant="body2" className="text-start "  style={{fontWeight:'800'}} color="text.secondary">
                    {news_title}
                </Typography>
                <Grid container xs={12} className="d-flex justify-content-center" >
                
                 
                <Grid item xs={8}>
                            {usersEngaged.filter(each => each.user_id == localStorage.getItem("userid")).length > 0 ? <BasicPie  pollData={parsedPollDataState}/> :
                        <FormControl className="text-start">
                            {/* <FormLabel style={{fontWeight:'800'}} >Show Your response </FormLabel> */}
                            <RadioGroup
                              
                                name="controlled-radio-buttons-group"
                                value={value}
                                onChange={handleChange}
                                sx={{ my: 1 }}

                            >{
                                parsedPollDataState.map((each) =>

                                        <Radio
                                            slotProps={{
                                                label: ({ checked }) => ({
                                                    sx: {
                                                        fontWeight: 'lg',
                                                        fontSize: 'md',
                                                        color: checked ? 'text.primary' : 'text.secondary',
                                                    },
                                                }),
                                                action: ({ checked }) => ({
                                                    sx: (theme) => ({
                                                        ...(checked && {
                                                            '--variant-borderWidth': '2px',
                                                            '&&': {
                                                                // && to increase the specificity to win the base :hover styles
                                                                borderColor: theme.vars.palette.primary[500],
                                                            },
                                                        }),
                                                    }),
                                                }),
                                            }}
                                            value={each.id} label={each.label} />

                                    )
                                }


                            </RadioGroup>
                        </FormControl>

                    }
                     </Grid>
                    </Grid>
            </CardContent>
            <CardActions disableSpacing>

                <p>View full details</p>
                <ExpandMore
                    expand={true}
                    onClick={handleExpandClick}
                    aria-expanded={true}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={true} timeout="auto" unmountOnExit>
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
