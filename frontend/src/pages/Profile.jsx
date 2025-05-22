import ProfileForm from "../components/ProfileForm";
import LogoutForm from "../components/LogoutForm";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <ProfileForm />

        <div className="mt-8 flex justify-center">
          <LogoutForm />
        </div>
      </div>
    </div>
  );
};

export default Profile;
