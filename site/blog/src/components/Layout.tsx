import Footer from "./Footer";
import Header from "./Header";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 pt-10">
        {children}
        <Footer />
      </main>
    </>
  );
};

export default Layout;
