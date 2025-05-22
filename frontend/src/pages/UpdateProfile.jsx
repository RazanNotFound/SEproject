import UpdateProfileForm from "../components/UpdateProfileForm";

const UpdateProfile = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-center mb-6">Update Profile</h1>
            <UpdateProfileForm />
        </div>
        </div>
    );
    }
export default UpdateProfile;
