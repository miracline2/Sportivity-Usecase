
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import "../../App.css";
import { useMutation } from "@tanstack/react-query";
import { getUserDetails, UpdateUser } from "../../Service/sportivityApi";
import editIcon from "../../assets/EditIcon.svg";
import NavBar from "./NavBar";
import { useForm } from "react-hook-form";

interface UserProfile {
  Name: string;
  EmailAddress: string;
  PhoneNumber: string;
  YearOfBirth: number;
  Location: string;
  Pincode: string;
  USERID: string;
}

const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  
  const { register, handleSubmit, reset } = useForm<UserProfile>();
  const emailAddress = localStorage.getItem("emailAddress");
console.log('savedEmail',emailAddress);

  const { mutate: getUserData } = useMutation({
    mutationFn: (data:any) => getUserDetails(data),
    onSuccess: (res: any) => {
      if (res.success === true) {
        setUserProfile(res.data);
        console.log('userProfile',res.data);
        
        // Reset form with the correct case for field names
        reset({
          Name: res.data[0].Name,
          EmailAddress: res.data[0].EmailAddress,
          PhoneNumber: res.data[0].PhoneNumber,
          YearOfBirth: res.data[0].YearOfBirth,
          Location: res.data[0].Location,
          Pincode: res.data[0].Pincode,
          USERID: res.data[0].USERID
        });
      }
    },
  });

  useEffect(() => {
    const requestData = {
      emailAddress: emailAddress,
    };
    getUserData(requestData);
  }, [getUserData]);

  const { mutate: updateUsers } = useMutation({
    mutationFn: (data: any) => UpdateUser(data),
    onSuccess: (response: { success: boolean }) => {
      if (response.success === true) {
        setIsEditing(false);
        // Refresh user data after successful update
        getUserData({ emailAddress: userProfile[0]?.EmailAddress || "" });
      }
    },
  });

  const handleSave = (data: UserProfile) => {
    // Make sure to include the USERID in the update
    const updateData = {
      ...data,
      USERID: userProfile[0]?.USERID
    };
    updateUsers(updateData);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      // Reset form to current values when entering edit mode
      reset(userProfile[0] || undefined);
    }
  };

  const handleCancel = () => {
    reset(userProfile[0] || undefined);
    setIsEditing(false);
  };

  return (
    <div className="position-relative bottom-0">
      <NavBar />
      <div className="d-flex justify-center profile-position">
        <div className="card shadow" style={{ width: "1018px", height: "646px", margin: "0 auto", marginTop: "10px" }}>
          <div className="d-flex justify-content-start">
            <button className="profileBtn">Profile</button>
          </div>
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center margin" style={{ marginTop: "-53px" }}>
              <button className="btn">Basic Information</button>
              {isEditing ? (
                <div className="d-flex flex-row gap-2">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleSubmit(handleSave)}
                  >
                    Save
                  </button>
                  <button className="btn btn-secondary" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              ) : (
                <img
                  src={editIcon}
                  alt="Edit"
                  onClick={handleEditToggle}
                  style={{ cursor: "pointer" }}
                />
              )}
            </div>
            <div className="card" style={{ margin: "20px" }}>
              <div className="card-body">
                <Form onSubmit={handleSubmit(handleSave)}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      disabled={!isEditing}
                      {...register("Name")}
                      defaultValue={userProfile[0]?.Name}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      disabled={!isEditing}
                      {...register("EmailAddress")}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      disabled={!isEditing}
                      {...register("PhoneNumber")}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Year of Birth</Form.Label>
                    <Form.Control
                      type="number"
                      disabled={!isEditing}
                      {...register("YearOfBirth")}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      disabled={!isEditing}
                      {...register("Location")}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Pincode</Form.Label>
                    <Form.Control
                      type="text"
                      disabled={!isEditing}
                      {...register("Pincode")}
                    />
                  </Form.Group>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

// import React, { useEffect, useState } from "react";
// import { Form } from "react-bootstrap";
// import "../../App.css";
// import { useMutation } from "@tanstack/react-query";
// import { getUserDetails, UpdateUser } from "../../Service/sportivityApi";
// import editIcon from "../../assets/EditIcon.svg";
// import NavBar from "./NavBar";
// import { useForm } from "react-hook-form";

// interface UserProfile {
//     EmailAddress: string;
//     Location: string;
//     Name: string;
//     PhoneNumber: string;
//     Pincode: string;
//     USERID: string;
//     YearOfBirth: number;
//   }
  
//   const Profile: React.FC = () => {
//     const [userProfile, setUserProfile] = useState<UserProfile[]>([]);
//     const [isEditing, setIsEditing] = useState(false);
//     const { register, handleSubmit, reset } = useForm<UserProfile>();
  
//     const { mutate: getUserData } = useMutation({
//       mutationFn: (data: any) => getUserDetails(data),
//       onSuccess: (res: any) => {
//         if (res.success === true) {
//           setUserProfile(res.data);
//           // Since the data is an array, we'll use the first object
//           if (res.data && res.data[0]) {
//             reset({
//               Name: res.data[0].Name,
//               EmailAddress: res.data[0].EmailAddress,
//               PhoneNumber: res.data[0].PhoneNumber,
//               YearOfBirth: res.data[0].YearOfBirth,
//               Location: res.data[0].Location,
//               Pincode: res.data[0].Pincode,
//               USERID: res.data[0].USERID
//             });
//           }
//         }
//       },
//     });
  
//     useEffect(() => {
//       const requestData = {
//         emailAddress: "miracline.a@arus.co.in",
//       };
//       getUserData(requestData);
//     }, [getUserData]);
  
//     const handleSave = (data: UserProfile) => {
//       // Include the USERID from the original data
//       const updateData = {
//         ...data,
//         USERID: userProfile[0]?.USERID
//       };
//     //   updateUsers(updateData);
//     };
  
//     return (
//       <div className="card-body">
//         <Form onSubmit={handleSubmit(handleSave)}>
//           <Form.Group className="mb-3">
//             <Form.Label>Name</Form.Label>
//             <Form.Control
//               type="text"
//               disabled={!isEditing}
//               defaultValue={userProfile[0]?.Name}
//               {...register("Name")}
//             />
//           </Form.Group>
          
//           <Form.Group className="mb-3">
//             <Form.Label>Email Address</Form.Label>
//             <Form.Control
//               type="email"
//               disabled={!isEditing}
//               defaultValue={userProfile[0]?.EmailAddress}
//               {...register("EmailAddress")}
//             />
//           </Form.Group>
          
//           <Form.Group className="mb-3">
//             <Form.Label>Phone Number</Form.Label>
//             <Form.Control
//               type="tel"
//               disabled={!isEditing}
//               defaultValue={userProfile[0]?.PhoneNumber}
//               {...register("PhoneNumber")}
//             />
//           </Form.Group>
          
//           <Form.Group className="mb-3">
//             <Form.Label>Year of Birth</Form.Label>
//             <Form.Control
//               type="number"
//               disabled={!isEditing}
//               defaultValue={userProfile[0]?.YearOfBirth}
//               {...register("YearOfBirth")}
//             />
//           </Form.Group>
          
//           <Form.Group className="mb-3">
//             <Form.Label>Location</Form.Label>
//             <Form.Control
//               type="text"
//               disabled={!isEditing}
//               defaultValue={userProfile[0]?.Location}
//               {...register("Location")}
//             />
//           </Form.Group>
          
//           <Form.Group className="mb-3">
//             <Form.Label>Pincode</Form.Label>
//             <Form.Control
//               type="text"
//               disabled={!isEditing}
//               defaultValue={userProfile[0]?.Pincode}
//               {...register("Pincode")}
//             />
//           </Form.Group>
//         </Form>
//       </div>
//     );
//   };
  
//   export default Profile;