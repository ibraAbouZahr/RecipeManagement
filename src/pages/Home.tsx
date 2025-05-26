import HeroSection from "../components/HomePage/HeroSection";
import RecipeCrud from "../components/RecipeCrud";
function Home() {
  return (
    <div>
      <HeroSection></HeroSection>
      <div className="container w-11/12 md:w-4/5 mx-auto flex flex-col items-center justify-center p-4 text-text">
        <RecipeCrud></RecipeCrud>
      </div>
    </div>
  );
}
export default Home;
