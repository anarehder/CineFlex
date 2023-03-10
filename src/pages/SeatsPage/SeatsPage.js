
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Seat from "./Seat";
import Caption from "./Caption";

export default function SeatsPage({setDadosCompra, dadosFilme, setDadosFilme}) {
    const { idSessao } = useParams();
    const [ids, setIds] = useState([]);
    const [numero, setNumero] = useState([]);
    const [name, setName] = useState("")
    const [cpf, setCpf] = useState("")
    const navigate = useNavigate()

	useEffect(() => {
        const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`;
		const requisicao = axios.get(url);

		requisicao.then(resposta => {
            //console.log(resposta.data);
            setDadosFilme(resposta.data);
		});

        requisicao.catch(erro => {
            console.log(erro.response.data);
        });

	}, []);

	if(dadosFilme.length === 0) {
		return "Carregando ...";
	}

    function adicionarAssento(id,assento){
        setIds([...ids,id]);
        setNumero([...numero,assento]);
    }

    function removerAssento(id,assento){
        const lista = [...ids];
        let index = lista.findIndex(elemento => elemento === id);
        lista.splice(index,1);
        setIds(lista);
        const lista2 = [...numero];
        let index2 = lista2.findIndex(elemento => elemento === assento);
        lista2.splice(index2,1);
        setNumero(lista2);
    }

    function enviaDados(e) {
        e.preventDefault()
    
        const URL = "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many";
        const body = { ids, name, cpf }; 
        const dados = { numero, name, cpf };
        setDadosCompra(dados);
    
        const promise = axios.post(URL, body)
        promise.then(res => {
          navigate("/sucesso");
        })
        promise.catch(err => alert(err.response.data.message))
      }

    return (
        <PageContainer>
            Selecione o(s) assento(s)
            <SeatsContainer >
            {dadosFilme.seats.map((assento) =>
                <Seat key={assento.id} assento={assento}
                adicionarAssento={adicionarAssento} removerAssento={removerAssento} />
            )}
            </SeatsContainer>

            <Caption />

            <FormContainer>
            <form onSubmit={enviaDados}>
                Nome do Comprador:
                <input placeholder="Digite seu nome..." data-test="client-name"
                type="text" value={name} onChange={e => setName(e.target.value)} required/>

                CPF do Comprador:
                <input placeholder="Digite seu CPF..." data-test="client-cpf"
                type="text" value={cpf} onChange={e => setCpf(e.target.value)} required/>
                <ButtonsContainer>
                <button data-test="book-seat-btn" type="submit">Reservar Assento(s)</button>
                </ButtonsContainer>
            </form>
            </FormContainer>

            <FooterContainer data-test="footer">
                <div>
                    <img src={dadosFilme.movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{dadosFilme.movie.title}</p>
                    <p>{dadosFilme.day.weekday} - {dadosFilme.name}</p>
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
    text-align: left;
    input {
        width: calc(100vw - 60px);
    }
`

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin: 0 auto;
    }
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