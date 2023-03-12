import styled from "styled-components"
import { Link } from "react-router-dom";
export default function SuccessPage({dadosCompra, dadosFilme, setVoltar}) {
    setVoltar(`/assentos/${dadosFilme.id}`);

    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer data-test="movie-info">
                <strong><p>Filme e sessão</p></strong>
                <p>{dadosFilme.movie.title}</p>
                <p>{dadosFilme.day.date} - {dadosFilme.name}</p>
            </TextContainer>
            {dadosCompra.compradores.map((d,index) => 
            <>
                <TextContainer data-test="seats-info" key={d.nome}>
                    <strong><p>Ingresso</p></strong>
                    <p >Assento {dadosCompra.numero[index]}</p>
                </TextContainer>
                <TextContainer data-test="client-info" key={d.cpf}>
                    <strong><p>Comprador</p></strong>
                    <p >Nome: {d.nome}</p>
                    <UltimoP item={"ultimo"}>CPF: {d.cpf}</UltimoP>
                </TextContainer>
            </>
            )}
            
            <Link to="/" data-test="go-home-btn">
            <button>Voltar para Home</button>
            </Link>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`
const UltimoP = styled.p`
    margin-bottom: ${props => props.item === "ultimo" ? "15px" : ""};
`