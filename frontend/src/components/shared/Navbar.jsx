import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"


import React from 'react'
import { Link } from 'react-router-dom'
import { LogOut, User2 } from "lucide-react"

function Navbar() {
    let user = false;
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <h1 className='text 2xl font-bold'>Job <span className='text-[#F83002]'>Portal</span></h1>
                <div className="flex items-center gap-12">
                    <ul className='flex font-medium items-center gap-5'>
                        <li><Link to={'/'}>Home</Link></li>
                        <li><Link to={'/jobs'}>Jobs</Link></li>
                        <li><Link to={'/browse'}>Browse</Link></li>
                    </ul>
                    {
                        !user ? (
                            <div className="flex gap-3 cursor-pointer items-center">
                                <Link to="/login">
                                    <Button variant="outline">LogIn</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">SignUp</Button>
                                </Link>
                            </div>) : (

                            <Popover >
                                <PopoverTrigger>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className="flex gap-4 space-y-2">
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                        </Avatar>
                                        <div>
                                            <h4 className="font-medium">Username</h4>
                                            <p className="text-sm text-muted-foreground">Lorem ipsum</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 text-gray-600">
                                        <div className="flex gap-2 w-fit items-center">
                                            <User2></User2>
                                            <Button variant="link">View Profile</Button>
                                        </div>

                                        <div className="flex gap-2 w-fit items-center">
                                            <LogOut></LogOut>
                                            <Button variant="link">Logout</Button>
                                        </div>

                                    </div>

                                </PopoverContent>
                            </Popover>

                        )

                    }


                </div>
            </div>

        </div>
    )
}

export default Navbar