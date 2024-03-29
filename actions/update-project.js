'use server'

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProject(formData) {
    let updatedProject;
    try {
        const id = formData.get('id'); // Get the value of 'id' field from formData
        const name = formData.get('name'); // Get the value of 'name' field from formData

        const existingProject = await prisma.project.findUnique({
            where: {
                id: id,
            },
        });

        if (!existingProject) {
            throw new Error('Project not found');
        }

        updatedProject = await prisma.project.update({
            where: {
                id: id,
            },
            data: {
                name: name
            }
        });

    } catch (error) {
        throw new Error('Error ' + error);
    }
    
    revalidatePath(`/project/${updatedProject.id}`);
    redirect(`/project/${updatedProject.id}`);
}