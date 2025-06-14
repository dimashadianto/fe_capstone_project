import { FaFacebookF, FaInstagram, FaPhone, FaEnvelope, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="py-3" style={{ boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
            <div className="container mx-auto px-10 flex flex-col md:flex-row justify-around items-center">
                <div className="flex flex-col space-y-2">
                    <div className="flex items-center">
                        <img src="/src/assets/LogoWeb.png" alt="Kita Sehat" className="h-10 w-auto mr-2" />
                        <span className="text-xl font-bold text-blue-800">Kita Sehat</span>
                    </div>
                    <div className="text-sm space-y-1">
                        <div className="flex items-center">
                            <FaPhone className="mr-2 text-blue-800" />
                            <span>0812-3456-7890</span>
                        </div>
                        <div className="flex items-center">
                            <FaEnvelope className="mr-2 text-blue-800" />
                            <span>info@kitasehat.com</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col space-y-2">
                    <span className="text-sm font-medium text-blue-800">Ikuti Media Sosial Kami:</span>
                    <div className="flex space-x-3 text-2xl">
                        <a href="#" aria-label="Facebook" className="hover:text-blue-500"><FaFacebookF /></a>
                        <a href="#" aria-label="Instagram" className="hover:text-pink-500"><FaInstagram /></a>
                        <a href="#" aria-label="YouTube" className="hover:text-red-700"><FaYoutube /></a>
                    </div>
                </div>
            </div>

            <hr className="my-2 border-blue-400" />
            <div className="text-center text-sm text-blue-500">
                © {new Date().getFullYear()} Kita Sehat, Semua Hak Cipta Dilindungi
            </div>
        </footer>
    );
};

export default Footer;
