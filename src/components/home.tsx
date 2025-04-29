import Footer from "./footer";
import Navbar from "./navbar";

const Home = () => {
    return (
        <div>
            <Navbar />
            <section className="py-20">
                <div className="container">
                    <h1 className="text-4xl font-bold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, mollitia.</h1>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Home;
