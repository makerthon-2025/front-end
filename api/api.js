const apiUrl = 'http://localhost:8000'

export const userActionApi=async(name, type)=>{
    const response = await fetch(`${apiUrl}/api/log_type/khang.tran@gmail.com`, {
        method: 'POST',
        body: JSON.stringify({'news_name': name, 'type': type})
    })
    return response.json()
}
