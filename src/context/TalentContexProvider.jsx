// import React, { useState } from 'react'
// import TalentContext from './TalentContext'
// const TalentContexProvider = (children) => {
//     const [talentData,setTalentData] = useState ([

//             {
//                 id: 1,
//                 userpic: "https://randomuser.me/api/portraits/men/1.jpg",
//                 name: "John Doe",
//                 text: "Actor | Model",
//                 landingtalent:true
//             },
//             {
//                 id: 2,
//                 userpic: "https://randomuser.me/api/portraits/men/14.jpg",
//                 name: "Jane Smith",
//                 text: "Model | Director",
//                 landingtalent:true
//             },
//             {
//                 id: 3,
//                 userpic: "https://randomuser.me/api/portraits/men/12.jpg",
//                 name: "Michael Johnson",
//                 text: "Actor | Director",
//                 landingtalent:true
//             },
//             {
//                 id: 4,
//                 userpic: "https://randomuser.me/api/portraits/women/13.jpg",
//                 name: "Emily Davis",
//                 text: "Model",
//                 landingtalent:true
//             },
//             {
//                 id: 5,
//                 userpic: "https://randomuser.me/api/portraits/men/14.jpg",
//                 name: "Chris Brown",
//                 text: "Actor",
//                 landingtalent:true
//             },
//             {
//                 id: 6,
//                 userpic: "https://randomuser.me/api/portraits/women/15.jpg",
//                 name: "Sophia Wilson",
//                 text: "Director",
//                 landingtalent:true
//             },
//             {
//                 id: 7,
//                 userpic: "https://randomuser.me/api/portraits/men/16.jpg",
//                 name: "David Miller",
//                 text: "Actor | Model | Director",
//                 landingtalent:true
//             },
//             {
//                 id: 8,
//                 userpic: "https://randomuser.me/api/portraits/women/17.jpg",
//                 name: "Olivia Taylor",
//                 text: "Model | Actor",
//                 landingtalent:true
//             },
            

//     ])
//   return (
//     <TalentContext.Provider value={{talentData,setTalentData}}>
//         {children}
//     </TalentContext.Provider>
//   )
// }

// export default TalentContexProvider