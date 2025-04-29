const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto text-center text-sm">
                © {new Date().getFullYear()} Kita Sehat, All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
