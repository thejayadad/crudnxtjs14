import { createVolunteer } from '@/actions/create-volunteer';
import { deleteProject } from '@/actions/delete-project';
import { deleteVolunteer } from '@/actions/delete-volunteer';
import { updateProject } from '@/actions/update-project';
import { prisma } from '@/lib/prisma';
import { Button, Input, Navbar, NavbarContent, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';
import { FiArrowLeft, FiPlus, FiTrash } from 'react-icons/fi';

const ProjectPage = async ({ params }) => {
    const id = params.id;
    console.log("ID " + id);
    const data = await prisma.project.findUnique({
        where: {
            id: id,
        },
        include: {
            volunteers: true,
        },
    });

    const renderVolunteers = () => {
        if (data.volunteers.length === 0) {
            return (
                <div>
                    <div className='flex md:w-[1000px] p-3'>
                        <form
                        action={createVolunteer}
                        className='flex w-full gap-4'
                        >
                            <input hidden defaultValue={data.id} name='projectId' id='projectId' />
                            <Input
                                placeholder='Name'
                                name='name'
                                id='name'
                            />
                            <Input
                                placeholder='Email'
                                name='email'
                                id='email'
                            />
                            <Input
                                placeholder='Phone'
                                name='phone'
                                id='phone'
                            />
                            <button
                            type='submit'
                            className='flex gap-2 items-center'
                            >
                                <FiPlus />
                                <span className='flex text-sm'>Add Volunteer</span>
                            </button>
                        </form>
                        
                    </div>
                    <div className='text-center'>No volunteers found for this project.</div>
                </div>
            );
        }

        return (
            <div className='flex flex-col gap-8'>
            <form action={createVolunteer} className='flex w-full gap-4'>
                <input hidden defaultValue={data.id} name='projectId' id='projectId' />
                <Input placeholder='Name' name='name' id='name' />
                <Input placeholder='Email' name='email' id='email' />
                <Input placeholder='Phone' name='phone' id='phone' />
                <button type='submit' className='flex gap-2 items-center'>
                    <FiPlus />
                    <span className='flex text-sm'>Add Volunteer</span>
                </button>
            </form>
            <div className='rounded-lg'>
    <table className='min-w-full leading-normal rounded-lg overflow-hidden'>
        <thead>
            <tr className='bg-gray-200 rounded-lg'>
                <th className='px-5 py-3 border-b-2 border-purple-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Name</th>
                <th className='px-5 py-3 border-b-2 border-purple-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Email</th>
                <th className='px-5 py-3 border-b-2 border-purple-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Phone</th>
                <th className='px-5 py-3 border-b-2 border-purple-300  text-xs font-semibold text-gray-600 uppercase tracking-wider'>Action</th>
            </tr>
        </thead>
        <tbody>
            {data.volunteers.map((volunteer) => (
                <tr key={volunteer.id} className='hover:bg-gray-100 rounded-lg transition-colors duration-300'>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                        {volunteer.name}
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                        {volunteer.email}
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                        {volunteer.phone}
                    </td>
                    <td className='text-center border-b border-gray-200 bg-white text-sm'>
                     <form
                     action={deleteVolunteer}
                     >
                        <input hidden defaultValue={volunteer.id} name='id' />

                        <button>
                            <FiTrash size={20} className='hover:text-red-400'/> 
                        </button>
                     </form>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
            </div>
      
        </div>
        );
    };
    return (
        <main className='flex items-center justify-between px-6 flex-col'>
            <Navbar className='flex items-center'>
                <NavbarContent>
                    <Link className='flex items-center' href={'/'}>
                        <FiArrowLeft size={30} />
                        <span>Back</span>
                    </Link>
                </NavbarContent>
                <NavbarContent justify='center'>
                    <form action={updateProject} className='flex'>
                        <input hidden defaultValue={data.id} name='id' />
                        <Input defaultValue={data.name} name='name' id='name' />
                        <Button
                            type='submit'
                            className='hover:bg-primary-50'
                            isIconOnly
                            color='warning'
                            variant='faded'
                        >
                            <FiPlus />
                        </Button>
                    </form>
                </NavbarContent>
                <NavbarContent justify='end'>
                    <form action={deleteProject}>
                        <input hidden defaultValue={data.id} name='id' />
                        <button type='submit' className='hover:text-red-600'>
                            <FiTrash size={30} />
                        </button>
                    </form>
                </NavbarContent>
            </Navbar>
            <div className='flex flex-col items-center mt-8'>
                {renderVolunteers()}
            </div>
        </main>
    );
};

export default ProjectPage;
  