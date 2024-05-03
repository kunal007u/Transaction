import { FaRegUser } from "react-icons/fa";

const CustomProfilePicUpload = ({ profile_pic_url ,onUploadClick}) => {

    return (
        <div dispatchEvent className="relative flex justify-center" >

            <div className="relative w-24 h-24 rounded-full overflow-hidden cursor-pointer"onClick={onUploadClick}>
                {
                    profile_pic_url ? (
                            <img src={profile_pic_url} alt="profile-pic" className="w-full h-full object-cover" />
                    ) : (
                        <div className="absolute w-full h-full bg-gray-600 bg-opacity-50 flex items-center justify-center">
                            <FaRegUser className="text-white text-3xl" />
                        </div>
                    )
                }

            </div>
            {
                    <div className="absolute bottom-0 left-[27rem] bg-gray-200 rounded-full p-1 shadow-md plus-icon cursor-pointer" onClick={onUploadClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
            }
        </div>

    )
}

export default CustomProfilePicUpload