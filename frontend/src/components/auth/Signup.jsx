import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import axios from 'axios';
import { USER_API_URL } from '../../utils/constant.js';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

export default function SignUpPage() {
    const navigate = useNavigate(); // Use navigate hook
    const { loading } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        fullname: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: '',
        dp: ''
    });

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };

    const fileHandler = (e) => {
        setInput({
            ...input,
            dp: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(setLoading(true));
        const formData = new FormData();
        formData.append('fullname', input.fullname);
        formData.append('email', input.email);
        formData.append('phoneNumber', input.phoneNumber);
        formData.append('password', input.password);
        formData.append('role', input.role);
        if (input.dp) {
            formData.append('dp', input.dp);
        }

        try {
            const signUpRes = await axios.post(`${USER_API_URL}/register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            if (signUpRes.data.success) {
                toast.success(signUpRes.data.message || 'User registered successfully!');
                setTimeout(() => {
                    navigate('/login');
                }, 2000); // Wait for 2 seconds before navigating
            } else {
                toast.error(signUpRes.data.message || 'Registration failed.');
            }
        } catch (error) {
            console.error('Axios error:', error.message);
            toast.error('Failed to register user. Please try again.');
        }finally {
            dispatch(setLoading(false));
        }
    };


    return (
        <div className='flex items-center justify-center max-w-7xl mx-auto'>
            <form action="" className='w-1/2 border border-gray-200 rounded-md p-4 my-10' onSubmit={handleSubmit}>
                <h1 className='font-bold text-xl mb-5 border-gray-900'> SignUp</h1>

                <div>
                    <Label className='block my-3'>FullName</Label>
                    <Input
                        type="text"
                        name="fullname"
                        placeholder="John AppleSeed"
                        value={input.fullname}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <Label className='block my-3'>Email</Label>
                    <Input
                        type="text"
                        name="email"
                        placeholder="John@email.com"
                        value={input.email}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <Label className='block my-3'>Phone</Label>
                    <Input
                        type="phone"
                        name="phoneNumber"
                        placeholder="999-999-9999"
                        value={input.phoneNumber}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <Label className='block my-3'>Password</Label>
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={input.password}
                        onChange={handleChange}
                    />
                </div>

                <div className="space-y-2">
                    <Label className="block my-3">I am a:</Label>
                    <RadioGroup
                        name="role"
                        value={input.role}
                        onValueChange={(value) => setInput({ ...input, role: value })}
                        className="space-y-2"
                    >
                        <div className="flex items-center">
                            <RadioGroupItem value="student" id="student" className="mr-2" />
                            <Label htmlFor="student">Student</Label>
                        </div>

                        <div className="flex items-center">
                            <RadioGroupItem value="recruiter" id="recruiter" className="mr-2" />
                            <Label htmlFor="recruiter">Recruiter</Label>
                        </div>
                    </RadioGroup>
                </div>

                <div>
                    <Label className='block my-3'>Profile Picture</Label>
                    <Input
                        accept="image/*"
                        type="file"
                        name="dp"
                        onChange={fileHandler}
                    />
                </div>

                {
                    loading ? (
                        <Button className="w-full bg-black text-white border border-black hover:text-black hover:border-black my-5">
                            <Loader2 className='mr-2 h-4 w-4 bg-black animate-spin' /> Please Wait...
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full bg-black text-white border border-black hover:text-black hover:border-black my-5">
                            SignUp
                        </Button>
                    )
                }

                <p className="text-sm text-center text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary hover:underline">
                        LogIn
                    </Link>
                </p>
            </form>
        </div>
    );
}
