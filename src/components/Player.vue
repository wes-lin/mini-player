<script setup>
import { reactive,ref,computed } from 'vue'
import client from '@/clients/gh'

const tracks = reactive([
        {
          name: 'Mekanın Sahibi',
          artist: 'Norm Ender',
          cover: 'https://cdn.jsdelivr.net/gh/muhammederdem/mini-player/img/1.jpg',
          source: 'https://cdn.jsdelivr.net/gh/muhammederdem/mini-player/mp3/1.mp3',
          url: 'https://www.youtube.com/watch?v=z3wAjJXbYzA',
          favorited: false,
        },
        {
          name: 'Everybody Knows',
          artist: 'Leonard Cohen',
          cover: 'https://cdn.jsdelivr.net/gh/muhammederdem/mini-player/img/2.jpg',
          source: 'https://cdn.jsdelivr.net/gh/muhammederdem/mini-player/mp3/2.mp3',
          url: 'https://www.youtube.com/watch?v=Lin-a2lTelg',
          favorited: true,
        },
        {
          name: 'Extreme Ways',
          artist: 'Moby',
          cover: 'https://cdn.jsdelivr.net/gh/muhammederdem/mini-player/img/3.jpg',
          source: 'https://cdn.jsdelivr.net/gh/muhammederdem/mini-player/mp3/3.mp3',
          url: 'https://www.youtube.com/watch?v=ICjyAe9S54c',
          favorited: false,
        },
        {
          name: 'Butterflies',
          artist: 'Sia',
          cover: 'https://cdn.jsdelivr.net/gh/muhammederdem/mini-player/img/4.jpg',
          source: 'https://cdn.jsdelivr.net/gh/muhammederdem/mini-player/mp3/4.mp3',
          url: 'https://www.youtube.com/watch?v=kYgGwWYOd9Y',
          favorited: false,
        },
        {
          name: 'The Final Victory',
          artist: 'Haggard',
          cover: 'https://cdn.jsdelivr.net/gh/muhammederdem/mini-player/img/5.jpg',
          source: 'https://cdn.jsdelivr.net/gh/muhammederdem/mini-player/mp3/5.mp3',
          url: 'https://www.youtube.com/watch?v=0WlpALnQdN8',
          favorited: true,
        },
        {
          name: 'Genius ft. Sia, Diplo, Labrinth',
          artist: 'LSD',
          cover: 'https://cdn.jsdelivr.net/gh/muhammederdem/mini-player/img/6.jpg',
          source: 'https://cdn.jsdelivr.net/gh/muhammederdem/mini-player/mp3/6.mp3',
          url: 'https://www.youtube.com/watch?v=HhoATZ1Imtw',
          favorited: false,
        },
        {
          name: 'The Comeback Kid',
          artist: 'Lindi Ortega',
          cover: 'https://cdn.jsdelivr.net/gh/muhammederdem/mini-player/img/7.jpg',
          source: 'https://cdn.jsdelivr.net/gh/muhammederdem/mini-player/mp3/7.mp3',
          url: 'https://www.youtube.com/watch?v=me6aoX0wCV8',
          favorited: true,
        },
        {
          name: 'Overdose',
          artist: 'Grandson',
          cover: 'https://cdn.jsdelivr.net/gh/muhammederdem/mini-player/img/8.jpg',
          source: 'https://cdn.jsdelivr.net/gh/muhammederdem/mini-player/mp3/8.mp3',
          url: 'https://www.youtube.com/watch?v=00-Rl3Jlx-o',
          favorited: false,
        },
        {
          name: 'Rag\'n\'Bone Man',
          artist: 'Human',
          cover: 'https://cdn.jsdelivr.net/gh/muhammederdem/mini-player/img/9.jpg',
          source: 'https://cdn.jsdelivr.net/gh/muhammederdem/mini-player/mp3/9.mp3',
          url: 'https://www.youtube.com/watch?v=L3wKzyIN1yk',
          favorited: false,
        },
      ])

const currentTrackIndex = ref(0)
const isTimerPlaying = ref(false)
const barWidth = ref()
const circleLeft = ref()
const duration = ref()
const currentTime = ref()
const transitionName = ref()
const progress = ref(null)
const audio = reactive(new Audio())

const keyword = ref('')
const repositories = reactive([])
const showPath = ref(false)
const paths = reactive([])
const selectedRepository = ref('')

const currentTrack = computed(() => {
  return tracks[currentTrackIndex.value]
})

const secFormat = (val) => {
    let durmin = Math.floor(val / 60)
    let dursec = Math.floor(val - durmin * 60)
    if (durmin < 10) {
        durmin = `0${durmin}`
    }
    if (dursec < 10) {
        dursec = `0${dursec}`
    }
    return `${durmin}:${dursec}`
}


const generateTime = () => {
    const width = (100 / audio.duration) * audio.currentTime
    barWidth.value = `${width}%`
    circleLeft.value = `${width}%`
    duration.value = secFormat(audio.duration)
    currentTime.value = secFormat(audio.currentTime)
}

const play = () => {
  if (audio.paused) {
    audio.play()
    isTimerPlaying.value = true
  } else {
    audio.pause()
    isTimerPlaying.value = false
  }
}

const favorite = () => {
  currentTrack.value.favorited = !currentTrack.value.favorited
}

const resetPlayer = () => {
  barWidth.value = 0
  circleLeft.value = 0
  audio.currentTime = 0
  audio.src = currentTrack.value.source
  setTimeout(() => {
    if (isTimerPlaying.value) {
      audio.play()
    } else {
      audio.pause()
    }
  }, 300)
}

const prevTrack = () => {
  transitionName.value = 'scale-in'
  if (currentTrackIndex.value > 0) {
    currentTrackIndex.value -= 1
  } else {
    currentTrackIndex.value = tracks.length - 1
  }
  resetPlayer()
}

const nextTrack = () => {
  transitionName.value = 'scale-out'
  if (currentTrackIndex.value < tracks.length - 1) {
    currentTrackIndex.value += 1
  } else {
    currentTrackIndex.value = 0
  }
  resetPlayer()
}

const updateBar = (x) => {
    const maxduration = audio.duration
    const position = x - progress.value.offsetLeft
    let percentage = (100 * position) / progress.value.offsetWidth
    if (percentage > 100) {
      percentage = 100
    }
    if (percentage < 0) {
      percentage = 0
    }
    barWidth.value = `${percentage}%`
    circleLeft.value = `${percentage}%`
    audio.currentTime = (maxduration * percentage) / 100
    audio.play()
}

const clickProgress = (e) => {
    isTimerPlaying.value = true
    audio.pause()
    updateBar(e.pageX)
}

// init player
audio.src = currentTrack.value.source
audio.ontimeupdate = () => {
    generateTime()
}
audio.onloadedmetadata = () => {
    generateTime()
}
audio.onended = () => {
    nextTrack()
    isTimerPlaying.value = true
}

const showDialog = ref(false)

const opendDialog = () => {
  showDialog.value = true
}

const closeDialog = () => {
  showDialog.value = false
}

const search = () => {
  client.get('/search/repositories',{
    params:{
      q:keyword.value
    }
  }).then(res => {
    console.log(res.data.items)
    const items = res.data.items.map(item => {
      return {
        id:item.id,
        full_name:item.full_name,
        avatar_url:item.owner.avatar_url
      }
    })
    repositories.push(... items)
  })
}

const getPaths = (dir) => {
  showPath.value = true
  selectedRepository.value = dir
  client.get(`/repos/${dir}/contents`).then(res => {
    const dirPaths = res.data.filter(path => path.type === 'dir' && !path.path.startsWith('.'))
    console.log(dirPaths)
    paths.push(... dirPaths)
  })
}

const back = () => {
  showPath.value = false
  paths.length = 0
}

// this is optional (for preload covers)
// for (let index = 0; index < tracks.length; index += 1) {
//   const element = tracks[index];
//   const link = document.createElement('link');
//   link.rel = 'prefetch';
//   link.href = element.cover;
//   link.as = 'image';
//   document.head.appendChild(link);
// }

</script>

<template>
  <div class="player">
    <div class="player__top">
      <div class="player-cover">
        <transition
          :name="transitionName"
          appear
        >
          <div
            :key="currentTrackIndex"
            class="player-cover__item"
            :style="{ backgroundImage: `url(${currentTrack.cover})` }"
          />
        </transition>
      </div>
      <div class="player-controls">
        <div
          class="player-controls__item -favorite"
          :class="{ active : currentTrack.favorited }"
          @click="favorite"
        >
          <w-icon icon-class="heart-o" />
        </div>
        <a
          :href="currentTrack.url"
          target="_blank"
          class="player-controls__item"
        >
          <w-icon icon-class="link" />
        </a>
        <div
          class="player-controls__item"
          @click="prevTrack"
        >
          <w-icon icon-class="pre" />
        </div>
        <div
          class="player-controls__item"
          @click="nextTrack"
        >
          <w-icon icon-class="next" />
        </div>
        <div
          class="player-controls__item"
          @click="opendDialog"
        >
          <w-icon icon-class="plus" />
        </div>
        <div
          class="player-controls__item -xl js-play"
          @click="play"
        >
          <w-icon
            v-if="isTimerPlaying"
            icon-class="pause"
          />
          <w-icon
            v-else
            icon-class="play"
          />
        </div>
      </div>
    </div>
    <div
      ref="progress"
      class="progress"
    >
      <div class="progress__top">
        <div
          v-if="currentTrack"
          class="album-info"
        >
          <div class="album-info__name">
            {{ currentTrack.artist }}
          </div>
          <div class="album-info__track">
            {{ currentTrack.name }}
          </div>
        </div>
        <div class="progress__duration">
          {{ duration }}
        </div>
      </div>
      <div
        class="progress__bar"
        @click="clickProgress"
      >
        <div
          class="progress__current"
          :style="{ width : barWidth }"
        />
      </div>
      <div class="progress__time">
        {{ currentTime }}
      </div>
    </div>
    <div v-cloak />
  </div>
  <w-dialog
    :show="showDialog"
    show-cancel
    @cancel="closeDialog"
  >
    <div>
      <h1>Import Repository </h1>
      <select>
        <option>GitHub</option>
      </select>
      <input
        v-model="keyword"
        placeholder="Search"
      >
      <w-button @click="search">
        Search
      </w-button>
      <div class="repository-list">
        <w-radio label="test" />
        <div
          v-for="repository in repositories"
          v-show="!showPath"
          :key="repository.id"
          class="repository-list-entity"
        >
          <div class="repository-list-item">
            <div class="avatar">
              <img
                :src="repository.avatar_url"
                alt=""
                height="50"
                width="50"
              >
            </div>
            <div class="content">
              {{ repository.full_name }}
            </div>
            <w-button
              type="primary"
              @click="getPaths(repository.full_name)"
            >
              Select
            </w-button>
          </div>
        </div>
        <div v-show="showPath">
          <w-button @click="back">
            Back
          </w-button>
          <li>
            {{ selectedRepository }}
            <ul>
              <li
                v-for="path in paths"
                :key="path.path"
              >
                {{ path.path }}
              </li>
            </ul>
          </li>
        </div>
      </div>
    </div>
  </w-dialog>
</template>

<style lang="scss" scoped>
.player {
  background: #eef3f7;
  width: 410px;
  min-height: 480px;
  // box-shadow: 0px 55px 75px -10px rgba(76, 70, 124, 0.5);
  // box-shadow: 0px 55px 105px 10px rgba(76, 70, 124, 0.35);
  box-shadow: 0px 15px 35px -5px rgba(50, 88, 130, 0.32);
  border-radius: 15px;
  padding: 30px;
  @media screen and (max-width: 576px), (max-height: 500px) {
    width: 95%;
    padding: 20px;
    margin-top: 75px;
    min-height: initial;
    padding-bottom: 30px;
    max-width: 400px;
  }
  &__top {
    display: flex;
    align-items: flex-start;
    position: relative;
    z-index: 4;
    @media screen and (max-width: 576px), (max-height: 500px) {
      flex-wrap: wrap;
    }
  }

  &-cover {
    width: 300px;
    height: 300px;
    margin-left: -70px;
    flex-shrink: 0;
    position: relative;
    border-radius: 15px;
    // transform: perspective(512px) translate3d(0, 0, 0);
    // transition: all .4s cubic-bezier(.125, .625, .125, .875);
    z-index: 1;

    @media screen and (max-width: 576px), (max-height: 500px) {
      margin-top: -70px;
      margin-bottom: 25px;
      width: 290px;
      height: 230px;
      margin-left: auto;
      margin-right: auto;
    }

    &__item {
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      width: 100%;
      height: 100%;
      border-radius: 15px;
      position: absolute;
      left: 0;
      top: 0;

      &:before {
        content: "";
        background: inherit;
        width: 100%;
        height: 100%;
        box-shadow: 0px 10px 40px 0px rgba(76, 70, 124, 0.5);
        display: block;
        z-index: 1;
        position: absolute;
        top: 30px;
        transform: scale(0.9);
        filter: blur(10px);
        opacity: 0.9;
        border-radius: 15px;
      }

      &:after {
        content: "";
        background: inherit;
        width: 100%;
        height: 100%;
        box-shadow: 0px 10px 40px 0px rgba(76, 70, 124, 0.5);
        display: block;
        z-index: 2;
        position: absolute;
        border-radius: 15px;
      }
    }

    &__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 15px;
      box-shadow: 0px 10px 40px 0px rgba(76, 70, 124, 0.5);
      user-select: none;
      pointer-events: none;
    }
  }

  &-controls {
    flex: 1;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: 576px), (max-height: 500px) {
      flex-direction: row;
      padding-left: 0;
      width: 100%;
      flex: unset;
    }

    &__item {
      display: inline-flex;
      font-size: 30px;
      padding: 5px;
      margin-bottom: 10px;
      color: #acb8cc;
      cursor: pointer;
      width: 50px;
      height: 50px;
      align-items: center;
      justify-content: center;
      position: relative;
      transition: all 0.3s ease-in-out;

      @media screen and (max-width: 576px), (max-height: 500px) {
        font-size: 26px;
        padding: 5px;
        margin-right: 10px;
        color: #acb8cc;
        cursor: pointer;
        width: 40px;
        height: 40px;
        margin-bottom: 0;
      }

      &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: #fff;
        transform: scale(0.5);
        opacity: 0;
        box-shadow: 0px 5px 10px 0px rgba(76, 70, 124, 0.2);
        transition: all 0.3s ease-in-out;
        transition: all 0.4s cubic-bezier(0.35, 0.57, 0.13, 0.88);
      }

      @media screen and (min-width: 500px) {
        &:hover {
          color: #532ab9;

          &::before {
            opacity: 1;
            transform: scale(1.3);
          }
        }
      }

      @media screen and (max-width: 576px), (max-height: 500px) {
        &:active {
          color: #532ab9;

          &::before {
            opacity: 1;
            transform: scale(1.3);
          }
        }
      }

      .svg-icon {
        position: relative;
        z-index: 2;
      }

      &.-xl {
        margin-bottom: 0;
        font-size: 95px;
        // filter: drop-shadow(0 2px 8px rgba(172, 184, 204, 0.3));
        // filter: drop-shadow(0 9px 6px rgba(172, 184, 204, 0.35));
        filter: drop-shadow(0 11px 6px rgba(172, 184, 204, 0.45));
        color: #fff;
        width: auto;
        height: auto;
        display: inline-flex;
        @media screen and (max-width: 576px), (max-height: 500px) {
          margin-left: auto;
          font-size: 75px;
          margin-right: 0;
        }
        &:before {
          display: none;
        }
      }

      &.-favorite {
        &.active {
          color: red;
        }
      }
    }
  }
}

.progress {
  width: 100%;
  margin-top: -15px;
  user-select: none;
  &__top {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  &__duration {
    color: #71829e;
    font-weight: 700;
    font-size: 20px;
    opacity: 0.5;
  }
  &__time {
    margin-top: 2px;
    color: #71829e;
    font-weight: 700;
    font-size: 16px;
    opacity: 0.7;
  }
  &__bar {
    height: 6px;
    width: 100%;
    cursor: pointer;
    background-color: #d0d8e6;
    display: inline-block;
    border-radius: 10px;
  }
  &__current{
    height: inherit;
    width: 0%;
    background-color: #a3b3ce;
    border-radius: 10px;
  }
}

.album-info {
  color: #71829e;
  flex: 1;
  padding-right: 60px;
  user-select: none;

  @media screen and (max-width: 576px), (max-height: 500px)  {
    padding-right: 30px;
  }

  &__name {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 12px;
    line-height: 1.3em;
    @media screen and (max-width: 576px), (max-height: 500px) {
      font-size: 18px;
      margin-bottom: 9px;
    }
  }
  &__track {
    font-weight: 400;
    font-size: 20px;
    opacity: 0.7;
    line-height: 1.3em;
    min-height: 52px;
    @media screen and (max-width: 576px), (max-height: 500px)  {
      font-size: 18px;
      min-height: 50px;
    }
  }
}

.repository-list{
  // display: flex;
  &-entity{
    border:1px solid #eaeaea;
    border-radius:5px;
  }
  &-entity + &-entity{
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    margin-top: -1px;
  }

  &-item{
    padding: 4px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;

  }
}
.content{
  flex: 1;
}
</style>
