import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import AdminChatRoom from "../../layouts/adminLayout/adminChatRoom";
import AdminLinks from "../../layouts/adminLayout/adminLinks";
import { useSelector } from "react-redux";

function AdminChat() {
    const { chatRooms, socket } = useSelector((state) => state.adminChat);
    return <>
    <Container>
        <Row className="mt-4">
            <Col md={2}>
                <AdminLinks />
            </Col>
            <Col md={10}>
            {Object.entries(chatRooms).map((chatRoom, index) => (
            <AdminChatRoom key={index} chatRoom={chatRoom} roomIndex={index + 1} socket={socket} socketUser={chatRoom[0]}  />
          ))}
            </Col>
        </Row>
        </Container>
    </>
};


export default AdminChat;