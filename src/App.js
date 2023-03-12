import styled from "styled-components"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { useState } from "react";
import seta from "./assets/Arrow 21.png"

export default function App() {
    const [dadosCompra, setDadosCompra] = useState({});
    const [dadosFilme, setDadosFilme] = useState([]);
    const [voltar, setVoltar] = useState("");

    return (
        <>
        <BrowserRouter>
           <NavContainer voltar={voltar}>
            <Link to={voltar} data-test="go-home-header-btn"> 
            <img src={seta} alt="voltar" />
            </Link>
            CINEFLEX
            </NavContainer>
           <Routes>
                <Route path={"/"} element={<HomePage setVoltar={setVoltar}/>} />
                <Route path={"/sessoes/:idFilme"} element={<SessionsPage setVoltar={setVoltar} />} />
                <Route path="/assentos/:idSessao" element={<SeatsPage setDadosCompra={setDadosCompra}
                dadosFilme={dadosFilme} setDadosFilme={setDadosFilme} setVoltar={setVoltar}/>} />
                <Route path="/sucesso" element={<SuccessPage dadosCompra={dadosCompra} dadosFilme={dadosFilme} setVoltar={setVoltar}/>} />
            </Routes>
        </BrowserRouter>
        </>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: ${props => props.voltar === "" ? "center" : "flex-start" };;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
    img {
        margin-left: 20px;
        margin-right: 67px;
        width: 24px;
        display: ${props => props.voltar === "" ? "none" : "" };
    }
`
