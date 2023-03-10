import styled from "styled-components"
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { IND_BORDA, IND_FUNDO, DIS_BORDA, DIS_FUNDO, SEL_BORDA,  SEL_FUNDO} from "./colors";
import Seat from "./Seat";

export default function SeatsPage() {
    const { idSessao } = useParams();
    const [assentos, setAssentos] = useState([]);

	useEffect(() => {
        const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`;
		const requisicao = axios.get(url);

		requisicao.then(resposta => {
            console.log(resposta.data);
            setAssentos(resposta.data);
		});

        requisicao.catch(erro => {
            console.log(erro.response.data);
        });

	}, []);

	if(assentos.length === 0) {
		return "Carregando ...";
	}

    return (
        <PageContainer>
            Selecione o(s) assento(s)
            <SeatsContainer >
            {assentos.seats.map((assento) =>
                <Seat key={assento.id} assento={assento} />
            )}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle cor={SEL_FUNDO} borda={SEL_BORDA}/>
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle cor={DIS_FUNDO} borda={DIS_BORDA}/>
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle cor={IND_FUNDO} borda={IND_BORDA}/>
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                Nome do Comprador:
                <input placeholder="Digite seu nome..." data-test="client-name"/>

                CPF do Comprador:
                <input placeholder="Digite seu CPF..." data-test="client-cpf"/>
                
                <Link to="/sucesso">
                <button data-test="book-seat-btn">Reservar Assento(s)</button>
                </Link>

            </FormContainer>

            <FooterContainer data-test="footer">
                <div>
                    <img src={assentos.movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{assentos.movie.title}</p>
                    <p>{assentos.day.weekday} - {assentos.name}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    a {
        text-decoration: none;
        align-self: center;
    }
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`

const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${props => props.borda};
    background-color: ${props => props.cor};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`

const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`