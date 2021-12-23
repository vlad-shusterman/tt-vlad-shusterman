import {Shape} from "@/models/Shape";

export interface Teeter {
  leftShapes: Array<Shape>,
  rightShapes: Array<Shape>,
  barPositionTop: number,
  barAngle: number
}