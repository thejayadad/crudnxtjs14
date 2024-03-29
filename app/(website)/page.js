import { createProject } from '@/actions/create-project'
import { prisma } from '@/lib/prisma'
import { Button, Input } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'
import {FiArrowDown, FiPlus} from "react-icons/fi"

const HomePage = async () => {
  const projects = await prisma.project.findMany({
    
  })
  return (
    <main className='flex items-center justify-between px-24 flex-col'>
        <h1 className='text-3xl md:text-5xl -tracking-tighter font-extrabold'>Add Project</h1>
        <span>Enter Your Project Name Below</span>
        <div>
        <form
        action={createProject}
        className='flex flex-col md:w-[1000px]'
        >
          <FiArrowDown
          className='flex items-center w-full mt-4 mb-4'
          />
          <div className='flex'>
          <Input
          className='cursor-pointer'
            placeholder='Project Name'
            id='name'
            type='text'
            name='name'
          />
          <Button
          type='submit'
          className='hover:bg-primary-50'
           isIconOnly color="warning" variant="faded"
          >
            <FiPlus />
          </Button>
          </div>
        </form>
        </div>
        <div className='grid grid-cols-2  md:grid-cols-4 gap-4 w-full mt-8'>
         {projects.map(project => (
          <Link
          key={project.id}
          href={`/project/${project.id}`}

          className='p-4 hover:bg-primary/60 bg-primary text-white cursor-pointer rounded-lg'>
            {project.name}
          </Link>
         ))}
        </div>
    </main>
  )
}

export default HomePage