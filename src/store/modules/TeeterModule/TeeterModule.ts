import {ActionContext} from "vuex";
import {State} from "@/store";
import {ShapePrototype} from "@/models/ShapePrototype";
import {TeeterPrototype} from "@/models/TeeterPrototype";

type Context = ActionContext<TeeterState, State>;

export interface TeeterState {
    teeter: TeeterPrototype;
    topPosition: number;
}

export default {
    getters: {
        teeter: (state: TeeterState) => state.teeter
    },

    mutations: {
        setTeeter(state: TeeterState, teeter: TeeterPrototype) {
            state.teeter = teeter
        }
    },
    actions: {
        setTeeter(context: Context,  teeter: TeeterPrototype) {
            context.commit('setTeeter', teeter);
        }
    }
}