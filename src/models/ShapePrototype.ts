import {Shape} from "@/models/Shape";
import {ShapeTypes} from "@/models/ShapeTypes";
import constants from "@/variables/constants";

export class ShapePrototype implements Shape {

    static _id: number = 0; //we could also use generators for this purpose
    id: number;
    positionFromCenter: number = 1;
    color: string;
    type: ShapeTypes;
    topPosition: number = 0;
    isFalling: boolean;
    weight: number;
    right: number = 0;
    left: number = 25;

    constructor(color?: string, type?: ShapeTypes, weight?: number) {
        this.color = color || ShapePrototype.generateRandomRGBColor();
        this.type = type || ShapePrototype.randomType(ShapeTypes);
        this.weight = weight || ShapePrototype.generateRandomNumber(constants.SHAPE_MIN_WEIGHT, constants.SHAPE_MAX_WEIGHT)
        this.id = ShapePrototype._id++;
        this.isFalling = false;
    }

    setColor(color: string) {
    }
    setPosition(left: number) {
    }

    setTopPosition(top: number) {
        this.topPosition = top;
    }

    private static generateRandomRGBColor() {
        const maxValue = constants.RGB_MAX_COLOR;
        const r = ShapePrototype.generateRandomNumber(0, maxValue);
        const g = ShapePrototype.generateRandomNumber(0, maxValue);
        const b = ShapePrototype.generateRandomNumber(0, maxValue);
        return `rgb(${ r }, ${ g }, ${ b })`;
    }

    public static generateRandomNumber(min = 0, max = 1) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    private static randomType<T>(anEnum: T): T[keyof T] {
        const enumValues = (Object.values(anEnum) as unknown) as T[keyof T][];
        const randomIndex = Math.floor(Math.random() * enumValues.length);
        return enumValues[randomIndex];
    }

    incrementTopPosition() {
        this.setTopPosition(this.topPosition + constants.FALLING_SHAPE_STEP)
    }

    toggleIsFalling() {
        this.isFalling = !this.isFalling;
    }

    getTopPosition() {
        return this.topPosition;
    }

    getMomentum(isLeftSide: boolean): number {
        return isLeftSide ? this.weight * (constants.SIDE_SIZE - this.left) :  this.weight * (constants.SIDE_SIZE - this.right);  //M = FI
    }

    getTouchTopPosition(teeterBarTopPosition: number, barAngle: number) {
        const rad = barAngle * Math.PI / constants.HALF_CIRCLE_DEGREE;

        return this.calcTouchPosition(rad, barAngle, teeterBarTopPosition);
    }

    calcTouchPosition(rad: number, barAngle: number, teeterBarTopPosition: number) {
        if (barAngle >= constants.MAX_ANGLE_STARTING_POINT && this.left < constants.MID_LEFT_SCREEN_POINT) {
            return teeterBarTopPosition - (Math.tan(rad) * (constants.SIDE_SIZE - this.left)) - constants.DEG_INFELICITY
        }

        return teeterBarTopPosition - (Math.tan(rad) * (constants.SIDE_SIZE - this.left)) + constants.SIDE_SIZE
    }

    moveRight() {
        if (this.left <= constants.MAX_LEFT_BLOCK) {
            this.left ++;
        }
    }

    moveLeft() {
        if (this.left >= constants.MIN_LEFT_BLOCK) {
            this.left --;
        }
    }
}