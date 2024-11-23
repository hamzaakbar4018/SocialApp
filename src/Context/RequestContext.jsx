import React from 'react'

const RequestContext = () => {
    const [reqData,setReqData] = useState([]);
    const fetchRequests  = async () => {
        try {
            const querySnapShot = await getDocs(collection(db,""))
            const data = querySnapShot.docs.map((doc)=>({
                id: doc.id,
                ...doc.data()
            }))
            setReqData(data);
        } catch (error) {
            console.log("Error in fetching notifications",error)
        }
    }
    useEffect(()=>{
        fetchRequests();
    },[])
  return (
    <div>
        {
                <Request.Provider value={reqData}>
                    {children}
                </Request.Provider>
            }
    </div>
  )
}

export default RequestContext