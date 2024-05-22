export default function User({ setSelectedUser, user }) {
    
    return (
        <div key={user._id} className="blur-cont">
            <div className="selected-user-card">
                <div className="selected-user-nav">
                    <i className="fa-solid fa-user" />
                    <h2>{user.email}</h2>
                    <i onClick={() => setSelectedUser([])} className="fa-solid fa-square-xmark" />
                </div>
                <div className="selected-user-body">
                    <div className="personal-details-cont">
                        <h4>Personal Details</h4>
                        {user.details ?
                            <>
                                <div className="personal-details">
                                    <h2>Name:</h2>
                                    <h3>{user.name}</h3>
                                </div>
                                <div className="personal-details">
                                    <h2>Age:</h2>
                                    <h3>{user.age}</h3>
                                </div>
                                <div className="personal-details">
                                    <h2>Sex:</h2>
                                    <h3>{user.sex}</h3>
                                </div>
                                <div className="personal-details">
                                    <h2>Address:</h2>
                                    <h3>{user.address}</h3>
                                </div>
                                <div className="personal-details">
                                    <h2>Contact Number:</h2>
                                    <h3>0{user.contactNumber}</h3>
                                </div>
                            </>
                            :
                            <h5>None</h5>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
