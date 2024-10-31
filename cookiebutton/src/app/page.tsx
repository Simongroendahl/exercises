import CookieConsentButton from "@/components/CookieButton";
import { LiaCookieBiteSolid } from "react-icons/lia";
import { IoIosClose } from "react-icons/io";


export default function Home() {
  return (

      <main>
<div className="cookie-popup-container">
  <div className="cookie-header">
    <LiaCookieBiteSolid size={50} />
    <IoIosClose className="close" size={25} />
  </div>
    <div className="cookie-footer">
    <p>We use cookies to improve your user experience</p>
    <CookieConsentButton/>
    </div>

</div>
      </main>


  );
}
