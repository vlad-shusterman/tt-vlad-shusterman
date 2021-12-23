import { createStore, Store } from 'vuex'
import ShapesModule, {ShapesState} from "@/store/modules/ShapesModule/ShapesModule";
import TeeterModule, {TeeterState} from "@/store/modules/TeeterModule/TeeterModule";


export interface State {
    shapes: ShapesState,
    teeter: TeeterState
}


export const store = createStore<State>({
    modules: {
        shapes: ShapesModule,
        teeter: TeeterModule
    }
})