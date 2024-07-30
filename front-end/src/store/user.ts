import { defineStore } from "pinia";
import { CLIENT_RENEG_LIMIT } from "tls";
import { ref, computed } from "vue";
import axiosClient from "@/axios";

export interface UserData {
    id: number | null;
    name: string | null;
    email: string | null;
    email_verified_at?: string | null;
}

export const useUserStore = defineStore("user", {
    state: (): IUser => ({
        token: null,
        user: {
            name: "Huy Dinh",
            email: "rongbattustyle@gmail.com",
            id: null,
        },
    }),
    actions: {
        // logout() {
        //     this.token = "";
        //     this.user = {
        //         name: "",
        //         email: "",
        //         id: null,
        //     };
        // },
        setUser(userData: IUserResponse) {
            this.token = userData.token as string;
            const newUserData: UserData = {
                email: userData.user?.email as string,
                name: userData.user?.name as string,
                id: userData.user?.id as number,
            };
            this.user = newUserData;
        },
        async registerUser(data: IRegsterUser) {
            try {
                const resData: IUserResponse = await axiosClient.post(
                    "/register",
                    data
                );
                console.log({ resData });
                localStorage.setItem("token", resData.token as string);
                this.setUser(resData);
            } catch (error: any) {
                console.log("registerUser error: ", error);
                throw new Error(error);
            }
        },
        async loginUser(data: ILoginUser) {
            try {
                // const res = await fetch("http://127.0.0.1:8000/api/login", {
                //     headers: {
                //         "Content-Type": "application/json",
                //         Accept: "application/json",
                //     },
                //     credentials: "same-origin",
                //     method: "POST",
                //     body: JSON.stringify(data),
                // });
                const res = await axiosClient.post("/login", data);

                const resData = res.data;
                //@ts-ignore
                // if (resData.errors) {
                //     throw new Error(resData.message);
                // }
                localStorage.setItem("token", resData.token! as string);

                this.setUser(resData);
            } catch (error: any) {
                console.log("registerUser error: ", error);
                throw new Error(error);
            }
        },
        async logoutUser() {
            try {
                await axiosClient.post("/logout");
                this.token = null;
                const initialUser: UserData = {
                    name: "",
                    email: "",
                    id: null,
                };
                this.user = initialUser;
                localStorage.removeItem("token");
            } catch (error) {}
        },
    },

    // return { token, data, logout };
});

export interface IUser {
    token: string | null;
    user: UserData;
}

export interface IRegsterUser {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface ILoginUser {
    email: string;
    password: string;
    remember: boolean;
}

interface IUserResponse {
    token?: string;
    user?: UserData;
    errors?: boolean;
    message?: string;
}
