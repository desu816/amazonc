// import React from 'react'

// function LayOut  ({children}) {
//   return (
//     <div>
//       <Header/>
//       {children}
//     </div>
//   )
// }

// export default LayOut


import React from 'react';
import Header from '../Header/Header.js';

function LayOut({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default LayOut;
