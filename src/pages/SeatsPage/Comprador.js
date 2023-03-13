import { useState} from "react";

export default function Comprador({assento, idAssento, compradores, setCompradores}){

    const [form, setForm] = useState({idAssento, nome: "", cpf: ""});
    console.log("objeto ",form);
    console.log("compradores ",compradores.length, compradores);

    function handleChange(event) {
        const compradoresAtualizados = [...compradores];
        let inclui = false;
        console.log("compradores ",compradoresAtualizados);
        let itemAtualizado = {...form, [event.target.name]: event.target.value}
        setForm(itemAtualizado);
        console.log(event.target.value);
        for(let i=0; i<compradores.length; i++){
            if (form.idAssento === compradores[i].idAssento){
                compradoresAtualizados[i] = itemAtualizado;
                inclui = true;
                console.log(compradoresAtualizados, inclui);
                setCompradores(compradoresAtualizados);
            }
        }
        if (inclui === false){
            setCompradores([...compradores, form]);
        }        
    }

    return(
        <>
        <p>Nome do Comprador {assento}: </p>
        <input placeholder="Digite seu nome..." data-test="client-name"
        type="text" name={"nome"} value={form.nome} onChange={handleChange} required/>

        <p>CPF do Comprador {assento}:</p>
        <input placeholder="Digite seu CPF..." data-test="client-cpf"
        type="text" name={"cpf"} value={form.cpf} onChange={handleChange} required/>
        </>
    )
}