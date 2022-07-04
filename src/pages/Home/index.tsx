import React, { useState, useEffect } from 'react';
import './style.css';
import { Card, CardProps } from '../../components/card';

type ProfileResponse = {
  name: string;
  avatar_url: string;
}

type User = {
  name: string;
  avatar: string;
}

export function Index() {
  //Definindo estado com useState;
  const [handleNameChange, setHandleNameChange] = useState('');
  const [nameStudents, setNameStudents] = useState<CardProps[]>([]);
  const [user, setUser] = useState<User>({} as User); // => Removida a inferencia dos dados, para aplicação de Type.

  function handelAddStudents() {
    const newStudent = {
      name: handleNameChange,
      time: new Date().toLocaleTimeString("pt-BR", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    };

    setNameStudents(prevState => [...prevState, newStudent]);
  }

  //Hook - useEffect
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.github.com/users/GstavoHnz');
      const data = await response.json() as ProfileResponse;


      setUser({
        name: data.name,
        avatar: data.avatar_url,
      })
    }
  }, []);


  return (
    <div className='container'>
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <a href="https://github.com/GstavoHnz" title='Click para ir ao meu GitHub! ;D'>
            <img src={user.avatar} alt="Imagem do github" />
          </a>
        </div>
      </header>
      <input
        type="text"
        placeholder='Digite seu nome...'
        onChange={e => setHandleNameChange(e.target.value)}
      />
      <button
        type='button' onClick={handelAddStudents}>
        Adicionar
      </button>

      {
        nameStudents.map(student => (
          <Card
            //Usando Key Props para criar um "chave" para cada componente. Foi usado o time, por questao 
            //de ele ter segundos e isso permite uma certa individualidade. Seria interessante usar id ou outro tipo de técnica para isolar. Mas como exemplo é interessante.
            key={student.time}
            name={student.name}
            time={student.time}
          />
        ))
      }
    </div>
  )
}

