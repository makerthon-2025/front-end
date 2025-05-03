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
      <div></div>
      <SecondGrid table = {table}/>
      <ThirdGrid table = {table}/>
    </>
  );
}
