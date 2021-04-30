import Core from "modules/Core";
import Header from "modules/Header";
import Home from "modules/Home";
import SEO from "modules/SEO";

function HomePage() {
  return (
    <Core>
      <SEO />
      <Header />

      <Home />
    </Core>
  );
}

export default HomePage;
