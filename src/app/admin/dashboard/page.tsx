"use client";

import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectUsername, selectIsLoggedIn } from "@/store/LoginSlice";


import { Button } from "@/components/ui/button";
import CreatePoll from "@/components/adminComponents/CreatePoll";
import PollsList from "@/components/adminComponents/PollsList";
const AdminDashboard = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const username = useSelector(selectUsername);
  const isLoggedIn = useSelector(selectIsLoggedIn);




  if (!isLoggedIn) {
    router.push("/admin");
    return null;
  }



  const handleLogout = () => {
    dispatch(logout());
    router.push("/admin");
  };

 



  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center bg-white p-6 rounded shadow mb-6">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome, {username}</p>
          </div>
          <div className="flex gap-2">
            <CreatePoll/>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
        <PollsList />
    
      </div>

    


     
     
    </main>
  );
};

export default AdminDashboard;
