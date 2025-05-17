'use client'

import 'bootstrap/dist/css/bootstrap.css';
import ThirdGrid from '@/components/app/ThirdGrid'
import SecondGrid from '@/components/app/SecondGrid'
import { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false)
  const [conversation, setConv] = useState([])
  
  const table = {
    'textState': [text, setText],
    'loadingState': [loading, setLoading],
    'conversationState': [conversation, setConv]
  }

  return (
    <>
      <header style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 20px',
        paddingLeft: '110px',
        paddingTop: '40px'
      }}>
        <img 
          src="https://cdn-icons-png.flaticon.com/128/14958/14958196.png"
          width={45}
          height={45}
          alt="NewsBot icon"
        />
        <span style={{
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          NewsBot
        </span>
      </header>
      <SecondGrid table = {table}/>
      <ThirdGrid table = {table}/>
    </>
  );
}
