import Phaser from 'phaser';
import leaderboard from '../leaderboard';


export default class SubmitScore extends Phaser.Scene {
  init(data) {
    this.score = data;
  }

  constructor() {
    super('Submit');
  }

  create() {
    let name = '';

    this.anims.create({
      key: 'loading',
      frames: this.anims.generateFrameNumbers('loadIcon', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });


    const submitInfo = () => {
      const test = document.createElement('h4');
      name = document.getElementById('name').value;
      if (name.length >= 5) {
        this.character.visible = false;
        this.loadIcon.visible = true;
        this.loadIcon.anims.play('loading');
        const result = leaderboard.addScore(name, this.score);
        result.then(() => {
          this.scene.start('Over');
        }).catch(() => {
          this.loadIcon.visible = false;
          this.add.text(250, 200, 'Sorry! Something went wrong :( ', {
            fontSize: '20px',
            fill: '#000',
          });
        });
      } else {
        test.innerText = 'Name is too short';
        this.add.dom(400, 110, test);
      }
    };

    this.add.image(400, 300, 'background');
    this.character = this.add.image(400, 300, 'character');
    this.loadIcon = this.add.sprite(400, 300, 'loadIcon');
    this.loadIcon.visible = false;

    const inputText = document.createElement('input');
    inputText.type = 'text';
    inputText.id = 'name';
    this.add.dom(400, 400, inputText);

    const text = document.createElement('h2');
    text.innerText = 'Please enter a username';
    text.id = 'text';
    this.add.dom(400, 520, text);
    this.input.keyboard.on('keydown-ENTER', submitInfo, this);
  }
}
