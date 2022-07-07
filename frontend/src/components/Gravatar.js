import { useEffect, useState } from 'react';
//import Link from 'react-router-dom'
var md5 = require('md5');
// import styles from "../styles/Header.module.css";




function Avatar({email}) {
  //const { gravararUrl } = useUserData();
  //Move this use state to custom hook
  const [gravatarUrl, setGravatarUrl] = useState();
  useEffect(() => {
    //move this logic to custom hook
    const address = String(email).trim().toLowerCase();

    // Create an MD5 hash of the final string
    const hash = md5(address);

    // Grab the actual image URL
    setGravatarUrl(`https://www.gravatar.com/avatar/${hash}`);
    //end move to hook
  }, [email, setGravatarUrl]);
  return (
    <div className="ml-5">
      {/* <Link href="/account"> */}
        <button
          type="button"
          className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          id="user-menu-button"
          aria-expanded="false"
          aria-haspopup="true"
        >
          {/* <span className={styles.logo}>Open user menu</span> */}
          <img  src={gravatarUrl} alt="" width={40} height={40}  />
        </button>
      {/* </Link> */}
    </div>
  );
}

export default Avatar;
