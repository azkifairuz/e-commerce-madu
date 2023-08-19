export default function Api(){
  let BASE_URL="http://127.0.0.1:8000/api/"

  async function GET(url){
      return await fetch(`${BASE_URL}${url}`,{method:"GET"}).then(res=>res.json(),{mode: 'cors',})
  }


  async function POST(url,data){
    const endpoint =  `${BASE_URL}${url}`
    
    const payload = () =>{
        if(data instanceof FormData)return data
        return JSON.stringify(data)
    }
    return await fetch(endpoint,{method:"POST",body:payload()}).then(res=>res.json(),{mode: 'cors',})
}

  async function PUT(url,data){
      const endpoint =  `${BASE_URL}${url}`
      
      const payload = ()=>{
          if(data instanceof FormData){
              return data
          }
          return JSON.stringify(data)
      }
      return await fetch(endpoint,{method:"PUT",body:payload()}).then(res=>res.json(),{mode: 'cors',})
}

  async function DELETE(url){
      const endpoint =  `${BASE_URL}${url}`
      return await fetch(endpoint,{method:"DELETE"}).then(res=>res.json(),{mode: 'cors',})
}
  return{
      GET,
      POST,
      PUT,
      DELETE
  }
}
