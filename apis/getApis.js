import callApi from './axiosClient';

export const getListCategory = () => {
    return callApi('api/user/listCategory', 'get')
        .then((res) => {
            return res.data.data;
        })
        .catch((e) => {
            console.log('list category:' + e);
        });
};

export const getListDoctor = (id) => {
    const link = `api/user/listDoctor?categoryId=${id}&lon=0&lat=0&page=0&rating=0`;
    return callApi(link, 'get')
        .then((res) => {
            return res.data.data;
            // console.log(res.data.data);
        })
        .catch((e) => {
            console.log('list doctor:' + e);
        });
};

export const getProfile = () => {
    return callApi('api/patient/myProfile', 'get')
        .then((res) => {
            return res.data.data;
        })
        .catch((e) => {
            console.log('profile:' + e);
        });
};

export const getDoctorId = (id) => {
    const link = `find/doctor/${id}`;
    return callApi(link, 'get')
        .then((res) => {
            return res.data.data;
            // console.log(res.data.data);
        })
        .catch((e) => {
            console.log('doctor id:' + e);
        });
};

export const getListFreeTime = (doctorId, freeTime) => {
    return callApi('api/user/listFreeTime', 'post', {
        doctorId: doctorId,
        time: freeTime,
    })
        .then((res) => {
            return res.data.data;
            // console.log(res.data.data);
        })
        .catch((e) => {
            console.log('list free time:' + e);
        });
};
export const getAppId = (setDatas, id) => {
    const link = `api/user/appointment?id=${id}`;
    console.log(link);
    callApi(link, 'get')
        .then((res) => {
            setDatas(res.data.data);
            console.log(res.data.data);
        })
        .catch((e) => {
            console.log('doctor id:' + e);
        });
};
export const getDataSS = (id) => {
    const link2 = `api/patient/listAppointment?status=2&page=${id}`;
    return callApi(link2, 'get')
        .then((res) => {
            return res.data.data;
        })
        .catch((e) => {
            console.log('list appointment:' + e);
        });
};
