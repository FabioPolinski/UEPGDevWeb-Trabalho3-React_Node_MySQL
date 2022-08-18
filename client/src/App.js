//npm start para startar

import './App.css';
import React, {useState, useEffect} from "react";
import Axios from "axios";
import Card from './components/cards/card';

function App() {

  const [values, setValues] = useState();

  const [listaFilme, setFilme] = useState();

  const pegaInput = (value) => {
    setValues((prevValue) => ({ 
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };
  //console.log(values);

  const pegaBotao = () => {
    //console.log(values);

    //Inserir dados dos campos ao pressionar o botao
    Axios.post("http://localhost:3001/registrar", {
      titulo: values.titulo,
      data: values.data,
      nota: values.nota
    }).then(() => {
      Axios.post("http://localhost:3001/pesquisar", {
        titulo: values.titulo,
        data: values.data,
        nota: values.nota

      }).then((response)=>{
        console.log(response);

        setFilme([
          ...listaFilme, {

            id: response.data[0].id,
            titulo: values.titulo,
            data: values.data,
            nota: values.nota
          }
        ]);
      });
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/visualizar").then((response) => {
      //console.log(response);

      setFilme(response.data);
    });
  }, []);

  return (
    <div className="container-principal">
      <div className="container-registro">
        <h1 className='app-titulo'>REGISTRO DE FILMES</h1>

        <h2 className='input-titulos'>TÍTULO</h2>
        <input type="text" name="titulo" placeholder='Título do filme' className='input-filme' id="titulo" onChange={pegaInput}/>

        <h2 className='input-titulos'>DATA</h2>
        <input type="date" name="data" placeholder='Data em que assistiu o filme' className='input-filme' id="data" onChange={pegaInput}/>

        <h2 className='input-titulos'>NOTA</h2>
        <input type="number" name="nota" placeholder='Nota do filme (1 a 10)' min="1" max="10" className='input-filme' id="nota" onChange={pegaInput}/>

        <button className='botao-cadastro' onClick={() => pegaBotao()}>CADASTRAR</button>
      </div>
      <h1 className='app-titulo'>LISTAGEM DE FILMES</h1>
      {typeof listaFilme !== "undefined" && listaFilme.map((value) => {
        return <Card  key={value.id} 
                      listCard={listaFilme} 
                      setListCard={setFilme}
                      id={value.idfilme}
                      titulo={value.titulo}
                      data={value.data}
                      nota={value.nota}></Card>;
      })}
    </div>
  );
}

export default App;