'use client'
import { useState } from "react";

export default function foo({table}) {
    const [text, setText] = table.textState
    const [loading, setLoading] = table.loadingState
    const [conversation, setConv] = table.conversationState

    const content = () => {
        setConv(p => [ 
          {
            type: 'human',
            content: text
          },
          ...p,
        ])

        setLoading(true)
    }

    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        content()
      }
    };

    const handleChange = (event) => {
        setText(event.target.value);  
    };

    const hanldeClick = () => {
      content()
    }

    return(
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div style={{ display: 'flex', justifyContent: 'center', width: '60%', position: 'relative'}}>
              <textarea 
                disabled={loading}
                value={text}
                onChange={handleChange}
                onKeyDown={handleKeyPress} className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder='Hỏi bất kì điều gì'></textarea>
              <img onClick={hanldeClick} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', cursor: !loading ? 'pointer' : 'default' }} src="https://cdn-icons-png.flaticon.com/128/10426/10426419.png" width={60} height={60} alt="" />
            </div>
        </div>
    )
}