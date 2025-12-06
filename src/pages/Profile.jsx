import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function Profile() {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [changeDetail, setChangeDetail] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setFormData({
          name: currentUser.displayName || "",
          email: currentUser.email || "",
        });
      }
    });

    return () => unsubscribe();
  }, [auth]);

  if (!user) {
    return <h2 className="text-center mt-10 text-xl">Loading profile...</h2>;
  }

  const { name, email } = formData;

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        //update display name in firebase authentication
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        //update name into firestore
        const docRef = doc(db, "users", auth.currentUser.id);
        await updateDoc(docRef, {
          name,
        });
      }
      toast.success("Profile detail changed ");
    } catch (error) {
      toast.error("Could not update the profile details");
    }
  }
  return (
    <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
      <h1 className="text-3xl text-center mt-6 font-bold">My profile</h1>

      <div className="w-full md:w-[50%] mt-6 px-3">
        <form>
          <input
            type="text"
            id="name"
            value={name}
            disabled={!changeDetail}
            onChange={onChange}
            className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out ${
              changeDetail && "bg-red-200 focus:bg-red-200"
            }`}
          />

          <input
            type="email"
            id="email"
            value={email}
            disabled
            className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
          />

          <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
            <p className="flex items-center mb-6">
              Do you want to change your name?
              <span
                onClick={() => {
                  changeDetail && onSubmit();
                  setChangeDetail((prevState) => !prevState);
                }}
                className="text-red-600 hover:text-red-700 transition ease-in-out cursor-pointer duration-200 ml-1"
              >
                {changeDetail ? "Apply change" : "Edit"}
              </span>
            </p>

            <p
              className="text-blue-600 hover:text-blue-800 transition ease-in-out cursor-pointer"
              onClick={() => auth.signOut()}
            >
              Sign out
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
