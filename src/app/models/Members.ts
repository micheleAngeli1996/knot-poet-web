import {Person} from './Person';

export interface Member extends Person {
  nickname: string,
  instrument: string,
  description: string,
  shortDescription: string,
  curriculum: string;
}
