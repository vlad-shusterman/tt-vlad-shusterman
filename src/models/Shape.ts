import {ShapeTypes} from "@/models/ShapeTypes";

export interface Shape {
    id: number;
    positionFromCenter: number;
    color: string;
    topPosition: number;
    isFalling: boolean;
    weight: number;
    right: number;
    left: number;

    setPosition(left: number): void;

    setColor(color: string): void;

    setTopPosition(top: number): void;

    incrementTopPosition(): void

    toggleIsFalling(): void

    getTopPosition(): number;

    moveRight(): void;

    moveLeft(): void;

    getMomentum(isLeftSide: boolean): number;

    type: ShapeTypes
}