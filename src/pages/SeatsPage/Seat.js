import styled from "styled-components"
import { useState } from "react";
import { IND_BORDA, IND_FUNDO, DIS_BORDA, DIS_FUNDO, SEL_BORDA,  SEL_FUNDO} from "./colors";

export default function Seat({assento}) {
    const [status, setStatus] = useState(true);

    function selecionaAssento(statusInicial){
        if (statusInicial === true){
            console.log("disponivel")
            setStatus(!status);
        } else {
            console.log("INdisponivel")
            alert("Esse assento não está disponível");
        }
    }

    return (<>
    <SeatItem statusInicial={assento.isAvailable} status={status}
        onClick={() => selecionaAssento(assento.isAvailable)}
        data-test="seat">
        {assento.name}
    </SeatItem>
    </>)
}

const SeatItem = styled.div`
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
    background-color:${props => {
        if(props.statusInicial === false){
            return IND_FUNDO;
        } else if  (props.status === false){
            return SEL_FUNDO;
        } else {
            return DIS_FUNDO;
        }
    }};
    border: 1px solid ${props => {
        switch(props.statusInicial){
            case true:
                return DIS_BORDA
            case false:
                return IND_BORDA
            case "selected":
                return SEL_BORDA
            default:
                return DIS_BORDA
        }
    }};
`