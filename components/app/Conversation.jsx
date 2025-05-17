'use client'

import { bot, human } from "@/style/app/SecondGrid"
import BotConversation from '@/components/app/BotConversation'
import HumanConversation from '@/components/app/HumanConversation'
import { useEffect, useState } from "react"
import React from 'react';
import data from '@/mock-data.json'
import store from "@/store"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';  // Đảm bảo đã import styles
import { userActionApi } from "@/api/api"

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default function foo({table}) {
    const [conversation, setConv] = table.conversationState
    const [text, setText] = table.textState
    const [loading, setLoading] = table.loadingState

    useEffect(() => {
        const foo = async () => {
            if(loading) {
                let tempData = conversation
    
                setConv(p => [ 
                    {
                      type: 'bot',
                      content: {
                        data: null,
                        prompt: 'loading'
                      }
                    },
                    ...p,
                ])
    
                await sleep(2000);

                const data = {
                    type: "news_query",
                    prompt: text  
                };

                const url = `${store.baseURL}/api/send_message`;
                const res = fetch(url, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                  })
                    .then(response => response.json())
                    .then(data => {
                        setConv(p => [ 
                            {
                              'type': 'bot',
                              'content': data 
                            },
                            ...tempData,
                        ])
                    })
                    .catch(error => {
                        setConv(p => [ 
                            {
                              'type': 'bot',
                              'content': {
                                'data': null,
                                'prompt': error.message
                              }
                            },
                            ...tempData,
                        ])
                    }).finally(() => {
                        setLoading(false)
                        setText('')
                    })
            }
        }

        foo()
    }, [loading])

    const handleClickAction = async(name, type) => {
        const res = await userActionApi(name, type)
        console.log(res)
        
    }

    useEffect(() => {
        setLoading(true)
        setConv(p => [])
        setLoading(false)
    }, [])

    if (conversation.length > 0) {
        return (
            <>
                {conversation.map((item, index) => {
                    if (item.type === 'human')
                        return (
                            <HumanConversation key = {index}>
                                {item.content}
                            </HumanConversation>
                        )

                    if (item.type == 'bot') {
                            if (item.content.prompt === 'loading') {
                                return (
                                    <BotConversation key = {index}>
                                        <div style={bot}>
                                            <div className="animation-loading">
                                                <img className="dot dot-1" src="https://cdn-icons-png.flaticon.com/128/10024/10024140.png" width={25} height={25} alt="" />
                                                <img className="dot dot-2" src="https://cdn-icons-png.flaticon.com/128/10024/10024140.png" width={25} height={25} alt="" />
                                                <img className="dot dot-3" src="https://cdn-icons-png.flaticon.com/128/10024/10024140.png" width={25} height={25} alt="" />
                                            </div>
                                        </div>
                                    </BotConversation>
                                )
                            }

                            const formattedText = item.content.prompt
                                .split('\n')
                                .map((item, index) => {
                                    const boldedText = item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                                    return (
                                        <React.Fragment key={index}>
                                            <span dangerouslySetInnerHTML={{ __html: boldedText }} />
                                            <br />
                                        </React.Fragment>
                                    );
                                });
                            return (
                                <BotConversation key = {index}>
                                    <div style={{...bot, backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.3)'}}>
                                        <div style={{color: '#e0e0e0', fontSize: '16px', lineHeight: '1.6'}}>
                                            {formattedText}
                                        </div>
                                    </div>
                                    <div style={{marginTop: 25}}>
                                        { item.content.data &&
                                            item.content.data.map((val) => {
                                                return ( 
                                                    <React.Fragment key={val.id}>
                                                        <div style={{display: 'flex', alignItems: "center", gap: 15, backgroundColor: '#2d2d2d', padding: '12px', borderRadius: '8px', marginBottom: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)'}}>
                                                            <div style={{ display: 'flex', width: 50, height: 50}}>
                                                                <CircularProgressbar 
                                                                    width={50} 
                                                                    value={val.percent} 
                                                                    text={`${val.percent}%`}
                                                                    styles={{
                                                                        path: {stroke: '#6c5ce7'},
                                                                        trail: {stroke: '#404040'},
                                                                        text: {fill: '#e0e0e0', fontSize: '24px'}
                                                                    }}
                                                                />
                                                            </div>
                                                            <a 
                                                                onClick={() => handleClickAction(val.data.name, val.data.type)} 
                                                                target="_blank" 
                                                                style={{
                                                                    textDecoration: 'none',
                                                                    color: '#a29bfe',
                                                                    fontSize: '15px',
                                                                    fontWeight: 500,
                                                                    ':hover': {color: '#6c5ce7'}
                                                                }} 
                                                                href={val.data.link}
                                                            >
                                                                {val.data.name}
                                                            </a>
                                                        </div>
                                                    </React.Fragment>
                                                )
                                            })
                                        }
                                    </div>
                                    <br />
                                    <hr style={{margin: '20px 0', border: 'none', height: '1px', backgroundColor: '#404040'}}/>
                                    <span style={{color: '#e0e0e0', fontSize: '16px', fontWeight: 600}}>Có thể bạn sẽ Thích:</span>
                                    <div style={{marginTop: 25, display: 'flex', alignItems: 'center', gap: 10}}>
                                        { item.content.suggest_news && item.content.suggest_news.length > 0 ? (
                                            item.content.suggest_news.map((val) => {
                                                return ( 
                                                    <React.Fragment key={val.id}>
                                                        <div style={{display: 'flex', alignItems: "center", gap: 15, backgroundColor: '#2d2d2d', padding: '12px', borderRadius: '8px', transition: 'all 0.3s ease'}}>
                                                            <div style={{ display: 'flex', width: 50, height: 50}}>
                                                                <CircularProgressbar 
                                                                    width={50} 
                                                                    value={val.percent} 
                                                                    text={`${val.percent}%`}
                                                                    styles={{
                                                                        path: {stroke: '#fd79a8'},
                                                                        trail: {stroke: '#404040'},
                                                                        text: {fill: '#e0e0e0', fontSize: '24px'}
                                                                    }}
                                                                />
                                                            </div>
                                                            <a 
                                                                onClick={() => handleClickAction(val.data.name, val.data.type)} 
                                                                target="_blank" 
                                                                style={{
                                                                    textDecoration: 'none',
                                                                    color: '#fd79a8',
                                                                    fontSize: '15px',
                                                                    fontWeight: 500,
                                                                    ':hover': {color: '#e84393'}
                                                                }} 
                                                                href={val.data.link}
                                                            >
                                                                {val.data.name}
                                                            </a>
                                                        </div>
                                                    </React.Fragment>
                                                )
                                            })
                                        ) : (
                                            <div style={{
                                                color: '#e0e0e0',
                                                fontSize: '15px',
                                                padding: '12px',
                                                backgroundColor: '#2d2d2d',
                                                borderRadius: '8px'
                                            }}>
                                                Chưa đủ dữ liệu để thống kê
                                            </div>
                                        )}
                                    </div>
                                </BotConversation>
                            )
                        }
                })}
            </>
        )
    }

    return(
        <>
            <BotConversation >
                <div style={bot}>
                    <div>
                        Xin chào, tôi có thể giúp gì cho bạn
                    </div>
                </div>
            </BotConversation>
        </>
    )
}