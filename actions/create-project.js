'use server'
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProject(formData) {
    let newProject;
    try {
        const name = formData.get('name'); // Get the value of 'name' field from formData

        newProject = await prisma.project.create({
            data: {
                name
            }
        });

    } catch (error) {
        throw new Error('Error ' + error);
    }
    revalidatePath(`/project/${newProject.id}`);
    redirect(`/project/${newProject.id}`)
}
