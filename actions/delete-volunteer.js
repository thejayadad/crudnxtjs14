'use server'
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteVolunteer(formData){
    try {
        const id = formData.get('id'); // Get the value of 'id' field from formData
        await prisma.volunteer.delete({
            where: {
                id
            }
        })
    } catch (error) {
   
    }
    revalidatePath('/')
    redirect('/')
}