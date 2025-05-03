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
import { flightRouterStateSchema } from "next/dist/server/app-render/types"

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
                                    <div style={bot}>
                                        <div>
                                            {formattedText}
                                        </div>
                                    </div>
                                    <div style={{marginTop: 25}}>
                                        { item.content.data &&
                                            item.content.data.map((val) => {
                                                return ( 
                                                    <React.Fragment key={val.id}>
                                                        <div style={{display: 'flex', alignItems: "center", gap: 15}}>
                                                            <div style={{ display: 'flex', width: 50, height: 50, marginTop: 15 }}>
                                                                <CircularProgressbar width={50} value={val.percent} text={`${val.percent}%`} />
                                                            </div>
                                                            <a target="_blank" style={{textDecoration: 'none'}} href={val.data.link}>{val.data.name}</a>
                                                        </div>
                                                    </React.Fragment>
                                                )
                                            })
                                        }
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