import React, {useState} from 'react';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog(props) {

    const [editValues, setEditValues] = useState({
        id: props.id,
        titulo: props.titulo,
        data: props.data,
        nota: props.nota
    });

    /*const handleClickOpen = () => {
        props.setOpen(true);
    };*/

    const handleClose = () => {
        props.setOpen(false);
    };

    const handleEdit = () => {
        //Método PUT
        Axios.put("http://localhost:3001/editar",{
            id: editValues.id,
            titulo: editValues.titulo,
            data: editValues.data,
            nota: editValues.nota
        });
        handleClose();
    };

    const handleChangeValues = (value) => {
        setEditValues(prevValues => ({
            ...prevValues,
            [value.target.id]: value.target.value,
        }));
    };

    const handleDelete = () => {
        Axios.delete(`http://localhost:3001/delete/${editValues.id}`);
        handleClose();
    };

    const dataForm = new Date(props.data).toISOString().slice(0, 10);

    return (
        <Dialog open={props.open} onClose={handleClose}>
            <DialogTitle>Editar Filme</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="titulo"
                label="Título do filme"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={props.titulo}
                onChange={handleChangeValues}
            />
            <TextField
                autoFocus
                margin="dense"
                id="data"
                label="Data em que assistiu o filme"
                type="date"
                fullWidth
                variant="standard"
                defaultValue={dataForm}
                onChange={handleChangeValues}
            />
            <TextField
                autoFocus
                margin="dense"
                id="nota"
                label="Nota do filme"
                type="number"
                fullWidth
                variant="standard"
                defaultValue={props.nota}
                onChange={handleChangeValues}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleDelete}>Excluir</Button>
            <Button onClick={handleEdit}>Salvar</Button>
            </DialogActions>
        </Dialog>
    );
}
