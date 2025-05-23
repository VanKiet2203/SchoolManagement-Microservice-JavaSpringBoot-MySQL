import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import studentApi from '../../services/studentApi';
import Header from '../common/Header';

const HomeStudent = ({ onLogout }) => {
    const [student, setStudent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await studentApi.get('/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setStudent(res.data);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu học sinh:", error);
                alert("Không thể tải thông tin học sinh.");
                navigate('/login');
            }
        };
        fetchStudent();
    }, [navigate]);

    if (!student) return <p className="text-center mt-10">Đang tải dữ liệu điểm...</p>;

    return (
        <div>
            <Header onLogout={onLogout} />
            <div className="max-w-6xl mx-auto mt-10 bg-white shadow-md rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
                    Bảng điểm của tôi
                </h2>
                <div className="overflow-x-auto">
                    <table className="student-table w-full text-center">
                        <thead>
                        <tr>
                            <th>Họ</th>
                            <th>Tên</th>
                            <th>Toán</th>
                            <th>Lý</th>
                            <th>Hóa</th>
                            <th>Văn</th>
                            <th>Anh</th>
                            <th>Hạnh kiểm</th>
                            <th>Điểm TB</th>
                            <th>Học lực</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{student.lastName}</td>
                            <td>{student.firstName}</td>
                            <td>{student.mathScore ?? '-'}</td>
                            <td>{student.physicsScore ?? '-'}</td>
                            <td>{student.chemistryScore ?? '-'}</td>
                            <td>{student.literatureScore ?? '-'}</td>
                            <td>{student.englishScore ?? '-'}</td>
                            <td>{student.behaviorScore ?? '-'}</td>
                            <td>{student.averageScore?.toFixed(2) ?? '-'}</td>
                            <td className="font-semibold text-blue-600">{student.academicPerformance ?? '-'}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HomeStudent;
