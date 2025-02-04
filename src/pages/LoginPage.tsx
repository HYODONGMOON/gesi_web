import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../components/Button';
import { TextField } from '../components/TextField';
import { useAuth } from '../hooks';

interface FormValues {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  return (
    <>
      <h1>LoginPage</h1>

      <form
        className="p-4 flex flex-col space-y-4"
        onSubmit={handleSubmit((data) => login(data))}
      >
        <TextField
          label="email"
          type="email"
          placeholder="nicole@example.com"
          helper={errors.email?.message}
          {...register('email', { required: '이메일을 입력해주세요' })}
        />

        <TextField
          label="password"
          type="password"
          helper={errors.password?.message}
          {...register('password', { required: '비밀번호를 입력해주세요' })}
        />

        <Button text="Login" className="filled-brand-1" />
      </form>
    </>
  );
};
