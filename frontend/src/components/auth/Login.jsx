import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import axios from 'axios';
import { USER_API_URL } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

function Login() {
  // Use hooks at the top level of the component
  const dispatch = useDispatch();
  const { loading } = useSelector(store => store.auth);
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: '',
    password: '',
    role: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));

      const loginRes = await axios.post(`${USER_API_URL}/login`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (loginRes.data.success) {
        toast.success(loginRes.data.message || 'Login Successful!');
        navigate('/');
      } else {
        toast.error(loginRes.data.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Axios error:', error.message);
      toast.error('Failed to register user. Please try again.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className='flex items-center justify-center max-w-7xl mx-auto'>
      <form action="" className='w-1/2 border border-gray-200 rounded-md p-4 my-10' onSubmit={handleSubmit}>
        <h1 className='font-bold text-xl mb-5 border-gray-900'> LogIn</h1>

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

        {/* Conditional rendering of button */}
        {
          loading ? (
            <Button className="w-full bg-black text-white border border-black hover:text-black hover:border-black my-5">
              <Loader2 className='mr-2 h-4 w-4 bg-black animate-spin' /> Please Wait...
            </Button>
          ) : (
            <Button type="submit" className="w-full bg-black text-white border border-black hover:text-black hover:border-black my-5">
              LogIn
            </Button>
          )
        }

        <p className="text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary hover:underline">
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
