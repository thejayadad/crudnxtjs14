'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createVolunteer(formData) {
    let newProject;
    try {
        const projectId = formData.get('projectId'); // Get the value of 'id' field from formData
        const name = formData.get('name'); // Get the value of 'name' field from formData
        const phone = formData.get('phone'); // Get the value of 'id' field from formData
        const email = formData.get('email'); // Get the value of 'id' field from formData


        newProject = await prisma.volunteer.create({
            data: {
                name, phone, email, projectId
            }
        });

    } catch (error) {
        throw new Error('Error ' + error);
    }
    revalidatePath(`/`);
    redirect(`/`)
}
