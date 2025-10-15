import Features from "../components/Features";
import Hero from "../components/Hero";

const HomePage = () => {
  return (
    <section>
      <Hero />
      <div className="mt-10">
        <Features />
      </div>
    </section>
  );
};

export default HomePage;
