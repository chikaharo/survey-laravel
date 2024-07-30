import { defineStore } from "pinia";

export const useNotificationStore = defineStore("notification", {
    state: () => ({
        show: true,
        type: "success",
        message: "This is notification using teleport",
    }),
    actions: {
        // since we rely on `this`, we cannot use an arrow function
        open(message: string, type: string) {
            this.show = true;
            this.message = message;
            this.type = type;
        },
        close() {
            this.show = false;
            this.message = "";
            this.type = "";
        },
        toggle() {
            this.show = !this.show;
        },
        randomizeCounter() {
            this.show = false;
            this.message = "Hello from Huy Dinh";
        },
    },
});
