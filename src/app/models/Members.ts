import {Person} from './Person';

export interface Member extends Person {
  nickname: string,
  instrument: string,
  description: string,
  shortDescription: string,
  longDescription: string;
  order: number;
}
