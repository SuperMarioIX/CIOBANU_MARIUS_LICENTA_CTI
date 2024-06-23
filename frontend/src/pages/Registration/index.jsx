import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from "react-redux";
import { fetchRegister, fetchUserData, selectIsAuth } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import styles from './Login.module.scss';

export const Registration = () => {

  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  
  
  const onSubmit = async (values) => {
    const result = await dispatch(fetchRegister(values));
    if (result.error) {
      console.error(result.error);
    } else {
      console.log(values);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Create account
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: 'Enter full name' })}
          className={styles.field}
          label="Full Name" 
          fullWidth 
        />
        <TextField
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Enter E-mail' })}
          className={styles.field}
          label="Enter E-mail" 
          fullWidth 
        />
        <TextField
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Enter password' })}
          className={styles.field}
          label="Enter password" 
          fullWidth 
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Join the student club
        </Button>
      </form>
    </Paper>
  );
};
