import './App.scss';

class App {
  constructor() {

    this.videoAR = 360 / 640;
    this.$video = document.querySelector('.video');
    this.$videoWrapper = document.querySelector('.video-wrapper');
    this.$logo = document.querySelector('.logo');
    this.byHeight = false;

    window.onload = this.init();

  }

  init() {

    this.checkSize();
    window.addEventListener('resize', this.checkSize.bind(this) );
    this.$video.play();

    /*setTimeout(()=>{
      this.$logo.classList.add('is-shrinked');
    }, 1000);*/

  }

  checkSize() {

    const windowAR = window.innerHeight/window.innerWidth;

    if(windowAR > this.videoAR) {

      this.byHeight = true;
      this.$videoWrapper.classList.add('by-height');
      this.$video.style.width = window.innerHeight * (640 / 360) + 'px';
      this.$video.style.left = -(window.innerHeight * (640 / 360)) / 2 + 'px';

    } else {

      if (!this.byHeight) return;
      this.byHeight = false;
      this.$videoWrapper.classList.remove('by-height');
      this.$video.removeAttribute('style');

    }

  }
}

export default App;