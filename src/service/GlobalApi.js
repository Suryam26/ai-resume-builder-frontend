import axios from 'axios';

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_KEY}`,
    },
});

const GetResumes = (userEmail) =>
    axiosClient.get(`/user-resumes?filters[userEmail][$eq]=${userEmail}`);
const GetResumeById = (id) => axiosClient.get(`/user-resumes/${id}?populate=*`);
const CreateResume = (data) => axiosClient.post('/user-resumes', data);
const UpdateResume = (id, data) => axiosClient.put(`/user-resumes/${id}`, data);
const DeleteResume = (id) => axiosClient.delete(`/user-resumes/${id}`);

export default {
    CreateResume,
    GetResumes,
    GetResumeById,
    UpdateResume,
    DeleteResume,
};
