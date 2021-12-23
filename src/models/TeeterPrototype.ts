import {Teeter} from "@/models/Teeter";
import {ShapePrototype} from "@/models/ShapePrototype";
import {ShapesState} from "@/store/modules/ShapesModule/ShapesModule";

export class TeeterPrototype implements Teeter {
    leftShapes: Array<ShapePrototype> = [];
    rightShapes: Array<ShapePrototype> = [];
    barPositionTop: number = 0;
    barAngle: number = 0;

    addLeftShape(shape: ShapePrototype) {
        this.leftShapes.push(shape);
    }

    addRightShape(shape: ShapePrototype) {
        shape.right = ShapePrototype.generateRandomNumber(15, 47);
        this.rightShapes.push(shape);
    }

    setBarPositionTop(top: number) {
        this.barPositionTop = top;
    }

    setBarAngle(angle: number) {
        this.barAngle = angle;
    }

    calcLeftSideMomentum() {
        return this.leftShapes.map((shape) => shape.getMomentum(true))
            .reduce((acc, a) => acc + a, 0)
    }

    calcRightSideMomentum() {
        return this.rightShapes.map((shape) => shape.getMomentum(false))
            .reduce((acc, a) => acc + a, 0)

    }

    calcLeftSideWeight() {
        return this.leftShapes.map((shape) => shape.weight)
            .reduce((acc, a) => acc + a, 0)
    }

    calcRightSideWeight() {
        return this.rightShapes.map((shape) => shape.weight)
            .reduce((acc, a) => acc + a, 0)
    }

    checkIfOverWeight() {
        return Math.abs(this.calcRightSideWeight() - this.calcLeftSideWeight()) >= 20;
    }

    // x = (constants.ANGLE_TO_FOUNDATION*(M1/M2) - constants.ANGLE_TO_FOUNDATION) / (1 +  (M1/M2))
    getBarAngle(state: ShapesState) {
        if (state.teeter.leftShapes.length === 0) {
            return state.teeter?.rightShapes[0]?.weight / 20 * 30
        }

        if (state.teeter.checkIfOverWeight()) {
            return 30;
        }

        if (state.teeter.leftShapes.length > 0) {
            const angle = 64*(this.getMomentsCoefficient(state)) - 64 / (1 + this.getMomentsCoefficient(state))

            if (state.teeter.rightShapes.length < 3) {
                return angle > 30 ? 20 : angle
            }

            return angle > 30 ? 30 : angle
        }
        return 0
    }

    getMomentsCoefficient(state: ShapesState) {
        return state.teeter.calcRightSideMomentum() / state.teeter.calcLeftSideMomentum()
    }
}