import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { FaRegPlayCircle, FaArrowCircleLeft } from 'react-icons/fa'
import Pagination from 'react-bootstrap/Pagination';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const Home = ({ showLoginToast, setShowLoginToast }) => {

    const [movieData, setMovieData] = useState([]);
    const [overallMoviewData, setOverallMoviewData] = useState([]);
    const [active, setActive] = useState(1);

    const [viewMovie, setViewMovie] = useState(false);

    const [thisMovieInfo, setThisMovieInfo] = useState({})


    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get("https://api.themoviedb.org/4/list/1?api_key=f727b52c3484a36403a7bc6365c3cf4a");
                if (response) {
                    console.log(response.data.results);
                    setOverallMoviewData(response.data.results)
                    getDataForThisPage(1, response.data.results)
                }
            }
            catch (err) {
                console.log("Err : ", err)
            }
        }

        fetchItems()
    }, []);



    const getDataForThisPage = (id, Data) => {
        const dataStart = (parseInt(id - 1) * 12);
        const dataEnd = dataStart + 11;

        console.log("data Start = ", dataStart);
        console.log("data end = ", dataEnd);

        const filterDetails = Data.filter((obj, idx) => idx >= dataStart && idx <= dataEnd);

        setMovieData(filterDetails)

    }

    useEffect(() => {
        if (overallMoviewData.length) {
            getDataForThisPage(active, overallMoviewData)
        }
    }, [active])

    const paginationNumberItems = [];
    for (let number = 1; number <= 10; number++) {
        paginationNumberItems.push(
            <Pagination.Item onClick={() => setActive(number)} key={number} active={number === active}>
                {number}
            </Pagination.Item>,
        );
    }

    const handlePrev = () => {
        setActive(prev => prev === 1 ? 1 : prev - 1)
    }

    const handleNext = () => {
        setActive(prev => prev === (paginationNumberItems.length) ? paginationNumberItems.length : prev + 1)
    }

    const handleViewMovie = (id) => {
        setThisMovieInfo(overallMoviewData.find(data => data.id === id));
        setViewMovie(true)
    }

    return (
        <div className="MovieListContainer">
            <ToastContainer position="top-end">
                <Toast delay={5000} autohide bg="success" show={showLoginToast} onClose={() => setShowLoginToast(false)}>
                    <Toast.Header>
                        <strong className="me-auto">Success</strong>
                    </Toast.Header>
                    <Toast.Body>Logged in Successfully.</Toast.Body>
                </Toast>
            </ToastContainer>

            {!viewMovie ? (
                !!movieData ? (
                    <Fragment>
                        <div className='BannerImg'>
                            <h3>Welcome to Our movie site</h3>
                            <span className='SpecialText'>Our Special <span style={{color : '#df1135'}}>Movies</span> </span>
                            <p className='LoremIpsumText' style={{width : '440px'}}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industrioy. 
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                when an unknown.
                            </p>
                            <p className='ReadMoreLink'>Read More</p>
                        </div>
                        <Row>
                            {movieData?.length ? (
                                movieData.map((data) => (
                                    <Fragment key={data.id}>
                                        <Col lg={3}>
                                            <div className='MovieListSection'>
                                                <img className='PosterImg' src={`https://image.tmdb.org/t/p/w220_and_h330_face/${data.poster_path}`} alt={data.original_title} />
                                                <div className='MovieInfoSection'>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                                                        <p className='Originaltitle text-start' onClick={() => handleViewMovie(data.id)} title={data.original_title}>{(data.original_title).slice(0, 25)}</p>
                                                        <div className='text-start'>
                                                            <img src={require("../assets/img/Star.png")} alt="" />
                                                            <img src={require("../assets/img/Star.png")} alt="" />
                                                            <img src={require("../assets/img/Star.png")} alt="" />
                                                            <img src={require("../assets/img/Star.png")} alt="" />
                                                            <img src={require("../assets/img/Star.png")} alt="" />
                                                        </div>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <FaRegPlayCircle className='PlayIcon' />
                                                    </div>
                                                </div>

                                            </div>
                                        </Col>
                                    </Fragment>
                                ))
                            ) : (
                                <h1 className='text-white'>No movies</h1>
                            )}
                        </Row>
                        <Row style={{ margin: '20px 5px 75px 5px' }}>
                            <Col lg={12} className='text-center PaginationView'>
                                <Pagination>
                                    <Pagination.Prev onClick={handlePrev} />
                                    {paginationNumberItems}
                                    <Pagination.Next onClick={handleNext} />
                                </Pagination>
                            </Col>
                        </Row>
                    </Fragment>
                ) : null
            ) : (
                <Fragment>
                    <Row className='MovieViewContainer'>
                        <Col lg={5}>
                            <Row>
                                <Col lg={12}>
                                    <FaArrowCircleLeft onClick={() => setViewMovie(false)} style={{ color: "#107ddb", fontSize: '30px', cursor: 'pointer' }} />
                                </Col>
                                <Col lg={12} style={{ fontSize: '19px', fontWeight: 'bold', margin: '10px 0px 10px 0px' }}>
                                    {thisMovieInfo.original_title}
                                </Col>
                                <Col lg={12} style={{ margin: '10px 0px 10px 0px' }}>
                                    Rating : {thisMovieInfo.vote_average} / 10
                                </Col>
                                <Col lg={12} style={{ margin: '10px 0px 10px 0px' }}>
                                    {thisMovieInfo.overview}
                                </Col>
                                <Col lg={12} style={{ margin: '10px 0px 10px 0px' }}>
                                    Release Date : {thisMovieInfo.release_date}
                                </Col>
                                <Col lg={12} style={{ margin: '10px 0px 10px 0px' }}>
                                    Orginal Language {thisMovieInfo.original_language}
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={7}>
                            <div className='ImgInView' style={{ background: `url(https://image.tmdb.org/t/p/w220_and_h330_face/${thisMovieInfo.backdrop_path})` }}>

                            </div>
                            {/* <img className='ImgInView' src={`https://image.tmdb.org/t/p/w220_and_h330_face/${thisMovieInfo.backdrop_path}`} alt="" /> */}
                        </Col>
                    </Row>
                </Fragment>
            )}


        </div>
    )
}

export default Home