import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import Logo from '@/Components/common/Logo.jsx'

function Footer() {
    return (
        <footer className="py-[30px] px-[4%] max-w-[1000px] my-0 mx-auto">
            <div className=" flex items-center my-10 mx-0 justify-between ">
                <Logo variant="dark" width={150} height={45} className="mb-4" />
                <div className="flex gap-5">
                    <FaFacebook className="cursor-pointer" />
                    <FaInstagram className="cursor-pointer" />
                    <FaTwitter className="cursor-pointer" />
                    <FaYoutube className="cursor-pointer" />
                </div>
            </div>
            <ul className="grid [grid-template-columns:auto_auto_auto_auto] gap-4 mb-[30px] list-none">
                <li>Audio Description</li>
                <li>Help center</li>
                <li>Gift Cards</li>
                <li>Media Center </li>
                <li> Investor Relations </li>
                <li>Jobs</li>
                <li>Terms of Use</li>
                <li>Privacy</li>
                <li>Legal Notices </li>
                <li>Cookie Preferences </li>
                <li>Corporate Information</li>
                <li>Contact Us</li>
            </ul>
            <p className="text-gray-600 text-sm">Made by Mahmoud osama</p>
        </footer>
    )
}

export default Footer
