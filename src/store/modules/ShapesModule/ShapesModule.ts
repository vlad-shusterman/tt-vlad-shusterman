import {ShapePrototype} from "@/models/ShapePrototype";
import {ActionContext} from 'vuex';
import {State} from '../..';
import {TeeterPrototype} from "@/models/TeeterPrototype";
import constants from "@/variables/constants";

type Context = ActionContext<ShapesState, State>;

export interface ShapesState {
    shapes: Array<ShapePrototype>;
    intervalFunction: number,
    teeter: TeeterPrototype,
    isStopped: boolean,
    fallingShape: ShapePrototype
}

function generateNewShape(state: ShapesState, addToRightSide: boolean, toggleIsFalling: boolean, isFalling: boolean) {
    const shape = new ShapePrototype();

    if (isFalling) {
        state.fallingShape = shape;
    }

    if (toggleIsFalling) {
        shape.toggleIsFalling();
    }

    if (addToRightSide) {
        state.teeter.addRightShape(shape);
    }

    state.shapes.push(shape);
}

function fallingSetInterval(state: ShapesState, toggleIsFalling: boolean) {

    if (toggleIsFalling) {
        state.fallingShape.toggleIsFalling();
    }

    state.intervalFunction = setInterval(() => {

        if (state.teeter.getBarAngle(state) === constants.FINISH_GAME_ANGLE) {
            window.history.go(); //Needs to be changed
        }

        state.fallingShape.incrementTopPosition();

        if (state.fallingShape.topPosition + constants.SHAPE_SIZE >= state.fallingShape
            .getTouchTopPosition(state.teeter.barPositionTop,state.teeter.getBarAngle(state))) {
            state.teeter.addLeftShape(state.fallingShape);
            state.fallingShape.toggleIsFalling();

            clearInterval(state.intervalFunction);
            generateNewShape(state, false, true, true)
            setTimeout(() => generateNewShape(state, true, false, false), constants.GENERATE_RIGHT_SHAPE_TIMEOUT);
            fallingSetInterval(state, false)
        }
    }, constants.FALLING_INTERVAL + constants.FALLING_SPEED_COEFFICIENT * state.fallingShape.weight / constants.AVERAGE_WEIGHT);
}

export default {
    getters: {
        shapes: (state: ShapesState) => state.shapes,
        fallingShape: (state: ShapesState) => state.shapes.find(shape => shape.isFalling),
        barAngle: (state: ShapesState) => state.teeter.getBarAngle(state),
        fallingShapeTopPosition: (state: ShapesState, getters: any) => getters.fallingShape?.getTopPosition(),
        isStopped: (state: ShapesState) => state.isStopped
    },
    mutations: {
        setShapes(state: ShapesState, shapes: Array<ShapePrototype>): void {
            state.shapes = shapes;
        },

        startFall(state: ShapesState) {
            state.isStopped = false;
            state.fallingShape = state.shapes[0]
            fallingSetInterval(state, false);
        },

        pauseFall(state: ShapesState) {
            state.isStopped = true;
            clearInterval(state.intervalFunction);
        },

        continueFall(state: ShapesState) {
            state.isStopped = false;
            fallingSetInterval(state, false);
        },

        addTeeter(state: ShapesState, teeter: TeeterPrototype) {
            state.teeter = teeter;
        },

        addShape(state: ShapesState, shape: ShapePrototype) {
            if (!state.shapes) {
                state.isStopped = true;
                state.shapes = [shape]
            } else {
                state.shapes.push(shape);
            }
        }
    },
    actions: {
        setShapes(context: Context, shapes: Array<ShapePrototype>) {
            context.commit('setShapes', shapes);
        },

        addShape(context: Context, shape: ShapePrototype) {
          context.commit('addShape', shape);
        },

        startFall(context: Context, id: number) {
            context.commit('startFall', id);
        },

        pauseFall(context: Context, id: number) {
            context.commit('pauseFall', id);
        },

        continueFall(context: Context, id: number) {
            context.commit('continueFall', id);
        },

        addTeeter(context: Context, teeter: TeeterPrototype) {
            context.commit('addTeeter', teeter);
        }
    }
}