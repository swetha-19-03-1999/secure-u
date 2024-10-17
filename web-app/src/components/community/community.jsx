
import axios from 'axios';
import { useEffect, useState } from 'react';
import './community.css'
import { Col, Container, Row } from 'react-bootstrap';
import AddPostForm from './addpostForm';
import NewsCard from './newscard';
import ControlledRadioButtonsGroup from './pollinginputscard';
const CommunityPage = () => {
    const [newsList, setNewsList] = useState([])
    const [userName, setUserName] = useState("A")
    const [updateUI,setUpdateUI] = useState(false)

    const updateComunityPageUIfunction = ()=>{
        
        setUpdateUI(prev=>!prev)
    }
    
    useEffect(() => {
        const fetchNews = () => {
            axios.get("http://localhost:3001/news").then((res) => {
    
                setNewsList(res.data?.reverse())
            }).catch(e => {
                console.log(e)
            })
        };

        axios.get(`http://localhost:3001/admin-users/${localStorage.getItem("userid")}`).then((res) => {

            setUserName(res.data.user_name)
        }).catch((e) => {
            console.log(e)
        });

        fetchNews();

        const intervalId = setInterval(fetchNews, 10000);

        return () => {
            clearInterval(intervalId);
        }
    }, [updateUI])

    return (

        <div className="grey-bg">
            {/* <div className="bg2 page-div black-text text-center">
                Secure - <span className="text1"> U</span>
            </div> */}
            <div className="skyblue-bg page-div text2  text4 text-center">
                Community - Page
            </div>

            <Container >
                <Row className='news-contaoner-center mt-4'>
                    <Col xs={12} lg={10} className="add-post-header">

                        <p className="user_avatar">
                            {userName.length > 0 ?


                                userName[0].toUpperCase() : "A"}
                        </p>
                        <AddPostForm  updateComunityPageUIfunction={updateComunityPageUIfunction}/>
                    </Col>
                </Row>
                <Row className='news-contaoner-center'>
                    <Col xs={12} lg={10}  >
                        {newsList.length>0 ?
                            newsList.map(eachItem => (
                                eachItem.news_type == "IMAGE" ?
                                    <NewsCard newsDetails={eachItem} /> :
                                    //    <Grid item  xs={11} sm={10} md={7}  lg={7}>
                                    <ControlledRadioButtonsGroup newsDetails={eachItem} />
                                //    </Grid>
                            )

                            ) : <div className="empty-content-cls">
                                {/* <img className="empty-image" src="https://cdni.iconscout.com/illustration/premium/thumb/no-search-result-illustration-download-in-svg-png-gif-file-formats--results-empty-matches-found-zero-query-ecommerce-states-pack-e-commerce-shopping-illustrations-9741054.png?f=webp" alt="no posts available"/> */}
                                <h1>No posts found</h1>
                            </div>
                        }
                    </Col>
                </Row>

            </Container>
        </div>
    )
}
export default CommunityPage