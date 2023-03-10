import { IND_BORDA, IND_FUNDO, DIS_BORDA, DIS_FUNDO, SEL_BORDA,  SEL_FUNDO} from "./colors";
import styled from "styled-components";

export default function Caption(){
    return(
        <CaptionContainer>
            <CaptionItem>
                <CaptionCircle cor={SEL_FUNDO} borda={SEL_BORDA} />
                Selecionado
            </CaptionItem>
            <CaptionItem>
                <CaptionCircle cor={DIS_FUNDO} borda={DIS_BORDA} />
                Disponível
            </CaptionItem>
            <CaptionItem>
                <CaptionCircle cor={IND_FUNDO} borda={IND_BORDA} />
                Indisponível
            </CaptionItem>
        </CaptionContainer>)
}


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