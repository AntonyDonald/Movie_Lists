import React from 'react'
import { Row, Col } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaSearch } from 'react-icons/fa'

const Header = () => {

    const isValidUser = JSON.parse(localStorage.getItem("tokenId"));

    return (
        <div className='HeaderView'>
            <Row>
                <Col lg={8} className='text-start'>
                    <img className='HeaderImg' src={require("../assets/img/toppng.png")} alt="" />
                </Col>

                {!!isValidUser && (
                    <Col lg={4} style={{ display: 'grid' }}>
                        <div className='HeaderFunctionView'>
                            <div>
                                <InputGroup>
                                    <input placeholder='Search Movies' className='HeaderInput' type="text" name="" id="" />
                                    <InputGroup.Text id="basic-addon1" style={{ color: 'white', background: '#d97070' }}>
                                        <FaSearch />
                                    </InputGroup.Text>
                                </InputGroup>
                            </div>
                            <div>
                                <span className='text-white' style={{ fontSize: '20px' }}>Log Out</span>
                            </div>

                        </div>

                    </Col>
                )}

                
            </Row>

        </div>
    )
}

export default Header