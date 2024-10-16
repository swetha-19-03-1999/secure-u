import * as React from "react";
import "./newscard.css";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
// import Avatar from '@mui/material/Avatar';
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import SendIcon from "@mui/icons-material/Send";
import CommentIcon from "@mui/icons-material/Comment";
import AvatarImg from "../profile/Avatar";
import axios from "axios";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function NewsCard(props) {
    const { newsDetails } = props;
    const {
        news_id,
        user_id,
        news_image = "",
        news_title = "Newsd title",
        short_description = "",
        long_description = "",
        time_stamp,
        user_name = "",
        user_names = "",
        user_img = "",
        likes = [],
        comments = [],
    } = newsDetails;

    const [expanded, setExpanded] = React.useState(
        comments?.length ? true : false
    );

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const getformattedDate = (dateStr) => {
        const date = new Date(dateStr);

        // Extract the day, month, and year
        const day = date.getDate().toString().padStart(2, "0");
        const month = date.toLocaleString("en-US", { month: "long" });
        const year = date.getFullYear().toString().slice(-2);

        // Extract the time in HH:MM AM/PM format
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        const formattedHours = (hours % 12 || 12).toString();

        const formattedDate = `${day} ${month} ${year} , ${formattedHours}:${minutes}${ampm}`;
        return formattedDate;
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const open = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
    };

    const onLikeClick = () => {
        // axios.post("http://localhost:3001/comment", { user_id: 21, news_id: 35, comment_text: "Test Comment" }).then(res => {
        //     console.log(res, ">>>>>>>>>");
        //     alert("Like Worked");
        // }
        // ).catch(e => {
        //     console.log(e)
        //     alert("Like Not worked");
        // })
    };

    return (
        // <Card sx={{ maxWidth: 345 }}>
        <Card className="paddingcls">
            <CardHeader
                className="text-start "
                avatar={
                    <AvatarImg
                        sx={{ bgcolor: "#3fb6d3" }}
                        aria-label="recipe"
                        name={user_names}
                        image={user_img}
                    >
                        {user_names[0]}
                    </AvatarImg>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon
                            aria-controls={open ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClick}
                        />
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                "aria-labelledby": "basic-button",
                            }}
                        >
                            {/* <MenuItem onClick={handleClose}>Edit Post</MenuItem> */}
                            <MenuItem onClick={handleClose}>
                                Delete Post
                            </MenuItem>
                            <MenuItem onClick={handleClose}>Report</MenuItem>
                        </Menu>
                    </IconButton>
                }
                title={
                    <b style={{ margin: 0, textTransform: "capitalize" }}>
                        {user_names}
                    </b>
                }
                subheader={
                    <>
                        <p style={{ margin: 0, fontSize: 14 }}>{news_title}</p>
                        <p style={{ margin: 0, fontSize: 12, color: "grey" }}>
                            {getformattedDate(time_stamp)}
                        </p>
                    </>
                }
            />
            <div className="post-card-media-wrapper">
                <CardMedia
                    component="img"
                    className="post-card-media"
                    // height="194"
                    image={"http://localhost:3001/" + news_image}
                    alt={news_title}
                />
                {/* <div
                    style={{ width: "100%", marginTop: 10, cursor: "pointer" }}
                >
                    <Stack direction="row" spacing={3}>
                        <div onClick={onLikeClick}>
                            <ThumbUpOffAltIcon />
                        </div>
                        <CommentIcon />
                        <SendIcon />
                    </Stack>
                </div> */}
            </div>
            <CardContent>
                <Typography>{news_title}</Typography>
                <Typography paragraph>{long_description}</Typography>
                <Typography
                    variant="body2"
                    className="text-start"
                    color="text.secondary"
                >
                    {short_description}
                </Typography>
                <Typography
                    variant="body2"
                    className="text-start"
                    color="text.secondary"
                    sx={{ marginTop: '10px !important' }}
                >
                    Post has {likes?.length ? likes.length : "0"} likes
                </Typography>
                {comments?.length != 0 ? (
                    <>
                        <CardActions disableSpacing>
                            <p>View Comments</p>
                            <ExpandMore
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </ExpandMore>
                        </CardActions>
                        <Collapse in={!!expanded} timeout="auto" unmountOnExit>
                            <CardContent className="text-start" sx={{}}>
                                {comments?.length ? (
                                    comments?.map((eachComment) => {
                                        var {
                                            comment_id,
                                            user_img: ui,
                                            user_name: un,
                                            time,
                                            comment_text,
                                        } = eachComment;
                                        return (
                                            <div style={{ margin: "10" }}>
                                                <div
                                                    key={comment_id}
                                                    style={{
                                                        margin: "10px 0",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        // justifyContent: 'space-evenly',
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            marginRight: 10,
                                                        }}
                                                    >
                                                        <AvatarImg
                                                            sx={{
                                                                bgcolor:
                                                                    "#3fb6d3",
                                                            }}
                                                            aria-label="recipe"
                                                            name={un}
                                                            image={ui}
                                                        >
                                                            {user_names[0]}
                                                        </AvatarImg>
                                                    </div>
                                                    <div style={{ flex: 1 }}>
                                                        <p
                                                            style={{
                                                                margin: "0 5px 2px 0",
                                                                fontSize: 14,
                                                                color: "grey",
                                                            }}
                                                        >
                                                            <span
                                                                style={{
                                                                    textTransform:
                                                                        "capitalize",
                                                                    marginRight: 5,
                                                                }}
                                                            >
                                                                {un}
                                                            </span>
                                                            <span
                                                                style={{
                                                                    fontSize: 12,
                                                                    color: "#d1d1d1",
                                                                }}
                                                            >
                                                                {time}
                                                            </span>
                                                        </p>
                                                        <p
                                                            style={{
                                                                margin: 0,
                                                                fontSize: 14,
                                                            }}
                                                        >
                                                            {comment_text}
                                                        </p>
                                                    </div>
                                                </div>
                                                {/* <div style={{ flex: 1 }}>
                          </div> */}
                                            </div>
                                        );
                                    })
                                ) : (
                                    <Typography
                                        variant="body2"
                                        className="text-start"
                                        color="text.secondary"
                                    >
                                        No Comments for this post
                                    </Typography>
                                )}
                            </CardContent>
                        </Collapse>
                    </>
                ) : (
                    <Typography
                        variant="body2"
                        className="text-start"
                        color="text.secondary"
                    >
                        No Comments for this post
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
}
