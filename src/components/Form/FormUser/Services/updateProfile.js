import { getUserService } from "@/utils/request";

export const update = async (formData) => {
    await getUserService.post('auth/me?_method=PATCH', formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}

export * as userService from "@/components/Form/FormUser/Services/updateProfile"