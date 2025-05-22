import HomeForm from "../components/HomeForm";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-2xl w-full p-8 bg-white rounded-xl shadow">
        <HomeForm />
      </div>
    </div>
  );
};

export default Home;