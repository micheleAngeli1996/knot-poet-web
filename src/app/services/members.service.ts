import {Injectable} from '@angular/core';
import {Member} from '../models/Members';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private _members: Member[] = [
    {
      id: 'MA',
      age: 29,
      fullname: 'Michele Angeli',
      name: 'Michele',
      surname: 'Angeli',
      description: 'mitch.description',
      shortDescription: 'mitch.shortDescription',
      instrument: 'voice',
      nickname: 'Mitch',
      photo: 'mitch.png',
      curriculum: "mitch.curriculum"
    },
    {
      id: 'FM',
      age: 30,
      fullname: 'Francesco Martinelli',
      name: 'Francesco',
      surname: 'Martinelli',
      description: 'francio.description',
      shortDescription: 'francio.shortDescription',
      instrument: 'guitar',
      nickname: 'Francio',
      photo: 'francio.png',
      curriculum: 'francio.curriculum'
    },
    {
      id: 'I',
      age: 30,
      fullname: 'Ingemar',
      name: 'Ingemar',
      surname: '...',
      description: 'ingo.description',
      shortDescription: 'ingo.shortDescription',
      instrument: 'guitar',
      nickname: 'Ingo',
      photo: 'ingo.png',
      curriculum: ''
    },
    {
      id: 'MC',
      age: 30,
      fullname: 'Michele Ciccia',
      name: 'Michele',
      surname: 'Ciccia',
      description: 'echoes.description',
      shortDescription: 'echoes.shortDescription',
      instrument: 'bass',
      nickname: 'Echoes',
      photo: 'echoes.png',
      curriculum: 'echoes.curriculum'
    },
    {
      id: 'FD',
      age: 50,
      fullname: 'Federico',
      name: 'Federico',
      surname: '...',
      description: 'fede.description',
      shortDescription: 'fede.shortDescription',
      instrument: 'drum',
      nickname: 'Fede',
      photo: 'fede.png',
      curriculum: 'fede.curriculum'
    },
  ];

  get members() {
    return this._members;
  }

  getMember(memberId: string) {
    return this.members.find(m => m.id === memberId);
  }
}
