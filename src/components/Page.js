import {React, useState, useEffect} from 'react';
import utils from '../utils/localStorage';

function Page() {

    const [styles, setStyles] = useState({
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        height: '100vh',
        width: '100vw',
    });

    useEffect(() => {
        utils.getBackground().then(response => {

            setStyles({...styles, backgroundImage: "url('" + response + "')" });

        });

    }, [])

  return (
      <div style={styles}>
      </div>
  );
}

export default Page;