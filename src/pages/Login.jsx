import { useEffect, useState } from 'react';
import Api from '../service/index';
import { useRestaurant } from '../store/useRestaurant';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const Login = () => {
  const navigate = useNavigate();
  const state = useRestaurant();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoader(true);
    const response = await Api.login({ email, password });
    setLoader(false);

    if (response.error) {
      setEmail('');
      setPassword('');
      state.setErrorMessage('Invalid login');
      return;
    }

    state.setToken(response.token);
    state.setName(response.restaurant.name);
    state.setRoute(response.restaurant.route);
    state.setMenu(response.restaurant.menu);
    state.setTables(response.restaurant.tables);
    state.setEmail(email);
    state.setErrorMessage('');

    return navigate('/');
  };
  const clearField = (field, setField) => {
    if (field) {
      setField('');
    }
  };

  const fillTestAccount = () => {
    setEmail('restaurante_one@test.com');
    setPassword('123456');
  };
  return (
    <div className='login-container flex flex-col items-center gap-2 www p-2 rounded-md shadow w-[320px] mx-auto mt-[100px]'>
      {state.errorMessage && <p>{state.errorMessage}</p>}
      <div className='flex w-full justify-between p-1 items-end'>
        <h1 className=' text-4xl self-start'>Login</h1>
        <button
          type='button'
          className='www px-3 py-1'
          onClick={() => fillTestAccount()}
        >
          Conta Teste
        </button>
      </div>
      <hr className='border border-zinc-400 w-full my-2' />
      <form
        action=''
        onSubmit={handleSubmit}
        className=' bg-neutral-700 shadow flex flex-col gap-3 p-2 w-[300px] rounded'
      >
        <label htmlFor='email' className='flex w-full justify-between'>
          <p className=' text-xl'>Email</p>
          <input
            className=' outline-none px-1 border-b border-zinc-400 border-l placeholder:italic'
            autoComplete='off'
            type='text'
            id='email'
            placeholder='Email'
            value={email}
            onClick={() => clearField(email, setEmail)}
            onInput={({ target: { value } }) => setEmail(value)}
          />
        </label>
        <label htmlFor='password' className='flex w-full justify-between'>
          <p className=' text-xl'>Password</p>
          <input
            className=' outline-none px-1 border-b border-l border-zinc-400 placeholder:italic'
            autoComplete='off'
            placeholder='Password'
            type='password'
            id='password'
            value={password}
            onClick={() => clearField(password, setPassword)}
            onInput={({ target: { value } }) => setPassword(value)}
          />
        </label>
        <button className='www'>{loader ? <Loader /> : 'Login'}</button>
      </form>
      <small>
        {window.screen.width} :: {window.screen.height}
      </small>
    </div>
  );
};

export default Login;
