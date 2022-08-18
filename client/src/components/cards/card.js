import "./card.css";
import React from "react";
import FormDialog from "../dialog/dialog";

export default function Card(props) {

    const [open, setOpen] = React.useState(false);

    const handleClickCard = () => {
        setOpen(true);
    };

    const dataForm = new Date(props.data).toISOString().slice(0, 10);

    return (
        <>
        <FormDialog 
            open={open} 
            setOpen={setOpen} 
            titulo={props.titulo} 
            data={props.data} 
            nota={props.nota} 
            id={props.id}
            listCard={props.listaFilme} 
            setList={props.setFilme}/>
        <div className="container-card" onClick={() => handleClickCard()}>
            <h1 className="card-titulo">{props.titulo}</h1>
            <p className="card-data">Data: {dataForm}</p>
            <p className="card-nota">Nota: {props.nota}</p>
        </div>
        </>
    );
}