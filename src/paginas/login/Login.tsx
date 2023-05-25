import React, { ChangeEvent, useState, useEffect  } from "react";
import "./Login.css";
import { Grid, Box, Typography, TextField, Button } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import UserLogin from "../../models/UserLogin";
import useLocalStorage from "react-use-localstorage";
import { login } from "../../services/Service";

function Login () {
    let navigate = useNavigate();
    const [token, setToken] = useLocalStorage("token");
    const [userLogin, setUserLogin] = useState<UserLogin>(
        {
            id: 0,
            usuario: "",
            senha: "",
            token: ""
        }
        )

        function updatedModel(e: ChangeEvent<HTMLInputElement>) {
            setUserLogin({
                ...userLogin,
                [e.target.name]: e.target.value
            })
        }

        useEffect(()=>{
            if(token !== ""){
                navigate("/home")
            }
        }, [token])

        async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
            e.preventDefault();
            try{
                await login ("/usuarios/logar", userLogin, setToken)
                
                alert("Usuário logado com sucesso!")
            }catch(error){
                alert("Usuário e/ou senha inválido! Tente nvamente.")
            }
        }
    return (
        <>
            <Grid container direction="row" justifyContent="center" alignItems="center" className="imagem">
                <Grid alignItems="center" item xs={8}>
                    <Box paddingX={20} className="formulario" justifyContent="center">
                        <form onSubmit={onSubmit}>
                            <Typography variant="h3" gutterBottom color="textPrimary" component="h3" align="center" className="textos1">Entrar</Typography>
                            <TextField value={userLogin.usuario} onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)} id="usuario" label="Usuário" variant="outlined" name="usuario" margin="normal" fullWidth />
                            <TextField value={userLogin.senha} onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)} id="senha" label="Senha" variant="outlined" name="senha" margin="normal" type="password" fullWidth />
                            <Box marginTop={2} textAlign="center">
                                <Button type="submit" variant="contained" color="primary">
                                    Logar
                                </Button>
                            </Box>
                        </form>
                        <Box display="flex" justifyContent="center" marginTop={2}>
                            <Box marginRight={1}>
                                <Typography variant="subtitle1" gutterBottom align="center">Não possui uma conta?</Typography>
                            </Box>
                            <Link to="/cadastrousuario">
                            <Typography variant="subtitle1" gutterBottom align="center" className="textos1">Cadastre-se </Typography>
                            </Link>   
                        </Box>
                    </Box>
                </Grid>
            </Grid>

        </>
    )
}

export default Login