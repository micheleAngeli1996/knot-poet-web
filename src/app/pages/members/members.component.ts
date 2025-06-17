import {Component} from '@angular/core';
import {Member} from '../../models/Members';
import {AvatarModule} from 'primeng/avatar';
import {CardModule} from 'primeng/card';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {TranslatePipe} from '@ngx-translate/core';
import {NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'members',
  imports: [AvatarModule, CardModule, ScrollPanelModule, TranslatePipe, NgTemplateOutlet],
  templateUrl: './members.component.html',
  styleUrl: './members.component.css'
})
export class MembersComponent {

  members: Member[] = [
    {
      id: 'MA',
      age: 29,
      name: 'Michele',
      surname: 'Angeli',
      description: 'mitch.description',
      instrument: 'voice',
      nickname: 'Mitch',
      photo: 'mitch.png'
    },
    {
      id: 'FM',
      age: 30,
      name: 'Francesco',
      surname: 'Martinelli',
      description: 'francio.description',
      instrument: 'guitar',
      nickname: 'Francio',
      photo: 'francio.png'
    },
    {
      id: 'I.',
      age: 30,
      name: 'Ingemar',
      surname: '...',
      description: 'ingo.description',
      instrument: 'guitar',
      nickname: 'Ingo',
      photo: 'ingo.png'
    },
    {
      id: 'MC',
      age: 30,
      name: 'Michele',
      surname: 'Ciccia',
      description: 'echoes.description',
      instrument: 'bass',
      nickname: 'Echoes',
      photo: 'echoes.png'
    },
    {
      id: 'FD',
      age: 50,
      name: 'Federico',
      surname: '...',
      description: 'fede.description',
      instrument: 'drum',
      nickname: 'Fede',
      photo: 'fede.png'
    },
  ]

  get mitch() {
    return this.members.find(m => m.id == 'MA');
  }

  get francio() {
    return this.members.find(m => m.id == 'FM');
  }

  get ingo() {
    return this.members.find(m => m.id == 'I.');
  }

  get echoes() {
    return this.members.find(m => m.id == 'MC');
  }

  get fede() {
    return this.members.find(m => m.id == 'FD');
  }
}
